// Snax block

alias S = ez_21
S10 -> snack
alias S = ez_35
S10 -> snack
alias S = c001
S10 -> snack
alias S = char_count
S10 -> snack
alias S = channel_count
S10 -> snack
alias S = expose_access_log
S10 -> snack

snack _best=128 -> keep
//Only keep 128 snax

---

alias x = CON_TELL
-x _best=20 -> keep;>; -x !keep -> cull;>

alias x = CON_SPEC
-x _best=20 -> keep;>

alias x = acct_nt
-x _best=20 -> keep;>

alias x = sn_w_glock
-x _best=20 -> keep;>

alias x = magnara
-x _best=20 -> keep;>

alias x = char_count
-x2 _best=30 -> keep;>
-x3 _best=30 -> keep;>

alias x = public_script
-x2 _best=20 -> keep;>
-x3 _best=20 -> keep;>

alias x = script_slot
-x2 _best=20 -> keep;>
-x3 _best=20 -> keep;>

alias x = channel_count
-x _best=20 -> keep;>

alias x = balance
-x _best=20 -> keep;>

alias x = log_writer
-x _best=20 -> keep;>

alias x = expose_access_log
-x _best=20 -> keep;>

alias x = expose_upgrade_log
-x _best=20 -> keep;>

alias x = expose_upgrades
-x _best=20 -> keep;>

alias x = transactions
-x _best=20 -> keep;>

alias x = transfer_upgrade
-x _best=20 -> keep;>

alias x = transfer
-x _best=20 -> keep;>

//Keep rare w4rn_message for the lolz
alias x = w4rn_message
-x _best=5 -> keep;>;  -x !keep -> cull;>

alias x = DATA_CHECK
-x _best=20 -> keep;>

alias x = l0cket
-x -> cull;>

alias x = l0ckbox
-x _best=20 -> keep;>

alias x = cron_bot
-x2 _best=10 -> keep;>
-x3 _best=10 -> keep;>

alias x = sn_w_usac
-x _best=20 -> keep;>

alias x = shfflr
-x _best=20 -> keep;>

alias x = l0g_wr1t3r
-x _best=20 -> keep;>

alias x = l0ckjaw
-x _best=20 -> keep;>

+* -> keep;>

---

// Keys are quite complex.
// This block will be different for everyone
// because we all have different luck with k3ys

// first of all mark 3 of each k3y r0 r1 as originals
// (some of these are not r0 r1, but keeping just in case)

alias k = k3y

// skip everything that is not a key. This line optimizes the stage by 27%
k3y=undefined ->;>

-k[vc2c7q] rarity=0:1 _best=3 -> original
-k[tvfkyq] rarity=0:1 _best=3 -> original
-k[xwz7ja] rarity=0:1 _best=3 -> original
-k[uphlaw] rarity=0:1 _best=3 -> original
-k[sa23uw] rarity=0:1 _best=3 -> original
-k[72umy0] rarity=0:1 _best=3 -> original
-k[cmppiq] rarity=0:1 _best=3 -> original
-k[i874y3] rarity=0:1 _best=3 -> original
-k[eoq6de] rarity=0:1 _best=3 -> original
-k[9p65cu] rarity=0:1 _best=3 -> original
-k[6hh8xw] rarity=0:1 _best=3 -> original
-k[pmvr1q] rarity=0:1 _best=3 -> original
-k[fr8ibu] rarity=0:1 _best=3 -> original
-k[ellux0] rarity=0:1 _best=3 -> original
-k[xfnkqe] rarity=0:1 _best=3 -> original
-k[y111qa] rarity=0:1 _best=3 -> original

-k[hc3b69] rarity=0:1 _best=3 -> original
-k[5c7e1r] rarity=0:1 _best=3 -> original
-k[4jitu5] rarity=0:1 _best=3 -> original
-k[lq09tg] rarity=0:1 _best=3 -> original
-k[vthf6e] rarity=0:1 _best=3 -> original
-k[nfijix] rarity=0:1 _best=3 -> original
-k[nyi5u2] rarity=0:1 _best=3 -> original
-k[voon2h] rarity=0:1 _best=3 -> original
-k[j1aa4n] rarity=0:1 _best=3 -> original
-k[d9j270] rarity=0:1 _best=3 -> original
-k[vzdt6m] rarity=0:1 _best=3 -> original
-k[cy70mo] rarity=0:1 _best=3 -> original
-k[8izsag] rarity=0:1 _best=3 -> original
-k[hzqgw6] rarity=0:1 _best=3 -> original
-k[qvgtnt] rarity=0:1 _best=3 -> original
-k[ooilt2] rarity=0:1 _best=3 -> original

