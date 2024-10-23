import * as React from "react";
import {
  List,
  Datagrid,
  TextField,
  EditButton,
  DateField,
  RichTextField
} from "react-admin";


const ListScreen = () => {
  return (
    <List
      perPage={25}
      sort={{ field: "date", order: "desc" }}
      hasCreate
      resource="contracts"
    >
      <Datagrid>
        <TextField source="name" />
        <TextField source="address" />
        <RichTextField source="description" />
        <DateField source="createdAt" showTime/>
        <EditButton />
      </Datagrid>
    </List>
  );
};

export default ListScreen;
