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
  BooleanField,
  NumberField,
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
    completeJobs: 0,
    paidJobs: 0,
    employerCompleteJobs: 0,
    employerPaidJobs: 0,
    matchedJobs: 0,
  });
  const dataProvider = useDataProvider();

  React.useEffect(() => {
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
  }, []);

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
        <i>
          <span> {"Hiring: "}</span>
        </i>{" "}
        Posted jobs: {data?.postedJobs || 0}, Got applications:{" "}
        {data?.gotApplications || 0}, Got complete jobs:{" "}
        {data?.employerCompleteJobs || 0}, Paid out jobs:{" "}
        {data?.employerPaidJobs || 0}
        <br />
      </Link>
      <Typography variant="subtitle2">
        <i>
          <span> {"Job search: "}</span>
        </i>{" "}
        Matched jobs: {data?.matchedJobs || 0}, Applied jobs:{" "}
        {data?.submittedJobs || 0}, Got jobs: {data?.gotJobs || 0}, Complete
        jobs: {data?.completeJobs || 0}, Received payments:{" "}
        {data?.paidJobs || 0}
      </Typography>
    </>
  );
};

export const ShowScreen = () => (
  <Show actions={<ShowActions />}>
    <SimpleShowLayout>
      <Grid container spacing={1}>
        <Grid item xs={12} md={4} lg={4} xl={2}>
          <span>Account: </span>
          <TextField source="username" label="username" />
          {" - "}
          <TextField source="fullName" />
        </Grid>
        <Grid item xs={12} md={6} lg={5} xl={3}></Grid>
        <Grid item md={12} />

        <Grid item xs={12} md={4} lg={4} xl={2}>
          <span>Email: </span>
          <TextField source="email" />
        </Grid>

        <Grid item xs={12} md={4} lg={4} xl={2}>
          <span>Contact: </span>
          <TextField source="contact" />
        </Grid>
        <Grid item xs={12} md={4} lg={4} xl={4}>
          <span>Git link: </span>
          <TextField source="gitLink" />
        </Grid>
        <Grid item md={12} />

        <Grid item xs={12} md={4} lg={4} xl={2}>
          <span>Is employer: </span>
          <BooleanField source="isEmployer" />
        </Grid>

        <Grid item xs={12} md={4} lg={4} xl={2}>
          <span>Is job seeker: </span>
          <BooleanField source="isJobSeeker" />
        </Grid>
        <Grid item xs={12} md={4} lg={4} xl={2}>
          <span>Available work hours per month: </span>
          <NumberField source="workHoursPerMonth" />
        </Grid>
        <Grid item md={12} />

        <Grid item xs={12} md={12} lg={8} xl={6}>
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
          <RichTextField source="description" label="User description" />
        </Grid>
      </Grid>

      <UserProfile></UserProfile>

      <DateField source="createdAt" label="Sign up at" />
    </SimpleShowLayout>
  </Show>
);
