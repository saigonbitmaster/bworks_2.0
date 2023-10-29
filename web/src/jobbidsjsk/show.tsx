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
  useNotify,
  FunctionField,
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
import Divider from "@mui/material/Divider";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import UnChecked from "@mui/icons-material/ClearOutlined";
import Checked from "@mui/icons-material/CheckOutlined";

const ShowActions = () => (
  <TopToolbar>
    {/* Add your custom action components */}
    <BackButton />
  </TopToolbar>
);

const CreateMessage = (props) => {
  const notify = useNotify();
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
        refresh();
        //reset form data to default. formContext does not work
        // refreshBrowser();
      })
      .catch((error) => {
        notify(error.message, { type: "warning" });
      });
  };

  return (
    <SimpleForm
      onSubmit={onSubmit}
      sx={{ m: 0, p: 0 }}
      toolbar={<MyToolbar></MyToolbar>}
      defaultValues={{ body: "" }}
    >
      <RichTextInput source="body" label="Message to job seeker" fullWidth />
    </SimpleForm>
  );
};

const ShowScreen = (props) => {
  return (
    <>
      <Show actions={<ShowActions />}>
        <SimpleShowLayout>
          <Grid container spacing={1}>
            <Grid item xs={12} md={12} lg={12} xl={12}>
              <FunctionField
                render={(record) => {
                  return (
                    <>
                      <Typography variant="h5" gutterBottom display="inline">
                        {record.name}{" "}
                      </Typography>
                      <i>
                        {" "}
                        <DateField source="createdAt" fullWidth showTime />{" "}
                        Applied by{" "}
                        <ReferenceField
                          record={record}
                          source="jobSeekerId"
                          reference="users"
                          link="show"
                        >
                          {" "}
                          <TextField source="fullName" />{" "}
                        </ReferenceField>
                      </i>
                    </>
                  );
                }}
              />
            </Grid>
            <Grid item md={12} />

            <Grid item xs={12} md={4} lg={3} xl={2}>
              <Typography variant="subtitle2">
                <strong> Application rating </strong>
              </Typography>
              <RateField source="rate" label="Matching rate" />
            </Grid>
            <Grid item md={12} />
            <Grid item xs={12} md={12} lg={12} xl={8}>
              <Divider>JOB APPLICATION</Divider>
            </Grid>

            <Grid item md={12} />
            <Grid item xs={12} md={4} lg={3} xl={1.5}>
              <Typography variant="subtitle2">
                <strong> Requested amount ($) </strong>
              </Typography>
              <NumberField source="bidValue" />
            </Grid>
            <Grid item xs={12} md={4} lg={3} xl={1.5}>
              <Typography variant="subtitle2">
                <strong> Applied to complete at </strong>
              </Typography>
              <DateField source="completeDate" fullWidth showTime />
            </Grid>

            <Grid item xs={12} md={4} lg={3} xl={1.5}>
              <Typography variant="subtitle2">
                <strong>Has prototype </strong>
              </Typography>
              <BooleanField source="hasPrototype" fullWidth />
            </Grid>
            <Grid item xs={12} md={4} lg={3} xl={3.5}>
              <FunctionField
                render={(record) => {
                  return (
                    <>
                      {record.hasPrototype && (
                        <>
                          <Typography variant="subtitle2">
                            <strong> Prototype url </strong>
                          </Typography>
                          <UrlField source="prototypeLink" fullWidth />
                        </>
                      )}
                    </>
                  );
                }}
              />
            </Grid>
            <Grid item md={12} />
            <Grid item xs={12} md={12} lg={12} xl={8}>
              <Typography variant="subtitle2">
                <strong>Application letter</strong>
              </Typography>
              <RichTextField source="description" fullWidth />
            </Grid>

            <Grid item md={12} />
            <Grid item xs={12} md={12} lg={12} xl={8}>
              <Divider>APPLICATION PROGRESS</Divider>
            </Grid>

            <Grid item md={12} />
            <Grid item xs={12} md={12} lg={12} xl={8}>
              <FunctionField
                render={(record) => {
                  const activeStep = record.isPaid
                    ? 5
                    : record.isCompleted
                    ? 4
                    : record.jobDone
                    ? 3
                    : record.isSignedTx
                    ? 2
                    : record.isSelected
                    ? 1
                    : 0;

                  return (
                    <Stepper activeStep={activeStep}>
                      <Step>
                        <StepLabel
                          StepIconComponent={
                            record.isSelected ? Checked : UnChecked
                          }
                        >
                          Application is selected
                        </StepLabel>
                      </Step>
                      <Step>
                        <StepLabel
                          StepIconComponent={
                            record.isSignedTx ? Checked : UnChecked
                          }
                        >
                          Payment is locked
                        </StepLabel>
                      </Step>
                      <Step>
                        <StepLabel
                          StepIconComponent={
                            record.jobDone ? Checked : UnChecked
                          }
                        >
                          Job seeker complete work
                        </StepLabel>
                      </Step>
                      <Step>
                        <StepLabel
                          StepIconComponent={
                            record.isCompleted ? Checked : UnChecked
                          }
                        >
                          Employer confirmed the complete
                        </StepLabel>
                      </Step>
                      <Step>
                        <StepLabel
                          StepIconComponent={
                            record.isPaid ? Checked : UnChecked
                          }
                        >
                          Paid
                        </StepLabel>
                      </Step>
                    </Stepper>
                  );
                }}
              />
            </Grid>

            <Grid item md={12} />
            {/* 
            <Grid item xs={12} md={4} lg={2.4} xl={1.5}>
              <Typography variant="subtitle2">
                <strong> Is selected </strong>
              </Typography>
              <BooleanField source="isSelected" fullWidth />
            </Grid>

            <Grid item xs={12} md={4} lg={2.4} xl={1.5}>
              <Typography variant="subtitle2">
                <strong> Payment locked </strong>
              </Typography>
              <BooleanField source="isSignedTx" fullWidth />
            </Grid>

            <Grid item xs={12} md={4} lg={2.4} xl={1.5}>
              <Typography variant="subtitle2">
                <strong> Job done </strong>
              </Typography>
              <BooleanField source="jobDone" fullWidth />
            </Grid>

            <Grid item xs={12} md={4} lg={2.4} xl={1.5}>
              <Typography variant="subtitle2">
                <strong> Complete confirmed </strong>
              </Typography>
              <BooleanField source="isCompleted" fullWidth />
            </Grid>

            <Grid item xs={12} md={4} lg={2.4} xl={1.5}>
              <Typography variant="subtitle2">
                <strong> Payment status </strong>
              </Typography>
              <BooleanField source="isPaid" fullWidth />
            </Grid>
 */}
            <Grid item md={12} />
            <Grid item xs={12} md={12} lg={12} xl={8}>
              <Divider>COMMUNICATIONs</Divider>
            </Grid>

            <Grid item md={12} />
            <Grid item xs={12} md={12} lg={12} xl={8}>
              <MessageField source="messages" />
            </Grid>
            <Grid item md={12} />

            <Grid item xs={12} md={12} lg={12} xl={8}>
              <CreateMessage />
            </Grid>
          </Grid>
        </SimpleShowLayout>
      </Show>
    </>
  );
};

export default ShowScreen;
