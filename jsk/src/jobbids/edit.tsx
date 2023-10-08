import * as React from "react";
import {
  SimpleForm,
  TextInput,
  SelectInput,
  NumberInput,
  DateTimeInput,
  Edit,
  ReferenceInput,
} from "react-admin";

import Grid from "@mui/material/Grid";
import { RichTextInput } from "ra-input-rich-text";

const EditScreen = () => (
  <Edit>
    <SimpleForm>
      <Grid container spacing={1}>
        <Grid item xs={12} md={6} lg={5} xl={3}>
          <TextInput source="name" fullWidth required label="Subject" />
        </Grid>
        <Grid item md={12} />
        <Grid item xs={12} md={6} lg={5} xl={3}>
          <ReferenceInput source="jobId" reference="postjobs">
            <SelectInput optionText="name" fullWidth label="Select a job" />
          </ReferenceInput>
        </Grid>
        <Grid item md={12} />
        <Grid item xs={12} md={4} lg={3} xl={2}>
          <NumberInput
            source="bidValue"
            fullWidth
            required
            label="Requested budget (Ada)"
          />
        </Grid>

        <Grid item xs={12} md={4} lg={3} xl={2}>
          <DateTimeInput source="bidDate" fullWidth label="Submit date" />
        </Grid>
        <Grid item xs={12} md={4} lg={3} xl={2}>
          <DateTimeInput
            source="completeDate"
            fullWidth
            label="Your deadline"
          />
        </Grid>
        <Grid item md={12} />
        <Grid item xs={12} md={12} lg={9} xl={6}>
          <RichTextInput source="description" fullWidth />
        </Grid>
      </Grid>
    </SimpleForm>
  </Edit>
);

export default EditScreen;
