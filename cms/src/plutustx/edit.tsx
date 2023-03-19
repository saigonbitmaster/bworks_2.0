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
       
        <Grid item xs={12} md={12} lg={8} xl={6}>
          <TextInput source="address"  fullWidth required />
        </Grid>
        <Grid item md={12} />
        <Grid item xs={12} md={12} lg={8} xl={6}>
        <TextInput source="cborhex" fullWidth required />
        </Grid>
        <Grid item md={12} />
       
        <Grid item md={12} />
        <Grid item xs={12} md={12} lg={8} xl={6}>
          <RichTextInput source="description" fullWidth />
        </Grid>
      </Grid>
    </SimpleForm>
  </Edit>
);

export default EditScreen;
