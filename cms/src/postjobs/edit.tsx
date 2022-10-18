import * as React from "react";
import {
  SimpleForm,
  TextInput,
  SelectInput,
  NumberInput,
  ArrayInput,
  SimpleFormIterator,
  ReferenceArrayInput,
  SelectArrayInput,
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
          <TextInput source="name" fullWidth required />
        </Grid>
        <Grid item md={12} />

        <Grid item xs={12} md={4} lg={3} xl={2}>
          <ReferenceInput source="currencyId" reference="currencies">
            <SelectInput optionText="name" fullWidth required/>
          </ReferenceInput>
        </Grid>

        <Grid item xs={12} md={4} lg={3} xl={2}>
          <NumberInput source="budget" fullWidth required />
        </Grid>
        <Grid item md={12} />
        <Grid item xs={12} md={4} lg={3} xl={2}>
          <NumberInput source="minBidValue" fullWidth />
        </Grid>
        <Grid item xs={12} md={4} lg={3} xl={2}>
          <NumberInput source="requiredAmountToBid" fullWidth />
        </Grid>
        <Grid item md={12} />
        <Grid item xs={12} md={4} lg={3} xl={2}>
          <DateTimeInput source="expireDate" fullWidth required />
        </Grid>
        <Grid item xs={12} md={4} lg={3} xl={2}>
          <DateTimeInput source="expectDate" fullWidth required />
        </Grid>
        <Grid item md={12} />
        <Grid item xs={12} md={8} lg={6} xl={4}>
          <ReferenceArrayInput source="skills" reference="skills" fullWidth>
            <SelectArrayInput optionText="name" fullWidth />
          </ReferenceArrayInput>
        </Grid>
        <Grid item md={12} />
        <Grid item xs={12} md={8} lg={6} xl={4}>
          <ArrayInput source="tasks" fullWidth>
            <SimpleFormIterator inline>
              <TextInput source="name" helperText={false} fullWidth />
            </SimpleFormIterator>
          </ArrayInput>
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
