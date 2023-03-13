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

//Component for inline datum
export default function SmartContract(props) {
  const [value, setValue] = React.useState("1");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const handleSmartContractChange = props.handleContractChange;
  const handleJobBidChange = props.handleJobBidChange;

  const selectedContract = props.contract?.selected || null;
  const selectedJobBid = props.jobBids?.selected || null;
  const contracts = props.contract?.contracts || [];
  const jobBids = props.jobBids?.jobBids || [];
  console.log(jobBids, selectedJobBid);

  const sendAdaToPlutus = props.sendAdaToPlutus || null;
  const redeemAdaValues = props.redeemAdaValues || null;
  const handleChangeLockAda = props.handleChangeLockAda || null;
  const handleChangRedeemAda = props.handleChangRedeemAda || null;
  const redeemAdaFromPlutus = props.redeemAdaFromPlutus || null;
  const lockAdaValues = props.lockAdaValues || {};
  const datum = props.datum || {};

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
              label="Submit smart contract"
              sx={{ padding: 0, marginLeft: 3 }} //to make underline of tab equal to text
            />
            <Tab
              value="2"
              label="Release Smart contract"
              sx={{ padding: 0, marginLeft: 3 }}
            />
          </TabList>
        </Box>
        <TabPanel value="1">
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
              value={lockAdaValues.amountToLock}
              onChange={handleChangeLockAda("amountToLock")}
            />
            <TextField
              sx={{ width: 500 }}
              id="standard-basic"
              label="Datum PublicKeyHash"
              variant="standard"
              value={datum.publicKeyHash}
              onChange={handleChangeLockAda("datumToLock")}
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker
                label="Datum Deadline"
                value={props.dateValue}
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

        <TabPanel value="2">
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
                  value={selectedContract}
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
              label="UTXO where ADA is locked"
              value={redeemAdaValues.transactionIdLocked}
              onChange={handleChangRedeemAda("transactionIdLocked")}
              variant="standard"
            />
            <TextField
              sx={{ width: 480 }}
              id="standard-basic"
              label="Transaction index"
              variant="standard"
              type="number"
              value={redeemAdaValues.transactionIndxLocked}
              onChange={handleChangRedeemAda("transactionIndxLocked")}
            />
            <TextField
              sx={{ width: 480 }}
              id="standard-basic"
              label="Value (ADA)"
              variant="standard"
              value={redeemAdaValues.amountToRedeem}
              onChange={handleChangRedeemAda("amountToRedeem")}
              type="number"
            />
            <TextField
              sx={{ width: 480 }}
              id="standard-basic"
              label="Datum to unlock"
              variant="standard"
              value={redeemAdaValues.datumToRedeem}
              onChange={handleChangRedeemAda("datumToRedeem")}
            />
            <TextField
              sx={{ width: 480 }}
              id="standard-basic"
              label="Fee"
              variant="standard"
              type="number"
              value={redeemAdaValues.manualFee}
              onChange={handleChangRedeemAda("manualFee")}
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
          ml: 3,
          color: "green",
          ...(props.notification?.error === true && { color: "red" }),
        }}
      >
        {props.notification?.message}
      </Typography>
    </Box>
  );
}
