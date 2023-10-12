import * as React from "react";
import {
  List,
  Datagrid,
  TextField,
  EditButton,
  DateField,
  NumberField,
  ReferenceField,
  TextInput,
  BooleanField,
  SelectInput,
  ReferenceInput,
  TopToolbar,
  ExportButton,
  CreateButton,
  useRecordContext,
  useGetOne,
} from "react-admin";
import RateField from "../components/rateField";
import CurrencyNumberField from "../components/currencyNumberFieldBid";
import Typography from "@mui/material/Typography";

const filters = [
  <TextInput label="Search" source="textSearch" alwaysOn />,
  <ReferenceInput source="jobId" reference="postjobs" alwaysOn>
    <SelectInput optionText="name" fullWidth />
  </ReferenceInput>,
];

const ListScreen = () => {
  const BidPanel = () => {
    const record = useRecordContext();
    const {
      data: job,
      isLoading,
      error,
    } = useGetOne("postjobs", { id: record.jobId });

    return (
      <>
        {record.description && (
          <>
            <div dangerouslySetInnerHTML={{ __html: record.description }} />
          </>
        )}

        {!isLoading && !error && job.description && (
          <>
            <Typography variant="caption" gutterBottom>
              <strong> Job description</strong>
            </Typography>

            <div dangerouslySetInnerHTML={{ __html: job.description }} />
          </>
        )}
      </>
    );
  };

  const JobCreateButton = () => <CreateButton label="Apply a job" />;

  const JobListActions = () => (
    <TopToolbar>
      <JobCreateButton />
      <ExportButton />
    </TopToolbar>
  );

  return (
    <List
      perPage={25}
      sort={{ field: "createdAt", order: "desc" }}
      hasCreate
      resource="jobbidsjsk"
      filters={filters}
      actions={<JobListActions />}
      filter={{ queryType: "jobSeeker" }}
    >
      <Datagrid expand={<BidPanel />}>
        <TextField source="name" label="Application" />
        <ReferenceField reference="postJobs" source="jobId">
          <TextField source="name" />
        </ReferenceField>
        <ReferenceField reference="users" source="employerId" link={"show"}>
          <TextField source="fullName" />
        </ReferenceField>
        <ReferenceField
          reference="postjobs"
          source="jobId"
          label="Job deadline"
          link={false}
        >
          <DateField source="expectDate" showTime />
        </ReferenceField>
        <CurrencyNumberField
          source="bidValue"
          threshold={10000}
          label="Requested amount"
        />

        <DateField source="completeDate" showTime label="Your deadline" />
        <RateField source="rate" label="Matching rate" />
        <BooleanField source="isSelected" />
        <BooleanField source="isCompleted" />
        <BooleanField source="isPaid" />
        <EditButton />
      </Datagrid>
    </List>
  );
};

export default ListScreen;
