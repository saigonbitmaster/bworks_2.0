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
} from "react-admin";

import Grid from "@mui/material/Grid";
import { RichTextInput } from "ra-input-rich-text";

const UserEditToolbar = (props) => (
  <Toolbar {...props}>
    <SaveButton />
  </Toolbar>
);

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

          <Grid item xs={12} md={6} lg={5} xl={3}>
            <TextInput source="email" fullWidth />
          </Grid>
          <Grid item md={12} />
          <Grid item xs={12} md={6} lg={5} xl={3}>
            <ReferenceArrayInput source="skills" reference="skills">
              <SelectArrayInput fullWidth />
            </ReferenceArrayInput>
          </Grid>
          <Grid item md={12} />
          <Grid item xs={12} md={12} lg={8} xl={6}>
            <RichTextInput source="description" fullWidth />
          </Grid>
        </Grid>
      </SimpleForm>
    </Edit>
  );
};

export default EditScreen;
