#!/bin/zsh
#zsh payToScript valueInLovelace scriptName datumJsonFile walletName
#zsh payToScriptV2AutoSeletUtxo.sh  3100000 bworksV2 secret.json wallet01

source ./functions.sh

getInputTxAuto ${4}

FROM_ADDR=${SELECTED_WALLET_ADDR}
VALUE_TO_LOCK=${1}
SCRIPT_NAME=${2}
SCRIPT_ADDRESS=$(${CARDANO_CLI} address build --payment-script-file ../generated-plutus-scripts/bWorksV1/${SCRIPT_NAME}.plutus --testnet-magic ${TESTNET_MAGIC_NUM})
DATUM_FILE=${3}
TO_ADDR=${SCRIPT_ADDRESS}

echo FROM_ADDR ${FROM_ADDR}
echo TO_ADDR ${TO_ADDR}
echo SELECTED_UTXO ${SELECTED_UTXO}


$CARDANO_CLI transaction build \
--babbage-era \
--tx-in ${SELECTED_UTXO} \
--tx-out ${TO_ADDR}+${VALUE_TO_LOCK} \
--tx-out-inline-datum-file ${DATUM_FILE} \
--change-address ${FROM_ADDR} \
--testnet-magic ${TESTNET_MAGIC_NUM} \
--out-file tx.build

$CARDANO_CLI transaction sign \
--tx-body-file tx.build \
--signing-key-file ../wallets/${SELECTED_WALLET_NAME}.skey \
--testnet-magic ${TESTNET_MAGIC_NUM} \
--out-file tx.signed \

$CARDANO_CLI transaction submit --tx-file tx.signed --testnet-magic ${TESTNET_MAGIC_NUM}