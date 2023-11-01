import {
  Address,
  BaseAddress,
  Costmdls,
  Language,
  CostModel,
  TransactionUnspentOutput,
  TransactionUnspentOutputs,
  TransactionOutput,
  Value,
  TransactionBuilder,
  TransactionBuilderConfigBuilder,
  TransactionOutputBuilder,
  LinearFee,
  BigNum,
  BigInt,
  TransactionHash,
  TransactionInputs,
  TransactionInput,
  TransactionWitnessSet,
  Transaction,
  PlutusData,
  PlutusScripts,
  PlutusScript,
  PlutusList,
  Redeemers,
  Redeemer,
  RedeemerTag,
  Ed25519KeyHashes,
  ConstrPlutusData,
  ExUnits,
  Int,
  hash_script_data,
  hash_plutus_data,
} from "@emurgo/cardano-serialization-lib-asmjs";


export const getTxUnspentOutputs = async (Utxos) => {
  let txOutputs = TransactionUnspentOutputs.new();
  for (const utxo of Utxos) {
    txOutputs.add(utxo.TransactionUnspentOutput);
  }
  return txOutputs;
};

export const protocolParams = {
  linearFee: {
    minFeeA: "44",
    minFeeB: "155381",
  },
  minUtxo: "34482",
  poolDeposit: "500000000",
  keyDeposit: "2000000",
  maxValSize: 5000,
  maxTxSize: 16384,
  priceMem: 0.0577,
  priceStep: 0.0000721,
  coinsPerUtxoWord: "34482",
};

export const costModelVals = [
  205665, 812, 1, 1, 1000, 571, 0, 1, 1000, 24177, 4, 1, 1000, 32, 117366,
  10475, 4, 23000, 100, 23000, 100, 23000, 100, 23000, 100, 23000, 100, 23000,
  100, 100, 100, 23000, 100, 19537, 32, 175354, 32, 46417, 4, 221973, 511, 0, 1,
  89141, 32, 497525, 14068, 4, 2, 196500, 453240, 220, 0, 1, 1, 1000, 28662, 4,
  2, 245000, 216773, 62, 1, 1060367, 12586, 1, 208512, 421, 1, 187000, 1000,
  52998, 1, 80436, 32, 43249, 32, 1000, 32, 80556, 1, 57667, 4, 1000, 10,
  197145, 156, 1, 197145, 156, 1, 204924, 473, 1, 208896, 511, 1, 52467, 32,
  64832, 32, 65493, 32, 22558, 32, 16563, 32, 76511, 32, 196500, 453240, 220, 0,
  1, 1, 69522, 11687, 0, 1, 60091, 32, 196500, 453240, 220, 0, 1, 1, 196500,
  453240, 220, 0, 1, 1, 806990, 30482, 4, 1927926, 82523, 4, 265318, 0, 4, 0,
  85931, 32, 205665, 812, 1, 1, 41182, 32, 212342, 32, 31220, 32, 32696, 32,
  43357, 32, 32247, 32, 38314, 32, 9462713, 1021, 10,
];

export const initTxBuilder = async () => {
  const txBuilder = TransactionBuilder.new(
    TransactionBuilderConfigBuilder.new()
      .fee_algo(
        LinearFee.new(
          BigNum.from_str(protocolParams.linearFee.minFeeA),
          BigNum.from_str(protocolParams.linearFee.minFeeB)
        )
      )
      .pool_deposit(BigNum.from_str(protocolParams.poolDeposit))
      .key_deposit(BigNum.from_str(protocolParams.keyDeposit))
      .coins_per_utxo_word(BigNum.from_str(protocolParams.coinsPerUtxoWord))
      .max_value_size(protocolParams.maxValSize)
      .max_tx_size(protocolParams.maxTxSize)
      .prefer_pure_change(true)
      .build()
  );

  return txBuilder;
};
