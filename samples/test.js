function(context, args) {
  try {
    let SUN = #fs.cake.sun({ import: true })
    let CharCountFilter = SUN.compile(`
        alias c = char_count
        c[1500:*] -> keep price=10BGC;>    // Keep all char_counts with 1500+ chars 
        c[1460:*] -> sell price=1BGC;>     // Sell all char_counts with 1460+ chars
        c         -> cull;>                // Destroy all other char_counts

        --- // Next stage 

        c keep _best=3 -> the_best     
        c keep !the_best -> sell keep=undefined    // Only keep the best 3
        c -> display            // Display all char_counts 
      `)
    let upgrades = #hs.sys.upgrades({ full: true })
    let filtered = SUN.filter(upgrades, CharCountFilter)
    // "filtered" will contain all items of array "upgrades" that triggered at least one rule in the list.
    // Array items now have additional properties: keep, sell, cull, price, the_best, display
    return upgrades.filter(a => a.display)
  } catch (ex) {
    return ex.stack
  }
}
