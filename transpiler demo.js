/*
alias c = char_count
c[1500:*] -> keep price=10BGC;>    
c[1460:*] -> sell price=1BGC;>     
c         -> cull;>           

--- 

c keep _best=3 -> the_best     
c keep !the_best -> sell !keep    
c -> display            
*/

//  |   |   | 
// \ / \ / \ /
//  '   '   ' 

// TRANSPILE!!!

//  |   |   | 
// \ / \ / \ /
//  '   '   ' 


cur = original
aliases.c = "char_count"
for (const u of cur.filter(u => inRange(u._value, { min: 1500 }) && u._short == aliases.c)) {
  u.keep = true
  u.price = "10BGC"
  u._filtered = true
}
cur = cur.filter(u => !u._filtered)
for (const u of cur.filter(u => inRange(u._value, { min: 1460 }) && u._short == aliases.c)) {
  u.sell = true
  u.price = "1BGC"
  u._filtered = true
}
cur = cur.filter(u => !u._filtered)
for (const u of cur.filter(u => u._short == aliases.c)) {
  u.cull = true
  u._filtered = true
}
cur = cur.filter(u => !u._filtered)
for (let u of cur) delete u._filtered

cur = original
for (const u of best(cur.filter(u => u._short == aliases.c && u.keep), true, false, 3)) {
  u.the_best = true
  u._filtered = true
}
for (const u of cur.filter(u => u._short == aliases.c && u.keep && !(u.the_best))) {
  u.sell = true
  delete u.keep
  u._filtered = true
}
for (const u of cur.filter(u => u._short == aliases.c)) {
  u.display = true
  u._filtered = true
}