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

const CreateScreen = () => (
  <Create redirect="list">
    <SimpleForm>
      <Grid container spacing={1}>
        <Grid item xs={12} md={6} lg={5} xl={3}>
          <TextInput source="name" fullWidth required />
        </Grid>
        <Grid item md={12} />
        <Grid item xs={12} md={6} lg={5} xl={3}>
          <ReferenceInput source="jobId" reference="postjobs">
            <SelectInput optionText="name" fullWidth />
          </ReferenceInput>
        </Grid>
        <Grid item md={12} />
        <Grid item xs={12} md={4} lg={3} xl={2}>
          <NumberInput source="bidValue" fullWidth required defaultValue={5} />
        </Grid>

        <Grid item xs={12} md={4} lg={3} xl={2}>
          <DateTimeInput source="bidDate" fullWidth defaultValue={new Date()} />
        </Grid>
        <Grid item xs={12} md={4} lg={3} xl={2}>
          <DateTimeInput
            source="completeDate"
            fullWidth
            defaultValue={new Date()}
          />
        </Grid>
        <Grid item md={12} />
        <Grid item xs={12} md={8} lg={6} xl={4}>
          <RichTextInput source="description" fullWidth />
        </Grid>
      </Grid>
    </SimpleForm>
  </Create>
);
export default CreateScreen;
