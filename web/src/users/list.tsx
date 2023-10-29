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
  NumberField,
  FunctionField,
} from "react-admin";
import CurrencyNumberField from "../components/currencyNumberField";
import LinkBidField from "../components/linkBidsField";
import ShowButton from "../components/showButton";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";

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
        <TextField source="username" />
        <TextField source="email" />
        <UrlField source="contact" target="_blank" />
        <FunctionField
          label="User roles"
          render={(record) => (
            <Stack direction="row" spacing={1}>
              {record.isEmployer && <Chip label="Employer" />}
              {record.isJobSeeker && <Chip label="isJobSeeker" />}
            </Stack>
          )}
        />

        <ReferenceArrayField
          reference="skills"
          source="skills"
          label="Work skills"
        >
          <SingleFieldList>
            <ChipField source="name" />
          </SingleFieldList>
        </ReferenceArrayField>
        <NumberField
          source="workHoursPerMonth"
          label="Available per month (hours)"
        />
        <DateField source="createdAt" showTime label="Sign up at" />
        <ShowButton customLabel="View profile" />
      </Datagrid>
    </List>
  );
};

export default ListScreen;
