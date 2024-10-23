import * as React from "react";
import { Edit, SimpleForm, TextInput, BooleanInput } from "react-admin";
import Grid from "@mui/material/Grid";
import { RichTextInput } from "ra-input-rich-text";
import BackButton from "../components/backButton";
import { TopToolbar } from "react-admin";

const Actions = () => (
  <TopToolbar>
    <BackButton />
  </TopToolbar>
);

const EditScreen = () => (
  <Edit redirect="list" actions={<Actions />}>
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
  </Edit>
);
export default EditScreen;
