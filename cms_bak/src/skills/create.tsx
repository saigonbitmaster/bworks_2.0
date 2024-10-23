import * as React from "react";
import {
  Create,
  SimpleForm,
  TextInput,
  ReferenceInput,
  SelectInput,
  NumberInput,
  DateTimeInput,
  ArrayInput,
  SimpleFormIterator,
  
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
          <ArrayInput source="keys">
            <SimpleFormIterator >
              <TextInput source="name" helperText={false} />
            </SimpleFormIterator>
          </ArrayInput>
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
