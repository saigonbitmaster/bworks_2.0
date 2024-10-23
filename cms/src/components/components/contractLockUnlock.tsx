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
import Divider from "@mui/material/Divider";
import {
  Form,
  TextInput,
  SaveButton,
  DateTimeInput,
  ArrayInput,
  NumberInput,
  SimpleFormIterator,
  SelectInput,
  FormDataConsumer,
  ResourceContextProvider,
} from "react-admin";

export default function SmartContract(props) {
  const [value, setValue] = React.useState("1");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const handleSmartContractChange = props.handleContractChange;
  const selectedContract = props.contract?.selected || null;
  const contracts = props.contract?.contracts || [];
  const lockFunction = props.lockFunction || null;
  const handleChangeLockAda = props.handleChangeLockAda || null;
  const unlockFunction = props.unlockFunction || null;
  const amountToLock = props.amountToLock || {};
  const receiveAddress = props.receiveAddress || "";
  const handleReceiveAddressChange = props.handleReceiveAddressChange || null;
  const handleChangeDatum = props.handleChangeDatum || null;
  const handleChangeRedeemer = props.handleChangeRedeemer || null;
  const lockedTxHash = props.lockedTxHash || "";
  const handleChangeLockedTxHash = props.handleChangeLockedTxHash || null;
  const auditName = props.auditName || "";
  const handleChangeAuditName = props.handleChangeAuditName || null;

  if (!contracts || contracts.length === 0) {
    return (
      <Typography variant="subtitle1" gutterBottom>
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
            <TextField
              sx={{ width: 240 }}
              id="standard-basic"
              label="Audit name"
              variant="standard"
              value={auditName}
              onChange={handleChangeAuditName}
            />

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
            <TextField
              sx={{ width: 240 }}
              id="standard-basic"
              label="Amount to lock (ADA)"
              variant="standard"
              type="number"
              value={amountToLock}
              onChange={handleChangeLockAda}
            />

            <Form onSubmit={handleChangeDatum}>
              <Box sx={{ width: 650 }}>
                <ResourceContextProvider value="datum">
                  <ArrayInput source="items" label="Datum">
                    <SimpleFormIterator inline>
                      <SelectInput
                        source="dataType"
                        label="Data type"
                        choices={[
                          { id: "number", name: "Number" },
                          { id: "string", name: "String" },
                          { id: "date", name: "Date" },
                        ]}
                      />

                      <FormDataConsumer>
                        {({ formData, scopedFormData, ...rest }) =>
                          scopedFormData &&
                          scopedFormData.dataType === "number" ? (
                            <NumberInput
                              source="value"
                              helperText={false}
                              sx={{ width: 400 }}
                              {...rest}
                            />
                          ) : scopedFormData &&
                            scopedFormData.dataType === "date" ? (
                            <DateTimeInput
                              source="value"
                              helperText={false}
                              sx={{ width: 400 }}
                              {...rest}
                            />
                          ) : (
                            <TextInput
                              source="value"
                              helperText={false}
                              sx={{ width: 400 }}
                              {...rest}
                            />
                          )
                        }
                      </FormDataConsumer>
                    </SimpleFormIterator>
                  </ArrayInput>
                </ResourceContextProvider>
                <SaveButton label="build datum" icon={<></>} />
                <p>Datum value: {JSON.stringify(props.datum)}</p>
                <p>Contract address: {JSON.stringify(props.scriptAddress)}</p>
              </Box>
            </Form>

            <Box
              sx={{
                paddingTop: 0,
                paddingLeft: 0,
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-start",
              }}
            ></Box>

            <Button
              variant="text"
              sx={{ width: 20, marginTop: 3 }}
              onClick={lockFunction}
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
            </Box>

            <TextField
              sx={{ width: 480, fontSize: "small" }}
              id="standard-basic"
              label="Locked Tx hash"
              value={lockedTxHash}
              onChange={handleChangeLockedTxHash}
              variant="standard"
            />

            <TextField
              sx={{ width: 480 }}
              id="standard-basic"
              label="Receive wallet address"
              variant="standard"
              value={receiveAddress}
              onChange={handleReceiveAddressChange}
            />

            <Form onSubmit={handleChangeRedeemer}>
              <Box sx={{ width: 650 }}>
                <ResourceContextProvider value="redeemer">
                  <ArrayInput source="items" label="Redeemer">
                    <SimpleFormIterator inline>
                      <SelectInput
                        source="dataType"
                        label="Data type"
                        choices={[
                          { id: "number", name: "Number" },
                          { id: "string", name: "String" },
                          { id: "date", name: "Date" },
                        ]}
                      />

                      <FormDataConsumer>
                        {({ formData, scopedFormData, ...rest }) =>
                          scopedFormData &&
                          scopedFormData.dataType === "number" ? (
                            <NumberInput
                              source="value"
                              helperText={false}
                              sx={{ width: 400 }}
                              {...rest}
                            />
                          ) : scopedFormData &&
                            scopedFormData.dataType === "date" ? (
                            <DateTimeInput
                              source="value"
                              helperText={false}
                              sx={{ width: 400 }}
                              {...rest}
                            />
                          ) : (
                            <TextInput
                              source="value"
                              helperText={false}
                              sx={{ width: 400 }}
                              {...rest}
                            />
                          )
                        }
                      </FormDataConsumer>
                    </SimpleFormIterator>
                  </ArrayInput>
                </ResourceContextProvider>
                <SaveButton label="build redeemer" icon={<></>} />
                <p>Redeemer value: {JSON.stringify(props.redeemer)}</p>
                <p>Contract address: {JSON.stringify(props.scriptAddress)}</p>
              </Box>
            </Form>
            <Button
              variant="text"
              sx={{ width: 20, marginTop: 3 }}
              onClick={unlockFunction}
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

      <Divider textAlign="left" sx={{ width: 500, mt: 2 }}></Divider>
      <Typography
        variant="subtitle1"
        sx={{
          ml: 0,
          color: "#e65100",
        }}
      >
        Important notes
      </Typography>
      {value === "1" ? (
        <Typography
          variant="caption"
          sx={{
            ml: 0,
            color: "#ed6c02",
            width: 500,
            wordWrap: "break-word",
          }}
        >
          Before submit the payment transaction please verify with selected
          unlock partner: <br />
          1. They are using Nami wallet. <br />
          2. The Datum PublicKeyHash is their wallet public key hash. <br />
          3. Their wallet has recovery phrase and minimum Ada amount.
        </Typography>
      ) : (
        <Typography
          variant="caption"
          sx={{
            ml: 0,
            color: "#ed6c02",
          }}
        >
          Please verify with receiver its wallet address before submit the
          unlock transaction.
        </Typography>
      )}
    </Box>
  );
}
