import * as React from "react";
import {
  Show,
  SimpleShowLayout,
  TextField,
  DateField,
  RichTextField,
  ReferenceField,
  NumberField,
  TopToolbar,
  useRecordContext,
  BooleanField,
  UrlField,
  SimpleForm,
  useDataProvider,
  useRefresh,
  Toolbar,
  SaveButton,
  Create,
} from "react-admin";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import BackButton from "../components/backButton";
import RateField from "../components/rateField";
import { RichTextInput } from "ra-input-rich-text";
import MessageField from "../components/messageField";
import { useForm } from "react-hook-form";
import { useFormContext } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const ShowActions = () => (
  <TopToolbar>
    {/* Add your custom action components */}
    <BackButton />
  </TopToolbar>
);

const CreateMessage = (props) => {
  const MyToolbar = () => {
    return (
      <Toolbar>
        <SaveButton label="Send" />
      </Toolbar>
    );
  };

  const navigate = useNavigate();

  const refreshBrowser = () => {
    navigate(0);
  };
  const formContext = useFormContext();
  const record = useRecordContext();
  const dataProvider = useDataProvider();
  const refresh = useRefresh();

  const onSubmit = (data) => {
    dataProvider
      .customMethod(
        `jobbids/messages/${record.id}`,
        { data: { body: data.body } },
        "POST"
      )
      .then((result) => {
        //refresh new data but not reset form data to default
        //refresh();
        //reset form data to default. formContext does not work
        refreshBrowser();
      })
      .catch((error) => {});
  };

  return (
    <Create redirect="list">
      <SimpleForm
        onSubmit={onSubmit}
        sx={{ m: 0, p: 0 }}
        toolbar={<MyToolbar></MyToolbar>}
        defaultValues={{ body: "" }}
      >
        <RichTextInput source="body" label="Message to employer" />
      </SimpleForm>
    </Create>
  );
};

const ShowScreen = (props) => {
  return (
    <>
      <Show actions={<ShowActions />}>
        <SimpleShowLayout>
          <Grid container spacing={1}>
            <Grid item xs={12} md={6} lg={5} xl={3}>
              <Typography variant="subtitle2">
                <strong> Application name </strong>
              </Typography>
              <TextField source="name" fullWidth label="name" />
            </Grid>
            <Grid item md={12} />

            <Grid item xs={12} md={4} lg={3} xl={2}>
              <Typography variant="subtitle2">
                <strong> Applied date </strong>
              </Typography>
              <DateField source="createdAt" showTime />
            </Grid>
            <Grid item xs={12} md={4} lg={3} xl={2}>
              <Typography variant="subtitle2">
                <strong> Application rating </strong>
              </Typography>

              <RateField source="rate" label="Matching rate" />
            </Grid>

            <Grid item xs={12} md={4} lg={3} xl={2}>
              <Typography variant="subtitle2">
                <strong> Requested amount </strong>
              </Typography>
              <NumberField source="bidValue" />
            </Grid>
            <Grid item xs={12} md={4} lg={3} xl={2}>
              <Typography variant="subtitle2">
                <strong> Job seeker </strong>
              </Typography>
              <ReferenceField
                source="jobSeekerId"
                reference="users"
                link={false}
              >
                <TextField source="fullName" />
              </ReferenceField>
            </Grid>
            <Grid item md={12} />

            <Grid item xs={12} md={4} lg={3} xl={2}>
              <Typography variant="subtitle2">
                <strong> Applied to complete at </strong>
              </Typography>
              <DateField source="completeDate" fullWidth />
            </Grid>
            <Grid item xs={12} md={4} lg={3} xl={2}>
              <Typography variant="subtitle2">
                <strong>Job deadline</strong>
              </Typography>

              <ReferenceField source="jobId" reference="postjobs" link={false}>
                <DateField source="expectDate" fullWidth />
              </ReferenceField>
            </Grid>

            <Grid item xs={12} md={4} lg={3} xl={2}>
              <Typography variant="subtitle2">
                <strong>Has prototype </strong>
              </Typography>
              <BooleanField source="hasPrototype" fullWidth />
            </Grid>
            <Grid item xs={12} md={4} lg={3} xl={2}>
              <Typography variant="subtitle2">
                <strong> Prototype url </strong>
              </Typography>
              <UrlField source="prototypeUrl" fullWidth />
            </Grid>
            <Grid item md={12} />
            <Grid item xs={12} md={4} lg={3} xl={2}>
              <Typography variant="subtitle2">
                <strong> Is selected </strong>
              </Typography>
              <BooleanField source="isSelected" fullWidth />
            </Grid>

            <Grid item xs={12} md={4} lg={3} xl={2}>
              <Typography variant="subtitle2">
                <strong> Payment locked </strong>
              </Typography>
              <BooleanField source="isSignedTx" fullWidth />
            </Grid>

            <Grid item xs={12} md={4} lg={3} xl={2}>
              <Typography variant="subtitle2">
                <strong> Job done </strong>
              </Typography>
              <BooleanField source="jobDone" fullWidth />
            </Grid>

            <Grid item xs={12} md={4} lg={3} xl={2}>
              <Typography variant="subtitle2">
                <strong> Complete confirmed </strong>
              </Typography>
              <BooleanField source="isCompleted" fullWidth />
            </Grid>

            <Grid item xs={12} md={4} lg={3} xl={2}>
              <Typography variant="subtitle2">
                <strong> Payment status </strong>
              </Typography>
              <BooleanField source="isPaid" fullWidth />
            </Grid>

            <Grid item md={12} />
            <Grid item xs={12} md={8} lg={6} xl={4}>
              <Typography variant="subtitle2">
                <strong>Application letter</strong>
              </Typography>
              <RichTextField source="description" fullWidth />
            </Grid>
            <Grid item md={12} />
            <Grid item xs={12} md={12} lg={12} xl={12}>
              <MessageField source="messages" />
            </Grid>
            <Grid item md={12} />
          </Grid>
          <CreateMessage />
        </SimpleShowLayout>
      </Show>
    </>
  );
};

export default ShowScreen;
