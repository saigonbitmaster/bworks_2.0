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

export default function SmartContract(props) {
  const [value, setValue] = React.useState("1");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const handleSmartContractChange = props.handleContractChange;
  const contract = props.contract.selected;

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
            }}
          >
            <FormControl variant="standard" sx={{ minWidth: 120 }}>
              <InputLabel id="simple-select-standard-label">
                Select a smart contract
              </InputLabel>
              <Select
                sx={{ width: 240 }}
                labelId="simple-select-standard-label"
                id="demo-simple-select-standard"
                value={contract}
                onChange={handleSmartContractChange}
                label="contract"
              >
                <MenuItem value={10}>Job with deadLine</MenuItem>
                <MenuItem value={20}>Job without deadLine</MenuItem>
              </Select>
            </FormControl>
            <TextField
              sx={{ width: 480 }}
              id="standard-basic"
              label="Script address"
              variant="standard"
            />
            <TextField
              sx={{ width: 480 }}
              id="standard-basic"
              label="Value (ADA)"
              variant="standard"
              type="number"
            />
            <TextField
              sx={{ width: 480 }}
              id="standard-basic"
              label="Datum to lock"
              variant="standard"
            />
            <Button variant="text" sx={{ width: 20, marginTop: 3 }}>
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
            <FormControl variant="standard" sx={{ minWidth: 120 }}>
              <InputLabel id="simple-select-standard-label">
                Select a smart contract
              </InputLabel>
              <Select
                sx={{ width: 240 }}
                labelId="simple-select-standard-label"
                id="demo-simple-select-standard"
                value={contract}
                onChange={handleSmartContractChange}
                label="contract"
              >
                <MenuItem value={10}>Job with deadLine</MenuItem>
                <MenuItem value={20}>Job without deadLine</MenuItem>
              </Select>
            </FormControl>
            <TextField
              sx={{ width: 480 }}
              id="standard-basic"
              label="Contract address"
              variant="standard"
            />
            <TextField
              sx={{ width: 480 }}
              id="standard-basic"
              label="Contract CborHex"
              variant="standard"
            />
            <TextField
              sx={{ width: 480 }}
              id="standard-basic"
              label="UTXO where ADA is locked"
              variant="standard"
            />
            <TextField
              sx={{ width: 480 }}
              id="standard-basic"
              label="Transaction index"
              variant="standard"
              type="number"
            />
            <TextField
              sx={{ width: 480 }}
              id="standard-basic"
              label="Value (ADA)"
              variant="standard"
              type="number"
            />
            <TextField
              sx={{ width: 480 }}
              id="standard-basic"
              label="Datum to unlock"
              variant="standard"
            />
            <TextField
              sx={{ width: 480 }}
              id="standard-basic"
              label="Fee"
              variant="standard"
              type="number"
            />
            <Button variant="text" sx={{ width: 20, marginTop: 3 }}>
              Submit
            </Button>
          </Box>
        </TabPanel>
      </TabContext>
    </Box>
  );
}
