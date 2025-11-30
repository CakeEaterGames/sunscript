alias x = l0ckbox
alias j = l0ckjaw
alias q = l0cket
alias a = acct_nt
alias m = magnara
alias W = l0g_wr1t3r
alias o = sn_w_usac
alias f = shfflr
alias N = CON_TELL
alias n = CON_SPEC
alias D = DATA_CHECK
alias g = sn_w_glock
alias 2 = ez_21
alias 3 = ez_35
alias 4 = ez_40
alias X = c001
alias y = c002
alias Y = c003
alias C = cron_bot
alias c = char_count
alias s = script_slot
alias S = public_script
alias 0 = channel_count
alias k = k3y
alias b = balance
alias w = log_writer
alias t = transactions
alias T = transfer
alias u = expose_upgrades
alias U = transfer_upgrade
alias l = expose_access_log
alias L = expose_upgrade_log
alias z = w4rn
alias Z = w4rn_message
alias r = w4rn_er






// k3y block
k -> keep;>




// Snax block

alias S = ez_21
alias S = ez_35
alias S = c001
alias S = char_count
alias S = channel_count
alias S = expose_access_log
S10 -> snack keep;>
pp snack _best=128 -> the_best
//Only keep 128 snax




alias x = CON_SPEC
x*3 -> sell cost=10MGC;>
x->cull;>
pp alias x = CON_SPEC 
pp x keep _best=10 -> the_best

alias x = acct_nt
x*3 -> keep;>
x -> cull;>
pp alias x = acct_nt 
pp x keep _best=20 -> the_best

alias x = sn_w_glock
x*3 -> keep;>
x -> cull;>
pp alias x = sn_w_glock 
pp x keep _best=20 -> the_best

alias x = magnara
x[7:*] -> keep;>
x -> cull;>
pp alias x = magnara 
pp x keep _best=20 -> the_best

alias x = char_count
x[1250:*] -> keep;>
x[1200:*] -> sell cost=100MGC;>
x -> cull;>
pp alias x = char_count 
pp -x keep _best=20 -> the_best

alias x = public_script
x[4:*] -> keep; cost=10BGC;>
x[3] -> keep; cost=1BGC; >
x[2] -> sell cost=100MGC;>
x -> cull;>
pp alias x = public_script 
pp -x keep _best=10 -> the_best

alias x = script_slot
x[4:*] -> keep; cost=10BGC;>
x[3] -> keep; cost=1BGC;>
x[2] -> sell cost=100MGC;>
x -> cull;>
pp alias x = script_slot 
pp -x keep _best=10 -> the_best

alias x = channel_count
x[5:*] -> keep; cost=2BGC;>
x[4:*] -> keep; cost=100MGC;>
x -> cull;>
pp alias x = channel_count 
pp -x keep _best=10 -> the_best

alias x = balance
x[*:2100] -> keep;>
x -> sell;>
pp alias x = balance 
pp x keep _best=20 -> the_best

alias x = log_writer
x3 -> keep;>
x -> sell;>
pp alias x = log_writer 
pp x keep _best=20 -> the_best


alias x = expose_access_log
x[500:*] -> keep;>
x -> sell;>
pp alias x = expose_access_log 
pp x keep _best=20 -> the_best

alias x = expose_upgrade_log
x*3 -> keep;>
x -> cull;>
pp alias x = expose_upgrade_log 
pp x keep _best=20 -> the_best

alias x = expose_upgrades
x*3 -> keep;>
x -> cull;>
pp alias x = expose_upgrades 
pp x keep _best=20 -> the_best

alias x = transactions
x*3 -> keep;>
x -> cull;>
pp alias x = transactions 
pp x keep _best=20 -> the_best

alias x = transfer_upgrade
x[2:*] -> keep price=50BGC;>
x[1] -> keep price=2BGC;>
x -> cull;>
pp alias x = transfer_upgrade 
pp x keep _best=20 -> the_best

alias x = transfer
x23 -> keep;>
x -> cull;>
pp alias x = transfer 
pp x keep _best=20 -> the_best

//Keep rare w4rn_message for the lolz
alias x = w4rn_message
x[*:30] -> keep;> 
x -> cull;>
pp alias x = w4rn_message 
pp x keep _best=5 -> the_best

alias x = DATA_CHECK
x*4 -> keep;>
x -> cull;>
pp alias x = DATA_CHECK 
pp x keep _best=20 -> the_best

alias x = l0cket
x -> cull;>

alias x = l0ckbox
x*3[26:*] -> keep price=100MGC;>
x*3 -> sell;>
x -> cull;>
pp alias x = l0ckbox 
pp x keep _best=20 -> the_best

alias x = cron_bot
x23[*:3500] -> keep;>
x23[*:3600] -> sell;>
x3* -> keep;>
x -> cull;>
pp alias x = cron_bot 
pp x23 keep _best=20 -> the_best
pp x3* keep _best=20 -> the_best


alias x = sn_w_usac
x -> keep;>
pp alias x = sn_w_usac 
pp x keep _best=20 -> the_best

alias x = shfflr
x -> keep;>
pp alias x = shfflr 
pp x keep _best=20 -> the_best

alias x = l0g_wr1t3r
x -> keep;>
pp alias x = l0g_wr1t3r 
pp x keep _best=20 -> the_best

alias x = l0ckjaw
x -> keep;>
pp alias x = l0ckjaw 
pp x keep _best=20 -> the_best



pp * keep !the_best -> sell keep=undefined

pp * !keep !sell !cull -> anomaly
pp * sell price=undefined -> price="NO PRICE!!!!!!"

pp * -> display

