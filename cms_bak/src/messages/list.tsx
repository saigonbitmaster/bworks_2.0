import * as React from "react";
import {
  List,
  Datagrid,
  TextField,
  EditButton,
  TextInput,
  ArrayField,
  SingleFieldList,
  ChipField,
  RichTextField,
  DateField,
} from "react-admin";

const filters = [
  <TextInput label="Search" source="textSearch" alwaysOn sx={{ width: 300 }} />,
];

const ListScreen = () => {
  return (
    <List
      perPage={25}
      sort={{ field: "date", order: "desc" }}
      hasCreate={false}
      resource="messages"
      filter={{}}
      filters={filters}
    >
      <Datagrid>
        <TextField source="email" />
        <TextField source="messageType" />
        <TextField source="message" />
        <DateField source="createdAt" />
      </Datagrid>
    </List>
  );
};

export default ListScreen;
