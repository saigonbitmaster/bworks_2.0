import * as React from "react";
import {
  List,
  Datagrid,
  TextField,
  EditButton,
  DateField,
  NumberField,
  ReferenceField,
} from "react-admin";
import RateField from '../components/RateField'
const ListScreen = () => {
  return (
    <List
      perPage={25}
      sort={{ field: "date", order: "desc" }}
      hasCreate
      resource="jobbids"
      filter={{ queryType: "employer" }}
    >
      <Datagrid>
        <TextField source="name" />

        <ReferenceField reference="postJobs" source="jobId">
          <TextField source="name" />
        </ReferenceField>


        <ReferenceField reference="users" source="jobSeekerId">
          <TextField source="fullName" />
        </ReferenceField>

        <NumberField source="bidValue" />
        <RateField source="rate" />
        <ReferenceField reference="postJobs" source="jobId" label="Currency">
          <ReferenceField reference="currencies" source="currencyId">
            <TextField source="name" />
          </ReferenceField>
        </ReferenceField>

        <DateField source="completeDate" showTime label="Your deadline" />

        <ReferenceField
          reference="postJobs"
          source="jobId"
          label="Job deadline"
        >
          <DateField source="expectDate" showTime />
        </ReferenceField>

        <EditButton />
      </Datagrid>
    </List>
  );
};

export default ListScreen;
