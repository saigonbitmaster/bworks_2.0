// in src/posts.js
import * as React from "react";
import {
  Create,
  SimpleForm,
  TextInput,
  ReferenceArrayInput,
  SelectArrayInput,
  BooleanInput,
} from "react-admin";
import Grid from "@mui/material/Grid";
import { RichTextInput } from "ra-input-rich-text";

const CreateScreen = () => (
  <Create redirect="list">
    <SimpleForm>
      <Grid container spacing={0.5}>
        <Grid item xs={12} md={6} lg={5} xl={3}>
          <TextInput source="name" fullWidth required />
        </Grid>
        <Grid item md={12} />

        <Grid item xs={12} md={8} lg={6} xl={4}>
          <BooleanInput source="isActive" fullWidth  />
        </Grid>
        <Grid item md={12} />

        <Grid item xs={12} md={8} lg={6} xl={4}>
          <RichTextInput
            source="description"
            fullWidth
            label="News that show on dashboard, max 120 characters"
          />
        </Grid>
      </Grid>
    </SimpleForm>
  </Create>
);
export default CreateScreen;
