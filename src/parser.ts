import { lex } from "./lexer"
import { Action, Alias, commonTypes, LUNFilter, range, Rule, SUNFilter } from "./types";
import { isAlphaNum } from "./utils"

function expectedError(expected: string[], got: string, prefix = "", postfix = "") {

  return error<undefined>(`${prefix}Expected any of ["${expected.join('", "')}"]. But recieved: "${got}". ${postfix}`)
  // return error<undefined>(`${prefix}Expected ${expected.length > 1 ? "any of " : ""} ["${expected.join('", "')}"]. But recieved: "${got}". ${postfix}`)
}

type savestate = {
  cur: string,
  curI: number,
}

type response<T> =
  | { type: "success"; value: T }
  | { type: "error"; error: string };


let tokens: Array<string> = []
let cur: string = tokens[0]
let curI = 0

export function parse(input: string) {
  let lines = lex(input)
  // log(tokens)
  let parsed = []
  let errors = []

  for (const l of lines) {
    tokens = l.tokens
    cur = tokens[0]
    curI = 0

    let script = parseScriptLine()
    if (script.type == "error") {
      errors.push({ line: l.raw, error: script.error })
    } else {
      parsed.push(...script.value)
    }
  }
  return { errors, parsed }
}

function stackLog(a: string) {
  // log(a)
}

function advance() {
  curI++;
  cur = tokens[curI]
  if (cur === undefined) cur = ";"
  stackLog("Advanced: " + cur)
  return cur
}

function next(i: number) {
  return tokens[curI + i]
}

function eof() {
  return curI >= tokens.length
}

function save() {
  return { curI, cur } as savestate
}

function load(a: savestate) {
  curI = a.curI
  cur = a.cur
}

function consume(v: string): response<undefined> {
  stackLog("consume " + v)
  if (cur != v) {
    return expectedError([v], cur)
  }
  stackLog(`consumed`)
  let c = cur
  advance()
  return resp(undefined)
}

function skipSpaces() {
  while (cur == " ") {
    advance();
  }
}

function resp<T>(v: T): response<T> {
  return { type: "success", value: v }
}

function error<T>(e: any): response<T> {
  stackLog(e)
  return { type: "error", error: e }
}

function parseScriptLine(): response<Array<Rule>> {
  stackLog("parseScriptLine")

  skipSpaces();
  let rules = []
  while (!eof()) {

    while (cur == ";") advance();
    if (eof()) return resp(rules);

    let r = parseRule()

    if (r.type == "error") return r;
    if (r.value) rules.push(r.value)
  }


  return resp(rules)
}

function parseRule(): response<Rule> {
  stackLog("parseRule")

  skipSpaces();
  let res = {} as Rule

  if (cur == ">") {
    res.return = true;
    advance()
    skipSpaces();
    let t = consume(";")
    if (t.type == "error") return t as response<Rule>;
    return resp(res)
  }
  if (cur == "pp") {
    advance();
    res.pp = true
    let s = consume(" ");
    if (s.type == "error") return s;
    skipSpaces();
  }

  if (cur == "alias") {
    let alias = parseAlias()
    if (alias.type == "error") return alias;
    res.alias = alias.value
    return resp(res)
  }

  let filters = parseFilters()
  if (filters.type == "error") return filters;
  res.filters = filters.value
  skipSpaces();

  if (cur == ";") {
    advance();
    // if (res.actions.length == 0) delete res.actions
    return resp(res)
  }

  skipSpaces();

  if (cur == '->') {
    advance();

    let actions = parseActions()
    if (actions.type == "error") return actions;
    res.actions = actions.value;
    skipSpaces();

    let t = consume(";");
    if (t.type == "error") return t;
  }

  // if (res.actions.length == 0) delete res.actions

  return resp(res)
}

function parseActions(): response<Array<Action>> {
  stackLog("parseActions")
  let actions = []

  while (true) {
    skipSpaces();
    if (cur == ';') return resp(actions);

    let a = parseAction()
    if (a.type == "error") return a

    actions.push(a.value)
  }
}

