function(context,args){ // 
  var __main__;
(() => {
  // src/utils.ts
  function isAlphaNum(str) {
    if (str === undefined)
      return false;
    for (let i = 0;i < str.length; i++) {
      const code = str[i].charCodeAt(0);
      let r = code >= 48 && code <= 57 || code >= 65 && code <= 90 || code >= 97 && code <= 122 || "_".includes(str[i]);
      if (!r)
        return false;
    }
    return true;
  }

  // src/lexer.ts
  function lex(input) {
    let res = [];
    let lines = input.split(`
`);
    for (let l of lines) {
      let raw = l;
      let comment = "\/\/";
      if (l.includes(comment)) {
        l = l.substring(0, l.indexOf(comment));
      }
      let l2 = l.split(";");
      for (let l3 of l2) {
        l3 = l3.trim();
        if (!l3)
          continue;
        let tokens = lexLine(l3);
        res.push({ raw, tokens });
      }
    }
    return res;
  }
  function lexLine(input) {
    const reserved_chars = "=!:;+-^~>[]*";
    const reserved = [
      "->",
      "---",
      ...reserved_chars
    ];
    function compareFromI(a, b, i) {
      return a.substring(i, i + b.length) == b;
    }
    let spaces = " \t\r";
    let res = [];
    let acc = "";
    mainLoop:
      for (let i = 0;i < input.length; i++) {
        let c = input[i];
        if (spaces.includes(c)) {
          while (spaces.includes(c)) {
            i++;
            c = input[i];
            continue;
          }
          res.push(" ");
        }
        for (const r of reserved) {
          if (compareFromI(input, r, i)) {
            res.push(r);
            i += r.length - 1;
            continue mainLoop;
          }
        }
        if (c == '"') {
          let str2 = c;
          do {
            i++;
            c = input[i];
            str2 += c;
          } while (c != '"');
          res.push(str2);
          continue;
        }
        let str = c;
        i++;
        c = input[i];
        while (isAlphaNum(c)) {
          str += c;
          i++;
          c = input[i];
        }
        i--;
        res.push(str);
      }
    if (res.length > 0 && res[res.length - 1] != ";")
      res.push(";");
    return res;
  }

  // src/parser.ts
  function expectedError(expected, got, prefix = "", postfix = "") {
    return error(`${prefix}Expected any of ["${expected.join('", "')}"]. But recieved: "${got}". ${postfix}`);
  }
  var tokens = [];
  var cur = tokens[0];
  var curI = 0;
  function parse(input) {
    let lines = lex(input);
    let parsed = [];
    let errors = [];
    for (const l of lines) {
      tokens = l.tokens;
      cur = tokens[0];
      curI = 0;
      let script = parseScriptLine();
      if (script.type == "error") {
        errors.push({ line: l.raw, error: script.error });
      } else {
        parsed.push(...script.value);
      }
    }
    return { errors, parsed };
  }
  function stackLog(a) {}
  function advance() {
    curI++;
    cur = tokens[curI];
    if (cur === undefined)
      cur = ";";
    stackLog("Advanced: " + cur);
    return cur;
  }
  function next(i) {
    return tokens[curI + i];
  }
  function eof() {
    return curI >= tokens.length;
  }
  function save() {
    return { curI, cur };
  }
  function load(a) {
    curI = a.curI;
    cur = a.cur;
  }
  function consume(v) {
    stackLog("consume " + v);
    if (cur != v) {
      return expectedError([v], cur);
    }
    stackLog(`consumed`);
    let c = cur;
    advance();
    return resp(undefined);
  }
  function skipSpaces() {
    while (cur == " ") {
      advance();
    }
  }
  function resp(v) {
    return { type: "success", value: v };
  }
  function error(e) {
    stackLog(e);
    return { type: "error", error: e };
  }
  function parseScriptLine() {
    stackLog("parseScriptLine");
    skipSpaces();
    let rules = [];
    while (!eof()) {
      while (cur == ";")
        advance();
      if (eof())
        return resp(rules);
      let r = parseCMD();
      if (r.type == "error")
        return r;
      if (r.value)
        rules.push(r.value);
    }
    return resp(rules);
  }
  function parseCMD() {
    stackLog("parseCMD");
    skipSpaces();
    let res = {};
    if (cur == ">") {
      res.type = "return";
      advance();
      skipSpaces();
      let t = consume(";");
      if (t.type == "error")
        return t;
      return resp(res);
    }
    if (cur == "---") {
      res.type = "stage";
      advance();
      skipSpaces();
      let t = consume(";");
      if (t.type == "error")
        return t;
      return resp(res);
    }
    if (cur == "alias") {
      res.type = "alias";
      let alias = parseAlias();
      if (alias.type == "error")
        return alias;
      res.data = alias.value;
      return resp(res);
    }
    let rule = {};
    res.type = "rule";
    res.data = rule;
    let filters = parseFilters();
    if (filters.type == "error")
      return filters;
    rule.filters = filters.value;
    skipSpaces();
    if (cur == ";") {
      advance();
      return resp(res);
    }
    skipSpaces();
    if (cur == "->") {
      advance();
      let actions = parseActions();
      if (actions.type == "error")
        return actions;
      rule.actions = actions.value;
      skipSpaces();
      let t = consume(";");
      if (t.type == "error")
        return t;
    }
    if (rule.actions && rule.actions.length == 0)
      delete rule.actions;
    if (rule.filters && rule.filters.length == 0)
      delete rule.filters;
    return resp(res);
  }
  function parseActions() {
    stackLog("parseActions");
    let actions = [];
    while (true) {
      skipSpaces();
      if (cur == ";")
        return resp(actions);
      let a = parseAction();
      if (a.type == "error")
        return a;
      actions.push(a.value);
    }
  }
  function parseAction() {
    stackLog("parseAction");
    skipSpaces();
    let res = {};
    if (!isAlphaNum(cur))
      return expectedError(["alphanumeric string"], cur, "Action error. ");
    let k = cur;
    advance();
    skipSpaces();
    if (isAlphaNum(cur) || cur == ";") {
      let v = true;
      return resp({ k, v });
    } else if (cur == "=") {
      advance();
      skipSpaces();
      let v1 = parseValueType();
      if (v1.type == "error")
        return v1;
      let v = v1.value;
      advance();
      return resp({ k, v });
    } else {
      return expectedError("=; ".split(""), cur);
    }
  }
  function parseAlias() {
    stackLog("parseAlias");
    let t = consume("alias");
    if (t.type == "error")
      return t;
    t = consume(" ");
    if (t.type == "error")
      return t;
    skipSpaces();
    if (cur.length != 1)
      return expectedError(["single alphanumeric character"], cur, "Alias error. ");
    let k = cur;
    advance();
    skipSpaces();
    t = consume("=");
    if (t.type == "error")
      return t;
    skipSpaces();
    if (!isAlphaNum(cur))
      return expectedError(["alphanumeric string"], cur, "Alias error. ");
    let v = cur;
    advance();
    skipSpaces();
    t = consume(";");
    if (t.type == "error")
      return t;
    return resp({ k, v });
  }
  function parseFilters() {
    stackLog("parseFilters");
    skipSpaces();
    let filters = [];
    let s = save();
    let neg = parseNegation();
    let sun = parseSUN();
    let sunErrored = false;
    if (sun.type == "error") {
      load(s);
      sunErrored = true;
    } else {
      if (neg.type == "success" && neg.value === true)
        sun.value.negative = neg.value;
      filters.push(sun.value);
    }
    skipSpaces();
    while (!(cur == "->" || cur == ";" || eof())) {
      let neg2 = parseNegation();
      let lun = parseLUN();
      if (lun.type == "error" && sun.type == "error" && sunErrored)
        return error(sun.error);
      if (lun.type == "error")
        return lun;
      if (neg2.type == "success" && neg2.value === true)
        lun.value.negative = neg2.value;
      filters.push(lun.value);
      skipSpaces();
      sunErrored = false;
    }
    return resp(filters);
  }
  function parseNegation() {
    skipSpaces();
    if (cur == "!") {
      advance();
      return resp(true);
    } else {
      return resp(false);
    }
  }
  function parseSUN() {
    stackLog("parseSUN");
    let r = {
      type: "sun",
      negative: undefined,
      loaded: undefined,
      ready: undefined,
      alias: undefined,
      tier: undefined,
      rarity: undefined,
      value: undefined
    };
    if (cur == "+") {
      r.loaded = true;
      advance();
    } else if (cur == "-") {
      r.loaded = false;
      advance();
    }
    if (cur == "^") {
      r.ready = true;
      advance();
    } else if (cur == "~") {
      r.ready = false;
      advance();
    }
    if (!isAlphaNum(cur) && cur != "*")
      return expectedError(["alias char"], cur, "SUN Rule error. ");
    switch (cur.length) {
      case 3:
        {
          r.alias = cur[0];
          if (!isNaN(Number(cur[1])))
            r.tier = Number(cur[1]);
          if (!isNaN(Number(cur[2])))
            r.rarity = Number(cur[2]);
          advance();
        }
        break;
      case 2:
        {
          r.alias = cur[0];
          if (!isNaN(Number(cur[1])))
            r.tier = Number(cur[1]);
          advance();
          if (cur == "*")
            consume("*");
          else if (cur == " ") {} else if ((cur + "").length == 1 && !isNaN(Number(cur))) {
            r.rarity = Number(cur);
            advance();
          }
        }
        break;
      case 1:
        {
          r.alias = cur[0];
          advance();
          if (cur == "*")
            consume("*");
          else if (cur == " ") {} else if ((cur + "").length == 1 && !isNaN(Number(cur))) {
            r.tier = Number(cur);
            advance();
          }
          if (cur == "*")
            consume("*");
          else if (cur == " ") {} else if ((cur + "").length == 1 && !isNaN(Number(cur))) {
            r.rarity = Number(cur);
            advance();
          }
        }
        break;
      default:
        return expectedError(["alias char"], cur, "SUN Rule error. ");
    }
    if (r.alias == "*")
      r.alias = undefined;
    if (cur == "[") {
      consume("[");
      let v = parseValue();
      if (v.type == "error")
        return v;
      if (v.value != "*")
        r.value = v.value;
      let end = consume("]");
      if (end.type == "error")
        return end;
    }
    if (cur != " " && cur != ";" && cur != "->") {
      return expectedError(["->", ";", " "], cur, "SUN Rule error. ");
    }
    skipSpaces();
    if (r.loaded === undefined)
      delete r.loaded;
    if (r.negative === undefined)
      delete r.negative;
    if (r.rarity === undefined)
      delete r.rarity;
    if (r.ready === undefined)
      delete r.ready;
    if (r.tier === undefined)
      delete r.tier;
    if (r.value === undefined)
      delete r.value;
    return resp(r);
  }
  function parseLUN() {
    stackLog("parseLUN");
    let res = { type: "lun", negative: undefined };
    if (!isAlphaNum(cur)) {
      return expectedError(["alphanumeric string"], cur, "LUN Rule error. ");
    }
    let name = cur;
    advance();
    let s = save();
    skipSpaces();
    if (cur == "=") {
      let c = consume("=");
      if (c.type == "error")
        return c;
      skipSpaces();
      let v = parseValue();
      if (v.type == "error")
        return v;
      res[name] = v.value;
      return resp(res);
    } else {
      if ([";", "->", "!"].includes(cur) || isAlphaNum(cur)) {
        res[name] = true;
        return resp(res);
      } else {
        return expectedError(["=", ";", "->", "!"], cur, "LUB Rule error. ");
      }
    }
  }
  function parseValue() {
    stackLog("parseValue");
    if (next(1) == ":") {
      let r = parseRange();
      if (r.type == "error")
        return r;
      if (r.value.min == undefined && r.value.max == undefined)
        return resp(undefined);
      return r;
    } else {
      let v = parseValueType();
      if (v.type == "error")
        return v;
      if (v.value == undefined)
        return resp(undefined);
      return resp(v.value);
    }
  }
  function parseValueType() {
    stackLog("parseValueType");
    let v = cur;
    if (!isNaN(Number(v))) {
      advance();
      return resp(Number(v));
    }
    if (v[0] == '"' && v[v.length - 1] == '"') {
      v = v.replace(/\"/gm, "");
      advance();
      return resp(v);
    }
    if (isAlphaNum(v)) {
      if (v == "true")
        v = true;
      if (v == "false")
        v = false;
      advance();
      return resp(v);
    }
    if (v == "*") {
      v = undefined;
      advance();
      return resp(v);
    }
    return error("Failed to parse value " + v);
  }
  function parseRange() {
    let min = parseValueType();
    if (min.type == "error")
      return min;
    if (typeof min.value != "number" && min.value !== undefined) {
      min.value = Number(min.value);
    }
    let m = consume(":");
    if (m.type == "error")
      return m;
    let max = parseValueType();
    if (max.type == "error")
      return max;
    if (typeof max.value != "number" && max.value !== undefined) {
      max.value = Number(max.value);
    }
    return resp({ type: "range", min: min.value, max: max.value });
  }

  // src/compiler.ts
  function compile(input) {
    let ast = parse(input);
    if (ast.errors.length > 0)
      throw ast.errors;
    let res = { stages: [] };
    let stage = [];
    for (let i = 0;i < ast.parsed.length; i++) {
      const cmd = ast.parsed[i];
      if (cmd.type == "stage") {
        res.stages.push(stage);
        stage = [];
      } else {
        stage.push(cmd);
      }
      if (i == ast.parsed.length - 1) {
        res.stages.push(stage);
      }
    }
    return res;
  }

  // src/filter.ts
  var Aliases = {
    x: "l0ckbox",
    j: "l0ckjaw",
    q: "l0cket",
    a: "acct_nt",
    m: "magnara",
    W: "l0g_wr1t3r",
    o: "sn_w_usac",
    f: "shfflr",
    N: "CON_TELL",
    n: "CON_SPEC",
    D: "DATA_CHECK",
    g: "sn_w_glock",
    "2": "ez_21",
    "3": "ez_35",
    "4": "ez_40",
    X: "c001",
    y: "c002",
    Y: "c003",
    C: "cron_bot",
    c: "char_count",
    s: "script_slot",
    S: "public_script",
    "0": "channel_count",
    k: "k3y",
    b: "balance",
    w: "log_writer",
    t: "transactions",
    T: "transfer",
    u: "expose_upgrades",
    U: "transfer_upgrade",
    l: "expose_access_log",
    L: "expose_upgrade_log",
    z: "w4rn",
    Z: "w4rn_message",
    r: "w4rn_er"
  };
  var aliases;
  var dataset;
  function filter(upgrades, compiled) {
    aliases = {};
    for (const k in Aliases) {
      aliases[k] = Aliases[k];
    }
    let filtered = [];
    for (const stage of compiled.stages) {
      dataset = [...upgrades];
      for (const u of dataset) {
        delete u._filtered;
      }
      for (const rule of stage) {
        if (rule.type == "return") {
          dataset = dataset.filter((a) => !a._filtered);
          if (dataset.length == 0)
            break;
          continue;
        }
        if (rule.type == "alias") {
          aliases[rule.data.k] = rule.data.v;
          continue;
        }
        if (rule.type = "rule") {
          if (!rule.data)
            throw Error("Wtf?");
          let ups = [];
          for (const u of dataset) {
            if (!rule.data.filters) {
              ups.push(u);
              continue;
            }
            if (filterOneUpgrade(u, rule.data.filters)) {
              ups.push(u);
            }
          }
          let b = (rule.data.filters || []).find((a) => a._best !== undefined);
          let w = (rule.data.filters || []).find((a) => a._worst !== undefined);
          if (b && typeof b._best == "number") {
            ups = filterBest(ups, b._best, false, b.negative === true);
          } else if (w && typeof w._worst == "number") {
            ups = filterBest(ups, w._worst, true, w.negative === true);
          }
          for (const u of ups) {
            if (!filtered.includes(u)) {
              filtered.push(u);
            }
            u._filtered = true;
            if (rule.data.actions) {
              performActions(u, rule.data.actions);
            }
          }
        }
      }
    }
    return filtered;
  }
  function shortUpName(name) {
    return name.replace(/\_v\d$/gm, "").replace(/\_V\d$/gm, "");
  }
  function getUpgradeValue(u) {
    let n = shortUpName(u.name);
    let dict = {
      k3y: u.k3y,
      CON_SPEC: u.p2_len,
      acct_nt: u.acct_nt_min,
      sn_w_glock: u.expire_secs,
      sn_w_usac: u.salt_digits,
      magnara: u.magnara_len,
      shfflr: u.digits,
      l0g_wr1t3r: u.loc_count,
      w4rn_message: u.cooldown,
      DATA_CHECK: u.acc_mod,
      l0cket: u.count,
      l0ckbox: u.count,
      l0ckjaw: u.count,
      balance: u.cooldown,
      expose_access_log: u.count,
      expose_upgrade_log: u.count,
      expose_upgrades: u.cooldown,
      log_writer: u.cooldown,
      transactions: u.count,
      transfer_upgrade: u.count,
      transfer: u.amount,
      channel_count: u.count,
      char_count: u.chars,
      public_script: u.slots,
      script_slot: u.slots,
      cron_bot: u.cooldown
    };
    if (n in dict)
      return dict[n];
    return 0;
  }
  function getUpgradeQuality(u) {
    let n = shortUpName(u.name);
    if (n == "k3y") {
      if (u.rarity == 0)
        return 3;
      if (u.rarity == 1)
        return 2;
      if (u.rarity >= 2)
        return 1;
    }
    let dict = {
      CON_SPEC: u.p2_len,
      acct_nt: u.acct_nt_min,
      sn_w_usac: u.salt_digits,
      magnara: u.magnara_len,
      shfflr: u.digits,
      l0g_wr1t3r: u.loc_count,
      DATA_CHECK: u.acc_mod,
      l0cket: u.count,
      l0ckbox: u.count,
      l0ckjaw: u.count,
      expose_access_log: u.count,
      expose_upgrade_log: u.count,
      transactions: u.count,
      transfer_upgrade: u.count,
      transfer: u.amount,
      channel_count: u.count,
      char_count: u.chars,
      public_script: u.slots,
      script_slot: u.slots,
      sn_w_glock: -u.expire_secs,
      w4rn_message: -u.cooldown,
      balance: -u.cooldown,
      expose_upgrades: -u.cooldown,
      log_writer: -u.cooldown,
      cron_bot: -u.cooldown
    };
    if (n in dict)
      return dict[n];
    return 1;
  }
  function getCD(u) {
    if (!u.last_time || !u.cooldown)
      return -1;
    return u.cooldown * 1000 - (Date.now() - u.last_time);
  }
  function upReady(u) {
    return getCD(u) <= 0;
  }
  function inRangeOrValue(val, range) {
    if (range === undefined) {
      return true;
    } else if (typeof range == "number" || typeof range == "boolean") {
      return val === range;
    } else if (range == "undefined") {
      return val === undefined;
    } else if (typeof range == "string") {
      return val === range;
    } else if (range.type == "range") {
      if (typeof val == "number") {
        let match = true;
        if (val == undefined)
          return false;
        if (range.min != null && val < range.min)
          match = false;
        if (range.max != null && val > range.max)
          match = false;
        return match;
      } else {
        return false;
      }
    }
    return false;
  }
  function matchAlias(u, alias) {
    let n = shortUpName(u.name);
    if (aliases[alias] == n)
      return true;
    return false;
  }
  function filterOneUpgrade(u, filters) {
    for (const f of filters) {
      let negative = f.negative == true;
      if (f.type == "sun") {
        if (f.alias && !matchAlias(u, f.alias) !== negative)
          return false;
        if (f.ready != null && f.ready != upReady(u) !== negative)
          return false;
        if (f.value != null && !inRangeOrValue(getUpgradeValue(u), f.value) !== negative)
          return false;
      }
      for (const k in f) {
        if (["_best", "_worst", "alias", "ready", "value", "next_stage", "type"].includes(k))
          continue;
        const v = f[k];
        if (v != null && !inRangeOrValue(u[k], v) !== negative)
          return false;
      }
    }
    return true;
  }
  function compareQuality(a, b) {
    let an = shortUpName(a.name);
    let bn = shortUpName(b.name);
    let aq = getUpgradeQuality(a);
    let bq = getUpgradeQuality(b);
    if (an != bn)
      return 0;
    if (an == "k3y" && a.k3y != b.k3y) {
      return 0;
    }
    return bq - aq;
  }
  function filterBest(ups, count, worst, negative) {
    ups.sort(compareQuality);
    if (worst)
      ups.reverse();
    if (!negative)
      return ups.slice(0, count);
    if (negative)
      return ups.slice(count);
    return [];
  }
  function performActions(up, actions) {
    for (const a of actions) {
      up[a.k] = a.v;
      if (a.v == "undefined")
        delete up[a.k];
    }
  }
  function sortUpgrades(ups) {
    return ups.sort((a, b) => {
      if (a.name != b.name)
        return a.name.localeCompare(b.name);
      let q = compareQuality(a, b);
      if (q != 0)
        return q;
      if (a.tier != b.tier)
        return b.tier - a.tier;
      if (a.rarity != b.rarity)
        return b.rarity - a.rarity;
      if (a.loaded != b.loaded)
        return b.loaded ? 1 : 0;
      return 0;
    });
  }

  // src/index.ts
  function SUN(args) {
    if (args && args.import === true)
      return { compile, filter, sortUpgrades, getUpgradeValue, getUpgradeQuality, Aliases };
    let comment = "\/\/";
    let a = `    'J╔══════════════════════════════════════════════════════════════╗'    
    'J║'  cake.sun - Short Upgrade Notation                           'J║'   
    'J╠══════════════════════════════════════════════════════════════╣'    
    'J║'                                                              'J║'   
    'J║'  'I\\ | /                -= SUNSCRIPT =-'                        'J║'
    'J║'  'I- O -        A smart filter for your upgrades'               'J║'
    'J║'  'I/ | \\                 Keep it light'                         'J║'
    'J║'                                                              'J║'   
    'J║'  'IAll info is at https:` + comment + `github.com/CakeEaterGames/sunscript'  'J║'
    'J║                                                              ║'    
    'J╚══════════════════════════════════════════════════════════════╝'    `;
    return a.replace(/'/gm, "`");
  }
  __main__ = SUN;
})();

  return __main__(args);
}