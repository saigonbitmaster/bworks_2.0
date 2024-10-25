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
      hasCreate={true}
      resource="skills"
      filter={{}}
      filters={filters}
    >
      <Datagrid>
        <TextField source="name" />

        <ArrayField source="keys">
          <SingleFieldList>
            <ChipField source="name" size="small" />
          </SingleFieldList>
        </ArrayField>
        <RichTextField source="description" />
        <DateField source="createdAt" />
        <EditButton />
      </Datagrid>
    </List>
  );
};

export default ListScreen;
