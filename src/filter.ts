import { program } from "./compiler";
import { Action, commonTypes, Filter, range, Rule } from "./types";


export const Aliases: Record<string, string> = {
  "l0ckbox": "x",
  "l0ckjaw": "j",
  "l0cket": "q",
  "acct_nt": "a",
  "magnara": "m",
  "l0g_wr1t3r": "W",
  "sn_w_usac": "o",
  "shfflr": "f",
  "CON_TELL": "N",
  "CON_SPEC": "n",
  "DATA_CHECK": "D",
  "sn_w_glock": "g",
  "ez_21": "2",
  "ez_35": "3",
  "ez_40": "4",
  "c001": "X",
  "c002": "y",
  "c003": "Y",
  "cron_bot": "C",
  "char_count": "c",
  "script_slot": "s",
  "public_script": "S",
  "channel_count": "0",
  "k3y": "k",
  "balance": "b",
  "log_writer": "w",
  "transactions": "t",
  "transfer": "T",
  "expose_upgrades": "u",
  "transfer_upgrade": "U",
  "expose_access_log": "l",
  "expose_upgrade_log": "L",
  "w4rn": "z",
  "w4rn_message": "Z",
  "w4rn_er": "r"
};

type Upgrade = {
  name: string,
  rarity: number,
  tier: number,
  cooldown?: number,
  [key: string]: commonTypes,
}

let aliases: typeof Aliases


let dataset: Upgrade[];

export function filter(upgrades: Array<Upgrade>, compiled: program) {
  aliases = {}
  for (const k in Aliases) {
    aliases[k] = Aliases[k]
  }
  let triggered = false
  for (const stage of compiled.stages) {
    dataset = [...upgrades]
    for (const rule of stage) {
      // console.log(rule);

      if (rule.return) {
        dataset = dataset.filter(a => !a._filtered)
        if (dataset.length == 0) break;
        continue;
      }
      if (rule.alias) {
        aliases[rule.alias.k] = rule.alias.v
        continue
      }
      let ups: Upgrade[] = []
      for (const u of dataset) {
        if (rule.filters && filterOneUpgrade(u, rule.filters)) {
          ups.push(u)
          triggered = true;
        }
      }

      let b = (rule.filters || []).find(a => a._best!==undefined) //because ?. is broken
      let w = (rule.filters || []).find(a => a._worst!==undefined)

      if (b && typeof b._best == "number") {
        ups = filterBest(ups, b._best, false, b.negative === true)
      } else if (w && typeof w._worst == "number") {
        ups = filterBest(ups, w._worst, true, w.negative === true)
      }
      for (const u of ups) {
        u._filtered = true;
        if (rule.actions) {
          performActions(u, rule.actions)
        }
      }

    }
  }
}

function shortUpName(name: string) {
  return name.replace(/\_v\d$/gm, "").replace(/\_V\d$/gm, "")
}

export function getUpgradeValue(u: Upgrade): number | string {
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

export function getUpgradeQuality(u: Upgrade): number {
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
    "sn_w_glock": -u.expire_secs!,
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
function upReady(u: Upgrade): boolean {
  return getCD(u) <= 0
}

function inRangeOrValue(val: commonTypes, range: range | commonTypes) {
  if (range === undefined) {
    return true;
  } else if (typeof range == "number" || typeof range == "boolean") {
    return val === range
  } else if (range == "undefined") {
    return val === undefined;
  } else if (typeof range == "string") {
    return val === range;
  }
  else if (range.type == "range") {
    if (typeof val == "number") {
      let match = true;
      if (val == undefined) return false
      if (range.min != undefined && val < range.min) match = false;
      if (range.max != undefined && val > range.max) match = false;
      return match;
    } else {
      return false
    }
  }
  return false
}

function matchAlias(u: Upgrade, alias: string) {
  let n = shortUpName(u.name)
  if (aliases[n] == alias) return true;
  return false
}

function filterOneUpgrade(u: Upgrade, filters: Filter[]) {
  for (const f of filters) {
    let negative = f.negative == true;

    if (f.type == "sun") {
      if (f.alias && !matchAlias(u, f.alias) !== negative) return false
      if (f.ready != undefined && ((f.ready != upReady(u)) !== negative)) return false;
      if (f.value != undefined && ((!inRangeOrValue(getUpgradeValue(u), f.value)) !== negative)) return false;
    }

    for (const k in f) {
      if (["_best", "_worst", "alias", "ready", "value", "pp", "type"].includes(k)) continue;
      const v = f[k];
      if (v != undefined && ((!inRangeOrValue(u[k], v)) !== negative)) return false;
    }
  }
  return true;
}

export function compareQuality(a: Upgrade, b: Upgrade) {
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

function filterBest(ups: Upgrade[], count: number, worst: boolean, negative: boolean): Upgrade[] {
  ups.sort(compareQuality)
  if (worst) ups.reverse()
  if (!negative) return ups.slice(0, count)
  if (negative) return ups.slice(count);
  return []
}

function performActions(up: Upgrade, actions: Action[]) {
  for (const a of actions) {
    up[a.k] = a.v
    if (a.v == "undefined") delete up[a.k]
  }
}



export function sortUpgrades(ups: Upgrade[]) {
  return ups.sort((a: Upgrade, b: Upgrade) => {
    if (a.name != b.name) return a.name.localeCompare(b.name)
    let q = compareQuality(a, b)
    if (q != 0) return q;
    if (a.tier != b.tier) return b.tier - a.tier
    if (a.rarity != b.rarity) return b.rarity - a.rarity
    if (a.loaded != b.loaded) return b.loaded ? 1 : 0;

    return 0
  })
}