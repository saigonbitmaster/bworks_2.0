import * as React from "react";
import {
  List,
  Datagrid,
  TextField,
  DateField,
  NumberField,
  ReferenceField,
  TextInput,
  BooleanField,
} from "react-admin";
import RateField from "../components/rateField";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { stringify } from "query-string";

const filters = [<TextInput label="Search" source="textSearch" alwaysOn />];

const ListScreen = () => {
  return (
    <List
      perPage={25}
      sort={{ field: "createdAt", order: "desc" }}
      hasCreate={false}
      resource="jobbids"
      filters={filters}
    >
      <Datagrid bulkActionButtons={false}>
        <TextField source="name" />

        <ReferenceField reference="postJobs" source="jobId">
          <TextField source="name" />
        </ReferenceField>

        <ReferenceField reference="users" source="jobSeekerId" link={"show"}>
          <TextField source="fullName" />
        </ReferenceField>
        <ReferenceField reference="users" source="employerId" link={"show"}>
          <TextField source="fullName" />
        </ReferenceField>
        <NumberField source="bidValue" />
        <ReferenceField reference="postJobs" source="jobId" label="Currency">
          <ReferenceField reference="currencies" source="currencyId">
            <TextField source="name" />
          </ReferenceField>
        </ReferenceField>
        <RateField source="rate" />

        <BooleanField source="isSelected" label="Selected" />
        <BooleanField source="isCompleted" />

        <BooleanField source="isPaid" />

        <DateField source="completeDate" showTime label="Your deadline" />

        <ReferenceField
          reference="postJobs"
          source="jobId"
          label="Job deadline"
        >
          <DateField source="expectDate" showTime />
        </ReferenceField>
      </Datagrid>
    </List>
  );
};

export default ListScreen;
