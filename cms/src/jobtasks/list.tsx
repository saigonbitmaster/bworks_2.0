import * as React from "react";
import {
  List,
  Datagrid,
  TextField,
  EditButton,
  DateField,
  SelectField,
  ReferenceField,
  ReferenceInput,
  SelectInput,
  TextInput,
} from "react-admin";

const statusChoices: any[] = [
  { id: "inProgress", name: "In progress" },
  { id: "todo", name: "Todo" },
  { id: "completed", name: "Completed" },
];

const jobFilters = [
  <TextInput label="Search" source="textSearch" alwaysOn />,
  <ReferenceInput source="jobId" reference="postjobs" alwaysOn>
    <SelectInput optionText="name" fullWidth />
  </ReferenceInput>,
  <SelectInput source="status" choices={statusChoices} alwaysOn />,
];

const filters = [
  <TextInput label="Search" source="textSearch" alwaysOn />,
  <ReferenceInput source="jobId" reference="postjobs" alwaysOn>
    <SelectInput optionText="name" fullWidth />
  </ReferenceInput>,
  <SelectInput source="status" choices={statusChoices} alwaysOn />,
];

const ListScreen = () => {
  return (
    <List
      perPage={25}
      sort={{ field: "jobId", order: "desc" }}
      hasCreate={false}
      resource="jobtasks/jobtasks/cms"
      filter={{ queryType: "jobSeeker" }}
      filters={filters}
    >
      <Datagrid empty={<> </>} bulkActionButtons={false}>
        <ReferenceField reference="postJobs" source="jobId">
          <TextField source="name" />
        </ReferenceField>
        <TextField source="name" />
        <ReferenceField reference="users" source="creator">
          <TextField source="fullName" />
        </ReferenceField>
        <ReferenceField reference="users" source="updater">
          <TextField source="fullName" />
        </ReferenceField>
        <DateField source="startDate" showTime />
        <DateField source="deadline" showTime />
        <SelectField source="status" choices={statusChoices} />
      </Datagrid>
    </List>
  );
};

export default ListScreen;