function parseAction(): response<Action> {
  stackLog("parseAction")

  skipSpaces();
  let res = {}

  if (!isAlphaNum(cur))
    return expectedError(["alphanumeric string"], cur, "Action error. ") as response<Action>

  let k = cur
  advance();
  skipSpaces()

  if (isAlphaNum(cur) || cur == ';') {
    let v = true
    return resp({ k, v })
  } else if (cur == '=') {
    advance();
    skipSpaces()

    let v1 = parseValueType()
    if (v1.type == "error") return v1

    let v = v1.value;

    advance();
    return resp({ k, v })
  } else {
    return expectedError("=; ".split(''), cur) as response<Action>
  }
}

function parseAlias(): response<Alias> {
  stackLog("parseAlias")


  let t = consume("alias");
  if (t.type == "error") return t;

  t = consume(" ");
  if (t.type == "error") return t;
  skipSpaces();

  if (cur.length != 1)
    return expectedError(["single alphanumeric character"], cur, "Alias error. ") as response<Alias>
  let k = cur
  advance();
  skipSpaces();

  t = consume("=");
  if (t.type == "error") return t;
  skipSpaces();

  if (!isAlphaNum(cur))
    return expectedError(["alphanumeric string"], cur, "Alias error. ") as response<Alias>

  let v = cur
  advance();
  skipSpaces();

  t = consume(";");
  if (t.type == "error") return t;

  return resp({ k, v });
}

function parseFilters(): response<Array<SUNFilter | LUNFilter>> {
  stackLog("parseFilters")
  skipSpaces();

  let filters: Array<SUNFilter | LUNFilter> = []

  //There can be only one sun filter and it comes at the start
  let s = save();
  let neg = parseNegation()
  let sun = parseSUN()
  let sunErrored = false
  if (sun.type == "error") {
    load(s)
    sunErrored = true
  } else {
    if (neg.type == "success" && neg.value === true) sun.value.negative = neg.value
    filters.push(sun.value)
  }

  skipSpaces()

  while (!(cur == "->" || cur == ";" || eof())) {
    let neg = parseNegation()
    let lun = parseLUN()
    if (lun.type == "error" && sun.type == "error" && sunErrored) return error(sun.error);
    if (lun.type == "error") return lun;
    if (neg.type == "success" && neg.value === true) lun.value.negative = neg.value

    filters.push(lun.value)
    skipSpaces()
    sunErrored = false
  }
  // advance()

  return resp(filters)
}

function parseNegation(): response<boolean> {
  skipSpaces();
  if (cur == "!") {
    advance();
    return resp(true)
  } else {
    return resp(false)
  }
}

