import { compile } from "./compiler";
import { Aliases, filter, getUpgradeQuality, getUpgradeValue, sortUpgrades } from "./filter";

function SUN(args: any) {
  if (args && args.import === true) return { compile, filter, sortUpgrades, getUpgradeValue, getUpgradeQuality, Aliases }
  
  //This is quite ugly but trust me, it looks aligned in the game
  //If anyone knows how to make this cleaner while not taking to many crars, let me know
  let comment = "//"
  let a =
    `    'J╔══════════════════════════════════════════════════════════════╗'    
    'J║'  cake.sun - Short Upgrade Notation                           'J║'   
    'J╠══════════════════════════════════════════════════════════════╣'    
    'J║'                                                              'J║'   
    'J║'  'I\\ | /                -= SUNSCRIPT =-'                        'J║'
    'J║'  'I- O -        A smart filter for your upgrades'               'J║'
    'J║'  'I/ | \\                 Keep it light'                         'J║'
    'J║'                                                              'J║'   
    'J║'  'IAll info is at https:`+comment+`github.com/CakeEaterGames/sunscript'  'J║'
    'J║                                                              ║'    
    'J╚══════════════════════════════════════════════════════════════╝'    `
  return a.replace(/'/gm, "`");
}
(window as any).SUN = SUN;