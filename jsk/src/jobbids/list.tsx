import * as React from "react";
import {
  List,
  Datagrid,
  TextField,
  EditButton,
  DateField,
  NumberField,
  ReferenceField,
  TextInput,
  BooleanField,
  SelectInput,
  ReferenceInput,
  TopToolbar,
  ExportButton,
  CreateButton,
} from "react-admin";
import RateField from "../components/rateField";

const filters = [
  <TextInput label="Search" source="textSearch" alwaysOn />,
  <ReferenceInput source="jobId" reference="postjobs" alwaysOn>
    <SelectInput optionText="name" fullWidth />
  </ReferenceInput>,
  <SelectInput
    source="queryType"
    emptyValue={"jobSeeker"}
    choices={[
      { id: "jobSeeker", name: "Yours" },
      { id: "all", name: "All applications" },
    ]}
    alwaysOn
    label="Applications"
  />,
];

const ListScreen = () => {
  const JobCreateButton = () => <CreateButton label="Apply a job" />;

  const JobListActions = () => (
    <TopToolbar>
      <JobCreateButton />
      <ExportButton />
    </TopToolbar>
  );

  return (
    <List
      perPage={25}
      sort={{ field: "date", order: "desc" }}
      hasCreate
      resource="jobbids"
      filters={filters}
      actions={<JobListActions />}
    >
      <Datagrid>
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
        <ReferenceField
          reference="postJobs"
          source="jobId"
          label="Currency"
          link={false}
        >
          <ReferenceField
            reference="currencies"
            source="currencyId"
            link={false}
          >
            <TextField source="name" />
          </ReferenceField>
        </ReferenceField>
        <RateField source="rate" />

        <DateField source="completeDate" showTime label="Your deadline" />
        <BooleanField source="isSelected" label="Selected" />
        <BooleanField source="isPaid" />
        <ReferenceField
          reference="postJobs"
          source="jobId"
          label="Job deadline"
          link={false}
        >
          <DateField source="expectDate" showTime />
        </ReferenceField>

        <EditButton />
      </Datagrid>
    </List>
  );
};

export default ListScreen;
