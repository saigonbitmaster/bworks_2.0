import * as React from "react";
import {
  List,
  Datagrid,
  TextField,
  DateField,
  BooleanField,
  RichTextField,
  EditButton,
} from "react-admin";

const ListScreen = () => {
  return (
    <List
      perPage={25}
      sort={{ field: "createdAt", order: "desc" }}
      hasCreate={true}
    >
      <Datagrid>
        <TextField source="name" />
        <RichTextField source="description" />
        <BooleanField source="isActive" />
        <DateField source="createdAt" showTime />
        <EditButton />
      </Datagrid>
    </List>
  );
};

export default ListScreen;
