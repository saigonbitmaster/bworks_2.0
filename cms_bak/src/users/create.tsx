// in src/posts.js
import * as React from "react";
import {
  Create,
  SimpleForm,
  TextInput,
  ReferenceArrayInput,
  SelectArrayInput,
} from "react-admin";
import Grid from "@mui/material/Grid";
import { RichTextInput } from "ra-input-rich-text";

const CreateScreen = () => (
  <Create redirect="list">
    <SimpleForm>
      <Grid container spacing={0.5}>
        <Grid item xs={12} md={6} lg={5} xl={3}>
          <TextInput source="username" fullWidth required />
        </Grid>
        <Grid item md={12} />

        <Grid item xs={12} md={8} lg={6} xl={4}>
          <TextInput source="fullName" fullWidth required />
        </Grid>
        <Grid item md={12} />
        <Grid item xs={12} md={4} lg={3} xl={2}>
          <TextInput source="email" fullWidth required />
        </Grid>
        <Grid item xs={12} md={4} lg={3} xl={2}>
          <TextInput source="password" fullWidth required />
        </Grid>
        <Grid item md={12} />
        <Grid item xs={12} md={8} lg={6} xl={4}>
          <ReferenceArrayInput source="skills" reference="skills" fullWidth>
            <SelectArrayInput
              optionText="name"
              fullWidth
              label="Required skills"
            />
          </ReferenceArrayInput>
        </Grid>
        <Grid item md={12} />
        <Grid item xs={12} md={8} lg={6} xl={4}>
          <RichTextInput
            source="description"
            fullWidth
            label="Job description"
          />
        </Grid>
      </Grid>
    </SimpleForm>
  </Create>
);
export default CreateScreen;
