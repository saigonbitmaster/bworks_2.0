#!/bin/zsh
#run script: zsh balance.sh walletName/scriptName
#walletName is fileName of a wallet in wallets folder e.g wallet01
#the command to query contract & wallet address is the same
#./balanceMainnet.sh unlockByBWorksWithDeadLineScript
#./balanceMainnet.sh wallet01Mainnet
BASEDIR=$(dirname $0)

$CARDANO_CLI query utxo --address $(cat ${BASEDIR}/wallets/$1.addr) --mainnet