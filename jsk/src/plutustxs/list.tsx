import * as React from "react";
import {
  List,
  Datagrid,
  TextField,
  DateField,
  ReferenceField,
  FunctionField,
  NumberField,
  useDataProvider,
} from "react-admin";
import Checkbox from "@mui/material/Checkbox";
const ListScreen = () => {
  const dataProvider = useDataProvider();
  const [userId, setUserId] = React.useState("");
  //get userId from APi to filter
  React.useEffect(() => {
    dataProvider
      .customMethod("customapis/userid", { filter: {} }, "GET")
      .then((result) => setUserId(result.data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <List
      perPage={25}
      sort={{ field: "date", order: "desc" }}
      resource="plutustxs"
      filter={{ queryType: "jobSeeker" }}
    >
      <Datagrid bulkActionButtons={false}>
        <ReferenceField source="name" reference="postJobs" label="Job">
          <TextField source="name" />
        </ReferenceField>
        <ReferenceField source="jobBidId" reference="jobbids">
          <TextField source="name" />
        </ReferenceField>

        <FunctionField
          label="Paid"
          render={(record) => (
            <Checkbox disabled checked={!!record.unlockedTxHash} />
          )}
        />
        <TextField source="lockedTxHash" />
        <NumberField source="amount" label="Amount (Ada)" />
        <DateField source="lockDate" showTime />
        <TextField source="lockMessage" />
        <TextField source="unlockedTxHash" />
        <DateField source="unlockDate" showTime />
        <TextField source="unlockMessage" />
      </Datagrid>
    </List>
  );
};

export default ListScreen;
