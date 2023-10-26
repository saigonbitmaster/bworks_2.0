import * as React from "react";
import {
  Create,
  SimpleForm,
  TextInput,
  ReferenceInput,
  SelectInput,
  NumberInput,
  DateTimeInput,
} from "react-admin";
import Grid from "@mui/material/Grid";
import { RichTextInput } from "ra-input-rich-text";
import { taskStatus } from "../types";

const statusChoices: any[] = [
  { id: "inProgress", name: "In progress" },
  { id: "todo", name: "Todo" },
  { id: "completed", name: "Completed" },
];

const CreateScreen = () => (
  <Create redirect="list">
    <SimpleForm>
      <Grid container spacing={1}>
        <Grid item xs={12} md={6} lg={5} xl={3}>
          <TextInput source="name" fullWidth required label="Task name" />
        </Grid>

        <Grid item md={12} />

        <Grid item xs={12} md={6} lg={5} xl={3}>
          <ReferenceInput
            source="jobBidId"
            reference="jobbids"
            filter={{ queryType: "user" }}
          >
            <SelectInput
              optionText="name"
              fullWidth
              label="Select a job application"
            />
          </ReferenceInput>
        </Grid>
        <Grid item xs={12} md={4} lg={3} xl={2}>
          <SelectInput source="status" choices={statusChoices} required />
        </Grid>
        <Grid item md={12} />
        <Grid item xs={12} md={6} lg={5} xl={3}>
          <DateTimeInput
            source="startDate"
            fullWidth
            defaultValue={new Date()}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={5} xl={3}>
          <DateTimeInput
            source="deadline"
            defaultValue={new Date()}
            fullWidth
            required
          />
        </Grid>
        <Grid item md={12} />
        <Grid item xs={12} lg={10} xl={6}>
          <TextInput source="gitLink" fullWidth />
        </Grid>
        <Grid item md={12} />
        <Grid item xs={12} md={12} lg={10} xl={6}>
          <RichTextInput source="description" fullWidth />
        </Grid>
      </Grid>
    </SimpleForm>
  </Create>
);
export default CreateScreen;
