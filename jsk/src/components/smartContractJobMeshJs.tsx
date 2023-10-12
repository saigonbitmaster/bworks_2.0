import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Typography from "@mui/material/Typography";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";

//Component for inline datum
export default function SmartContract(props) {
  const [value, setValue] = React.useState("1");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    //temporary disabled unlock tab to unlock by admin.
    /*  if (value === "1") {
      return;
    } */
    setValue(newValue);
  };

  const handleSmartContractChange = props.handleContractChange;
  const handleJobBidChange = props.handleJobBidChange;
  const handleUnlockUserChange = props.handleUnlockUserChange;
  const selectedContract = props.contract?.selected || null;
  const selectedJobBid = props.jobBids?.selected || null;
  const selectedUnlockUser = props.unlockUsers?.selected || null;
  const contracts = props.contract?.contracts || [];
  const jobBids = props.jobBids?.jobBids || [];
  const unlockUsers = props.unlockUsers?.unlockUsers || [];
  const plutusTxs = props.plutusTxs?.plutusTxs || [];
  const handlePlutusTxChange = props.handlePlutusTxChange || null;
  const selectedPlutusTx = props.plutusTxs?.selected || null;
  const sendAdaToPlutus = props.sendAdaToPlutus || null;
  const redeemAdaValues = props.redeemAdaValues || null;
  const handleChangeLockAda = props.handleChangeLockAda || null;
  const handleChangRedeemAda = props.handleChangRedeemAda || null;
  const redeemAdaFromPlutus = props.redeemAdaFromPlutus || null;
  const amountToLock = props.amountToLock || {};
  const datum = props.datum || {};
  const handleChangeUnlockPartner = props.handleChangeUnlockPartner || null;
  const unlockPartner = props.unlockPartner || "bworks";
  const handleChangePublicKeyHash = props.handleChangePublicKeyHash || null;
  const receiveAddress = props.receiveAddress || {};
  const handleReceiveAddressChange = props.handleReceiveAddressChange || null;

  if (!contracts || contracts.length === 0) {
    return (
      <Typography variant="subtitle1" gutterBottom>
        {" "}
        No smart contract
      </Typography>
    );
  }

  return (
    <Box sx={{ width: "100%", typography: "body1" }}>
      <TabContext value={value}>
        <Box sx={{ bborderColor: "divider" }}>
          <TabList onChange={handleChange} aria-label="wallet actions">
            <Tab
              value="1"
              label="Lock to smart contract"
              sx={{ padding: 0, marginLeft: 0 }} //to make underline of tab equal to text
            />
            <Tab
              value="2"
              label="Unlock from Smart contract"
              sx={{ padding: 0, marginLeft: 3 }}
            />
          </TabList>
        </Box>
        <TabPanel value="1" sx={{ padding: 0, marginLeft: 0 }}>
          <Box
            sx={{
              paddingTop: 0,
              paddingLeft: 0,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <Box
              sx={{
                paddingTop: 0,
                paddingLeft: 0,
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-start",
              }}
            >
              <FormControl
                variant="standard"
                sx={{ minWidth: 120, marginRight: 1 }}
              >
                <InputLabel id="simple-select-standard-label">
                  Select a smart contract
                </InputLabel>
                <Select
                  sx={{ width: 240 }}
                  labelId="simple-select-standard-label"
                  id="demo-simple-select-standard"
                  value={selectedContract}
                  onChange={handleSmartContractChange}
                  label="contract"
                >
                  {contracts.map((item) => (
                    <MenuItem value={item.id}>{item.name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl variant="standard" sx={{ minWidth: 120 }}>
                <InputLabel id="simple-select-standard-label">
                  Select a job bid
                </InputLabel>
                <Select
                  sx={{ width: 240 }}
                  labelId="simple-select-standard-label"
                  id="demo-simple-select-standard"
                  value={selectedJobBid}
                  onChange={handleJobBidChange}
                  label="contract"
                >
                  {jobBids.map((item) => (
                    <MenuItem value={item.id}>{item.name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
            <TextField
              sx={{ width: 500 }}
              id="standard-basic"
              variant="standard"
              disabled
              value={
                contracts.find((item) => item.id === selectedContract).address
              }
            />
            <TextField
              sx={{ width: 500 }}
              id="standard-basic"
              label="Value (ADA)"
              variant="standard"
              type="number"
              value={amountToLock}
              onChange={handleChangeLockAda}
            />
            <Box
              sx={{
                paddingTop: 0,
                paddingLeft: 0,
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-start",
              }}
            >
              <FormControl variant="standard" sx={{ minWidth: 120 }}>
                <InputLabel id="unlockPartner">
                  Select unlock partner
                </InputLabel>
                <Select
                  labelId="unlockPartner"
                  id="unlockPartner"
                  value={unlockPartner}
                  onChange={handleChangeUnlockPartner}
                  label="Select unlock partner"
                  sx={{ width: 240, mr: 1 }}
                >
                  <MenuItem value={"bworks"}>By bWorks</MenuItem>
                  <MenuItem value={"other"}>By other</MenuItem>
                </Select>
              </FormControl>
              {unlockPartner === "other" && (
                <FormControl variant="standard" sx={{ minWidth: 120 }}>
                  <InputLabel id="simple-select-standard-label">
                    Select a user to unlock
                  </InputLabel>
                  <Select
                    sx={{ width: 240 }}
                    labelId="simple-select-standard-label"
                    id="demo-simple-select-standard"
                    value={selectedUnlockUser}
                    onChange={handleUnlockUserChange}
                    label="userToUnlock"
                  >
                    {unlockUsers.map((item) => (
                      <MenuItem value={item.id}>{item.username}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
            </Box>
            <TextField
              sx={{ width: 500 }}
              id="standard-basic"
              label="Datum PublicKeyHash"
              variant="standard"
              value={datum.publicKeyHash}
              onChange={handleChangePublicKeyHash}
              disabled={
                unlockPartner === "bworks" || unlockPartner === "employer"
              }
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker
                label="Datum Deadline"
                value={datum.deadline}
                onChange={props.handleChangeDate}
                renderInput={(params) => (
                  <TextField {...params} sx={{ width: 500, p: 0 }} />
                )}
              />
            </LocalizationProvider>

            <Button
              variant="text"
              sx={{ width: 20, marginTop: 3 }}
              onClick={sendAdaToPlutus}
            >
              Submit
            </Button>
          </Box>
        </TabPanel>

        <TabPanel value="2" sx={{ padding: 0 }}>
          <Box
            sx={{
              paddingTop: 0,
              paddingLeft: 0,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Box
              sx={{
                marginLeft: 0,
                paddingTop: 0,
                paddingLeft: 0,
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-start",
              }}
            >
              <FormControl
                variant="standard"
                sx={{ minWidth: 120, marginRight: 1 }}
              >
                <InputLabel id="simple-select-standard-label">
                  Select a smart contract
                </InputLabel>
                <Select
                  sx={{ width: 240 }}
                  labelId="simple-select-standard-label"
                  id="demo-simple-select-standard"
                  value={selectedContract}
                  onChange={handleSmartContractChange}
                  label="contract"
                >
                  {contracts.map((item) => (
                    <MenuItem value={item.id}>{item.name}</MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl variant="standard" sx={{ minWidth: 120 }}>
                <InputLabel id="simple-select-standard-label">
                  Select a locked TX
                </InputLabel>
                <Select
                  sx={{ width: 240 }}
                  labelId="simple-select-standard-label"
                  id="demo-simple-select-standard"
                  value={selectedPlutusTx}
                  onChange={handlePlutusTxChange}
                  label="contract"
                >
                  {plutusTxs.map((item) => (
                    <MenuItem value={item.id}>{item.jobBidName}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
            <TextField
              sx={{ width: 480 }}
              id="standard-basic"
              label="Contract address"
              variant="standard"
              disabled
              value={
                contracts.find((item) => item.id === selectedContract).address
              }
            />
            <TextField
              sx={{ width: 480, fontSize: "small" }}
              id="standard-basic"
              label="Contract CborHex"
              disabled
              variant="standard"
              value={
                contracts.find((item) => item.id === selectedContract).cborhex
              }
            />

            <TextField
              sx={{ width: 480, fontSize: "small" }}
              id="standard-basic"
              label="Locked Tx hash"
              value={redeemAdaValues.lockedTxHash}
              onChange={handleChangRedeemAda("transactionIdLocked")}
              variant="standard"
              disabled
            />
            <TextField
              sx={{ width: 480 }}
              id="standard-basic"
              label="Value (ADA)"
              variant="standard"
              value={redeemAdaValues.amountToRedeem}
              onChange={handleChangRedeemAda("amountToRedeem")}
              type="number"
              disabled
            />
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={receiveAddress.refund}
                    onChange={handleReceiveAddressChange}
                  />
                }
                label="Refund to employer"
              />
            </FormGroup>

            <TextField
              sx={{ width: 480 }}
              id="standard-basic"
              label={
                receiveAddress.refund
                  ? "Employer wallet address"
                  : "Job seeker wallet address"
              }
              variant="standard"
              value={receiveAddress.address}
              //   onChange={handleChangRedeemAda("amountToRedeem")}

              disabled
            />
            <TextField
              sx={{ width: 240 }}
              id="standard-basic"
              label="Transaction index"
              variant="standard"
              type="number"
              disabled
              value={redeemAdaValues.transactionIndxLocked}
              onChange={handleChangRedeemAda("transactionIndxLocked")}
            />

            <TextField
              sx={{ width: 240 }}
              id="standard-basic"
              label="Fee"
              variant="standard"
              value={redeemAdaValues.manualFee}
              onChange={handleChangRedeemAda("manualFee")}
              disabled
            />
            <Button
              variant="text"
              sx={{ width: 20, marginTop: 3 }}
              onClick={redeemAdaFromPlutus}
            >
              Submit
            </Button>
          </Box>
        </TabPanel>
      </TabContext>

      <Typography
        variant="subtitle1"
        sx={{
          ml: 0,
          color: "green",
          ...(props.notification?.error === true && { color: "red" }),
        }}
      >
        {props.notification?.message}
      </Typography>
    </Box>
  );
}
