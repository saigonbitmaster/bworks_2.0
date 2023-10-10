import * as React from "react";
import {
  List,
  Datagrid,
  TextField,
  DateField,
  SingleFieldList,
  ChipField,
  ReferenceArrayField,
  ReferenceField,
  TextInput,
  BooleanField,
} from "react-admin";
import CurrencyNumberField from "../components/currencyNumberField";

import LinkBidField from "../components/linkBidsField";

const filters = [<TextInput label="Search" source="textSearch" alwaysOn />];

const ListScreen = () => {
  return (
    <List
      filters={filters}
      perPage={25}
      sort={{ field: "createdAt", order: "desc" }}
      hasCreate={false}
    >
      <Datagrid bulkActionButtons={false}>
        <TextField source="username" />
        <TextField source="email" />
        <TextField source="contact" />
        <ReferenceArrayField reference="skills" source="skills">
          <SingleFieldList>
            <ChipField source="name" />
          </SingleFieldList>
        </ReferenceArrayField>
        <DateField source="createdAt" showTime />
      </Datagrid>
    </List>
  );
};

export default ListScreen;
