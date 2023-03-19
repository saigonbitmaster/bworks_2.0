import * as React from "react";
import {
  Create,
  SimpleForm,
  TextInput,
  ReferenceInput,
  SelectInput,
  NumberInput,
  BooleanInput
} from "react-admin";
import Grid from "@mui/material/Grid";
import { RichTextInput } from "ra-input-rich-text";

/*
 name: string;
  jobBidId: string;
  employerId: string;
  jobSeekerId: string;
  assetName: string;
  amount: number;
  lockedTxHash: string;
  unlockedTxHash: string;
  lockDate: Date;
  unlockDate: Date;
  description: string;

*/
const CreateScreen = () => (
  <Create redirect="list">
    <SimpleForm>
      <Grid container spacing={1}>
        <Grid item xs={12} md={8} lg={6} xl={4}>
          <TextInput source="name" fullWidth required />
        </Grid>
        <Grid item md={12} />
        <Grid item xs={12} md={8} lg={6} xl={4}>
          <TextInput source="assetName" fullWidth required />
        </Grid>
        <Grid item md={12} /> <Grid item xs={12} md={8} lg={6} xl={4}>
          <NumberInput source="amount" fullWidth required />
        </Grid>
        <Grid item xs={12} md={8} lg={6} xl={4}>
          <TextInput source="lockedTxHash" fullWidth required />
        </Grid>
        <Grid item xs={12} md={8} lg={6} xl={4}>
        <BooleanInput source="isUnlocked" />
        </Grid>

        <Grid item md={12} />
        <Grid item xs={12} md={12} lg={8} xl={6}>
          <ReferenceInput
            source="jobBidId"
            reference="jobbids"
            filter={{ queryType: "employer" }}
          >
            <SelectInput optionText={"name"} />
          </ReferenceInput>
        </Grid>
        <Grid item md={12} />
     
        <Grid item md={12} />

        <Grid item md={12} />
        <Grid item xs={12} md={12} lg={8} xl={6}>
          <RichTextInput source="description" fullWidth />
        </Grid>
      </Grid>
    </SimpleForm>
  </Create>
);
export default CreateScreen;
