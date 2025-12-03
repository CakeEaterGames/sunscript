import { compile } from "./compiler";
import { Action, commonTypes, Filter, Program, range, Rule, Upgrade } from "./types";


export const Aliases: Record<string, string> = {
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
  "r": "w4rn_er",
};



function keepMatched<T>(
  set: Set<T>,
  predicate: (value: T) => boolean
): Set<T> {
  if (set.size === 0) return new Set();

  // set.forEach(value => {
  //   if (!predicate(value)) {
  //     set.delete(value);
  //   }
  // });
  // return set;

  let res = new Set<T>
  set.forEach(value => {
    if (predicate(value)) {
      res.add(value);
    }
  });

  return res
}


let aliases: typeof Aliases


let dataset = new Set<Upgrade>()
// let dataset: Upgrade[];


export function compileAndFilter(upgrades: Array<Upgrade>, src: string) {
  return filter(upgrades, compile(src))
}

export function filter(upgrades: Array<Upgrade>, compiled: Program) {
  aliases = {}
  for (const k in Aliases) {
    aliases[k] = Aliases[k]
  }


  let filtered = new Set<Upgrade>()

  for (const stage of compiled.stages) {
    //When new stage begins we reset the context by clearing the _filtered marker
    dataset = new Set(upgrades)
    for (const u of dataset) {
      delete u._filtered;
    }
    for (const rule of stage) {
      if (rule.type == "return") {
        dataset = keepMatched(dataset, a => !a._filtered)
        // dataset = dataset.filter(a => !a._filtered)
        if (dataset.size == 0) break;
        continue;
      }
      if (rule.type == "alias") {
        aliases[rule.data.k] = rule.data.v
        continue
      }
      if (rule.type = "rule") {
        if (!rule.data) throw Error("Wtf?")
        // let ups = new Set<Upgrade>(dataset)
        // if (rule.data.filters !== undefined) {
        //   let filters = rule.data.filters
        //   ups = keepMatched(ups, a => filterOneUpgrade(a, filters))

        //   let b = filters.find(a => a._best !== undefined)
        //   let w = filters.find(a => a._worst !== undefined)

        //   // if (b && typeof b._best == "number") {
        //   //   ups = new Set(filterBest(new Array(...ups), b._best, false, b.negative === true))
        //   // } else if (w && typeof w._worst == "number") {
        //   //   ups =  new Set(filterBest(new Array(...ups), w._worst, false, w.negative === true))
        //   // }


        //   if (b && typeof b._best == "number") {
        //     ups = filterBest3(ups, b._best, false, b.negative === true)
        //   } else if (w && typeof w._worst == "number") {
        //     ups = filterBest3(ups, w._worst, false, w.negative === true)
        //   }

        // }


        let ups: Upgrade[] = []
        if (rule.data.filters !== undefined) {
          let filters = rule.data.filters
          for (const u of dataset) {
            if (!filters) {
              ups.push(u)
              continue;
            }
            if (filterOneUpgrade(u, rule.data!.filters)) {
              ups.push(u)
            }
          }

          let b = filters.find(a => a._best !== undefined)
          let w = filters.find(a => a._worst !== undefined)

          if (b && typeof b._best == "number") {
            ups = filterBest(ups, b._best, false, b.negative === true)
          } else if (w && typeof w._worst == "number") {
            ups = filterBest(ups, w._worst, true, w.negative === true)
          }
        }




        for (const u of ups) {

          filtered.add(u)

          u._filtered = true;
          if (rule.data.actions) {
            performActions(u, rule.data.actions)
          }
        }
      }
    }
  }

  //cleanup
  for (const u of upgrades) {
    delete u._filtered;
  }

  return filtered
}

function shortUpName(name: string) {
  return name.replace(/\_v\d$/gm, "").replace(/\_V\d$/gm, "")
}

