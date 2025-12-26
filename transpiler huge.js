
function filter(ups) {
  const t = true;
  const f = false;
  function b(ups, count, worst, negative) {
    if (worst && negative) {
      return ups.slice(0, ups.length - count);
    } else if (worst && !negative) {
      return ups.slice(ups.length - count);
    } else if (!worst && negative) {
      return ups.slice(count);
    } else if (!worst && !negative) {
      return ups.slice(0, count);
    }
    return [];
  }
  function l(ups,filter){
    return ups.filter(filter)
  }
  let original = ups
  SUN.sortUpgrades(original)
  let a = {}
  for (const k in SUN.Aliases) {
    a[k] = SUN.Aliases[k]
  }
  c = original
  a.S = "ez_21"
  for (const u of c.filter(u => u._short == aliases.S && u.tier == 1)) {
    u.snack = t
    u._ = t
  }
  a.S = "ez_35"
  for (const u of c.filter(u => u._short == aliases.S && u.tier == 1)) {
    u.snack = t
    u._ = t
  }
  a.S = "c001"
  for (const u of c.filter(u => u._short == aliases.S && u.tier == 1)) {
    u.snack = t
    u._ = t
  }
  a.S = "char_count"
  for (const u of c.filter(u => u._short == aliases.S && u.tier == 1)) {
    u.snack = t
    u._ = t
  }
  a.S = "channel_count"
  for (const u of c.filter(u => u._short == aliases.S && u.tier == 1)) {
    u.snack = t
    u._ = t
  }
  a.S = "expose_access_log"
  for (const u of c.filter(u => u._short == aliases.S && u.tier == 1)) {
    u.snack = t
    u._ = t
  }
  for (const u of b(c.filter(u => u.snack), 128, f, f)) {
    u.keep = t
    u._ = t
  }
  for (let u of c) delete u._

  c = original
  a.x = "CON_TELL"
  for (const u of b(c.filter(u => u._short == aliases.x && u.loaded == f), 20, f, f)) {
    u.keep = t
    u._ = t
  }
  c = c.filter(u => !u._)
  for (const u of c.filter(u => u._short == aliases.x && u.loaded == f && !(u.keep))) {
    u.cull = t
    u._ = t
  }
  c = c.filter(u => !u._)
  a.x = "CON_SPEC"
  for (const u of b(c.filter(u => u._short == aliases.x && u.loaded == f), 20, f, f)) {
    u.keep = t
    u._ = t
  }
  c = c.filter(u => !u._)
  a.x = "acct_nt"
  for (const u of b(c.filter(u => u._short == aliases.x && u.loaded == f), 20, f, f)) {
    u.keep = t
    u._ = t
  }
  c = c.filter(u => !u._)
  a.x = "sn_w_glock"
  for (const u of b(c.filter(u => u._short == aliases.x && u.loaded == f), 20, f, f)) {
    u.keep = t
    u._ = t
  }
  c = c.filter(u => !u._)
  a.x = "magnara"
  for (const u of b(c.filter(u => u._short == aliases.x && u.loaded == f), 20, f, f)) {
    u.keep = t
    u._ = t
  }
  c = c.filter(u => !u._)
  a.x = "char_count"
  for (const u of b(c.filter(u => u._short == aliases.x && u.tier == 2 && u.loaded == f), 30, f, f)) {
    u.keep = t
    u._ = t
  }
  c = c.filter(u => !u._)
  for (const u of b(c.filter(u => u._short == aliases.x && u.tier == 3 && u.loaded == f), 30, f, f)) {
    u.keep = t
    u._ = t
  }
  c = c.filter(u => !u._)
  a.x = "public_script"
  for (const u of b(c.filter(u => u._short == aliases.x && u.tier == 2 && u.loaded == f), 20, f, f)) {
    u.keep = t
    u._ = t
  }
  c = c.filter(u => !u._)
  for (const u of b(c.filter(u => u._short == aliases.x && u.tier == 3 && u.loaded == f), 20, f, f)) {
    u.keep = t
    u._ = t
  }
  c = c.filter(u => !u._)
  a.x = "script_slot"
  for (const u of b(c.filter(u => u._short == aliases.x && u.tier == 2 && u.loaded == f), 20, f, f)) {
    u.keep = t
    u._ = t
  }
  c = c.filter(u => !u._)
  for (const u of b(c.filter(u => u._short == aliases.x && u.tier == 3 && u.loaded == f), 20, f, f)) {
    u.keep = t
    u._ = t
  }
  c = c.filter(u => !u._)
  a.x = "channel_count"
  for (const u of b(c.filter(u => u._short == aliases.x && u.loaded == f), 20, f, f)) {
    u.keep = t
    u._ = t
  }
  c = c.filter(u => !u._)
  a.x = "balance"
  for (const u of b(c.filter(u => u._short == aliases.x && u.loaded == f), 20, f, f)) {
    u.keep = t
    u._ = t
  }
  c = c.filter(u => !u._)
  a.x = "log_writer"
  for (const u of b(c.filter(u => u._short == aliases.x && u.loaded == f), 20, f, f)) {
    u.keep = t
    u._ = t
  }
  c = c.filter(u => !u._)
  a.x = "expose_access_log"
  for (const u of b(c.filter(u => u._short == aliases.x && u.loaded == f), 20, f, f)) {
    u.keep = t
    u._ = t
  }
  c = c.filter(u => !u._)
  a.x = "expose_upgrade_log"
  for (const u of b(c.filter(u => u._short == aliases.x && u.loaded == f), 20, f, f)) {
    u.keep = t
    u._ = t
  }
  c = c.filter(u => !u._)
  a.x = "expose_upgrades"
  for (const u of b(c.filter(u => u._short == aliases.x && u.loaded == f), 20, f, f)) {
    u.keep = t
    u._ = t
  }
  c = c.filter(u => !u._)
  a.x = "transactions"
  for (const u of b(c.filter(u => u._short == aliases.x && u.loaded == f), 20, f, f)) {
    u.keep = t
    u._ = t
  }
  c = c.filter(u => !u._)
  a.x = "transfer_upgrade"
  for (const u of b(c.filter(u => u._short == aliases.x && u.loaded == f), 20, f, f)) {
    u.keep = t
    u._ = t
  }
  c = c.filter(u => !u._)
  a.x = "transfer"
  for (const u of b(c.filter(u => u._short == aliases.x && u.loaded == f), 20, f, f)) {
    u.keep = t
    u._ = t
  }
  c = c.filter(u => !u._)
  a.x = "w4rn_message"
  for (const u of b(c.filter(u => u._short == aliases.x && u.loaded == f), 5, f, f)) {
    u.keep = t
    u._ = t
  }
  c = c.filter(u => !u._)
  for (const u of c.filter(u => u._short == aliases.x && u.loaded == f && !(u.keep))) {
    u.cull = t
    u._ = t
  }
  c = c.filter(u => !u._)
  a.x = "DATA_CHECK"
  for (const u of b(c.filter(u => u._short == aliases.x && u.loaded == f), 20, f, f)) {
    u.keep = t
    u._ = t
  }
  c = c.filter(u => !u._)
  a.x = "l0cket"
  for (const u of c.filter(u => u._short == aliases.x && u.loaded == f)) {
    u.cull = t
    u._ = t
  }
  c = c.filter(u => !u._)
  a.x = "l0ckbox"
  for (const u of b(c.filter(u => u._short == aliases.x && u.loaded == f), 20, f, f)) {
    u.keep = t
    u._ = t
  }
  c = c.filter(u => !u._)
  a.x = "cron_bot"
  for (const u of b(c.filter(u => u._short == aliases.x && u.tier == 2 && u.loaded == f), 20, f, f)) {
    u.keep = t
    u._ = t
  }
  c = c.filter(u => !u._)
  for (const u of b(c.filter(u => u._short == aliases.x && u.tier == 3 && u.loaded == f), 20, f, f)) {
    u.keep = t
    u._ = t
  }
  c = c.filter(u => !u._)
  a.x = "sn_w_usac"
  for (const u of b(c.filter(u => u._short == aliases.x && u.loaded == f), 20, f, f)) {
    u.keep = t
    u._ = t
  }
  c = c.filter(u => !u._)
  a.x = "shfflr"
  for (const u of b(c.filter(u => u._short == aliases.x && u.loaded == f), 20, f, f)) {
    u.keep = t
    u._ = t
  }
  c = c.filter(u => !u._)
  a.x = "l0g_wr1t3r"
  for (const u of b(c.filter(u => u._short == aliases.x && u.loaded == f), 20, f, f)) {
    u.keep = t
    u._ = t
  }
  c = c.filter(u => !u._)
  a.x = "l0ckjaw"
  for (const u of b(c.filter(u => u._short == aliases.x && u.loaded == f), 20, f, f)) {
    u.keep = t
    u._ = t
  }
  c = c.filter(u => !u._)
  for (const u of c.filter(u => u.loaded)) {
    u.keep = t
    u._ = t
  }
  c = c.filter(u => !u._)
  for (let u of c) delete u._

  c = original
  a.k = "k3y"
  for (const u of c.filter(u => !(u.k3y))) {
    u._ = t
  }
  c = c.filter(u => !u._)
  for (const u of b(c.filter(u => u._short == aliases.k && u.loaded == f && u._value == "vc2c7q" && u.rarity >= 0 && u.rarity <= 1), 5, f, f)) {
    u.original = t
    u._ = t
  }
  for (const u of b(c.filter(u => u._short == aliases.k && u.loaded == f && u._value == "tvfkyq" && u.rarity >= 0 && u.rarity <= 1), 5, f, f)) {
    u.original = t
    u._ = t
  }
  for (const u of b(c.filter(u => u._short == aliases.k && u.loaded == f && u._value == "xwz7ja" && u.rarity >= 0 && u.rarity <= 1), 5, f, f)) {
    u.original = t
    u._ = t
  }
  for (const u of b(c.filter(u => u._short == aliases.k && u.loaded == f && u._value == "uphlaw" && u.rarity >= 0 && u.rarity <= 1), 5, f, f)) {
    u.original = t
    u._ = t
  }
  for (const u of b(c.filter(u => u._short == aliases.k && u.loaded == f && u._value == "sa23uw" && u.rarity >= 0 && u.rarity <= 1), 5, f, f)) {
    u.original = t
    u._ = t
  }
  for (const u of b(c.filter(u => u._short == aliases.k && u.loaded == f && u._value == "72umy0" && u.rarity >= 0 && u.rarity <= 1), 5, f, f)) {
    u.original = t
    u._ = t
  }
  for (const u of b(c.filter(u => u._short == aliases.k && u.loaded == f && u._value == "cmppiq" && u.rarity >= 0 && u.rarity <= 1), 5, f, f)) {
    u.original = t
    u._ = t
  }
  for (const u of b(c.filter(u => u._short == aliases.k && u.loaded == f && u._value == "i874y3" && u.rarity >= 0 && u.rarity <= 1), 5, f, f)) {
    u.original = t
    u._ = t
  }
  for (const u of b(c.filter(u => u._short == aliases.k && u.loaded == f && u._value == "eoq6de" && u.rarity >= 0 && u.rarity <= 1), 5, f, f)) {
    u.original = t
    u._ = t
  }
  for (const u of b(c.filter(u => u._short == aliases.k && u.loaded == f && u._value == "9p65cu" && u.rarity >= 0 && u.rarity <= 1), 5, f, f)) {
    u.original = t
    u._ = t
  }
  for (const u of b(c.filter(u => u._short == aliases.k && u.loaded == f && u._value == "6hh8xw" && u.rarity >= 0 && u.rarity <= 1), 5, f, f)) {
    u.original = t
    u._ = t
  }
  for (const u of b(c.filter(u => u._short == aliases.k && u.loaded == f && u._value == "pmvr1q" && u.rarity >= 0 && u.rarity <= 1), 5, f, f)) {
    u.original = t
    u._ = t
  }
  for (const u of b(c.filter(u => u._short == aliases.k && u.loaded == f && u._value == "fr8ibu" && u.rarity >= 0 && u.rarity <= 1), 5, f, f)) {
    u.original = t
    u._ = t
  }
  for (const u of b(c.filter(u => u._short == aliases.k && u.loaded == f && u._value == "ellux0" && u.rarity >= 0 && u.rarity <= 1), 5, f, f)) {
    u.original = t
    u._ = t
  }
  for (const u of b(c.filter(u => u._short == aliases.k && u.loaded == f && u._value == "xfnkqe" && u.rarity >= 0 && u.rarity <= 1), 5, f, f)) {
    u.original = t
    u._ = t
  }
  for (const u of b(c.filter(u => u._short == aliases.k && u.loaded == f && u._value == "y111qa" && u.rarity >= 0 && u.rarity <= 1), 5, f, f)) {
    u.original = t
    u._ = t
  }
  for (const u of b(c.filter(u => u._short == aliases.k && u.loaded == f && u._value == "hc3b69" && u.rarity >= 0 && u.rarity <= 1), 5, f, f)) {
    u.original = t
    u._ = t
  }
  for (const u of b(c.filter(u => u._short == aliases.k && u.loaded == f && u._value == "5c7e1r" && u.rarity >= 0 && u.rarity <= 1), 5, f, f)) {
    u.original = t
    u._ = t
  }
  for (const u of b(c.filter(u => u._short == aliases.k && u.loaded == f && u._value == "4jitu5" && u.rarity >= 0 && u.rarity <= 1), 5, f, f)) {
    u.original = t
    u._ = t
  }
  for (const u of b(c.filter(u => u._short == aliases.k && u.loaded == f && u._value == "lq09tg" && u.rarity >= 0 && u.rarity <= 1), 5, f, f)) {
    u.original = t
    u._ = t
  }
  for (const u of b(c.filter(u => u._short == aliases.k && u.loaded == f && u._value == "vthf6e" && u.rarity >= 0 && u.rarity <= 1), 5, f, f)) {
    u.original = t
    u._ = t
  }
  for (const u of b(c.filter(u => u._short == aliases.k && u.loaded == f && u._value == "nfijix" && u.rarity >= 0 && u.rarity <= 1), 5, f, f)) {
    u.original = t
    u._ = t
  }
  for (const u of b(c.filter(u => u._short == aliases.k && u.loaded == f && u._value == "nyi5u2" && u.rarity >= 0 && u.rarity <= 1), 5, f, f)) {
    u.original = t
    u._ = t
  }
  for (const u of b(c.filter(u => u._short == aliases.k && u.loaded == f && u._value == "voon2h" && u.rarity >= 0 && u.rarity <= 1), 5, f, f)) {
    u.original = t
    u._ = t
  }
  for (const u of b(c.filter(u => u._short == aliases.k && u.loaded == f && u._value == "j1aa4n" && u.rarity >= 0 && u.rarity <= 1), 5, f, f)) {
    u.original = t
    u._ = t
  }
  for (const u of b(c.filter(u => u._short == aliases.k && u.loaded == f && u._value == "d9j270" && u.rarity >= 0 && u.rarity <= 1), 5, f, f)) {
    u.original = t
    u._ = t
  }
  for (const u of b(c.filter(u => u._short == aliases.k && u.loaded == f && u._value == "vzdt6m" && u.rarity >= 0 && u.rarity <= 1), 5, f, f)) {
    u.original = t
    u._ = t
  }
  for (const u of b(c.filter(u => u._short == aliases.k && u.loaded == f && u._value == "cy70mo" && u.rarity >= 0 && u.rarity <= 1), 5, f, f)) {
    u.original = t
    u._ = t
  }
  for (const u of b(c.filter(u => u._short == aliases.k && u.loaded == f && u._value == "8izsag" && u.rarity >= 0 && u.rarity <= 1), 5, f, f)) {
    u.original = t
    u._ = t
  }
  for (const u of b(c.filter(u => u._short == aliases.k && u.loaded == f && u._value == "hzqgw6" && u.rarity >= 0 && u.rarity <= 1), 5, f, f)) {
    u.original = t
    u._ = t
  }
  for (const u of b(c.filter(u => u._short == aliases.k && u.loaded == f && u._value == "qvgtnt" && u.rarity >= 0 && u.rarity <= 1), 5, f, f)) {
    u.original = t
    u._ = t
  }
  for (const u of b(c.filter(u => u._short == aliases.k && u.loaded == f && u._value == "ooilt2" && u.rarity >= 0 && u.rarity <= 1), 5, f, f)) {
    u.original = t
    u._ = t
  }
  for (const u of b(c.filter(u => u._short == aliases.k && u.loaded == f && u._value == "afgny5" && u.rarity >= 0 && u.rarity <= 1), 5, f, f)) {
    u.original = t
    u._ = t
  }
  for (const u of b(c.filter(u => u._short == aliases.k && u.loaded == f && u._value == "54r1cg" && u.rarity >= 0 && u.rarity <= 1), 5, f, f)) {
    u.original = t
    u._ = t
  }
  for (const u of b(c.filter(u => u._short == aliases.k && u.loaded == f && u._value == "dwwf3w" && u.rarity >= 0 && u.rarity <= 1), 5, f, f)) {
    u.original = t
    u._ = t
  }
  for (const u of b(c.filter(u => u._short == aliases.k && u.loaded == f && u._value == "7oxb1b" && u.rarity >= 0 && u.rarity <= 1), 5, f, f)) {
    u.original = t
    u._ = t
  }
  for (const u of c.filter(u => u._short == aliases.k && u.rarity >= 2)) {
    u.original = t
    u._ = t
  }
  for (const u of c.filter(u => u._short == aliases.k && u.rarity >= 0 && u.rarity <= 1 && !(u.original))) {
    u.material = t
    u._ = t
  }
  for (const u of b(c.filter(u => u._short == aliases.k && u.tier == 1 && u.material), 50, f, t)) {
    u.extra = t
    u._ = t
  }
  for (const u of b(c.filter(u => u._short == aliases.k && u.tier == 1 && u.rarity == 1 && u.material), 50, f, t)) {
    u.extra = t
    u._ = t
  }
  for (const u of b(c.filter(u => u._short == aliases.k && u.tier == 2 && u.material), 50, f, t)) {
    u.extra = t
    u._ = t
  }
  for (const u of b(c.filter(u => u._short == aliases.k && u.tier == 2 && u.rarity == 1 && u.material), 50, f, t)) {
    u.extra = t
    u._ = t
  }
  for (const u of b(c.filter(u => u._short == aliases.k && u.tier == 3 && u.material), 50, f, t)) {
    u.extra = t
    u._ = t
  }
  for (const u of b(c.filter(u => u._short == aliases.k && u.tier == 3 && u.rarity == 1 && u.material), 50, f, t)) {
    u.extra = t
    u._ = t
  }
  for (const u of b(c.filter(u => u._short == aliases.k && u._value == "lq09tg" && u.rarity >= 2), 10, f, t)) {
    u.extra = t
    u._ = t
  }
  for (const u of b(c.filter(u => u._short == aliases.k && u._value == "voon2h" && u.rarity >= 2), 10, f, t)) {
    u.extra = t
    u._ = t
  }
  for (const u of b(c.filter(u => u._short == aliases.k && u._value == "72umy0" && u.rarity >= 2), 10, f, t)) {
    u.extra = t
    u._ = t
  }
  for (const u of b(c.filter(u => u._short == aliases.k && u._value == "eoq6de" && u.rarity >= 2), 10, f, t)) {
    u.extra = t
    u._ = t
  }
  for (const u of b(c.filter(u => u._short == aliases.k && u._value == "fr8ibu" && u.rarity >= 2), 10, f, t)) {
    u.extra = t
    u._ = t
  }
  for (const u of b(c.filter(u => u._short == aliases.k && u._value == "nyi5u2" && u.rarity >= 2), 10, f, t)) {
    u.extra = t
    u._ = t
  }
  for (const u of b(c.filter(u => u._short == aliases.k && u._value == "j1aa4n" && u.rarity >= 2), 10, f, t)) {
    u.extra = t
    u._ = t
  }
  for (const u of b(c.filter(u => u._short == aliases.k && u._value == "d9j270" && u.rarity >= 2), 10, f, t)) {
    u.extra = t
    u._ = t
  }
  for (const u of b(c.filter(u => u._short == aliases.k && u._value == "vzdt6m" && u.rarity >= 2), 10, f, t)) {
    u.extra = t
    u._ = t
  }
  for (const u of c.filter(u => u._short == aliases.k && u.original && u.extra)) {
    delete u.original
    u._ = t
  }
  for (const u of c.filter(u => u._short == aliases.k && u.material && u.extra)) {
    delete u.material
    u._ = t
  }
  for (const u of c.filter(u => u._short == aliases.k && u.original)) {
    u.keep = t
    u._ = t
  }
  for (const u of c.filter(u => u._short == aliases.k && u.material)) {
    u.keep = t
    u._ = t
  }
  for (const u of c.filter(u => u._short == aliases.k && u.extra)) {
    u.sell = t
    u._ = t
  }
  for (let u of c) delete u._

  c = original
  for (const u of c.filter(u => u.tier == 1 && !(u.name == "k3y") && !(u.snack))) {
    u.price = "0GC"
    u._ = t
  }
  c = c.filter(u => !u._)
  a.x = "acct_nt"
  for (const u of c.filter(u => u._short == aliases.x && u._value >= 12)) {
    u.price = "100BGC"
    u.barter = t
    u._ = t
  }
  c = c.filter(u => !u._)
  for (const u of c.filter(u => u._short == aliases.x && u._value >= 11)) {
    u.price = "10BGC"
    u.barter = t
    u._ = t
  }
  c = c.filter(u => !u._)
  for (const u of c.filter(u => u._short == aliases.x && u._value >= 10)) {
    u.price = "1BGC"
    u.barter = t
    u._ = t
  }
  c = c.filter(u => !u._)
  for (const u of c.filter(u => u._short == aliases.x && u._value >= 9)) {
    u.price = "100MGC"
    u._ = t
  }
  c = c.filter(u => !u._)
  for (const u of c.filter(u => u._short == aliases.x && u._value >= 8)) {
    u.price = "10MGC"
    u._ = t
  }
  c = c.filter(u => !u._)
  for (const u of c.filter(u => u._short == aliases.x)) {
    u.price = "0GC"
    u._ = t
  }
  c = c.filter(u => !u._)
  a.x = "l0ckbox"
  for (const u of c.filter(u => u._short == aliases.x && u._value >= 27)) {
    u.price = "100BGC"
    u.barter = t
    u._ = t
  }
  c = c.filter(u => !u._)
  for (const u of c.filter(u => u._short == aliases.x && u._value >= 26)) {
    u.price = "100MGC"
    u._ = t
  }
  c = c.filter(u => !u._)
  for (const u of c.filter(u => u._short == aliases.x && u._value >= 25)) {
    u.price = "10MGC"
    u._ = t
  }
  c = c.filter(u => !u._)
  for (const u of c.filter(u => u._short == aliases.x)) {
    u.price = "0GC"
    u._ = t
  }
  c = c.filter(u => !u._)
  a.x = "magnara"
  for (const u of c.filter(u => u._short == aliases.x && u._value >= 9)) {
    u.price = "500BGC"
    u.barter = t
    u._ = t
  }
  c = c.filter(u => !u._)
  for (const u of c.filter(u => u._short == aliases.x && u._value >= 8)) {
    u.price = "10BGC"
    u.barter = t
    u._ = t
  }
  c = c.filter(u => !u._)
  for (const u of c.filter(u => u._short == aliases.x && u._value >= 7)) {
    u.price = "10MGC"
    u._ = t
  }
  c = c.filter(u => !u._)
  for (const u of c.filter(u => u._short == aliases.x)) {
    u.price = "0GC"
    u._ = t
  }
  c = c.filter(u => !u._)
  a.x = "sn_w_glock"
  for (const u of c.filter(u => u._short == aliases.x && u._value <= 40)) {
    u.price = "100BGC"
    u.barter = t
    u._ = t
  }
  c = c.filter(u => !u._)
  for (const u of c.filter(u => u._short == aliases.x && u._value <= 50)) {
    u.price = "10BGC"
    u.barter = t
    u._ = t
  }
  c = c.filter(u => !u._)
  for (const u of c.filter(u => u._short == aliases.x && u._value <= 60)) {
    u.price = "1BGC"
    u.barter = t
    u._ = t
  }
  c = c.filter(u => !u._)
  for (const u of c.filter(u => u._short == aliases.x && u._value <= 80)) {
    u.price = "100MGC"
    u._ = t
  }
  c = c.filter(u => !u._)
  for (const u of c.filter(u => u._short == aliases.x && u._value <= 100)) {
    u.price = "10MGC"
    u._ = t
  }
  c = c.filter(u => !u._)
  for (const u of c.filter(u => u._short == aliases.x)) {
    u.price = "0GC"
    u._ = t
  }
  c = c.filter(u => !u._)
  a.x = "CON_SPEC"
  for (const u of c.filter(u => u._short == aliases.x && u.rarity == 3)) {
    u.price = "10MGC"
    u._ = t
  }
  c = c.filter(u => !u._)
  for (const u of c.filter(u => u._short == aliases.x)) {
    u.price = "0GC"
    u._ = t
  }
  c = c.filter(u => !u._)
  a.x = "l0ckjaw"
  for (const u of c.filter(u => u._short == aliases.x && u._value >= 36)) {
    u.price = "100BGC"
    u.barter = t
    u._ = t
  }
  c = c.filter(u => !u._)
  for (const u of c.filter(u => u._short == aliases.x && u._value >= 37)) {
    u.price = "2BGC"
    u._ = t
  }
  c = c.filter(u => !u._)
  for (const u of c.filter(u => u._short == aliases.x)) {
    u.price = "0GC"
    u._ = t
  }
  c = c.filter(u => !u._)
  a.x = "l0g_wr1t3r"
  for (const u of c.filter(u => u._short == aliases.x && u._value >= 4)) {
    u.price = "1TGC"
    u.barter = t
    u._ = t
  }
  c = c.filter(u => !u._)
  for (const u of c.filter(u => u._short == aliases.x && u._value >= 3)) {
    u.price = "250BGC"
    u.barter = t
    u._ = t
  }
  c = c.filter(u => !u._)
  for (const u of c.filter(u => u._short == aliases.x && u._value >= 2)) {
    u.price = "50BGC"
    u.barter = t
    u._ = t
  }
  c = c.filter(u => !u._)
  for (const u of c.filter(u => u._short == aliases.x && u._value >= 1)) {
    u.price = "2BGC"
    u._ = t
  }
  c = c.filter(u => !u._)
  for (const u of c.filter(u => u._short == aliases.x)) {
    u.price = "0GC"
    u._ = t
  }
  c = c.filter(u => !u._)
  a.x = "sn_w_usac"
  for (const u of c.filter(u => u._short == aliases.x)) {
    u.price = "2BGC"
    u._ = t
  }
  c = c.filter(u => !u._)
  for (const u of c.filter(u => u._short == aliases.x)) {
    u.price = "0GC"
    u._ = t
  }
  c = c.filter(u => !u._)
  a.x = "shfflr"
  for (const u of c.filter(u => u._short == aliases.x && u._value >= 7)) {
    u.price = "80BGC"
    u.barter = t
    u._ = t
  }
  c = c.filter(u => !u._)
  for (const u of c.filter(u => u._short == aliases.x && u._value == 6)) {
    u.price = "40BGC"
    u.barter = t
    u._ = t
  }
  c = c.filter(u => !u._)
  for (const u of c.filter(u => u._short == aliases.x && u._value == 5)) {
    u.price = "20BGC"
    u.barter = t
    u._ = t
  }
  c = c.filter(u => !u._)
  for (const u of c.filter(u => u._short == aliases.x && u._value == 4)) {
    u.price = "10BGC"
    u.barter = t
    u._ = t
  }
  c = c.filter(u => !u._)
  for (const u of c.filter(u => u._short == aliases.x && u._value == 3)) {
    u.price = "5BGC"
    u._ = t
  }
  c = c.filter(u => !u._)
  for (const u of c.filter(u => u._short == aliases.x && u._value == 2)) {
    u.price = "2BGC"
    u._ = t
  }
  c = c.filter(u => !u._)
  for (const u of c.filter(u => u._short == aliases.x)) {
    u.price = "0GC"
    u._ = t
  }
  c = c.filter(u => !u._)
  a.x = "DATA_CHECK"
  for (const u of c.filter(u => u._short == aliases.x && u.tier == 4 && u.rarity >= 2)) {
    u.price = "1TGC"
    u.barter = t
    u._ = t
  }
  c = c.filter(u => !u._)
  for (const u of c.filter(u => u._short == aliases.x && u.tier == 4)) {
    u.price = "500BGC"
    u._ = t
  }
  c = c.filter(u => !u._)
  for (const u of c.filter(u => u._short == aliases.x)) {
    u.price = "0GC"
    u._ = t
  }
  c = c.filter(u => !u._)
  a.x = "cron_bot"
  for (const u of c.filter(u => u._short == aliases.x && u.tier == 2 && u._value <= 300)) {
    u.price = "1TMGC"
    u.barter = t
    u._ = t
  }
  c = c.filter(u => !u._)
  for (const u of c.filter(u => u._short == aliases.x && u.tier == 2 && u._value <= 400)) {
    u.price = "500BGC"
    u.barter = t
    u._ = t
  }
  c = c.filter(u => !u._)
  for (const u of c.filter(u => u._short == aliases.x && u.tier == 2 && u._value <= 500)) {
    u.price = "100BGC"
    u.barter = t
    u._ = t
  }
  c = c.filter(u => !u._)
  for (const u of c.filter(u => u._short == aliases.x && u.tier == 2 && u._value <= 600)) {
    u.price = "10BGC"
    u.barter = t
    u._ = t
  }
  c = c.filter(u => !u._)
  for (const u of c.filter(u => u._short == aliases.x && u.tier == 2 && u._value <= 700)) {
    u.price = "1BGC"
    u._ = t
  }
  c = c.filter(u => !u._)
  for (const u of c.filter(u => u._short == aliases.x && u.tier == 2 && u._value <= 800)) {
    u.price = "100MGC"
    u._ = t
  }
  c = c.filter(u => !u._)
  for (const u of c.filter(u => u._short == aliases.x && u.tier == 2 && u._value <= 900)) {
    u.price = "10MGC"
    u._ = t
  }
  c = c.filter(u => !u._)
  for (const u of c.filter(u => u._short == aliases.x && u.tier == 3)) {
    u.price = "2BGC"
    u._ = t
  }
  c = c.filter(u => !u._)
  for (const u of c.filter(u => u._short == aliases.x)) {
    u.price = "0GC"
    u._ = t
  }
  c = c.filter(u => !u._)
  a.x = "char_count"
  for (const u of c.filter(u => u._short == aliases.x && u.tier == 2 && u._value >= 1900)) {
    u.price = "500BGC"
    u.barter = t
    u._ = t
  }
  c = c.filter(u => !u._)
  for (const u of c.filter(u => u._short == aliases.x && u.tier == 2 && u._value >= 1800)) {
    u.price = "100BGC"
    u.barter = t
    u._ = t
  }
  c = c.filter(u => !u._)
  for (const u of c.filter(u => u._short == aliases.x && u.tier == 2 && u._value >= 1700)) {
    u.price = "50BGC"
    u.barter = t
    u._ = t
  }
  c = c.filter(u => !u._)
  for (const u of c.filter(u => u._short == aliases.x && u.tier == 2 && u._value >= 1600)) {
    u.price = "5BGC"
    u._ = t
  }
  c = c.filter(u => !u._)
  for (const u of c.filter(u => u._short == aliases.x && u.tier == 2 && u._value >= 1500)) {
    u.price = "500MGC"
    u._ = t
  }
  c = c.filter(u => !u._)
  for (const u of c.filter(u => u._short == aliases.x && u.tier == 2 && u._value >= 1400)) {
    u.price = "50MGC"
    u._ = t
  }
  c = c.filter(u => !u._)
  for (const u of c.filter(u => u._short == aliases.x && u.tier == 3 && u._value >= 1200)) {
    u.price = "2BGC"
    u._ = t
  }
  c = c.filter(u => !u._)
  for (const u of c.filter(u => u._short == aliases.x)) {
    u.price = "0GC"
    u._ = t
  }
  c = c.filter(u => !u._)
  a.x = "script_slot"
  for (const u of c.filter(u => u._short == aliases.x && u._value >= 6)) {
    u.price = "1TGC"
    u.barter = t
    u._ = t
  }
  c = c.filter(u => !u._)
  for (const u of c.filter(u => u._short == aliases.x && u._value == 5)) {
    u.price = "100BGC"
    u.barter = t
    u._ = t
  }
  c = c.filter(u => !u._)
  for (const u of c.filter(u => u._short == aliases.x && u._value == 4)) {
    u.price = "10BGC"
    u.barter = t
    u._ = t
  }
  c = c.filter(u => !u._)
  for (const u of c.filter(u => u._short == aliases.x && u._value == 3)) {
    u.price = "100MGC"
    u._ = t
  }
  c = c.filter(u => !u._)
  for (const u of c.filter(u => u._short == aliases.x)) {
    u.price = "0GC"
    u._ = t
  }
  c = c.filter(u => !u._)
  a.x = "public_script"
  for (const u of c.filter(u => u._short == aliases.x && u._value >= 6)) {
    u.price = "1TGC"
    u.barter = t
    u._ = t
  }
  c = c.filter(u => !u._)
  for (const u of c.filter(u => u._short == aliases.x && u._value == 5)) {
    u.price = "100BGC"
    u.barter = t
    u._ = t
  }
  c = c.filter(u => !u._)
  for (const u of c.filter(u => u._short == aliases.x && u._value == 4)) {
    u.price = "10BGC"
    u.barter = t
    u._ = t
  }
  c = c.filter(u => !u._)
  for (const u of c.filter(u => u._short == aliases.x && u._value == 3)) {
    u.price = "100MGC"
    u._ = t
  }
  c = c.filter(u => !u._)
  for (const u of c.filter(u => u._short == aliases.x)) {
    u.price = "0GC"
    u._ = t
  }
  c = c.filter(u => !u._)
  a.x = "channel_count"
  for (const u of c.filter(u => u._short == aliases.x && u._value >= 6)) {
    u.price = "1TGC"
    u.barter = t
    u._ = t
  }
  c = c.filter(u => !u._)
  for (const u of c.filter(u => u._short == aliases.x && u._value == 5)) {
    u.price = "100BGC"
    u.barter = t
    u._ = t
  }
  c = c.filter(u => !u._)
  for (const u of c.filter(u => u._short == aliases.x && u._value == 4)) {
    u.price = "10BGC"
    u.barter = t
    u._ = t
  }
  c = c.filter(u => !u._)
  for (const u of c.filter(u => u._short == aliases.x && u._value == 3)) {
    u.price = "100MGC"
    u._ = t
  }
  c = c.filter(u => !u._)
  for (const u of c.filter(u => u._short == aliases.x)) {
    u.price = "0GC"
    u._ = t
  }
  c = c.filter(u => !u._)
  a.x = "balance"
  for (const u of c.filter(u => u._short == aliases.x && u.rarity == 4)) {
    u.price = "1TGC"
    u.barter = t
    u._ = t
  }
  c = c.filter(u => !u._)
  for (const u of c.filter(u => u._short == aliases.x && u.rarity >= 3)) {
    u.price = "10MGC"
    u._ = t
  }
  c = c.filter(u => !u._)
  for (const u of c.filter(u => u._short == aliases.x)) {
    u.price = "0GC"
    u._ = t
  }
  c = c.filter(u => !u._)
  a.x = "log_writer"
  for (const u of c.filter(u => u._short == aliases.x && u.rarity >= 3)) {
    u.price = "10MGC"
    u._ = t
  }
  c = c.filter(u => !u._)
  for (const u of c.filter(u => u._short == aliases.x)) {
    u.price = "0GC"
    u._ = t
  }
  c = c.filter(u => !u._)
  a.x = "transactions"
  for (const u of c.filter(u => u._short == aliases.x && u.rarity >= 3)) {
    u.price = "10MGC"
    u._ = t
  }
  c = c.filter(u => !u._)
  for (const u of c.filter(u => u._short == aliases.x)) {
    u.price = "0GC"
    u._ = t
  }
  c = c.filter(u => !u._)
  a.x = "transfer"
  for (const u of c.filter(u => u._short == aliases.x && u.tier == 3)) {
    u.price = "2BGC"
    u._ = t
  }
  c = c.filter(u => !u._)
  for (const u of c.filter(u => u._short == aliases.x)) {
    u.price = "0GC"
    u._ = t
  }
  c = c.filter(u => !u._)
  a.x = "expose_upgrades"
  for (const u of c.filter(u => u._short == aliases.x && u.tier == 3)) {
    u.price = "10MGC"
    u._ = t
  }
  c = c.filter(u => !u._)
  for (const u of c.filter(u => u._short == aliases.x)) {
    u.price = "0GC"
    u._ = t
  }
  c = c.filter(u => !u._)
  a.x = "transfer_upgrade"
  for (const u of c.filter(u => u._short == aliases.x && u._value >= 3)) {
    u.price = "500BGC"
    u.barter = t
    u._ = t
  }
  c = c.filter(u => !u._)
  for (const u of c.filter(u => u._short == aliases.x && u._value >= 2)) {
    u.price = "25BGC"
    u.barter = t
    u._ = t
  }
  c = c.filter(u => !u._)
  for (const u of c.filter(u => u._short == aliases.x && u._value >= 1)) {
    u.price = "2BGC"
    u._ = t
  }
  c = c.filter(u => !u._)
  for (const u of c.filter(u => u._short == aliases.x)) {
    u.price = "0GC"
    u._ = t
  }
  c = c.filter(u => !u._)
  a.x = "expose_access_log"
  for (const u of c.filter(u => u._short == aliases.x && u.rarity >= 3)) {
    u.price = "10MGC"
    u._ = t
  }
  c = c.filter(u => !u._)
  for (const u of c.filter(u => u._short == aliases.x)) {
    u.price = "0GC"
    u._ = t
  }
  c = c.filter(u => !u._)
  a.x = "expose_upgrade_log"
  for (const u of c.filter(u => u._short == aliases.x && u.rarity >= 3)) {
    u.price = "10MGC"
    u._ = t
  }
  c = c.filter(u => !u._)
  for (const u of c.filter(u => u._short == aliases.x)) {
    u.price = "0GC"
    u._ = t
  }
  c = c.filter(u => !u._)
  for (let u of c) delete u._

  c = original
  for (const u of c.filter(u => !(u.k3y))) {
    u._ = t
  }
  c = c.filter(u => !u._)
  for (const u of c.filter(u => u._short == aliases.k && u._value == "vc2c7q")) {
    u.price = "25MGC"
    u.cheap_key = t
    u._ = t
  }
  for (const u of c.filter(u => u._short == aliases.k && u._value == "tvfkyq")) {
    u._ = t
  }
  for (const u of c.filter(u => u._short == aliases.k && u.rarity == 1 && u._value == "xwz7ja")) {
    u.price = "25MGC"
    u.cheap_key = t
    u._ = t
  }
  for (const u of c.filter(u => u._short == aliases.k && u._value == "uphlaw")) {
    u._ = t
  }
  for (const u of c.filter(u => u._short == aliases.k && u.rarity == 1 && u._value == "sa23uw")) {
    u._ = t
  }
  for (const u of c.filter(u => u._short == aliases.k && u._value == "72umy0" && u.rarity >= 2 && u.rarity <= 3)) {
    u.price = "100MGC"
    u._ = t
  }
  for (const u of c.filter(u => u._short == aliases.k && u._value == "cmppiq")) {
    u._ = t
  }
  for (const u of c.filter(u => u._short == aliases.k && u.rarity == 1 && u._value == "i874y3")) {
    u._ = t
  }
  for (const u of c.filter(u => u._short == aliases.k && u._value == "eoq6de" && u.rarity >= 2 && u.rarity <= 3)) {
    u.price = "200MGC"
    u._ = t
  }
  for (const u of c.filter(u => u._short == aliases.k && u.rarity == 1 && u._value == "9p65cu")) {
    u._ = t
  }
  for (const u of c.filter(u => u._short == aliases.k && u._value == "6hh8xw")) {
    u._ = t
  }
  for (const u of c.filter(u => u._short == aliases.k && u.rarity == 1 && u._value == "pmvr1q")) {
    u._ = t
  }
  for (const u of c.filter(u => u._short == aliases.k && u._value == "fr8ibu" && u.rarity >= 2 && u.rarity <= 3)) {
    u.price = "1QGC"
    u.barter = t
    u._ = t
  }
  for (const u of c.filter(u => u._short == aliases.k && u.rarity == 1 && u._value == "ellux0")) {
    u._ = t
  }
  for (const u of c.filter(u => u._short == aliases.k && u._value == "xfnkqe")) {
    u.price = "1QGC"
    u.barter = t
    u._ = t
  }
  for (const u of c.filter(u => u._short == aliases.k && u._value == "y111qa")) {
    u.price = "1QGC"
    u.barter = t
    u._ = t
  }
  for (const u of c.filter(u => u._short == aliases.k && u._value == "hc3b69")) {
    u.price = "25MGC"
    u.cheap_key = t
    u._ = t
  }
  for (const u of c.filter(u => u._short == aliases.k && u._value == "5c7e1r")) {
    u._ = t
  }
  for (const u of c.filter(u => u._short == aliases.k && u.rarity == 1 && u._value == "4jitu5")) {
    u.price = "25MGC"
    u.cheap_key = t
    u._ = t
  }
  for (const u of c.filter(u => u._short == aliases.k && u.rarity == 1 && u._value == "lq09tg")) {
    u._ = t
  }
  for (const u of c.filter(u => u._short == aliases.k && u.rarity == 1 && u._value == "vthf6e")) {
    u._ = t
  }
  for (const u of c.filter(u => u._short == aliases.k && u._value == "nfijix")) {
    u._ = t
  }
  for (const u of c.filter(u => u._short == aliases.k && u._value == "nyi5u2" && u.rarity >= 2 && u.rarity <= 3)) {
    u.price = "300MGC"
    u._ = t
  }
  for (const u of c.filter(u => u._short == aliases.k && u._value == "voon2h" && u.rarity >= 2 && u.rarity <= 3)) {
    u.price = "1QGC"
    u.barter = t
    u._ = t
  }
  for (const u of c.filter(u => u._short == aliases.k && u._value == "j1aa4n" && u.rarity >= 2 && u.rarity <= 3)) {
    u.price = "1QGC"
    u.barter = t
    u._ = t
  }
  for (const u of c.filter(u => u._short == aliases.k && u._value == "d9j270" && u.rarity >= 2 && u.rarity <= 3)) {
    u.price = "1QGC"
    u.barter = t
    u._ = t
  }
  for (const u of c.filter(u => u._short == aliases.k && u._value == "vzdt6m" && u.rarity >= 2 && u.rarity <= 3)) {
    u.price = "1QGC"
    u.barter = t
    u._ = t
  }
  for (const u of c.filter(u => u._short == aliases.k && u._value == "cy70mo" && u.rarity >= 2 && u.rarity <= 3)) {
    u.price = "1QGC"
    u.barter = t
    u._ = t
  }
  for (const u of c.filter(u => u._short == aliases.k && u._value == "8izsag")) {
    u.price = "1QGC"
    u.barter = t
    u._ = t
  }
  for (const u of c.filter(u => u._short == aliases.k && u._value == "hzqgw6")) {
    u.price = "1QGC"
    u.barter = t
    u._ = t
  }
  for (const u of c.filter(u => u._short == aliases.k && u._value == "qvgtnt")) {
    u.price = "1QGC"
    u.barter = t
    u._ = t
  }
  for (const u of c.filter(u => u._short == aliases.k && u._value == "ooilt2")) {
    u.price = "1QGC"
    u.barter = t
    u._ = t
  }
  for (const u of c.filter(u => u._short == aliases.k && u._value == "afgny5")) {
    u.price = "25BGC"
    u.cheap_key = t
    u._ = t
  }
  for (const u of c.filter(u => u._short == aliases.k && u._value == "54r1cg")) {
    u._ = t
  }
  for (const u of c.filter(u => u._short == aliases.k && u._value == "dwwf3w")) {
    u._ = t
  }
  for (const u of c.filter(u => u._short == aliases.k && u._value == "7oxb1b")) {
    u._ = t
  }
  for (const u of c.filter(u => u._short == aliases.k && u.tier == 1 && !(u.cheap_key))) {
    u.alch = t
    u._ = t
  }
  for (const u of c.filter(u => u._short == aliases.k && u.tier == 1 && u.rarity == 1 && !(u.cheap_key))) {
    u.alch = t
    u._ = t
  }
  for (const u of c.filter(u => u._short == aliases.k && u.tier == 2 && !(u.cheap_key))) {
    u.alch = t
    u._ = t
  }
  for (const u of c.filter(u => u._short == aliases.k && u.tier == 2 && u.rarity == 1 && !(u.cheap_key))) {
    u.alch = t
    u._ = t
  }
  for (const u of c.filter(u => u._short == aliases.k && u.tier == 3 && !(u.cheap_key))) {
    u.alch = t
    u._ = t
  }
  for (const u of c.filter(u => u._short == aliases.k && u.tier == 3 && u.rarity == 1 && !(u.cheap_key))) {
    u.alch = t
    u._ = t
  }
  for (const u of c.filter(u => u._short == aliases.k && u.alch && u.original)) {
    delete u.alch
    u._ = t
  }
  for (const u of c.filter(u => u._short == aliases.k && !(u.price))) {
    u.price = "1QGC"
    u.barter = t
    u._ = t
  }
  for (let u of c) delete u._

  c = original
  for (const u of c.filter(u => u.snack)) {
    u.price = "10MGC"
    u._ = t
  }
  for (const u of c.filter(u => !(u.keep) && u.price == "0GC")) {
    u.cull = t
    u._ = t
  }
  for (const u of c.filter(u => !(u.keep) && !(u.price == "0GC") && !(u.price == "1QGC"))) {
    u.sell = t
    u._ = t
  }
  for (const u of c.filter(u => u.barter)) {
    delete u.sell
    u.keep = t
    u._ = t
  }
  for (const u of c.filter(u => !(u.keep) && !(u.sell) && !(u.cull) && !(u.barter))) {
    u.anomaly = t
    u._ = t
  }
  for (const u of c.filter(u => u.sell && !(u.price))) {
    delete u.sell
    u.price = "NO PRICE!!!!!!"
    u._ = t
  }
  for (let u of c) delete u._

  c = original
  for (const u of c.filter(u => u.Now && u.we && u.sort && u.items && u.between && u.users)) {
    u._ = t
  }
  for (const u of c.filter(u => u._short == aliases.k && u.tier == 3 && u.loaded == f)) {
    u.send = 4
    u._ = t
  }
  c = c.filter(u => !u._)
  for (const u of c.filter(u => u._short == aliases.k && u.loaded == f && u.original)) {
    u.send = 2
    u._ = t
  }
  c = c.filter(u => !u._)
  for (const u of c.filter(u => u._short == aliases.k && u.loaded == f && u.material)) {
    u.send = 4
    u._ = t
  }
  c = c.filter(u => !u._)
  for (const u of c.filter(u => u.loaded == f && u.snack)) {
    u.send = 4
    u._ = t
  }
  c = c.filter(u => !u._)
  for (const u of c.filter(u => u.tier == 2 && u.loaded == f && u.barter)) {
    u.send = 2
    u._ = t
  }
  c = c.filter(u => !u._)
  for (const u of c.filter(u => u.tier == 2 && u.loaded == f)) {
    u.send = 4
    u._ = t
  }
  c = c.filter(u => !u._)
  for (const u of c.filter(u => u.tier == 3 && u.loaded == f)) {
    u.send = 4
    u._ = t
  }
  c = c.filter(u => !u._)
  for (const u of c.filter(u => u.tier == 4 && u.loaded == f)) {
    u.send = 4
    u._ = t
  }
  c = c.filter(u => !u._)
  for (let u of c) delete u._

  c = original
  for (const u of c.filter(u => u.sell)) {
    delete u.send
    u._ = t
  }
  c = c.filter(u => !u._)
  for (const u of c.filter(u => u.cull)) {
    delete u.send
    u._ = t
  }
  c = c.filter(u => !u._)
  for (let u of c) delete u._

  c = original
  for (const u of c.filter(u => t)) {
    u.display = t
    u._ = t
  }

}
