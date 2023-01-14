import * as React from "react";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import {
  List,
  Datagrid,
  TextField,
  NumberField,
  ArrayField,
  useCreate,
} from "react-admin";
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
  } = useGetOne("wallets/user", { id: "userId" }, { retry: 1 });
 */
  const [walletState, setWalletState] = React.useState({
    hasWallet: false,
    address: "",
  });

  const { data, total, isLoading, error } = useGetList("wallets", {
    pagination: { page: 1, perPage: 10 },
    filter: { userId: localStorage.getItem("username") },
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
      });
  }, [wallet]);

  const onClick = () => {
    !walletState.hasWallet && setCreate(!create);
  };
  const filter = {
    queryType: "address",
    value: walletState.address,
  };
  //change to userId when update ra-nest-rest to save userId to localStorage

  let walletData = {
    address: state.usedAddress,
    userId: localStorage.getItem("username"),
  };
  const [createWallet, { isLoading: createIsLoading, error: createError }] =
    useCreate();

  const handleClick = () => {
    createWallet("wallets", { data: walletData });
  };

  return (
    <Box>
      <Grid
        container
        spacing={2}
        sx={{ marginBottom: "1em", marginTop: "0.5em", marginLeft: "0.5em" }}
      >
        <Grid item xs={12} md={8}>
          {walletState.hasWallet ? (
            <>
              <Typography variant="body1">Your wallet</Typography>
              <Typography variant="body1">{walletState.address}</Typography>
              <Typography variant="body2" sx={{ color: "red" }}>
                {"$ADA 10000"}
              </Typography>
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
            sx={{ alignSelf: "flex-start", marginRight: "3em" }}
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

      {walletState.address !== state.usedAddress && (
        <Button
          variant="text"
          sx={{ marginLeft: 3 }}
          onClick={() => handleClick()}
        >
          Use this Wallet
        </Button>
      )}
      {walletState.hasWallet && (
        <List
          resource="tools/utxos"
          perPage={25}
          hasCreate={false}
          actions={null}
          sort={{ field: "date", order: "desc" }}
          empty={<></>}
          filter={filter}
        >
          <Datagrid bulkActionButtons={false}>
            <TextField source="tx_hash" />
            <TextField source="block" />
            <ArrayField source="amount">
              <Datagrid bulkActionButtons={false}>
                <TextField source="unit" />
                <NumberField source="quantity" />
              </Datagrid>
            </ArrayField>
          </Datagrid>
        </List>
      )}
    </Box>
  );
};

export default Wallet;
