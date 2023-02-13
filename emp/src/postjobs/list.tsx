import * as React from "react";
import {
  List,
  Datagrid,
  TextField,
  EditButton,
  DateField,
  SingleFieldList,
  ChipField,
  ReferenceArrayField,
  ReferenceField,
  TextInput
} from "react-admin";
import CurrencyNumberField from "../components/currencyNumberField";

import LinkBidField from "../components/linkBidsField";

const filters = [
  <TextInput label="Search" source="textSearch" alwaysOn />
];


const ListScreen = () => {
  return (
    <List filters = {filters} perPage={25} sort={{ field: "date", order: "desc" }} hasCreate filter={{queryType: "employer"}}>
      <Datagrid>
        <TextField source="name" />
        <LinkBidField />
        <CurrencyNumberField source="budget" threshold={10000} />
        <ReferenceField reference="users" source="employerId">
          <TextField source="fullName" />
        </ReferenceField>
        <ReferenceArrayField reference="skills" source="skills">
          <SingleFieldList>
            <ChipField source="name" />
          </SingleFieldList>
        </ReferenceArrayField>
        <DateField source="expireDate" showTime />
        <EditButton />
      </Datagrid>
    </List>
  );
};

export default ListScreen;
