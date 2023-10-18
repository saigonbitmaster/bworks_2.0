import * as React from "react";
import {
  Show,
  SimpleShowLayout,
  TextField,
  DateField,
  RichTextField,
  useRecordContext,
  ReferenceArrayField,
  SingleFieldList,
  ChipField,
  useDataProvider,
  TopToolbar,
} from "react-admin";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import BackButton from "../components/backButton";

const ShowActions = () => (
  <TopToolbar>
    {/* Add your custom action components */}
    <BackButton />
  </TopToolbar>
);

const UserProfile = () => {
  const record = useRecordContext();

  const [data, setData] = React.useState({
    postedJobs: 0,
    gotApplications: 0,
    submittedJobs: 0,
    gotJobs: 0,
  });
  const dataProvider = useDataProvider();

  dataProvider
    .customMethod(
      "customapis/userprofile",
      { filter: { userId: record.id } },
      "GET"
    )
    .then((result) => {
      setData(result.data);
    })
    .catch((error) => console.error(error));
  // the record can be empty while loading
  if (!record) return null;
  return (
    <>
      <Link
        to={encodeURI(
          `/postjobsjsk/?filter=${JSON.stringify({
            employerId: record.id,
          })}`
        )}
      >
        Posted jobs: {data?.postedJobs || null}, Got applications:
        {data?.gotApplications || null}, Applied jobs:
        {data?.submittedJobs || null}, Got jobs: {data?.gotJobs || null}
      </Link>
    </>
  );
};

export const ShowScreen = () => (
  <Show actions={<ShowActions />}>
    <SimpleShowLayout>
      <Grid container spacing={1}>
        <Grid item xs={12} md={6} lg={5} xl={3}>
          <TextField source="fullName" />
        </Grid>
        <Grid item md={12} />

        <Grid item xs={12} md={4} lg={4} xl={2}>
          <span>Username: </span>
          <TextField source="username" label="username" />
        </Grid>

        <Grid item xs={12} md={4} lg={4} xl={2}>
          <span>Email: </span>
          <TextField source="email" />
        </Grid>

        <Grid item xs={12} md={4} lg={4} xl={2}>
          <span>Contact: </span>
          <TextField source="contact" />
        </Grid>
        <Grid item md={12} />
        <Grid item xs={12} md={6} lg={5} xl={3}>
          <span>Work skills: </span>
          <ReferenceArrayField
            reference="skills"
            source="skills"
            sx={{ mt: 1 }}
          >
            <SingleFieldList>
              <ChipField source="name" />
            </SingleFieldList>
          </ReferenceArrayField>
        </Grid>
        <Grid item md={12} />
        <Grid item xs={12} md={12} lg={8} xl={6}>
          <RichTextField source="description" label="User description"/>
        </Grid>
      </Grid>

      <UserProfile></UserProfile>

      <DateField source="createdAt" />
    </SimpleShowLayout>
  </Show>
);
