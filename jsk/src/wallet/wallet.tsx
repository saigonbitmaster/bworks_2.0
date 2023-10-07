import * as React from "react";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { useCreate, useUpdate } from "react-admin";
import { Box } from "@mui/material";
import { useGetOne } from "react-admin";
import ProcessBar from "../components/processBar";
import CloseIcon from "@mui/icons-material/Close";

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

import Wallet1 from "../components/wallet";
import { SelectChangeEvent } from "@mui/material/Select";
import { useGetList } from "react-admin";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";

let Buffer = require("buffer/").Buffer;

const Wallet = (props) => {
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

  const [manualChecked, setManualChecked] = React.useState(true);

  const handleManualChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setManualChecked(event.target.checked);
  };

  const [manualAddress, setManualAddress] = React.useState("");

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
  };

  React.useEffect(() => {
    getWallets();
  }, []);

  React.useEffect(() => {
    state.selectedWallet && refresh();
  }, [state.selectedWallet]);
  /* 
  const {
    data: wallet,
    isLoading: userLoading,
    error: userError,
  } = useGetOne("wallets/user", { id: "username" }, { retry: 1 });
 */
  const [walletState, setWalletState] = React.useState({
    hasWallet: false,
    address: "",
    pKeyHash: "",
    pKeyHashBech32: "",
  });

  const { data, total, isLoading, error } = useGetList("wallets", {
    pagination: { page: 1, perPage: 10 },
    filter: { username: localStorage.getItem("username") },
  });
  let wallet;
  if (!isLoading && !error) {
    wallet = data[0];
  }

  const [create, setCreate] = React.useState(false);

  React.useEffect(() => {
    wallet &&
      setWalletState({
        hasWallet: true,
        address: wallet.address,
        pKeyHash: wallet.pKeyHash,
        pKeyHashBech32: wallet.pKeyHashBech32,
      });
  }, [wallet]);

  const onClick = () => {
    !walletState.hasWallet && setCreate(!create);
  };
  const filter = {
    queryType: "address",
    value: walletState.address,
  };
  //change to username when update ra-nest-rest to save username to localStorage

  let walletData = {
    address: manualChecked ? manualAddress : state.usedAddress,
    username: localStorage.getItem("username"),
  };
  const [createWallet, { isLoading: createIsLoading, error: createError }] =
    useCreate();

  const [
    update,
    { data: updateData, isLoading: updateIsLoading, error: updateError },
  ] = useUpdate();

  const handleClick = () => {
    wallet.id
      ? update("wallets", {
          id: wallet.id,
          data: walletData,
          previousData: wallet,
        })
      : createWallet("wallets", { data: walletData });
  };

  return (
    <Box>
      <Grid
        container
        spacing={0}
        sx={{ marginBottom: 1, marginTop: 2, marginLeft: 0 }}
      >
        <Grid item xs={12} md={8}>
          {walletState.hasWallet ? (
            <>
              <Typography variant="body1">Your wallet</Typography>
              <Typography variant="caption" display="block">
                Address: {walletState.address}
              </Typography>
              <Typography variant="caption" display="block">
                PublicKey hash Bench32: {walletState.pKeyHashBech32}
              </Typography>
              <Typography variant="caption" display="block">
                PublicKey hash: {walletState.pKeyHash}
              </Typography>
              {/*  <Typography variant="body2" sx={{ color: "red" }}>
                {"$ADA 10000"}
              </Typography> */}
            </>
          ) : !create ? (
            <Typography variant="body1">No registered wallet</Typography>
          ) : (
            <>
              <ProcessBar />
              <Typography variant="body2">Creating wallet ...</Typography>
            </>
          )}
        </Grid>

        <Grid
          item
          xs={12}
          md={12}
          lg={4}
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-end",
          }}
        >
          <Button
            onClick={onClick}
            disabled={createIsLoading}
            sx={{ alignSelf: "flex-start", marginRight: 1 }}
            startIcon={
              create ? (
                <CloseIcon />
              ) : walletState.hasWallet ? (
                <DeleteIcon />
              ) : (
                <AddIcon />
              )
            }
          >
            {walletState.hasWallet ? "Delete" : create ? "Cancel" : "Create"}
          </Button>
        </Grid>
      </Grid>
      {!manualChecked && (
        <Wallet1
          wallets={state.wallets}
          handleChange={handleChangeWallet}
          balance={state.balance}
          changeAddress={state.changeAddress}
          usedAddress={state.usedAddress}
          networkId={state.networkId}
          refresh={refresh}
          walletIsEnabled={state.walletIsEnabled}
        ></Wallet1>
      )}

      <Box
        sx={{ m: 3, ml: 0, display: "flex", flex: 1, flexDirection: "column" }}
      >
        <FormControlLabel
          control={
            <Checkbox
              defaultChecked
              checked={manualChecked}
              onChange={handleManualChange}
            />
          }
          label="Update wallet manually"
        />
        <TextField
          sx={{ width: 500 }}
          id="standard-basic"
          label="Enter wallet address"
          variant="standard"
          disabled={!manualChecked}
          value={manualAddress}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setManualAddress(event.target.value);
          }}
        />
        {walletState.address !== state.usedAddress && (
          <Button
            variant="text"
            sx={{ marginTop: 3, marginLeft: 0, width: 150 }}
            onClick={() => handleClick()}
          >
            Use this Wallet
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default Wallet;
