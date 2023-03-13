import React from "react";
import {
  Address,
  BaseAddress,
  Costmdls,
  Language,
  CostModel,
  TransactionUnspentOutput,
  TransactionOutput,
  Value,
  TransactionOutputBuilder,
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

import Wallet from "../components/wallet";
import SmartContractJob from "../components/smartContractJobSimpleDatum";
import { SelectChangeEvent } from "@mui/material/Select";
import { useGetList } from "react-admin";
import {
  costModelVals,
  initTxBuilder,
  getTxUnspentOutputs,
} from "../cardano/walletParams";
let Buffer = require("buffer/").Buffer;


//component for alonzo era with simple data
const SmartContracts = () => {
  const initState = {
    selectedWallet: null,
    walletFound: false,
    walletIsEnabled: false,
    wallets: [],
    networkId: null,
    balance: null,
    changeAddress: null,
    usedAddress: null,
    submittedTxHash: null,
    transactionIdLocked: null,
    lovelaceLocked: null,
  };
  let API = null;

  const [state, setState] = React.useState(initState);
  const [Utxos, setUtxos] = React.useState([]);

  const initContract = {
    selected: "",
    contracts: [],
  };
  const [contract, setContract] = React.useState(initContract);

  const { data, total, isLoading, error } = useGetList("contracts", {
    pagination: { page: 1, perPage: 10 },
    sort: { field: "createdDate", order: "DESC" },
  });

  const initJobBids = {
    selected: "0",
    jobBids: [],
  };
  const [jobBids, setJobBids] = React.useState(initJobBids);

  //{ data, total, isLoading, error } =  useGetList("jobbids",{})
  const jobBidReturn = useGetList("jobbids", {
    pagination: { page: 1, perPage: 10 },
    sort: { field: "createdDate", order: "DESC" },
    filter: { queryType: "employer" },
  });

  React.useEffect(() => {
    if (
      !jobBidReturn.isLoading &&
      !jobBidReturn.error &&
      jobBidReturn.data.length > 0
    ) {
      const selected = jobBidReturn.data[0].id;
      setJobBids({ selected, jobBids: jobBidReturn.data });
    }
  }, [jobBidReturn.data]);

  React.useEffect(() => {
    const amountToLock =
      jobBids.jobBids.find((item) => item.id === jobBids.selected)?.bidValue ||
      0;
    setLockAdaValues({
      ...lockAdaValues,
      amountToLock: amountToLock.toString(),
    });
  }, [jobBids.selected]);

  React.useEffect(() => {
    if (!isLoading && !error) {
      const selected = data[0].id;
      setContract({ selected, contracts: data });
    }
  }, [data]);

  const [CollatUtxos, setCollatUtxos] = React.useState([]);

  const [lockAdaValues, setLockAdaValues] = React.useState({
    amountToLock: "",
    datumToLock: "",
  });

  const [redeemAdaValues, setRedeemAdaValues] = React.useState({
    amountToRedeem: "",
    datumToRedeem: "",
    transactionIdLocked: "",
    transactionIndxLocked: "",
    manualFee: "900000",
  });

  const getUtxos = async () => {
    let _Utxos = [];
    try {
      const rawUtxos = await API.getUtxos();

      for (const rawUtxo of rawUtxos) {
        const utxo = TransactionUnspentOutput.from_bytes(
          Buffer.from(rawUtxo, "hex")
        );
        const input = utxo.input();
        const txid = Buffer.from(
          input.transaction_id().to_bytes(),
          "utf8"
        ).toString("hex");
        const txindx = input.index();
        const output = utxo.output();
        const amount = output.amount().coin().to_str();
        const multiasset = output.amount().multiasset();
        let multiAssetStr = "";

        if (multiasset) {
          const keys = multiasset.keys();
          const N = keys.len();
          for (let i = 0; i < N; i++) {
            const policyId = keys.get(i);
            const policyIdHex = Buffer.from(
              policyId.to_bytes(),
              "utf8"
            ).toString("hex");
            const assets = multiasset.get(policyId);
            const assetNames = assets.keys();
            const K = assetNames.len();

            for (let j = 0; j < K; j++) {
              const assetName = assetNames.get(j);
              const assetNameString = Buffer.from(
                assetName.name(),
                "utf8"
              ).toString();
              const assetNameHex = Buffer.from(
                assetName.name(),
                "utf8"
              ).toString("hex");
              const multiassetAmt = multiasset.get_asset(policyId, assetName);
              multiAssetStr += `+ ${multiassetAmt.to_str()} + ${policyIdHex}.${assetNameHex} (${assetNameString})`;
            }
          }
        }

        const obj = {
          txid: txid,
          txindx: txindx,
          amount: amount,
          str: `${txid} #${txindx} = ${amount}`,
          multiAssetStr: multiAssetStr,
          TransactionUnspentOutput: utxo,
        };
        _Utxos.push(obj);
      }
      setUtxos(_Utxos);
    } catch (err) {
      console.log("getUtxos", err);
    }
  };

  const sendAdaToPlutus = async () => {
    const txBuilder = await initTxBuilder();
    const selectedContract = contract.contracts.find(
      (item) => item.id === contract.selected
    );
    const ScriptAddress = Address.from_bech32(selectedContract.address);
    const shelleyChangeAddress = Address.from_bech32(state.changeAddress);
    let txOutputBuilder = TransactionOutputBuilder.new() as any;
    txOutputBuilder = txOutputBuilder.with_address(ScriptAddress);
    //datums to lock
    const dataHash = hash_plutus_data(
      PlutusData.new_integer(BigInt.from_str(lockAdaValues.datumToLock))
    );
    txOutputBuilder = txOutputBuilder.with_data_hash(dataHash);
    txOutputBuilder = txOutputBuilder.next();

    //ada to  lock
    let lovelaceToLock = parseInt(lockAdaValues.amountToLock) * 1000000;

    txOutputBuilder = txOutputBuilder.with_value(
      Value.new(BigNum.from_str(lovelaceToLock.toString()))
    );

    const txOutput = txOutputBuilder.build();

    txBuilder.add_output(txOutput);

    const txUnspentOutputs = await getTxUnspentOutputs(Utxos);
    //The options are 0 for LargestFirst, 1 for RandomImprove, 2 for LargestFirstMultiAsset and 3 for RandomImproveMultiAsset
    txBuilder.add_inputs_from(txUnspentOutputs, 2);
    txBuilder.add_change_if_needed(shelleyChangeAddress);
    const txBody = txBuilder.build();

    const transactionWitnessSet = TransactionWitnessSet.new();

    const tx = Transaction.new(
      txBody,
      TransactionWitnessSet.from_bytes(transactionWitnessSet.to_bytes())
    );

    API = await (window as any).cardano[state.selectedWallet].enable();
    let txVkeyWitnesses = await API.signTx(
      Buffer.from(tx.to_bytes(), "utf8").toString("hex"),
      true
    );
    txVkeyWitnesses = TransactionWitnessSet.from_bytes(
      Buffer.from(txVkeyWitnesses, "hex")
    );

    transactionWitnessSet.set_vkeys(txVkeyWitnesses.vkeys());
    const signedTx = Transaction.new(tx.body(), transactionWitnessSet);
    const submittedTxHash = await API.submitTx(
      Buffer.from(signedTx.to_bytes(), "utf8").toString("hex")
    );

    console.log("submittedTxHash", submittedTxHash);
    setState({
      ...state,
      submittedTxHash: submittedTxHash,
      transactionIdLocked: submittedTxHash,
      lovelaceLocked: lovelaceToLock,
    });
  };

  const redeemAdaFromPlutus = async () => {
    const txBuilder = await initTxBuilder();
    const selectedContract = contract.contracts.find(
      (item) => item.id === contract.selected
    );

    const ScriptAddress = Address.from_bech32(selectedContract.address);
    const shelleyChangeAddress = Address.from_bech32(state.changeAddress);
    const contractCborhex = selectedContract.cborhex;

    const lovelaceLocked = parseInt(redeemAdaValues.amountToRedeem) * 1000000;

    txBuilder.add_input(
      ScriptAddress,
      TransactionInput.new(
        TransactionHash.from_bytes(
          Buffer.from(redeemAdaValues.transactionIdLocked, "hex")
        ),
        parseInt(redeemAdaValues.transactionIndxLocked)
      ),
      Value.new(BigNum.from_str(lovelaceLocked.toString()))
    ); // how much lovelace is at that UTXO

    txBuilder.set_fee(BigNum.from_str(redeemAdaValues.manualFee));

    const scripts = PlutusScripts.new();
    scripts.add(PlutusScript.from_bytes(Buffer.from(contractCborhex, "hex"))); //from cbor of plutus script

    // Add outputs
    const outputVal = lovelaceLocked - Number(redeemAdaValues.manualFee);

    const outputValStr = outputVal.toString();
    txBuilder.add_output(
      TransactionOutput.new(
        shelleyChangeAddress,
        Value.new(BigNum.from_str(outputValStr))
      )
    );

    const txBody = txBuilder.build();
    const _collateral = CollatUtxos;
    //get last 02 utxo to fix error of too many collaterals
    const collateral = _collateral.slice(-2);
    console.log(collateral);
    const inputs = TransactionInputs.new();
    collateral.forEach((utxo) => {
      inputs.add(utxo.input());
    });

    let datums = PlutusList.new();
    datums.add(
      PlutusData.new_integer(BigInt.from_str(redeemAdaValues.datumToRedeem))
    );

    const redeemers = Redeemers.new();

    const data = PlutusData.new_constr_plutus_data(
      ConstrPlutusData.new(BigNum.from_str("0"), PlutusList.new())
    );
    const redeemer = Redeemer.new(
      RedeemerTag.new_spend(),
      BigNum.from_str("0"),
      data,
      ExUnits.new(BigNum.from_str("7000000"), BigNum.from_str("3000000000"))
    );

    redeemers.add(redeemer);

    const transactionWitnessSet = TransactionWitnessSet.new();
    transactionWitnessSet.set_plutus_scripts(scripts);
    transactionWitnessSet.set_plutus_data(datums);
    transactionWitnessSet.set_redeemers(redeemers);

    const costModel = CostModel.new();
    costModelVals.forEach((x, i) => costModel.set(i, Int.new_i32(x)));

    const costModels = Costmdls.new();
    costModels.insert(Language.new_plutus_v1(), costModel);

    const scriptDataHash = hash_script_data(redeemers, costModels, datums);
    txBody.set_script_data_hash(scriptDataHash);

    txBody.set_collateral(inputs);

    const baseAddress = BaseAddress.from_address(shelleyChangeAddress);
    const requiredSigners = Ed25519KeyHashes.new();
    requiredSigners.add(baseAddress.payment_cred().to_keyhash());

    txBody.set_required_signers(requiredSigners);

    const tx = Transaction.new(
      txBody,
      TransactionWitnessSet.from_bytes(transactionWitnessSet.to_bytes())
    );
    const walletKey = state.selectedWallet;
    API = await (window as any).cardano[walletKey].enable();

    let txVkeyWitnesses = await API.signTx(
      Buffer.from(tx.to_bytes(), "utf8").toString("hex"),
      true
    );
    txVkeyWitnesses = TransactionWitnessSet.from_bytes(
      Buffer.from(txVkeyWitnesses, "hex")
    );

    transactionWitnessSet.set_vkeys(txVkeyWitnesses.vkeys());

    const signedTx = Transaction.new(tx.body(), transactionWitnessSet);

    let submittedTxHash;
    try {
      submittedTxHash = await API.submitTx(
        Buffer.from(signedTx.to_bytes(), "utf8").toString("hex")
      );
    } catch (e) {
      console.log("submitTx", e);
    }
    console.log("submittedTxHash", submittedTxHash);

    setState({ ...state, submittedTxHash });
  };

  const handleChangeWallet = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    const selectedWallet = event.target.name;
    setState({
      ...state,
      selectedWallet,
      wallets: state.wallets.map((item) => {
        item.name === name ? (item.selected = true) : (item.selected = false);
        return item;
      }),
    });
  };

  const handleContractChange = (event: SelectChangeEvent) => {
    setContract({ ...contract, selected: event.target.value });
  };

  const handleJobBidChange = (event: SelectChangeEvent) => {
    setJobBids({ ...jobBids, selected: event.target.value });
  };

  const getWallets = (count = 0) => {
    const wallets = [];
    for (const key in (window as any).cardano) {
      if (
        (window as any).cardano[key].enable &&
        wallets.filter((item) => item.name === key).length === 0
      ) {
        wallets.push({ name: key, selected: false });
      }
    }

    if (wallets.length === 0 && count < 4) {
      setTimeout(() => {
        getWallets(count + 1);
      }, 1000);
      return;
    }

    wallets.push({ name: "bworks", selected: true });

    setState({
      ...state,
      wallets,
      selectedWallet: wallets.find((item) => item.selected === true).name,
    });
  };

  const refresh = async () => {
    const walletKey = state.selectedWallet;
    if (walletKey === "bworks") {
      setState({
        ...state,
        balance: 2332.710075,
        networkId: 0,
        usedAddress:
          "addr_test1qrsyt5qv7pvdcqf9thpmjyv6kukpqv4nmr3tqjy6k6tm6705dl4czkn5ap78f35r0q8yudwazghgqdcad4sx2srew9vqe7c7lv",
        changeAddress:
          "addr_test1qrsyt5qv7pvdcqf9thpmjyv6kukpqv4nmr3tqjy6k6tm6705dl4czkn5ap78f35r0q8yudwazghgqdcad4sx2srew9vqe7c7lv",
        walletFound: true,
        walletIsEnabled: true,
      });
      return;
    }

    const walletFound = !!(window as any)?.cardano?.[walletKey];
    if (!walletFound) {
      return;
    }
    API = await (window as any).cardano[walletKey].enable();

    const networkId = await API.getNetworkId();
    const balanceCBORHex = await API.getBalance();
    const balance = Value.from_bytes(Buffer.from(balanceCBORHex, "hex"))
      .coin()
      .to_str();

    const usedAddressRaw = (await API.getUsedAddresses()) || [];
    const changeAddressRaw = (await API.getChangeAddress()) || null;
    const usedAddress =
      !usedAddressRaw || usedAddressRaw.length === 0
        ? null
        : Address.from_bytes(Buffer.from(usedAddressRaw[0], "hex")).to_bech32();

    const changeAddress = changeAddressRaw
      ? Address.from_bytes(Buffer.from(changeAddressRaw, "hex")).to_bech32()
      : null;

    setState({
      ...state,
      balance,
      networkId,
      usedAddress,
      changeAddress,
      walletFound,
      walletIsEnabled: true,
    });
    await getUtxos();
    await getCollateral();
  };

  React.useEffect(() => {
    getWallets();
  }, []);

  React.useEffect(() => {
    state.selectedWallet && refresh();
  }, [state.selectedWallet]);

  const getCollateral = async () => {
    let _CollatUtxos = [];
    const walletKey = state.selectedWallet;
    API = await (window as any).cardano[walletKey].enable();
    try {
      let collateral = [];

      if (walletKey === "nami") {
        collateral = await API.experimental.getCollateral();
      } else {
        //need number to avoid error
        collateral = await API.getCollateral("2000000");
      }
      for (const x of collateral) {
        const utxo = TransactionUnspentOutput.from_bytes(Buffer.from(x, "hex"));
        _CollatUtxos.push(utxo);
      }
      setCollatUtxos(_CollatUtxos);
    } catch (err) {
      console.log("getCollateral", err);
    }
  };

  //lockAda data

  const handleChangeLockAda =
    (prop) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setLockAdaValues({ ...lockAdaValues, [prop]: event.target.value });
    };

  //redeem data

  const handleChangRedeemAda =
    (prop) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setRedeemAdaValues({ ...redeemAdaValues, [prop]: event.target.value });
    };

  return (
    <div>
      <Wallet
        wallets={state.wallets}
        handleChange={handleChangeWallet}
        balance={state.balance}
        changeAddress={state.changeAddress}
        usedAddress={state.usedAddress}
        networkId={state.networkId}
        refresh={refresh}
        walletIsEnabled={state.walletIsEnabled}
      ></Wallet>
      <SmartContractJob
        handleContractChange={handleContractChange}
        handleJobBidChange={handleJobBidChange}
        contract={contract}
        jobBids={jobBids}
        sendAdaToPlutus={sendAdaToPlutus}
        redeemAdaFromPlutus={redeemAdaFromPlutus}
        handleChangeLockAda={handleChangeLockAda}
        handleChangRedeemAda={handleChangRedeemAda}
        lockAdaValues={lockAdaValues}
        redeemAdaValues={redeemAdaValues}
      ></SmartContractJob>
    </div>
  );
};

export default SmartContracts;