function parseSUN(): response<SUNFilter> {
  stackLog("parseSUN")

  let r: SUNFilter = {
    type: "sun",
    negative: undefined,
    loaded: undefined,
    ready: undefined,
    alias: undefined,
    tier: undefined,
    rarity: undefined,
    value: undefined,
  }

  // advance()
  if (cur == "+") {
    r.loaded = true
    advance()
  } else if (cur == "-") {
    r.loaded = false
    advance()
  }

  if (cur == "^") {
    r.ready = true
    advance()
  } else if (cur == "~") {
    r.ready = false
    advance()
  }

  if (!isAlphaNum(cur) && cur != "*")
    return expectedError(["alias char"], cur, "SUN Rule error. ") as response<SUNFilter>


  switch (cur.length) {
    case 3: {
      r.alias = cur[0]
      if (!isNaN(Number(cur[1]))) r.tier = Number(cur[1])
      if (!isNaN(Number(cur[2]))) r.rarity = Number(cur[2])
      advance()
    } break;
    case 2: {
      r.alias = cur[0]
      if (!isNaN(Number(cur[1]))) r.tier = Number(cur[1])
      advance()
      if (cur != " " && (cur + "").length == 1 && !isNaN(Number(cur))) {
        r.rarity = Number(cur);
        advance()
      }
    } break;
    case 1: {
      r.alias = cur[0]
      advance()
      if (cur != " " && (cur + "").length == 1 && !isNaN(Number(cur))) {
        r.tier = Number(cur);
        advance()
      }
      if (cur != " " && (cur + "").length == 1 && !isNaN(Number(cur))) {
        r.rarity = Number(cur);
        advance()
      }

    } break;
    default: return expectedError(["alias char"], cur, "SUN Rule error. ") as response<SUNFilter>

  }

  if (r.alias == "*") r.alias = undefined;


  if (cur == "[") {
    consume("[")

    let v = parseValue()
    if (v.type == "error") return v;

    if (v.value != "*")
      r.value = v.value;

    let end = consume("]")
    if (end.type == "error") return end;
  }

  if (cur != ' ' && cur != ';' && cur != '->') {
    return expectedError(["->", ";", " "], cur, "SUN Rule error. ") as response<SUNFilter>
  }
  advance()

  // DAMN YOU TYPESCRIPT
  // for (const k in r) {
  //   if (r[k] == undefined) delete r[k]
  // }

  if (r.loaded === undefined) delete r.loaded
  if (r.negative === undefined) delete r.negative
  if (r.rarity === undefined) delete r.rarity
  if (r.ready === undefined) delete r.ready
  if (r.tier === undefined) delete r.tier
  if (r.value === undefined) delete r.value

  return resp(r);
}

function parseLUN(): response<LUNFilter> {
  stackLog("parseLUN")

  let res: LUNFilter = { type: "lun", negative: undefined }
  if (!isAlphaNum(cur)) {
    return expectedError(["alphanumeric string"], cur, "LUN Rule error. ") as response<LUNFilter>
  }
  let name = cur;
  advance()
  let s = save()
  skipSpaces()

  if (cur == '=') {
    let c = consume("=")
    if (c.type == "error") return c;
    skipSpaces()
    let v = parseValue()
    if (v.type == "error") return v
    res[name] = v.value;
    return resp(res)
  } else {
    //We either found a short lun filter without "=true"
    //Or a syntax error

    if ([";", "->", "!"].includes(cur) || isAlphaNum(cur)) {
      res[name] = true;
      return resp(res)
    } else {
      return expectedError(["=", ";", "->", "!"], cur, "LUB Rule error. ") as response<LUNFilter>
    }

  }


}

function parseValue(): response<range | commonTypes> {
  stackLog("parseValue")

  if (next(1) == ":") {
    let r = parseRange()
    if (r.type == "error") return r;
    if (r.value.min == undefined && r.value.max == undefined) return resp(undefined)
    return r
  } else {
    let v = parseValueType()
    if (v.type == "error") return v;
    if (v.value == undefined) return resp(undefined)
    return resp(v.value)
  }
}

function parseValueType(): response<commonTypes> {
  stackLog("parseValueType")
  let v: string | number | boolean | undefined = cur;
  if (!isNaN(Number(v))) {
    advance();
    return resp(Number(v))
  }
  if (v[0] == '"' && v[v.length - 1] == '"') {
    v = v.replace(/\"/gm, "")
    advance();
    return resp(v)
  }
  if (isAlphaNum(v)) {
    if (v == "true") v = true;
    if (v == "false") v = false;
    // Don't do this because it's an edge case. We'll check for it later
    // if (v == "undefined") v = undefined;

    advance();
    return resp(v)
  }
  if (v == "*") {
    v = undefined
    advance();
    return resp(v)
  }

  return error("Failed to parse value " + v)
}

function parseRange(): response<range> {
  let min = parseValueType()
  if (min.type == "error") return min;
  if (typeof min.value != "number" && min.value !== undefined) {
    min.value = Number(min.value)
  }

  let m = consume(":")
  if (m.type == "error") return m;

  let max = parseValueType()
  if (max.type == "error") return max;
  if (typeof max.value != "number" && max.value !== undefined) {
    max.value = Number(max.value)
  }

  return resp({ type: "range", min: min.value, max: max.value })
}

