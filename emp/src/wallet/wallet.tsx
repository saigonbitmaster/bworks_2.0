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
} from "react-admin";
import { Box } from "@mui/material";
import { useGetOne } from "react-admin";
import ProcessBar from "../components/processBar";
import CloseIcon from "@mui/icons-material/Close";
const Wallet = (props) => {
  const {
    data: wallet,
    isLoading,
    error,
  } = useGetOne("wallets/user", { id: "userId" }, { retry: 1 });

  const [state, setState] = React.useState({
    hasWallet: false,
    address: "",
  });

  const [create, setCreate] = React.useState(false);

  React.useEffect(() => {
    wallet &&
      setState({
        hasWallet: true,
        address: wallet.address,
      });
  }, [wallet]);

  const onClick = () => {
    !state.hasWallet && setCreate(!create);
  };
  const filter = {
    queryType: "address",
    value: state.address,
  };

  return (
    <Box>
      <Grid
        container
        spacing={2}
        sx={{ marginBottom: "2em", marginTop: "0.5em" }}
      >
        <Grid item xs={12} md={8}>
          {state.hasWallet ? (
            <>
              <Typography variant="body1">Your wallet</Typography>
              <Typography variant="body1">{state.address}</Typography>
              <Typography variant="body2" sx={{ color: "red" }}>
                {"$ADA 10000"}
              </Typography>
            </>
          ) : !create ? (
            <Typography variant="body1">No wallet</Typography>
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
            sx={{ alignSelf: "flex-start" }}
            startIcon={
              create ? (
                <CloseIcon />
              ) : state.hasWallet ? (
                <DeleteIcon />
              ) : (
                <AddIcon />
              )
            }
          >
            {state.hasWallet ? "Delete" : create ? "Cancel" : "Create"}
          </Button>
        </Grid>
      </Grid>

      {state.hasWallet && (
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
