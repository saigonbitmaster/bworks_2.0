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
} from "react-admin";

import Grid from "@mui/material/Grid";
import { RichTextInput } from "ra-input-rich-text";

const UserEditToolbar = (props) => (
  <Toolbar {...props}>
    <SaveButton />
  </Toolbar>
);

const urlValidate = (url) => {
  if (!url) return undefined;
  const regex = new RegExp("^(http|https)://");
  if (regex.test(url)) {
    return undefined;
  }
  return "Must be a https or http url";
};

const EditScreen = () => {
  const dataProvider = useDataProvider();

  const [userId, setUserId] = React.useState(null);
  dataProvider
    .customMethod("customapis/userid", { filter: {} }, "GET")
    .then((result) => setUserId(result.data))
    .catch((error) => console.error(error));

  if (!userId) return <div>...Loading</div>;
  return (
    <Edit resource="users" id={userId} redirect="/">
      <SimpleForm toolbar={<UserEditToolbar />}>
        <Grid container spacing={1}>
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

          <Grid item md={12} />
          <Grid item xs={12} md={6} lg={5} xl={3}>
            <ReferenceArrayInput source="skills" reference="skills">
              <SelectArrayInput fullWidth />
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
