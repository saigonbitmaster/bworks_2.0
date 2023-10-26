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
  useNotify,
  useListSortContext,
  FunctionField,
} from "react-admin";

import RateField from "../components/rateField";
import CurrencyNumberField from "../components/currencyNumberFieldBid";
import Typography from "@mui/material/Typography";
import RefreshButton from "../components/refreshButton";
import Button from "@mui/material/Button";
import ShowButton from "../components/showButton";
import MessagesCount from "../components/messagesCount";
import { Box } from "@mui/material";
import Divider from "@mui/material/Divider";
import { TableHead, TableRow, TableCell } from "@mui/material";
import { DatagridHeaderProps, FieldProps } from "react-admin";
import ButtonBase from "@mui/material/ButtonBase";
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
    const notify = useNotify();
    const [update, { isLoading, error }] = useUpdate(
      "jobbidsjsk",
      {
        id: record.id,
        data: diff,
        previousData: record,
      },
      {
        onError: (error) => {
          notify(`${error}`, { type: "warning" });
        },
      }
    );

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
          <TableCell align="center" colSpan={6} sx={{ border: "none", pb: 0 }}>
            <Divider>
              <strong>ACTIONs</strong>
            </Divider>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell sx={{ pt: 0 }}></TableCell>
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
      perPage={25}
      sort={{ field: "createdAt", order: "desc" }}
      hasCreate
      resource="jobbidsjsk"
      filters={filters}
      actions={<JobListActions />}
      filter={{ queryType: "jobSeeker" }}
    >
      <Datagrid expand={<BidPanel />} header={DatagridHeader}>
        <TextField source="name" label="Application" />

        <CurrencyNumberField
          source="bidValue"
          threshold={10000}
          label="Requested ($)"
        />

        <DateField source="completeDate" showTime label="Your deadline" />

        <RateField source="rate" label="Matching rate" />
        <DateField source="createdAt" showTime label="Submitted at" />
        <ReferenceField
          reference="postjobsjsk"
          source="jobId"
          link={"show"}
          label="Job"
        >
          <TextField source="name" />
        </ReferenceField>
        <ReferenceField
          reference="users"
          source="employerId"
          link={"show"}
          label="Employer"
        >
          <TextField source="fullName" />
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
          reference="postjobsjsk"
          source="jobId"
          label="Job deadline"
          link={false}
        >
          <DateField source="expectDate" showTime label="Job deadline" />
        </ReferenceField>
        <BooleanField source="isSelected" label="Is selected" />
        <JobDoneButton source="jobDone" label="Job done" />
        <BooleanField source="isCompleted" label="Confirmed complete" />
        <BooleanField source="isPaid" label="Is paid" />
        <EditButton />
        <MessagesCount></MessagesCount>
        <ShowButton />
      </Datagrid>
    </List>
  );
};

export default ListScreen;
