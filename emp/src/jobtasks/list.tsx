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
  DeleteButton,
} from "react-admin";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import RefreshIcon from "@mui/icons-material/Refresh";
import CachedOutlinedIcon from "@mui/icons-material/CachedOutlined";

import DoneOutlinedIcon from "@mui/icons-material/DoneOutlined";
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
];

const jobCompleteFilters = [
  <TextInput label="Search" source="textSearch" alwaysOn />,
  <ReferenceInput source="jobId" reference="postjobs" alwaysOn>
    <SelectInput optionText="name" fullWidth />
  </ReferenceInput>,
];

const ListScreen = () => {
  return (
    <Box
      sx={{
        padding: 1,
        border: 0,
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
      }}
    >
      <Paper elevation={0} sx={{ padding: "1em" }}>
        <Box
          sx={{
            padding: 1,
            border: 0,
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-start",
            flexGrow: 1,
          }}
        >
          <CachedOutlinedIcon></CachedOutlinedIcon>
          <Typography variant="subtitle1" gutterBottom>
            In progress tasks
          </Typography>
        </Box>

        <List
          perPage={25}
          sort={{ field: "createdAt", order: "desc" }}
          hasCreate
          resource="jobtasks"
          filter={{ queryType: "employer", status: { $ne: "completed" } }}
          filters={jobFilters}
        >
          <Datagrid bulkActionButtons={false}>
            <TextField source="name" />
            <ReferenceField reference="postJobs" source="jobId">
              <TextField source="name" />
            </ReferenceField>
            <ReferenceField reference="users" source="creator" link={"show"}>
              <TextField source="fullName" />
            </ReferenceField>
            <ReferenceField reference="users" source="updater" link={"show"}>
              <TextField source="fullName" />
            </ReferenceField>
            <DateField source="startDate" showTime />
            <DateField source="deadline" showTime />

            <EditButton />
            <DeleteButton />
          </Datagrid>
        </List>
      </Paper>
      <Paper elevation={0} sx={{ padding: "1em", ml: "1em" }}>
        <Box
          sx={{
            padding: 1,
            border: 0,
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-start",
            flexGrow: 1,
          }}
        >
          <DoneOutlinedIcon></DoneOutlinedIcon>
          <Typography variant="subtitle1" gutterBottom>
            Completed tasks
          </Typography>
        </Box>

        <List
          perPage={25}
          sort={{ field: "createdAt", order: "desc" }}
          hasCreate={false}
          resource="jobtasks"
          filter={{ queryType: "employer", status: "completed" }}
        >
          <Datagrid bulkActionButtons={false}>
            <TextField source="name" />
            <ReferenceField reference="postJobs" source="jobId">
              <TextField source="name" />
            </ReferenceField>
            <ReferenceField reference="users" source="creator" link={"show"}>
              <TextField source="fullName" />
            </ReferenceField>
            <ReferenceField reference="users" source="updater" link={"show"}>
              <TextField source="fullName" />
            </ReferenceField>
            <DateField source="startDate" showTime />
            <DateField source="deadline" showTime />

            <EditButton />
            <DeleteButton />
          </Datagrid>
        </List>
      </Paper>
    </Box>
  );
};

export default ListScreen;