-k[afgny5] rarity=0:1 _best=3 -> original
-k[54r1cg] rarity=0:1 _best=3 -> original
-k[dwwf3w] rarity=0:1 _best=3 -> original
-k[7oxb1b] rarity=0:1 _best=3 -> original

//Don't know about other t3 k3ys.
//This data may be fake!
// "0wm", 
// "2od", 
// "pxo",
// "sg8", 
// "n4v",
// "gnm",
// "56q",
// "f5p",
// "fpw",
// "xhc",
// "w23",

// mark all r2 r3 as originals
k rarity=2:* -> original

// every key that isn't original, is a material
k rarity=0:1 !original -> material

// Only keep 50 of each material type
k10 material !_best=50 -> extra
k11 material !_best=50 -> extra
k20 material !_best=50 -> extra
k21 material !_best=50 -> extra
k30 material !_best=50 -> extra
k31 material !_best=50 -> extra

// Only keep 10 of each r2 r3 k3y.  
k[72umy0] rarity=2:* !_best=10 -> extra 
k[eoq6de] rarity=2:* !_best=10 -> extra 
k[fr8ibu] rarity=2:* !_best=10 -> extra 
k[nyi5u2] rarity=2:* !_best=10 -> extra 
k[j1aa4n] rarity=2:* !_best=10 -> extra 
k[d9j270] rarity=2:* !_best=10 -> extra 
k[vzdt6m] rarity=2:* !_best=10 -> extra 

k original extra -> !original
k material extra -> !material

k original -> keep
k material -> keep
k extra -> sell

---

//Price list
*1 !name=k3y !snack -> price=0GC;>

//Don't check the price for everything that we're already keeping
//Comment out if you want to see prices for all items
//40% optimization
keep -> ;>

alias x = acct_nt
x[12:*] -> price=100BGC barter;>
x[11:*] -> price=10BGC barter;>
x[10:*] -> price=1BGC barter;>
x[9:*] -> price=100MGC;>
x[8:*] -> price=10MGC;>
x -> price=0GC;>

alias x = l0ckbox
x[27:*] -> price=100BGC barter;>
x[26:*] -> price=100MGC;>
x[25:*] -> price=10MGC;>
x -> price=0GC;>

alias x = magnara
x[9:*] -> price=500BGC barter;>
x[8:*] -> price=10BGC barter;>
x[7:*] -> price=10MGC;>
x -> price=0GC;>

alias x = sn_w_glock
x[*:40] -> price=100BGC barter;>
x[*:50] -> price=10BGC barter;>
x[*:60] -> price=1BGC barter;>
x[*:80] -> price=100MGC;>
x[*:100] -> price=10MGC;>
x -> price=0GC;>

alias x = CON_SPEC
x*3 -> price=10MGC;>
x -> price=0GC;>

alias x = l0ckjaw
x[36:*] -> price=100BGC barter;>
x[37:*] -> price=2BGC;>
x -> price=0GC;>

alias x = l0g_wr1t3r
x[4:*] -> price=1TGC barter;>
x[3:*] -> price=250BGC barter;>
x[2:*] -> price=50BGC barter;>
x[1:*] -> price=2BGC;>
x -> price=0GC;>

alias x = sn_w_usac
x -> price=2BGC;>
x -> price=0GC;>

alias x = shfflr
x[7:*] -> price=80BGC barter;>
x[6] -> price=40BGC barter;>
x[5] -> price=20BGC barter;>
x[4] -> price=10BGC barter;>
x[3] -> price=5BGC;>
x[2] -> price=2BGC;>
x -> price=0GC;>

alias x = DATA_CHECK
x4 rarity=2:* -> price=1TGC barter;>
x4 -> price=500BGC;>
x -> price=0GC;>

alias x = cron_bot
x2[*:300] -> price=1TMGC barter;>
x2[*:400] -> price=500BGC barter;>
x2[*:500] -> price=100BGC barter;>
x2[*:600] -> price=10BGC barter;>
x2[*:700] -> price=1BGC;>
x2[*:800] -> price=100MGC;>
x2[*:900] -> price=10MGC;>
x3 -> price=2BGC;>
x -> price=0GC;>

alias x = char_count
x2[1900:*] -> price=500BGC barter;>
x2[1800:*] -> price=100BGC barter;>
x2[1700:*] -> price=50BGC barter;>
x2[1600:*] -> price=5BGC;>
x2[1500:*] -> price=500MGC;>
x2[1400:*] -> price=50MGC;>

x3[1200:*] -> price=2BGC;>

x -> price=0GC;>

alias x = script_slot
x[6:*] -> price=1TGC barter;>
x[5] -> price=100BGC barter;>
x[4] -> price=10BGC barter;>
x[3] -> price=100MGC;>
x -> price=0GC;>

