import * as React from "react";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import IconButton from "@mui/material/IconButton";
import RefreshIcon from "@mui/icons-material/Refresh";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import ProcessBar from "./processBar";
import lodash from "lodash";

/*
props = {
  handleChange: func,
  refresh: func,
  wallets: [{name: 'yoroi', selected: false}],
  selected: 'yoroi',
  network: 'mainnet',
  balance: 0,
  changeAddress: '',
  usedAddress: ''
}
*/

export default function ConnectWallet(props) {
  const wallets = props.wallets || [];
  const walletIsEnabled = props.walletIsEnabled;
  const selected = wallets.find((item) => item.selected === true)?.name;
  const [showProcessBar, setShowProcessBar] = React.useState(true);
  const [processBarLabel, setProcessBarLabel] = React.useState(
    "Fetching installed wallets ..."
  );

  setTimeout(() => {
    setProcessBarLabel(`Found ${wallets.length} wallets`);
  }, 4000);

  setTimeout(() => {
    setProcessBarLabel(`Fetching completed`);
  }, 5000);

  setTimeout(() => {
    setShowProcessBar(false);
  }, 7000);

  return (
    <Box
      sx={{ m: 3, ml: 0, display: "flex", flex: 1, flexDirection: "column" }}
    >
      <Typography
        variant="body2"
        color="text.secondary"
        sx={wallets.length === 0 ? { color: "red" } : null}
      >
        {wallets.length > 0 ? "Select a wallet" : "No wallet found"}
      </Typography>

      <Box sx={{ display: "flex", flex: 1, flexDirection: "row" }}>
        {wallets.map((item) => (
          <FormControlLabel
            control={
              <Checkbox
                checked={item.selected}
                onChange={lodash.debounce(props.handleChange, 1000)}
                name={item.name}
                disabled={showProcessBar}
              />
            }
            label={item.name}
          />
        ))}
      </Box>

      {showProcessBar && <ProcessBar label={processBarLabel}></ProcessBar>}

      <Card variant="outlined">
        <CardHeader
          avatar={<AccountBalanceWalletOutlinedIcon fontSize="large" />}
          action={
            <IconButton aria-label="settings" onClick={props.refresh}>
              <RefreshIcon />
            </IconButton>
          }
          title={`${selected ? selected : ""} wallet status`}
          subheader={new Date().toString()}
        />

        <CardContent>
          <FormControlLabel
            control={<Checkbox checked={walletIsEnabled} disabled />}
            label={`${props.networkId === 0 ? "Testnet" : "Mainnet"} Connected`}
          />
          <Typography variant="body2" color="text.secondary">
            Balance: {props.balance}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Change Address: {props.changeAddress}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Used Address: {props.usedAddress}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}
