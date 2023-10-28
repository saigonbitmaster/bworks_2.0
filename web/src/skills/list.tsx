import * as React from "react";
import {
  List,
  Datagrid,
  TextField,
  SingleFieldList,
  ChipField,
  TextInput,
  RichTextField,
  ArrayField,
} from "react-admin";

const filters = [
  <TextInput label="Search" source="textSearch" alwaysOn sx={{ width: 300 }} />,
];

const ListScreen = () => {
  return (
    <List
      filters={filters}
      perPage={25}
      sort={{ field: "createdAt", order: "desc" }}
      hasCreate={false}
    >
      <Datagrid bulkActionButtons={false}>
        <TextField source="name" />
        <ArrayField source="keys">
          <SingleFieldList linkType={false}>
            <ChipField source="name" size="small" />
          </SingleFieldList>
        </ArrayField>
        <RichTextField source="description" />
      </Datagrid>
    </List>
  );
};

export default ListScreen;