alias x = public_script
x[6:*] -> price=1TGC barter;>
x[5] -> price=100BGC barter;>
x[4] -> price=10BGC barter;>
x[3] -> price=100MGC;>
x -> price=0GC;>

alias x = channel_count
x[6:*] -> price=1TGC barter;>
x[5] -> price=100BGC barter;>
x[4] -> price=10BGC barter;>
x[3] -> price=100MGC;>
x -> price=0GC;>

alias x = balance
x*4 -> price=1TGC barter;>
x -> price=1MGC;>
x -> price=0GC;>

alias x = log_writer
x -> price=1MGC;>
x -> price=0GC;>

alias x = transactions
x -> price=1MGC;>
x -> price=0GC;>

alias x = transfer
x -> price=1MGC;>
x -> price=0GC;>

alias x = expose_upgrades
x -> price=1MGC;>
x -> price=0GC;>

alias x = transfer_upgrade
x[3:*] -> price=500BGC barter;>
x[2:*] -> price=25BGC barter;>
x[1:*] -> price=2BGC;>
x -> price=0GC;>

alias x = expose_access_log
x -> price=1MGC;>
x -> price=0GC;>

alias x = expose_upgrade_log
x -> price=1MGC;>
x -> price=0GC;>


---
k3y=undefined ->;>

//Key prices
k*0[vc2c7q] -> price=25MGC cheap_key
k*0[tvfkyq] -> 
k*1[xwz7ja] -> price=25MGC cheap_key
k*0[uphlaw] -> 
k*1[sa23uw] -> 
k**[72umy0] rarity=2:3 -> price=100MGC
k*0[cmppiq] -> 
k*1[i874y3] -> 
k**[eoq6de] rarity=2:3 -> price=200MGC
k*1[9p65cu] -> 
k*0[6hh8xw] -> 
k*1[pmvr1q] -> 
k**[fr8ibu] rarity=2:3 -> price=1QGC barter
k*1[ellux0] -> 
k**[xfnkqe] -> price=1QGC barter
k**[y111qa] -> price=1QGC barter

k*0[hc3b69] -> price=25MGC cheap_key
k*0[5c7e1r] ->
k*1[4jitu5] -> price=25MGC cheap_key
k*1[lq09tg] ->
k*1[vthf6e] ->
k*0[nfijix] ->
k**[nyi5u2] rarity=2:3 -> price=300MGC
k**[voon2h] rarity=2:3 -> price=1QGC barter
k**[j1aa4n] rarity=2:3 -> price=1QGC barter
k**[d9j270] rarity=2:3 -> price=1QGC barter
k**[vzdt6m] rarity=2:3 -> price=1QGC barter
k**[cy70mo] rarity=2:3 -> price=1QGC barter
k**[8izsag] -> price=1QGC barter
k**[hzqgw6] -> price=1QGC barter
k**[qvgtnt] -> price=1QGC barter
k**[ooilt2] -> price=1QGC barter

k**[afgny5] -> price=25BGC cheap_key
k**[54r1cg] -> 
k**[dwwf3w] -> 
k**[7oxb1b] -> 


k10 !cheap_key -> alch price=1QGC
k11 !cheap_key -> alch price=1QGC
k20 !cheap_key -> alch price=1QGC
k21 !cheap_key -> alch price=1QGC
k30 !cheap_key -> alch price=1QGC
k31 !cheap_key -> alch price=1QGC

k price=undefined -> price=1QGC barter

---

snack -> price=10MGC



//Sell everything worth selling
* !keep price=0GC -> cull
* !keep !price=0GC -> sell

//DO NOT SELL UPGRADES THAT ARE TOO GOOD
* barter -> !sell

//If for some reason something got past the filter, mark it
* !keep !sell !cull -> anomaly

//If trying to sell something without a price, don't
* sell price=undefined -> !sell price="NO PRICE!!!!!!"

---

Now we sort items between users

-k3         -> send=4;>
-k original -> send=2;>
-k material -> send=4;>
-* snack    -> send=4;>
-*2 barter  -> send=2;>

-*2 -> send=4;>
-*3 -> send=4;>
-*4 -> send=4;>

---

// is_manual -> !send;>
sell      -> !send;>
cull      -> !send;>

// send=2 user_tier=2 -> !send;>
// send=3 user_tier=3 -> !send;>
// send=4 user_tier=4 -> !send;>

---

* -> display

//This line does nothing on the parser side. It is specifically for the live demo.
//Display these properties:
//_COLUMNS_ i the_best name _value snack cull keep sell barter price original material extra anomaly
