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
  AutocompleteInput,
} from "react-admin";
import RateField from "../components/rateField";
import CurrencyNumberField from "../components/currencyNumberFieldBid";
import Typography from "@mui/material/Typography";
import RefreshButton from "../components/refreshButton";

const filterToQuery = (searchText) => ({ textSearch: searchText });
const filters = [
  <TextInput label="Search" source="textSearch" alwaysOn sx={{ width: 300 }} />,
  <ReferenceInput source="jobId" reference="postjobs" alwaysOn>
    <AutocompleteInput
      filterToQuery={filterToQuery}
      fullWidth
      optionText="name"
      label="Search a job"
      sx={{ width: 300 }}
    />
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
      <RefreshButton baseUrl="/jobbidsjsk"></RefreshButton>
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
        <ReferenceField reference="postJobsjsk" source="jobId" link={"show"}>
          <TextField source="name" />
        </ReferenceField>
        <ReferenceField reference="users" source="employerId" link={"show"}>
          <TextField source="fullName" />
        </ReferenceField>
        <ReferenceField
          reference="postjobsjsk"
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
