import * as React from "react";
import {
  Create,
  SimpleForm,
  TextInput,
  ReferenceInput,
  SelectInput,
  NumberInput,
  DateTimeInput,
  AutocompleteInput,
  useRedirect,
  useNotify,
} from "react-admin";
import Grid from "@mui/material/Grid";
import { RichTextInput } from "ra-input-rich-text";
import { useSearchParams } from "react-router-dom";

const CreateScreen = (props) => {
  const [searchParams] = useSearchParams();
  const search = searchParams.get("jobId");
  const jobId = JSON.parse(search);

  return (
    <Create redirect="list">
      <SimpleForm>
        <Grid container spacing={1}>
          <Grid item xs={12} md={6} lg={5} xl={3}>
            <TextInput source="name" fullWidth required label="Subject" />
          </Grid>
          <Grid item md={12} />
          <Grid item xs={12} md={6} lg={5} xl={3}>
            <ReferenceInput
              source="jobId"
              reference="postjobs"
              sort={{ field: "createdAt", order: "ASC" }}
              perPage={100}
            >
              <SelectInput
                optionText="name"
                fullWidth
                label="Select a job"
                required
                defaultValue={jobId ? jobId : null}
              />
            </ReferenceInput>
          </Grid>
          <Grid item md={12} />
          <Grid item xs={12} md={4} lg={3} xl={2}>
            <NumberInput
              source="bidValue"
              fullWidth
              required
              label="Requested budget (Ada)"
            />
          </Grid>

          <Grid item xs={12} md={4} lg={3} xl={2}>
            <DateTimeInput
              source="bidDate"
              fullWidth
              label="Submit date"
              defaultValue={new Date()}
              required
            />
          </Grid>
          <Grid item xs={12} md={4} lg={3} xl={2}>
            <DateTimeInput
              source="completeDate"
              fullWidth
              label="Your deadline"
              defaultValue={new Date()}
              required
            />
          </Grid>
          <Grid item md={12} />
          <Grid item xs={12} md={12} lg={9} xl={6}>
            <RichTextInput source="description" fullWidth />
          </Grid>
        </Grid>
      </SimpleForm>
    </Create>
  );
};
export default CreateScreen;
