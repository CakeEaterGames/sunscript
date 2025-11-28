import { program } from "./compiler";
import { commonTypes, range, Rule } from "./parser";


const Aliases: Record<string, string> = {
  "x": "l0ckbox",
  "j": "l0ckjaw",
  "q": "l0cket",
  "a": "acct_nt",
  "m": "magnara",
  "W": "l0g_wr1t3r",
  "o": "sn_w_usac",
  "f": "shfflr",
  "N": "CON_TELL",
  "n": "CON_SPEC",
  "D": "DATA_CHECK",
  "g": "sn_w_glock",
  "2": "ez_21",
  "3": "ez_35",
  "4": "ez_40",
  "X": "c001",
  "y": "c002",
  "Y": "c003",
  "C": "cron_bot",
  "c": "char_count",
  "s": "script_slot",
  "S": "public_script",
  "0": "channel_count",
  "k": "k3y",
  "b": "balance",
  "w": "log_writer",
  "t": "transactions",
  "T": "transfer",
  "u": "expose_upgrades",
  "U": "transfer_upgrade",
  "l": "expose_access_log",
  "L": "expose_upgrade_log",
  "z": "w4rn",
  "Z": "w4rn_message",
  "r": "w4rn_er"
};

type Upgrade = {
  name: string,
  rarity: number,
  tier: number,
  cooldown?: number,
  [key: string]: commonTypes,
}


export function filter(upgrades: Array<Object>, compiled: program) {

  let aliases = { ...Aliases };
  let triggered = false
  for (const stage of compiled.stages) {
    for (const rule of stage) {
      console.log(rule);

      if (rule.return && triggered) {
        break;
      }
      if (rule.alias) {
        aliases[rule.alias.k] = rule.alias.v
        continue
      }
      let ups = []
      for (const u of upgrades) {
        if (filterOneUpgrade(u, rule.filters)) {
          ups.push(u)
          triggered = true;
        }
      }
      if (rule.filters && rule.filters.find(a => a._best)) {
        let f = rule.filters.find(a => a._best)!
        ups = filterBest(ups, f._best, false, f.negative)
      } else if (rule.filters && rule.filters.find(a => a._worst)) {
        let f = rule.filters.find(a => a._worst)!
        ups = filterBest(ups, f._worst, false, f.negative)
      }
      for (const u of ups) {
        performActions(u, rule.actions)
      }

    }
  }
}

function shortUpName(name: string) {
  return name.replace(/\_v\d$/gm, "").replace(/\_V\d$/gm, "")
}

function getUpgradeValue(u: Upgrade): number | string {
  let n = shortUpName(u.name)
  let dict: { [key: string]: commonTypes } =
  {
    "k3y": u.k3y,
    "CON_SPEC": u.p2_len,
    "acct_nt": u.acct_nt_min,
    "sn_w_glock": u.expire_secs,
    "sn_w_usac": u.salt_digits,
    "magnara": u.magnara_len,
    "shfflr": u.digits,
    "l0g_wr1t3r": u.loc_count,
    "w4rn_message": u.cooldown,
    "DATA_CHECK": u.acc_mod,
    "l0cket": u.count,
    "l0ckbox": u.count,
    "l0ckjaw": u.count,
    "balance": u.cooldown,
    "expose_access_log": u.count,
    "expose_upgrade_log": u.count,
    "expose_upgrades": u.cooldown,
    "log_writer": u.cooldown,
    "transactions": u.count,
    "transfer_upgrade": u.count,
    "transfer": u.amount,
    "channel_count": u.count,
    "char_count": u.chars,
    "public_script": u.slots,
    "script_slot": u.slots,
    "cron_bot": u.cooldown,
  }
  if (n in dict) return dict[n] as string | number
  return 0;
}

function getUpgradeQuality(u: Upgrade): number {
  let n = shortUpName(u.name)
  if (n == "k3y") {
    if (u.rarity == 0) return 3;
    if (u.rarity == 1) return 2;
    if (u.rarity >= 2) return 1;
  }
  let dict = {
    "CON_SPEC": u.p2_len,
    "acct_nt": u.acct_nt_min,
    "sn_w_usac": u.salt_digits,
    "magnara": u.magnara_len,
    "shfflr": u.digits,
    "l0g_wr1t3r": u.loc_count,
    "DATA_CHECK": u.acc_mod,
    "l0cket": u.count,
    "l0ckbox": u.count,
    "l0ckjaw": u.count,
    "expose_access_log": u.count,
    "expose_upgrade_log": u.count,
    "transactions": u.count,
    "transfer_upgrade": u.count,
    "transfer": u.amount,
    "channel_count": u.count,
    "char_count": u.chars,
    "public_script": u.slots,
    "script_slot": u.slots,
    "sn_w_glock": u.expire_secs,
    "w4rn_message": -u.cooldown!,
    "balance": -u.cooldown!,
    "expose_upgrades": -u.cooldown!,
    "log_writer": -u.cooldown!,
    "cron_bot": -u.cooldown!,
  } as { [key: string]: number }
  if (n in dict) return dict[n];
  return 1;
}
function getCD(u: Upgrade): number {
  if (!u.last_time || !u.cooldown) return -1
  return u.cooldown * 1000 - (Date.now() - (u.last_time as number))
}
function upReady(u: Upgrade):boolean {
  return getCD(u) <= 0
}

function inRangeOrValue(val:number, range:number | range) {
  if (range && range.type == "range") {
    let match = true;
    if (val == undefined) return false
    if (range.min != undefined && val < range.min) match = false;
    if (range.max != undefined && val > range.max) match = false;
    return match;
  } else {
    if (range == "undefined") range = undefined
    return val === range
  }
}

function filterOneUpgrade(u, filters) {
  for (const f of filters) {
    let negative = f.negative == true;
    if (f.alias != undefined && ((aliases[f.alias] != shortUpName(u.name)) ^ negative)) return false
    if (f.ready != undefined && ((f.ready != upReady(u)) ^ negative)) return false;
    if (f.value != undefined && ((!inRangeOrValue(getUpgradeValue(u), f.value)) ^ negative)) return false;

    for (const k in f) {
      if (["_best", "_worst", "alias", "ready", "value", "pp"].includes(k)) continue;
      const v = f[k];
      if (v != undefined && ((!inRangeOrValue(u[k], v)) ^ negative)) return false;
    }
  }
  return true;
}

function compareQuality(a, b) {
  let an = shortUpName(a.name)
  let bn = shortUpName(b.name)
  let aq = getUpgradeQuality(a)
  let bq = getUpgradeQuality(b)
  if (an != bn) return 0;
  if (an == 'k3y' && a.k3y != b.k3y) {
    return 0;
  }
  return bq - aq;
}

function filterBest(ups, count, worst, negative) {
  ups.sort(compareQuality)
  if (worst) ups.reverse()
  if (!negative) return ups.slice(0, count)
  if (negative) return ups.slice(count);
}

function performActions(up, actions) {
  for (const a of actions) {
    up[a.k] = a.v
    if (a.v == "undefined") delete up[a.k]
  }
}



