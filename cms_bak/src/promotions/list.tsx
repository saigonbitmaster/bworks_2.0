import * as React from "react";
import {
  List,
  Datagrid,
  TextField,
  EditButton,
  TextInput,
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
      hasCreate={true}
      resource="customapis/campaigns"
      filter={{}}
      filters={filters}
    >
      <Datagrid>
        <TextField source="name" />
        <RichTextField source="description" />
        <DateField source="createdAt" />
        <EditButton />
      </Datagrid>
    </List>
  );
};

export default ListScreen;
