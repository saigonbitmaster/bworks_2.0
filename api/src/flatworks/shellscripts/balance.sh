#!/bin/zsh
#run script: zsh balance.sh walletName/scriptName
#walletName is fileName of a wallet in wallets folder e.g wallet01
#the command to query contract & wallet address is the same
#./balance.sh unlockByBWorksWithDeadLineScript
#./balance.sh wallet01
BASEDIR=$(dirname $0)

$CARDANO_CLI query utxo --address $(cat ${BASEDIR}/wallets/$1.addr) --testnet-magic $TESTNET_MAGIC