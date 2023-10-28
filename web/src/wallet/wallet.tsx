import * as React from "react";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { Box } from "@mui/material";
import {
  useGetOne,
  useRefresh,
  useDelete,
  useCreate,
  useUpdate,
} from "react-admin";
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

  const [
    deleteOne,
    { data: deleteData, isLoading: deleteLoading, error: deleteError },
  ] = useDelete();

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

    //set default selected wallet
    const _wallets = wallets.map((item, index) => {
      if (index === 0) {
        item.selected = true;
      } else {
        item.selected = false;
      }
      return item;
    });

    setState({
      ...state,
      wallets: _wallets,
      selectedWallet: _wallets.find((item) => item.selected === true).name,
    });
  };

  const refresh = async () => {
    const walletKey = state.selectedWallet;

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

  const { data, total, isLoading, error } = useGetList("wallets", {
    pagination: { page: 1, perPage: 10 },
    filter: { username: localStorage.getItem("username") },
  });
  let wallet;
  if (!isLoading && !error && total) {
    wallet = data[0];
  }

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

  const [create, setCreate] = React.useState(false);

  React.useEffect(() => {
    !wallet &&
      setWalletState({
        hasWallet: false,
        address: "",
        pKeyHash: "",
        pKeyHashBech32: "",
      });

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
    if (walletState.hasWallet && wallet) {
      deleteOne("wallets", { id: wallet?.id });
    }
  };

  let walletData = {
    address: manualChecked ? manualAddress : state.usedAddress,
    username: localStorage.getItem("username"),
  };

  const [
    createWallet,
    { data: createData, isLoading: createIsLoading, error: createError },
  ] = useCreate();

  const [
    update,
    { data: updateData, isLoading: updateIsLoading, error: updateError },
  ] = useUpdate();

  const raRefresh = useRefresh();
  React.useEffect(() => {
    raRefresh();
  }, [
    updateData,
    createData,
    updateError,
    createError,
    deleteData,
    deleteError,
  ]);

  const handleClick = () => {
    wallet?.id
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
            disabled={createIsLoading || !walletState.hasWallet} //not create wallet at this version
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

        <Button
          disabled={walletState.address === state.usedAddress || !manualChecked}
          variant="text"
          sx={{ marginTop: 3, marginLeft: 0, width: 150 }}
          onClick={() => handleClick()}
        >
          Use this Wallet
        </Button>
      </Box>
    </Box>
  );
};

export default Wallet;