export function getUpgradeValue(u: Upgrade): number | string {
  if (!u.name) return 0
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
  if (!u.name) return 0
  let n = shortUpName(u.name)
  if (n == "k3y") {
    if (!u.rarity) return 0;
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
  if (!u.name) return false
  let n = shortUpName(u.name)
  if (aliases[alias] == n) return true;
  return false
}

function filterOneUpgrade(u: Upgrade, filters: Filter[]) {
  for (const f of filters) {
    let negative = f.negative == true;

    if (f.filterType == "sun") {
      if (f.alias && !matchAlias(u, f.alias) !== negative) return false
      if (f.ready != undefined && ((f.ready != upReady(u)) !== negative)) return false;
      if (f.value != undefined && ((!inRangeOrValue(getUpgradeValue(u), f.value)) !== negative)) return false;
    }

    for (const k in f) {
      if (["_best", "_worst", "alias", "ready", "value", "next_stage", "filterType"].includes(k)) continue;
      const v = f[k];
      if (v != undefined && ((!inRangeOrValue(u[k], v)) !== negative)) return false;
    }
  }
  return true;
}

export function compareQuality(a: Upgrade, b: Upgrade) {
  if (!a.name) return 0
  if (!b.name) return 0

  let an = shortUpName(a.name)
  let bn = shortUpName(b.name)
  let aq = getUpgradeQuality(a)
  let bq = getUpgradeQuality(b)
  if (an != bn) return 0;
  if (an == 'k3y' && a.k3y != b.k3y) {
    return 0;
  }

  if (bq != aq) return bq - aq;
  if (a.sn && b.sn) return a.sn.localeCompare(b.sn)

  return 0;
}

function filterBest3(ups: Set<Upgrade>, count: number, worst: boolean, negative: boolean): Set<Upgrade> {
  const upgradesArray = Array.from(ups);

  if (upgradesArray.length <= count) {
    const result = new Set<Upgrade>();
    if (negative) {
      return result;
    } else {
      upgradesArray.forEach(up => result.add(up));
      return result;
    }
  }

  // Find top/bottom 'count' items using partial sorting
  const comparator = (a: Upgrade, b: Upgrade) => {
    const c = compareQuality(a, b);
    return worst ? -c : c;
  };

  // Quickselect algorithm to find top/bottom 'count' items
  const selected = quickSelect(upgradesArray, count, comparator);

  const result = new Set<Upgrade>();

  if (negative) {
    // Keep everything except the selected items
    const selectedSet = new Set(selected);
    upgradesArray.forEach(up => {
      if (!selectedSet.has(up)) {
        result.add(up);
      }
    });
  } else {
    // Keep only the selected items
    selected.forEach(up => result.add(up));
  }

  return result;
}
// Quickselect implementation for partial sorting
function quickSelect<T>(arr: T[], k: number, comparator: (a: T, b: T) => number): T[] {
  if (arr.length <= k) return arr;

  const result: T[] = [];
  const arrCopy = [...arr];

  while (result.length < k) {
    const pivotIndex = Math.floor(Math.random() * arrCopy.length);
    const pivot = arrCopy[pivotIndex];

    const left: T[] = [];
    const right: T[] = [];
    const equal: T[] = [];

    for (const item of arrCopy) {
      const cmp = comparator(item, pivot);
      if (cmp < 0) {
        left.push(item);
      } else if (cmp > 0) {
        right.push(item);
      } else {
        equal.push(item);
      }
    }

    // Check where our k items are
    if (result.length + left.length > k) {
      // Need to look in left partition
      arrCopy.length = 0;
      arrCopy.push(...left);
    } else if (result.length + left.length + equal.length >= k) {
      // Add left + needed from equal
      result.push(...left);
      const neededFromEqual = k - result.length;
      result.push(...equal.slice(0, neededFromEqual));
      break;
    } else {
      // Add left + all equal, continue with right
      result.push(...left, ...equal);
      arrCopy.length = 0;
      arrCopy.push(...right);
    }
  }

  return result;
}



function filterBest2(ups: Set<Upgrade>, count: number, worst: boolean, negative: boolean) {


  let newUps = new Set<Upgrade>()
  let m: Upgrade

  let iterator = ups.entries()
  for (let i = 0; i < count; i++) {
    do {
      m = iterator.next().value?.[0]!
    } while (newUps.has(m))
    if (!m) {
      break;
    }
    let best = m
    for (const u of ups) {
      let c = compareQuality(m, u);
      if (c != 0 && (c > 0 !== worst)) {
        best = u;
      }
    }
    newUps.add(best)
  }

  ups.forEach(a => {
    if (newUps.has(a) !== negative) ups.delete(a)
  })

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
    if (a.name !== undefined && b.name !== undefined && a.name != b.name) return a.name.localeCompare(b.name)
    let q = compareQuality(a, b)
    if (q != 0) return q;
    if (a.tier !== undefined && b.tier !== undefined && a.tier != b.tier) return b.tier - a.tier
    if (a.rarity !== undefined && b.rarity !== undefined && a.rarity != b.rarity) return b.rarity - a.rarity
    if (a.loaded !== undefined && b.loaded !== undefined && a.loaded != b.loaded) return b.loaded ? 1 : 0;

    return 0
  })
}



