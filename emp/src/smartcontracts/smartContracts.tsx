import React from "react";
import { Address, Value } from "@emurgo/cardano-serialization-lib-asmjs";
import Wallet from "../components/wallet";
import SmartContract from "../components/smartContract";
import { SelectChangeEvent } from "@mui/material/Select";
import { useGetList } from "react-admin";

let Buffer = require("buffer/").Buffer;

const WalletExplorer = () => {
  const initState = {
    selectedWallet: null,
    walletFound: false,
    walletIsEnabled: false,
    wallets: [],
    networkId: null,
    balance: null,
    changeAddress: null,
    usedAddress: null,
  };
  let API = null;

  const [state, setState] = React.useState(initState);

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

  const initContract = {
    selected: "",
    contracts: [],
  };

  const { data, total, isLoading, error } = useGetList("contracts", {
    pagination: { page: 1, perPage: 10 },
    sort: { field: "createdDate", order: "DESC" },
  });

  const [contract, setContract] = React.useState(initContract);
  React.useEffect(() => {
    if (!isLoading && !error) {
      const selected = data[0].id;
      setContract({ selected, contracts: data });
    }
  }, [data]);

  const handleContractChange = (event: SelectChangeEvent) => {
    setContract({ ...contract, selected: event.target.value });
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
        usedAddress: "addr_test1qrsyt5qv7pvdcqf9thpmjyv6kukpqv4nmr3tqjy6k6tm6705dl4czkn5ap78f35r0q8yudwazghgqdcad4sx2srew9vqe7c7lv",
        changeAddress: "addr_test1qrsyt5qv7pvdcqf9thpmjyv6kukpqv4nmr3tqjy6k6tm6705dl4czkn5ap78f35r0q8yudwazghgqdcad4sx2srew9vqe7c7lv",
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
  };

  React.useEffect(() => {
    getWallets();
  }, []);

  React.useEffect(() => {
    state.selectedWallet && refresh();
  }, [state.selectedWallet]);

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
      <SmartContract
        handleContractChange={handleContractChange}
        contract={contract}
      ></SmartContract>
    </div>
  );
};

export default WalletExplorer;
