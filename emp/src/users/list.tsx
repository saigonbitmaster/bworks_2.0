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
  UrlField,
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
        <UrlField source="contact" target="_blank" />
        <ReferenceArrayField
          reference="skills"
          source="skills"
          label="Work skills"
        >
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
