import * as React from "react";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import MuiTextField from "@mui/material/TextField";
import { useDataProvider } from "react-admin";
import { Box } from "@mui/material";
import ProcessBar from "../components/processBar";

const ParseAddress = (props) => {
  const [address, setAddress] = React.useState("");

  const [walletState, setWalletState] = React.useState({
    hasWallet: false,
    message: "",
    address: "",
    pKeyHash: "",
    pKeyHashBech32: "",
  });

  const dataProvider = useDataProvider();

  const onClick = () => {
    dataProvider
      .customMethod("wallets/parseAddress", { data: { address } }, "POST")
      .then((result) => setWalletState({ hasWallet: true, ...result.result }))
      .catch((error) =>
        setWalletState({
          ...walletState,
          hasWallet: false,
          message: "Parse error",
        })
      );
  };

  const handleTextFieldChange = (event) => {
    setAddress(event.target.value);
  };

  return (
    <Box>
      <Grid container spacing={2} sx={{ marginBottom: "2em" }}>
        <Grid item xs={12} md={8} lg={6} xl={6}>
          <MuiTextField
            id="standard-basic"
            label="Cardano address"
            variant="standard"
            fullWidth
            value={address}
            onChange={handleTextFieldChange}
          />
        </Grid>
        <Grid
          item
          xs={12}
          md={4}
          lg={3}
          xl={2}
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-start",
          }}
        >
          <Button onClick={onClick} sx={{ alignSelf: "flex-end" }}>
            Parse
          </Button>
        </Grid>
      </Grid>

      <Grid item xs={12} md={8}>
        <>
          {!walletState.hasWallet && walletState.message && (
            <Typography variant="caption" display="block" sx={{color: "red"}}>
              Parse error, Invalid address
            </Typography>
          )}
           {walletState.hasWallet && (
               <>
            <Typography variant="caption" display="block">
            Address: {walletState.address}
          </Typography>
          <Typography variant="caption" display="block">
            PublicKey hash Bench32: {walletState.pKeyHashBech32}
          </Typography>
          <Typography variant="caption" display="block">
            PublicKey hash: {walletState.pKeyHash}
          </Typography>
          </>
          )}

         
        </>
      </Grid>
    </Box>
  );
};

export default ParseAddress;
