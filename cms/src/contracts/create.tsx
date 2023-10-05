import * as React from "react";
import {
  Create,
  SimpleForm,
  TextInput,
} from "react-admin";
import Grid from "@mui/material/Grid";
import { RichTextInput } from "ra-input-rich-text";

const CreateScreen = () => (
  <Create redirect="list">
    <SimpleForm>
      <Grid container spacing={1}>
        <Grid item xs={12} md={8} lg={6} xl={4}>
          <TextInput source="name" fullWidth required />
        </Grid>
        <Grid item md={12} />
        <Grid item xs={12} md={4} lg={3} xl={2}>
          <TextInput source="version" fullWidth required label="Plutus version (V1, V2)" />
        </Grid>
        <Grid item md={12} />

        <Grid item xs={12} md={12} lg={8} xl={6}>
          <TextInput source="address" fullWidth required />
        </Grid>
        <Grid item md={12} />
        <Grid item xs={12} md={12} lg={8} xl={6}>
          <TextInput source="cborhex" fullWidth required />
        </Grid>
        <Grid item md={12} />
        <Grid item xs={12} md={12} lg={8} xl={6}>
          <TextInput source="code" fullWidth required label="Code (same value as cborhex)"/>
        </Grid>
        <Grid item md={12} />

     
        <Grid item xs={12} md={12} lg={8} xl={6}>
          <RichTextInput source="description" fullWidth />
        </Grid>
      </Grid>
    </SimpleForm>
  </Create>
);
export default CreateScreen;
