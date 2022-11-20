import React from "react";
import "../node_modules/@blueprintjs/core/lib/css/blueprint.css";
import "../node_modules/@blueprintjs/icons/lib/css/blueprint-icons.css";
import "../node_modules/normalize.css/normalize.css";
import { Address, Value } from "@emurgo/cardano-serialization-lib-asmjs";
import "./App.css";
import Wallet from "./wallet";

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

  const getWallets = (count = 0) => {
    const wallets = [];
    for (const key in window.cardano) {
      if (
        window.cardano[key].enable &&
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
      selectedWallet: wallets.filter((item) => item.selected === true).name,
    });
  };

  const refresh = async () => {
    const walletKey = state.selectedWallet;
    if (walletKey === "bworks") {
      setState({
        ...state,
        balance: 0,
        networkId: 0,
        usedAddress: "bworks",
        changeAddress: "bworks",
        walletFound: true,
        walletIsEnabled: true,
      });
      return;
    }

    const walletFound = !!window?.cardano?.[walletKey];
    if (!walletFound) {
      return;
    }
    API = await window.cardano[walletKey].enable();

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
    <div style={{ margin: "20px" }}>
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
    </div>
  );
};

export default WalletExplorer;
