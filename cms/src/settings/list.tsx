import * as React from "react";
import { List, Datagrid, TextField, EditButton, TextInput } from "react-admin";

const filters = [<TextInput label="Search" source="textSearch" alwaysOn />];

const ListScreen = () => {
  return (
    <List
      perPage={25}
      sort={{ field: "createdAt", order: "desc" }}
      hasCreate={true}
      resource="settings"
      filter={{}}
      filters={filters}
    >
      <Datagrid>
        <TextField source="name" />
        <TextField source="key" />
        <TextField source="value" />
        <EditButton />
      </Datagrid>
    </List>
  );
};

export default ListScreen;
