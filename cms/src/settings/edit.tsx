import * as React from "react";
import { SimpleForm, TextInput, Edit } from "react-admin";

import Grid from "@mui/material/Grid";
import { RichTextInput } from "ra-input-rich-text";

const EditScreen = () => (
  <Edit>
    <SimpleForm>
      <Grid container spacing={1}>
        <Grid item xs={12} md={6} lg={5} xl={3}>
          <TextInput source="name" fullWidth required />
        </Grid>
        <Grid item md={12} />
        <Grid item xs={12} md={6} lg={5} xl={3}>
          <TextInput source="key" fullWidth required />
        </Grid>
        <Grid item xs={12} md={6} lg={5} xl={3}>
          <TextInput source="value" fullWidth required />
        </Grid>
        <Grid item md={12} />
        <Grid item xs={12} md={8} lg={8} xl={8}>
          <RichTextInput source="description" fullWidth />
        </Grid>
      </Grid>
    </SimpleForm>
  </Edit>
);

export default EditScreen;
