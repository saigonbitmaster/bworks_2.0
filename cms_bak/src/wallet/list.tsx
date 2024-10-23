import * as React from "react";
import {
  List,
  Datagrid,
  TextField,
  DateField,
} from "react-admin";
const ListScreen = () => {
  return (
    <List
      perPage={25}
      sort={{ field: "date", order: "desc" }}
      hasCreate={false}
      resource="adminwallets"
      filter={{ queryType: "employer" }}
     
    >
      <Datagrid bulkActionButtons={false}>
        <TextField source="address" />
        <TextField source="pKeyHash" />
        <TextField source="pKeyHashBech32" />
     
        <DateField source="createdAt" showTime label="Created" />

      </Datagrid>
    </List>
  );
};

export default ListScreen;
