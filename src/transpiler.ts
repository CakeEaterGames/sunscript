import { filterBest, sortUpgrades } from "./filter";
import { Action, Alias, Filter, LUNFilter, Program, range, Rule, Stage, SUNFilter } from "./types";

export namespace Transpiler {


  export function transpile(program: Program) {
    let a = tprogram(program);
    console.log(a);
    return a;
  }

  function tprogram(program: Program, golf = true): string {
    let stages = []
    for (const stage of program.stages) {
      stages.push(tstage(stage))
    }
    let res = `
function filter(ups){
const t = true;
${filterBest.toString()}
let original = ups
SUN.sortUpgrades(original)
let a = {}
for (const k in SUN.Aliases) {
  a[k] = SUN.Aliases[k]
}
${stages.join(betweenStages())}
}
`
    if (golf) {
      res = res.replace(/\_filtered/gm, "_")
      res = res.replace(/\btrue\b/gm, "t")
    }
    return res;
  }

  function tstage(stage: Stage): string {
    let res = ""
    res = `cur = original\n`

    for (const r of stage) {
      switch (r.type) {
        case "rule": res += trule(r.data); break;
        case "alias": res += talias(r.data); break;
        case "return": res += treturn(); break;
      }
    }

    return res;
  }

  function betweenStages(): string {
    return `for (let u of cur) delete u._filtered\n\n`
  }

  function treturn(): string {
    return `cur = cur.filter(u=>!u._filtered)\n`;
  }

  function talias(alias: Alias): string {
    return `a.${alias.k} = "${alias.v}"\n`
  }

  function trule(rule: Rule): string {
    let res = ""

    let conds = []
    let acts = []
    for (const f of rule.filters || []) {
      conds.push(tfilter(f))
    }
    for (const a of rule.actions || []) {
      acts.push(taction(a))
    }
    acts.push("u._filtered = true")
    let actions = acts.join("\n")

    let conditions = conds.filter(a => a.trim()).join(" && ")
    let best = rule.filters?.find(a => a._best)
    let worst = rule.filters?.find(a => a._worst)
    let v, neg;
    if (best) {
      v = best._best;
      neg = !!best.negative
    }
    if (worst) {
      v = worst._worst;
      neg = !!worst.negative
    }
    if (!conditions.trim()) {
      conditions = "true"
    }
    let joined;
    if (best || worst) {
      joined = `filterBest(cur.filter(u=>${conditions}),${v},${!!worst},${neg})`
    } else {
      joined = `cur.filter(u=>${conditions})`
    }

    return `for (const u of ${joined}){\n${actions}\n}\n`
  }

  function tfilter(filter: Filter): string {
    let conds = []
    switch (filter.filterType) {
      case "sun": conds.push(tSUN(filter)); break;
      case "lun": conds.push(tLUN(filter)); break;
    }
    return conds.filter(a => a.trim()).join(" && ")
  }
  function taction(action: Action): string {
    let res = ""
    if (action.v == "undefined" || action.v == undefined) {
      return `delete u.${action.k}`
    }
    if (typeof action.v == "string") {
      return `u.${action.k} = "${action.v}"`
    }
    return `u.${action.k} = ${action.v}`
  }
  function tSUN(sun: SUNFilter): string {

    let lun = {} as LUNFilter

    lun.negative = sun.negative;
    sun.filterType
    if (sun.alias) lun.alias = sun.alias
    if (sun.tier) lun.tier = sun.tier
    if (sun.rarity) lun.rarity = sun.rarity
    if (sun.loaded !== undefined) lun.loaded = sun.loaded
    if (sun.value) lun._value = sun.value
    if (sun.ready) lun._ready = sun.ready
    if (sun.negative) lun.negative = sun.negative

    return tLUN(lun)
  }
  function tLUN(lun: LUNFilter): string {
    let res = ""
    let conds = []
    for (let f in lun) {
      if (f == "filterType") continue;
      if (f == "negative") continue;


      let neg = lun.negative ? "!" : ""
      let left = "u." + f
      let right = ""

      if (f == "alias") {
        left = `u._short`
        right = `==aliases.${lun[f]}`
      } else if (f == "_best") {
        continue;
      } else if (f == "_worst") {
        continue;
      } else if (lun[f] === "undefined") {
        right = ""
        neg += "!"
      } else if (lun[f] === true) {
        right = ""
      } else {
        if (typeof lun[f] == "string") {
          right = `=="${lun[f]}"`
        } else if (lun[f] && (lun[f] as range).type === "range") {
          left = ""
          right = ""
          let r2 = lun[f] as range
          if (r2.min != undefined) {
            right += `u.${f} >= ${r2.min}`
          }
          if (r2.max != undefined) {
            if (right) right += " && "
            right += `u.${f} <= ${r2.max}`
          }
        } else {
          right = `==${lun[f]}`
        }
      }
      if (neg) {
        conds.push(`${neg}(${left}${right})`)
      } else {
        conds.push(`${left}${right}`)
      }

    }
    return conds.filter(a => a.trim()).join(" && ")
    return res;
  }
}