function(context, args) {

  try {
    let clib = #fs.cake.clib({get:true});

    let logs = []
    function log(v) {
      if (typeof v === "object") {
        logs.push(JSON.stringify(v));
      } else {
        logs.push(v);
      }
    }
    let windowW = 40
    function unlog() {
      return clib.limitStr(clib.drawWindow(
        {
          text: logs.join("\n"),
          color: "J",
          title: "  cake.sun - Short Upgrade Notation",
          padding: { top: 1, left: 2, right: 2, bottom: 1 },
          margin: { top: 1, left: 4, right: 4, bottom: 1 },
          dimensions: { width: windowW, height: 10 }
        }
      ))
      return logs.join("\n");
    }
    function getUps() {
      return #hs.sys.upgrades({ full: true })
    }


    const SUN = #fs.cake.sun_v0({ import: true })
    const CharCountFilter = SUN.compile(`
	alias c = char_count
	c[1500:*] -> keep price=10BGC;>    // Keep all char_counts with 1400+ chars 
	c[1460:*] -> sell price=1BGC;>     // Sell all char_counts with 1000+ chars
	c         -> cull;>                // Destroy all other char_counts

	#1 c keep _best=3 -> the_best     
	#1 c keep !the_best -> sell keep=undefined    // Only keep the best 3
`)
    let upgrades = getUps();
    const filtered = SUN.filter(upgrades, CharCountFilter)

    let cols = {
      i:"i",
      name:"name",
      keep:"keep",
      sell: "sell",
      cull: "cull",
      price: "price"
    }
    let t = clib.table(upgrades, cols)
    log(t)

    return unlog();
  } catch (ex) {
    return ex.stack
  }
}
