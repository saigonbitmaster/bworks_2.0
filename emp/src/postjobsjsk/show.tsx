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
  EditButton,
  useRecordContext,
} from "react-admin";
import Grid from "@mui/material/Grid";
import CurrencyNumberField from "../components/currencyNumberField";
import Typography from "@mui/material/Typography";
import RateField from "../components/rateField";
import JobAside from "../components/jobShowAside";
import Box from "@mui/material/Box";
import MatchUsers from "../components/matchedUsers";

const ShowActions = () => (
  <TopToolbar>{/* Add your custom action components */}</TopToolbar>
);

const Aside = () => {
  const record = useRecordContext();
  return (
    <Box
      sx={{
        pl: 1,
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

const ShowScreen = () => {
  return (
    <Show
      actions={<ShowActions />}
      aside={<Aside />}
      title={<ListMatchedUsers />}
    >
      <>
        <SimpleShowLayout>
          <Grid container spacing={1}>
            <Grid item xs={12} md={6} lg={5} xl={3}>
              <Typography variant="subtitle2">
                <strong> Job name </strong>
              </Typography>
              <TextField source="name" fullWidth label="name" />
            </Grid>
            <Grid item md={12} />

            <Grid item xs={12} md={4} lg={3} xl={2}>
              <Typography variant="subtitle2">
                <strong> Budget </strong>
              </Typography>
              <CurrencyNumberField source="budget" />
            </Grid>
            <Grid item xs={12} md={4} lg={3} xl={2}>
              <Typography variant="subtitle2">
                <strong> Employer </strong>
              </Typography>
              <ReferenceField
                source="employerId"
                reference="users"
                link={false}
              >
                <TextField source="fullName" />
              </ReferenceField>
            </Grid>
            <Grid item md={12} />
            <Grid item xs={12} md={4} lg={3} xl={2}>
              <Typography variant="subtitle2">
                <strong> Min requested amount </strong>
              </Typography>
              <NumberField source="minBidValue" fullWidth />
            </Grid>
            <Grid item xs={12} md={4} lg={3} xl={2}>
              <Typography variant="subtitle2">
                <strong> Required amount to apply </strong>
              </Typography>
              <NumberField source="requiredAmountToBid" fullWidth />
            </Grid>
            <Grid item md={12} />
            <Grid item xs={12} md={4} lg={3} xl={2}>
              <Typography variant="subtitle2">
                <strong> Expire date</strong>
              </Typography>
              <DateField source="expireDate" fullWidth />
            </Grid>
            <Grid item xs={12} md={4} lg={3} xl={2}>
              <Typography variant="subtitle2">
                <strong>Job deadline</strong>
              </Typography>
              <DateField source="expectDate" fullWidth />
            </Grid>
            <Grid item md={12} />
            <Grid item xs={12} md={8} lg={6} xl={4}>
              <Typography variant="subtitle2">
                <strong>Required skills to apply</strong>
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
            <Grid item xs={12} md={8} lg={6} xl={4}>
              <Typography variant="subtitle2">
                <strong>Job description</strong>
              </Typography>
              <RichTextField source="description" fullWidth />

              <Typography variant="subtitle2">
                <strong>Your match rate</strong>
              </Typography>
              <RateField source="matchRate" label="Your match" />
              <div>
                <ListMatchedUsers></ListMatchedUsers>
              </div>
            </Grid>
          </Grid>
        </SimpleShowLayout>
      </>
    </Show>
  );
};

export default ShowScreen;
