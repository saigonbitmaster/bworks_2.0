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
  BooleanInput,
  FilterButton,
  UrlField,
  RichTextField,
  useListSortContext,
} from "react-admin";
import RateField from "../components/rateField";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { stringify } from "query-string";
import CurrencyNumberField from "../components/currencyNumberFieldBid";
import Typography from "@mui/material/Typography";
import RefreshButton from "../components/refreshButton";
import MessagesCount from "../components/messagesCount";
import Divider from "@mui/material/Divider";
import { TableHead, TableRow, TableCell } from "@mui/material";
import { DatagridHeaderProps, FieldProps } from "react-admin";
import ButtonBase from "@mui/material/ButtonBase";
import Aside from "../components/applicationAside";
import ShowButton from "../components/showButton";

const JobListActions = () => (
  <TopToolbar>
    <FilterButton></FilterButton>
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

const SelectButton = () => {
  const record = useRecordContext();
  const diff = { isSelected: !record.isSelected };
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
      disabled={record.isSignedTx || record.isPaid}
      onClick={handleClick}
      /*  startIcon={
        record.isSelected ? <ClearOutlinedIcon /> : <DoneOutlinedIcon />
      } */
    >
      {record.isSelected ? "deselect" : "select"}
    </Button>
  );
};

const CompletedButton = (props) => {
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
      {record.isCompleted ? "Mark incomplete" : "Mark complete"}
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
  const [record, setRecord] = React.useState(null);
  const rowClick = (id, resource, record) => {
    setRecord(record);
    return null;
  };

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
            <Typography variant="caption" gutterBottom>
              <strong>Application letter</strong>
            </Typography>
            <RichTextField record={record} source="description" />
          </>
        )}
        {record.hasPrototype && record.prototypeLink && (
          <>
            <Typography variant="subtitle2" gutterBottom display="inline">
              Prototype url:{" "}
            </Typography>
            <UrlField record={record} source="prototypeLink" target="_blank" />
          </>
        )}

        {!isLoading && !error && job.description && (
          <>
            <Typography variant="caption" display="block" sx={{ mt: 2 }}>
              <strong> Job description</strong>
            </Typography>

            <RichTextField record={job} source="description" />
          </>
        )}
      </>
    );
  };

  const DatagridHeader = ({ children }: DatagridHeaderProps) => {
    const { sort, setSort } = useListSortContext();
    const inverseOrder = (sort: string) => (sort === "ASC" ? "DESC" : "ASC");
    const handleChangeSort = (field) => {
      if (field) {
        setSort({
          field,
          order: field === sort.field ? inverseOrder(sort.order) : "ASC",
        });
      }
    };

    return (
      <TableHead sx={{ fontWeight: "bold" }}>
        <TableRow>
          <TableCell align="center" colSpan={7} sx={{ border: "none", pb: 0 }}>
            <Divider>
              <strong> APPLICATIONs </strong>
            </Divider>
          </TableCell>
          <TableCell align="center" colSpan={4} sx={{ border: "none", pb: 0 }}>
            <Divider>
              <strong>JOBs</strong>
            </Divider>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell sx={{ pt: 0 }}></TableCell>
          {/* empty cell to account for the select row checkbox in the body */}
          {React.Children.map(children, (child) =>
            React.isValidElement<FieldProps>(child) ? (
              <TableCell
                key={child.props.source}
                sx={{ textAlign: "left", pt: 0 }}
                onClick={() => {
                  handleChangeSort(child.props.source);
                }}
              >
                <ButtonBase disableRipple sx={{ typography: "subtitle2" }}>
                  <strong> {child.props.label || child.props.source} </strong>
                </ButtonBase>
              </TableCell>
            ) : null
          )}
        </TableRow>
      </TableHead>
    );
  };
  return (
    <List
      empty={false}
      emptyWhileLoading
      perPage={10}
      sort={{ field: "createdAt", order: "desc" }}
      hasCreate={false}
      resource="jobbids"
      filter={{ queryType: "employer", isApproved: true }}
      filters={filters}
      actions={<JobListActions />}
      aside={<Aside record={record} />}
    >
      <Datagrid
        bulkActionButtons={false}
        expand={<BidPanel />}
        rowClick={rowClick}
        header={DatagridHeader}
      >
        <TextField source="name" label="Application" />

        <ReferenceField
          reference="users"
          source="jobSeekerId"
          link={"show"}
          label="Applicant"
        >
          <TextField source="fullName" label="Applicant" />
        </ReferenceField>
        <CurrencyNumberField
          source="bidValue"
          threshold={10000}
          label="Requested ($)"
          textAlign="left"
        />

        <DateField source="completeDate" showTime label="Committed deadline" />
        <RateField source="rate" label="Matching rate" />
        <DateField source="createdAt" showTime label="Submitted at" />
        <ReferenceField
          reference="postJobs"
          source="jobId"
          label="Job"
          link={"show"}
        >
          <TextField source="name" />
        </ReferenceField>

        <ReferenceField
          reference="postJobs"
          source="jobId"
          label="Budget ($)"
          link={false}
        >
          <FunctionField render={(record) => `ADA ${record.budget}`} />
        </ReferenceField>

        <ReferenceField
          reference="postJobs"
          source="jobId"
          label="Job deadline"
          link={false}
        >
          <DateField source="expectDate" showTime />
        </ReferenceField>

        <ReferenceField
          reference="postJobs"
          source="jobId"
          label="Posted at"
          link={false}
        >
          <DateField source="createdAt" showTime />
        </ReferenceField>
        {/*      <SelectButton />

        <FunctionField
          render={(record) => (
            <SignButton disabled={record.isSignedTx || !record.isSelected} />
          )}
        />
        <BooleanField source="jobDone" label="Job done" />
        <CompletedButton label="Confirm complete" />
        <BooleanField source="isPaid" label="Paid" /> */}
        <MessagesCount></MessagesCount>
        <ShowButton />
      </Datagrid>
    </List>
  );
};

export default ListScreen;
