import * as React from "react";
import {
  List,
  Datagrid,
  TextField,
  DateField,
  ExportButton,
  ReferenceField,
  TextInput,
  BooleanField,
  useUpdate,
  useRecordContext,
  useRefresh,
  FunctionField,
  TopToolbar,
  ReferenceInput,
  useGetOne,
  AutocompleteInput,
} from "react-admin";
import RateField from "../components/rateField";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { stringify } from "query-string";
import CurrencyNumberField from "../components/currencyNumberFieldBid";
import Typography from "@mui/material/Typography";
import RefreshButton from "../components/refreshButton";

const JobListActions = () => (
  <TopToolbar>
    <ExportButton />
    <RefreshButton baseUrl="/jobbids"></RefreshButton>
  </TopToolbar>
);

const filterToQuery = (searchText) => ({ textSearch: searchText });
const filters = [
  <TextInput label="Search" source="textSearch" alwaysOn sx={{ width: 300 }} />,
  <ReferenceInput
    source="jobId"
    reference="postjobs"
    filter={{ queryType: "employer" }}
    alwaysOn
  >
    <AutocompleteInput
      sx={{ width: 300 }}
      filterToQuery={filterToQuery}
      fullWidth
      optionText="name"
      label="Select a job"
    />
  </ReferenceInput>,
];

const SelectButton = () => {
  const record = useRecordContext();
  const diff = { isSelected: !record.isSelected };
  const refresh = useRefresh();
  const [update, { isLoading, error }] = useUpdate("/jobbids", {
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
      disabled={record.isSignedTx || record.isPaid}
      onClick={handleClick}
    >
      {record.isSelected ? "deselect" : "select"}
    </Button>
  );
};

const CompletedButton = () => {
  const record = useRecordContext();
  const diff = { isCompleted: !record.isCompleted };
  const refresh = useRefresh();
  const [update, { isLoading, error }] = useUpdate("jobbids", {
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
      {record.isCompleted ? "Incomplete" : "Complete"}
    </Button>
  );
};

const SignButton = (props) => {
  const record = useRecordContext();
  return (
    <Button
      sx={{ borderRadius: 0 }}
      component={Link}
      to={{
        pathname: "/smartcontract",
        search: stringify({
          jobbidid: JSON.stringify(record.id),
        }),
      }}
      size="small"
      color="primary"
      disabled={props.disabled}
    >
      Sign Plutus TX
    </Button>
  );
};

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

  return (
    <List
 
      perPage={25}
      sort={{ field: "createdAt", order: "desc" }}
      hasCreate={false}
      resource="jobbids"
      filter={{ queryType: "employer" }}
      filters={filters}
      actions={<JobListActions />}
    >
      <Datagrid bulkActionButtons={false} expand={<BidPanel />}>
        <TextField source="name" label="Application" />

        <ReferenceField
          reference="postJobs"
          source="jobId"
          label="Job name"
          link={"show"}
        >
          <TextField source="name" />
        </ReferenceField>

        <ReferenceField reference="users" source="jobSeekerId" link={"show"}>
          <TextField source="fullName" />
        </ReferenceField>
        <CurrencyNumberField
          source="bidValue"
          threshold={10000}
          label="Requested amount"
        />

        <RateField source="rate" label="Matching rate" />

        <BooleanField source="isSelected" label="Selected" />
        <DateField source="completeDate" showTime label="Your deadline" />

        <ReferenceField
          reference="postJobs"
          source="jobId"
          label="Job deadline"
          link={false}
        >
          <DateField source="expectDate" showTime />
        </ReferenceField>

        <SelectButton />

        <FunctionField
          render={(record) => (
            <SignButton disabled={record.isSignedTx || !record.isSelected} />
          )}
        />
        <CompletedButton />
        <BooleanField source="isPaid" />
      </Datagrid>
    </List>
  );
};

export default ListScreen;
