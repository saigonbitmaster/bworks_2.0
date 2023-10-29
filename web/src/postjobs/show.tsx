import * as React from "react";
import {
  Show,
  SimpleShowLayout,
  TextField,
  DateField,
  RichTextField,
  ReferenceField,
  NumberField,
  ReferenceArrayField,
  ArrayField,
  SingleFieldList,
  ChipField,
  TopToolbar,
  useRecordContext,
  FunctionField,
} from "react-admin";
import Grid from "@mui/material/Grid";
import CurrencyNumberField from "../components/currencyNumberField";
import Typography from "@mui/material/Typography";
import JobAside from "../components/jobShowAside";
import Box from "@mui/material/Box";
import MatchUsers from "../components/matchedUsers";
import BackButton from "../components/backButton";

const ShowActions = () => (
  <TopToolbar>
    {/* Add your custom action components */}
    <BackButton />
  </TopToolbar>
);

const Aside = () => {
  const record = useRecordContext();
  return (
    <Box
      sx={{
        pl: 1,
        pt: 0,
        mt: 0,
      }}
    >
      {record && <JobAside record={record} />}
    </Box>
  );
};

const ListMatchedUsers = () => {
  const record = useRecordContext();
  // the record can be empty while loading
  if (!record) return null;
  return <MatchUsers record={record} />;
};

const ShowTitle = () => {
  const record = useRecordContext();
  // the record can be empty while loading
  if (!record) return null;
  return <span>{record.name}</span>;
};

const ShowScreen = () => {
  return (
    <Show title={<ShowTitle />} actions={<ShowActions />} aside={<Aside />}>
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
                      <DateField
                        source="createdAt"
                        fullWidth
                        showTime
                      /> by{" "}
                      <ReferenceField
                        record={record}
                        source="employerId"
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
              <strong> Budget ($)</strong>
            </Typography>
            <CurrencyNumberField source="budget" />
          </Grid>
          <Grid item md={12} />
          <Grid item xs={12} md={4} lg={3} xl={1.5}>
            <Typography variant="subtitle2">
              <strong> Expire date</strong>
            </Typography>
            <DateField source="expireDate" fullWidth />
          </Grid>
          <Grid item xs={12} md={4} lg={3} xl={1.5}>
            <Typography variant="subtitle2">
              <strong>Job deadline</strong>
            </Typography>
            <DateField source="expectDate" fullWidth />
          </Grid>

          <Grid item xs={12} md={4} lg={3} xl={2}>
            <Typography variant="subtitle2">
              <strong> Min requested amount ($) </strong>
            </Typography>
            <NumberField source="minBidValue" fullWidth />
          </Grid>
          <Grid item xs={12} md={4} lg={3} xl={2}>
            <Typography variant="subtitle2">
              <strong> Required amount ($) to apply </strong>
            </Typography>
            <NumberField source="requiredAmountToBid" fullWidth />
          </Grid>
          <Grid item md={12} />

          <Grid item xs={12} md={8} lg={6} xl={4}>
            <Typography variant="subtitle2">
              <strong>Required work skills</strong>
            </Typography>
            <ReferenceArrayField source="skills" reference="skills">
              <SingleFieldList>
                <ChipField source="name" />
              </SingleFieldList>
            </ReferenceArrayField>
          </Grid>
          <Grid item md={12} />
          <Grid item xs={12} md={8} lg={6} xl={4}>
            <Typography variant="subtitle2">
              <strong>Tasks</strong>
            </Typography>
            <ArrayField source="tasks" emptyText="missing data">
              <SingleFieldList linkType={false}>
                <ChipField
                  source="name"
                  size="small"
                  emptyText="missing data"
                />
              </SingleFieldList>
            </ArrayField>
          </Grid>
          <Grid item md={12} />
          <Grid item xs={12} md={12} lg={12} xl={12}>
            <Typography variant="subtitle2">
              <strong>Job description</strong>
            </Typography>
            <RichTextField source="description" fullWidth />

            <div>
              <ListMatchedUsers></ListMatchedUsers>
            </div>
          </Grid>
        </Grid>
      </SimpleShowLayout>
    </Show>
  );
};

export default ShowScreen;
