#!/bin/zsh
#this script is similar to getFromScriptV2 except it call different functions from functions.sh 
#to auto select collatel utxo & curent locked utxo (the utxo need to be unlock)
#zsh getFromScript scriptName redeemerJsonFile payCollatelWalletName receiveWalletAddress scriptTxHash
#zsh getFromScriptV2AutoSelectUtxo.sh bworksV2 secret.json wallet01 addr_test1vz52h0cn9ua9vl8ak4yz4czas3sf3ftjy82a5tt7ladhufqyuk45c 6e767bbbff2b90e163ae4f1225b563bc11fd33642c3c43c7aca55f90a7bd5cdd 

BASEDIR=$(dirname $0)

source ${BASEDIR}/functions.sh

SCRIPT_NAME=${1}
SCRIPT_FILE=${BASEDIR}/plutusscripts/${SCRIPT_NAME}.plutus
REDEEMER_JSON_FILE=${2}
PAY_COLLATEL_WALLET=${3}
SIGNING_WALLET=${3}
RECEIVER_ADDR=${4}
SCRIPT_TXHASH=${5}
SCRIPT_ADDRESS=$(${CARDANO_CLI} address build --payment-script-file ${SCRIPT_FILE} --testnet-magic ${TESTNET_MAGIC_NUM})
echo ${SCRIPT_ADDRESS} > ${BASEDIR}/wallets/${SCRIPT_NAME}.addr

section "Get Script UTxO"
getScriptUtxo ${SCRIPT_NAME} ${SCRIPT_TXHASH} 
SCRIPT_UTXO=${SELECTED_UTXO}
LOCKED_ASSET_VALUE=${SELECTED_UTXO_LOVELACE}

section "Select Collateral UTxO"
getCollatelUtxo wallet01
COLLATERAL_TX=${SELECTED_UTXO}

$CARDANO_CLI query protocol-parameters --testnet-magic ${TESTNET_MAGIC_NUM} > ${BASEDIR}/params.json

removeTxFiles

echo TEST VARIABLES
echo SIGNING_WALLET ${SIGNING_WALLET}
echo COLLATERAL_TX ${COLLATERAL_TX}
echo RECEIVER_ADDR ${RECEIVER_ADDR}
echo SCRIPT_FILE ${SCRIPT_FILE}
echo SCRIPT_UTXO ${SCRIPT_UTXO}
echo LOCKED_ASSET_VALUE ${LOCKED_ASSET_VALUE} 


$CARDANO_CLI transaction build \
--babbage-era \
--required-signer ${BASEDIR}/wallets/${SIGNING_WALLET}.skey \
--testnet-magic ${TESTNET_MAGIC_NUM} \
--tx-in ${SCRIPT_UTXO} \
--tx-in-script-file ${SCRIPT_FILE} \
--tx-in-datum-file ${BASEDIR}/secret.json \
--tx-in-redeemer-file ${BASEDIR}/${REDEEMER_JSON_FILE} \
--tx-in-collateral ${COLLATERAL_TX} \
--change-address ${RECEIVER_ADDR} \
--protocol-params-file ${BASEDIR}/params.json \
--out-file ${BASEDIR}/tx.build


$CARDANO_CLI transaction sign \
--tx-body-file ${BASEDIR}/tx.build \
--signing-key-file ${BASEDIR}/wallets/${SIGNING_WALLET}.skey \
--testnet-magic ${TESTNET_MAGIC_NUM} \
--out-file ${BASEDIR}/tx.signed \

$CARDANO_CLI transaction submit --tx-file ${BASEDIR}/tx.signed --testnet-magic ${TESTNET_MAGIC_NUM}


#print txHash
TX_HASH=$($CARDANO_CLI transaction txid --tx-file ${BASEDIR}/tx.signed) 
DATE=$(date)
echo "Summited TxHash:" ${TX_HASH} "Date:" ${DATE}