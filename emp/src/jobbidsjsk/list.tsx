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
  useRefresh,
  useUpdate,
  BooleanInput,
  FilterButton,
} from "react-admin";
import RateField from "../components/rateField";
import CurrencyNumberField from "../components/currencyNumberFieldBid";
import Typography from "@mui/material/Typography";
import RefreshButton from "../components/refreshButton";
import Button from "@mui/material/Button";
import ShowButton from "../components/showButton";
import MessagesCount from "../components/messagesCount";

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

  <BooleanInput
    source="isSelected"
    label="Selected applications"
    defaultValue={true}
  />,
  <BooleanInput
    source="jobDone"
    label="Job done  applications"
    defaultValue={true}
  />,
  <BooleanInput
    source="isCompleted"
    label=" Confirmed complete applications"
    defaultValue={true}
  />,
  <BooleanInput
    source="isPaid"
    label="Paid applications"
    defaultValue={true}
  />,
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
      <FilterButton />
      <JobCreateButton />
      <ExportButton />
      <RefreshButton baseUrl="/jobbidsjsk"></RefreshButton>
    </TopToolbar>
  );

  const JobDoneButton = (props) => {
    const record = useRecordContext();
    const diff = { jobDone: !record.jobDone };
    const refresh = useRefresh();
    const [update, { isLoading, error }] = useUpdate("jobbidsjsk", {
      id: record.id,
      data: diff,
      previousData: record,
    });

    const handleClick = () => {
      update();
    };

    React.useEffect(() => {
      refresh();
    }, [isLoading, error]);

    return (
      <Button
        variant="text"
        disabled={record.isPaid || !record.isSelected}
        onClick={handleClick}
      >
        {record.jobDone ? "Mark in progress" : "Mark job done"}
      </Button>
    );
  };

  return (
    <List
      empty={<></>}
      emptyWhileLoading
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
        <ReferenceField reference="postjobsjsk" source="jobId" link={"show"}>
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
        <DateField source="createdAt" showTime />
        <BooleanField source="isSelected" />
        <JobDoneButton source="jobDone" label="Job done" />
        <BooleanField source="isCompleted" label="Confirmed Complete" />
        <BooleanField source="isPaid" />
        <EditButton />
        <MessagesCount></MessagesCount>
        <ShowButton />
      </Datagrid>
    </List>
  );
};

export default ListScreen;
