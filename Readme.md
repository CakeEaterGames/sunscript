# SUNSCRIPT - Short Upgrade Notation

## ATTENTION!

While this repo is still in development, you can submit bug reports for 2BGC each! 
And in general, if you'll do something cool with sunscript, I will give you GC!
Have fun everyone

## Introduction

Sunscript is Domain Specific Language ([DSL](https://en.wikipedia.org/wiki/Domain-specific_language)) for an MMO game called [Hackmud](https://hackmud.com). It is designed to solve one and only one specific problem in the game, **filtering of loot (upgrades)**. When you get to a certain progression point at the game you start to acquire thousands of individual items of various rarities, tiers, types and qualities. Deciding what to do with each individual item by hand is no longer possible and any attempt to create a proper filtering solution ends up becomes a long list of "if else" statements that is very difficult to read and modify.

The more you use it the more readable and comfortable it becomes!

## Usage

```js
const SUN = #fs.cake.sun()
const CharCountFilter = SUN.compile(`
	alias c = char_count
	c[1500:*] -> keep price=10BGC;>    // Keep all char_counts with 1400+ chars 
	c[1460:*] -> sell price=1BGC;>     // Sell all char_counts with 1000+ chars
	c         -> cull;>                // Destroy all other char_counts

	pp c keep _best=3 -> the_best     
	pp c keep !the_best -> sell keep=undefined    // Only keep the best 3
	pp _filtered -> display            // Display all upgrades touched by the filter 
`)
const filtered = SUN.filter(upgrages, CharCountFilter)
// "filtered" will contain all items of array "upgrades" that triggered at least one rule in the list.
// Array items now have additional properties: keep, sell, cull, price, the_best, _filtered, display
let keep = upgrades.filter(a=>a.keep)
let sell = upgrades.filter(a=>a.sell)
let cull = upgrades.filter(a=>a.cull)
```

Use #fs.cake.sun()
Or download it from the dist folder

## Use cases for SUNSCRIPT

SUNSCRIPT can be used as:
- A querry language for finding upgrades in your inventories
- A grading system that can assign a cost to an item
- A decider that marks upgrades to be Sold / Destroyed / Stored
- A router that sends upgrades to your Stash user / Weaver user / Wolf user

SUNSCRIPT CAN'T be used as:
- A general purpose language. (I dare you to write Fibonacci in it tho. I'll give 50BGC if you do) 
- A full replacement of your logic. It will get you 90% of the way there, but you'll still need to do the final steps yourself.

## Syntax

Here are all the building blocks of the language:

#### Comment

```
//This is a comment and it will be removed before compilation
c->good=true //This is also a comment
```
#### Alias definition

All upgrades have already been paired with their own alias, however, if you want to use custom aliases you can use the "alias" keyword. It is not neccesary to include the \_v1 \_v2 \_v3 \_v4 part in the alias definition. See Alias table for a list of aliases.
```
alias N = char_count
N[1000] //All char counts with 1000 chars

// You can rewrite aliases multiple times

alias N = script_slot
N[4]    //All script slots with 4 slots 
```
#### Data types

Sunscript supports these data types
```
a=1
b="Hello World"
c=Hello_World  //Will be converted to "Hello_World"
d=undefined
e=true
f=false
```
All properties that are set to undefined will be deleted by a js "delete" keyword and will not be present in the returned objects

#### Range

Ranges can be used in numeric SUN and LUN filters
```
c[1000:1200] // Selects all char_counts with chars greater or equal to 1000 but less than or equal to 1200
```
#### Wildcard

Most values can be replaced with * which means "Any". Best used in ranges and SUN filters
```
c[*]      //All char_counts
c         //Also all char_counts
c[1000:*] //All char_counts with chars greater or equal to 1000
*[1]      //All upgrades that have a defining value of 1
```

#### Rule

Rule is a Filter followed by an Action list. All rules are placed on a new line. If you want to place 2 or more rules on the same line separate them by ';'
```
c -> good=true                  //Is a valid rule
c -> good=true veryGood=true    //Is a valid rule
c[*:1000] -> bad=true; s[*:2];  //Are 2 valid rules separated by a ';'
c  //Is also a valid rule. All char_counts will be included in a response but no properties will be modified by this rule
```

#### Action

Action is a part of a rule that comes after the -> symbol. It consists of key value pairs similar to LUN filters. rules are separated by spaces
```
c -> good=true cool=true // Set properties good and cool for all char_counts
```
These 2 Actions do the same thing. Set property "good" for all char_counts
```
c -> good=true
c -> good 
```

#### LUN filter

LUN filter (Long upgrade notations) is a set of key value pairs that define an upgrade
```
name="char_count_v1" rarity=1 -> good=true
tier=3 rarity=1:*             -> good=true
good=undefined                -> bad=true  //Since all rules executed sequentially you can filter by your own properties
```

These 2 filters do the same thing. Set property "cool" for char_counts that have property good=true
```
c good=true -> cool=true 
c good      -> cool=true
```

You can also use ! to negate the filter
```
c bad=false     -> cool=true 
c bad=undefined -> cool=true 

c !bad -> cool=true  //same as a combination of 2 rules above
```

There are 2 special LUN filters \_worst and \_best. 
```
c _best=10   -> cool=true  // Select 10 best char_counts 
c _worst=10  -> cool=false // Select 10 worst char_counts 
c !_best=10  -> cool=false // Select all except 10 best char_counts 
c !_worst=10 -> cool=true  // Select all except 10 worst char_counts 
```

#### SUN filter

Simple Upgrade Notation is the reason this language exists. It can be complex at first but it gets easier the more you work with it. 

Building blocks of a sun rule:
- \+ (optional) Upgrade is loaded 
- \- (optional) Upgrade is unloaded
- ^ (optional) Upgrade is on 0 cooldown
- ~ (optional) Upgrade is not on 0 cooldown
- ALIAS (required) A single character that defines an upgrade. See a table of Aliases
- TIER (optional) A single numeric digit. Tier of upgrade
- Rarity (optional) A single numeric digit. Rarity of upgrade. Can only be present if a tier is specified or set to '\*'
- [VALUE] (optional) pair of square brackets surrounding a Value or a Range. Defines the main value of upgrade. For char_counts it is property "chars" for script_slot it is property "slots". See a table of defining Values.

You can chain these blocks in the order they are mentioned to create short but powerful rules. Here are some example SUN filters:
```
c         // All char_counts
+*        // All loaded upgrades
+c        // All loaded char_counts
-c        // All Unloaded char_counts
+^T       // All Loaded and ready to use transfer_v1s / v2s
+~T       // All Loaded and on cooldown transfer_v1s / v2s
c1        // All tier 1 char_counts
c10       // All tier 1, rarity 0 char_counts
c*0       // All rarity 0 char_counts
*1        // All tier 1 upgrades
**0       // All rarity 0 upgrades
c1[1000]  // All tier 1 char_counts with exactly 1000 chars
c[*:1000] // All char_counts with 1000 or more chars
c[1000:*] // All char_counts with 1000 or less chars
c[1000:*] good=true // A combination of previous filter with a LUN filter
*         // All upgrades
**        // All upgrades or all tiers
***       // All upgrades... but why?
***[*]    // ...
***[*:*]  // ... please stop
****[*:*] // HA! Syntax error!
```

#### Return statement

'>' is a special command that means "stop filtering if any of the previous filters got triggered"
```
c[1400:*] -> keep=true price=1BGC
> //return if item is meant to be kept
c[1000:*] -> sell=true price=100MGC
> //return if item is meant to be sold
c -> cull=true
> //return

//lower code will be ignored if the upgrade was a char_count
//however if the upgrade was a public_script or any other upgrade the filtering will continue

S[4] -> keep=true;> //keep public_scripts with 4 slots
```

#### Postprocessing

Keyword 'pp' stands for postprocessing. You can prefix your Rules with 'pp' to say that the rule should be executed after all the non pp rules got executed. If the script finished or '>' keyword got triggered, the pp rules will start executing in the order they are written. You can place pp rules between non pp rules.

Example from the top of the page:
```
c[1400:*] -> keep=true price=1BGC;>    
c[1000:*] -> sell=true price=100MGC;>  
c        -> cull=true;>              

// Mark all upgrades as anomalies that didn't match any filter
pp * !keep !sell !cull -> anomaly=true
```

## Tables of reference

#### Aliases

```js
let Aliases = {
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
}
```

#### Upgrade defining properties

```js
function getUpgradeValue(u) {
	let n = shortUpName(u.name)
	const valueMap = {
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
		"cron_bot": u.cooldown
	};
	return valueMap[n];
}
```

## Samples

WIP

## Contribute

If you want to contribute you can fork this repository and create a merge request. Or find me on discord in the official Hackmud server. Suggestions are always appreciated.
