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
        <Grid item xs={12} md={8} lg={6} xl={4}>
          <TextInput source="name" fullWidth required />
        </Grid>
        <Grid item md={12} />
       
        <Grid item xs={12} md={4} lg={3} xl={2}>
          <NumberInput source="bidValue"  required />
        </Grid>
        <Grid item md={12} />
        <Grid item xs={12} md={8} lg={6} xl={4}>
        <ReferenceInput source="jobId" reference="postjobs">
          <SelectInput optionText="name" fullWidth />
        </ReferenceInput>
        </Grid>
        <Grid item md={12} />
        <Grid item xs={12} md={4} lg={3} xl={2}>
          <DateTimeInput source="bidDate" fullWidth />
        </Grid>
        <Grid item xs={12} md={4} lg={3} xl={2}>
          <DateTimeInput source="completeDate" fullWidth />
        </Grid>
        <Grid item md={12} />
        <Grid item xs={12} md={8} lg={6} xl={4}>
          <RichTextInput source="description" fullWidth />
        </Grid>
      </Grid>
    </SimpleForm>
  </Edit>
);

export default EditScreen;
