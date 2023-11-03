import * as React from "react";
import {
  SimpleForm,
  TextInput,
  ReferenceArrayInput,
  SelectArrayInput,
  Edit,
  SaveButton,
  Toolbar,
  useDataProvider,
  BooleanInput,
  TopToolbar,
  NumberInput,
  AutocompleteArrayInput,
} from "react-admin";

import Grid from "@mui/material/Grid";
import { RichTextInput } from "ra-input-rich-text";
import BackButton from "./backButton";
import { urlValidate } from "../utils/validate";

const UserEditToolbar = (props) => (
  <Toolbar {...props}>
    <SaveButton />
  </Toolbar>
);

const EditActions = () => (
  <TopToolbar>
    <BackButton />
  </TopToolbar>
);

const filterToQuery = (textSearch) => ({ textSearch: textSearch });
const EditScreen = () => {
  const dataProvider = useDataProvider();

  const [userId, setUserId] = React.useState(null);
  dataProvider
    .customMethod("customapis/userid", { filter: {} }, "GET")
    .then((result) => setUserId(result.data))
    .catch((error) => console.error(error));

  if (!userId) return <div>...Loading</div>;
  return (
    <Edit
      resource="users"
      id={userId}
      redirect="show"
      actions={<EditActions />}
    >
      <SimpleForm toolbar={<UserEditToolbar />}>
        <Grid container spacing={0.5}>
          <Grid item xs={12} md={6} lg={5} xl={3}>
            <TextInput source="fullName" fullWidth required />
          </Grid>
          <Grid item md={12} />
          <Grid item xs={12} md={6} lg={5} xl={3}>
            <TextInput source="email" fullWidth required />
          </Grid>

          <Grid item xs={12} md={6} lg={5} xl={3}>
            <TextInput
              source="contact"
              fullWidth
              label="Messenger contact"
              validate={urlValidate}
            />
          </Grid>
          <Grid item md={12} />
          <Grid item xs={12} md={6} lg={5} xl={3}>
            <BooleanInput
              source="isShowContact"
              fullWidth
              label="Agree to show contact"
            />
          </Grid>
          <Grid item xs={12} md={6} lg={5} xl={3}>
            <BooleanInput
              source="isNotified"
              fullWidth
              label="Receive notification"
            />
          </Grid>
          <Grid item md={12} />

          <Grid item xs={12} md={6} lg={5} xl={3}>
            <BooleanInput source="isEmployer" fullWidth label="Is employer" />
          </Grid>
          <Grid item xs={12} md={6} lg={5} xl={3}>
            <BooleanInput
              source="isJobSeeker"
              fullWidth
              label="Is job seeker"
            />
          </Grid>
          <Grid item md={12} />
          <Grid item xs={12} md={6} lg={5} xl={3}>
            <TextInput
              source="gitLink"
              sx={{ mt: 0 }}
              fullWidth
              required={false}
              validate={urlValidate}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={5} xl={3}>
            <NumberInput
              source="workHoursPerMonth"
              sx={{ mt: 0 }}
              label="Available work hours per month"
            />
          </Grid>
          <Grid item md={12} />
          <Grid item xs={12} md={12} lg={8} xl={6}>
            <ReferenceArrayInput source="skills" reference="skills" fullWidth>
              <AutocompleteArrayInput
                optionText={"name"}
                filterToQuery={filterToQuery}
              />
            </ReferenceArrayInput>
          </Grid>

          <Grid item md={12} />

          <Grid item xs={12} md={12} lg={8} xl={6}>
            <RichTextInput source="description" fullWidth label="Profile" />
          </Grid>
        </Grid>
      </SimpleForm>
    </Edit>
  );
};

export default EditScreen;
