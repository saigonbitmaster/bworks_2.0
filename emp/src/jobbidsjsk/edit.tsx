import * as React from "react";
import {
  SimpleForm,
  TextInput,
  SelectInput,
  NumberInput,
  DateTimeInput,
  Edit,
  BooleanInput,
  FormDataConsumer,
  ReferenceInput,
} from "react-admin";

import Grid from "@mui/material/Grid";
import { RichTextInput } from "ra-input-rich-text";

const urlValidate = (url) => {
  const regex = new RegExp("^(http|https)://");
  if (regex.test(url)) {
    return undefined;
  }
  return "Must be a https or http url";
};

const EditScreen = () => (
  <Edit>
    <SimpleForm>
      <Grid container spacing={0}>
        <Grid item xs={12} md={4} lg={3} xl={2}>
          <ReferenceInput
            source="jobId"
            reference="postjobs"
            sort={{ field: "createdAt", order: "ASC" }}
            perPage={100}
          >
            <SelectInput
              optionText="name"
              label="Select a job"
              required
              fullWidth
            />
          </ReferenceInput>
        </Grid>
        <Grid item md={12} />
        <Grid item xs={12} md={8} lg={6} xl={4}>
          <TextInput source="name" fullWidth required label="Subject" />
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
        <Grid item md={12} />
        <Grid item xs={12} md={4} lg={3} xl={2}>
          <DateTimeInput
            source="bidDate"
            fullWidth
            label="Submit date"
            required
          />
        </Grid>
        <Grid item xs={12} md={4} lg={3} xl={2}>
          <DateTimeInput
            source="completeDate"
            fullWidth
            label="Your deadline"
            required
            sx={{ ml: 1 }}
          />
        </Grid>
        <Grid item md={12} />
        <Grid item xs={12} md={4} lg={3} xl={2}>
          <BooleanInput source="hasPrototype" fullWidth />
        </Grid>
        <Grid item md={12} />
        <Grid item xs={12} md={8} lg={6} xl={4}>
          <FormDataConsumer>
            {({ formData, ...rest }) => {
              return (
                formData.hasPrototype && (
                  <TextInput
                    source="prototypeLink"
                    fullWidth
                    {...rest}
                    validate={urlValidate}
                  />
                )
              );
            }}
          </FormDataConsumer>
        </Grid>
        <Grid item md={12} />
        <Grid item xs={12} md={12} lg={9} xl={6}>
          <RichTextInput
            source="description"
            fullWidth
            label="Message to employer"
          />
        </Grid>
      </Grid>
    </SimpleForm>
  </Edit>
);

export default EditScreen;
