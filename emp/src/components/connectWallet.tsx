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
  return (
    <Box sx={{ m: 3, display: "flex", flex: 1, flexDirection: "column" }}>
      <Typography
        variant="body2"
        color="text.secondary"
        sx={props.wallets.length === 0 ? { color: "red" } : null}
      >
        {props.wallets.length > 0 ? "Select a wallet" : "No wallet found"}
      </Typography>

      <Box sx={{ display: "flex", flex: 1, flexDirection: "row" }}>
        {props.wallets.map((item) => (
          <FormControlLabel
            control={
              <Checkbox
                checked={item.selected}
                onChange={props.handleChange}
                name={item.name}
              />
            }
            label={item.name}
          />
        ))}
      </Box>
      <Card variant="outlined">
        <CardHeader
          avatar={<AccountBalanceWalletOutlinedIcon fontSize="large" />}
          action={
            <IconButton aria-label="settings" onClick={props.refresh}>
              <RefreshIcon />
            </IconButton>
          }
          title={`${props.selected} wallet status`}
          subheader={new Date().toString()}
        />

        <CardContent>
          <FormControlLabel
            control={<Checkbox checked={props.walletConnected} disabled />}
            label={`${props.network === 1 ? "Mainnet" : "Testnet"} connected`}
          />
          <Typography variant="body2" color="text.secondary">
            Balance: {props.balance}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Change Address: {props.changeAddress}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Used Address:{props.usedAddress}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}
