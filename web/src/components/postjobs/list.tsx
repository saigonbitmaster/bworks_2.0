import * as React from "react";
import {
  List,
  Datagrid,
  TextField,
  EditButton,
  DateField,
  SingleFieldList,
  ChipField,
  ReferenceArrayField,
  ReferenceField,
  TextInput,
  BooleanField,
  CreateButton,
  ExportButton,
  TopToolbar,
  useRecordContext,
  UrlField,
  BooleanInput,
  useListSortContext,
} from "react-admin";
import CurrencyNumberField from "../components/currencyNumberField";
import LinkBidField from "../components/sumBidsField";
import { Box, Drawer } from "@mui/material";
import JobAppSteps from "../components/jobApplicationAside";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";
import MatchUsers from "../components/matchedUsers";
import MatchedUsersField from "../components/matchedUsersField";
import RefreshButton from "../components/refreshButton";
import ShowJob from "../components/showButton";
import Divider from "@mui/material/Divider";
import { TableHead, TableRow, TableCell } from "@mui/material";
import { DatagridHeaderProps, FieldProps } from "react-admin";
import ButtonBase from "@mui/material/ButtonBase";

const filters = [
  <TextInput label="Search" source="textSearch" alwaysOn sx={{ width: 300 }} />,
  <BooleanInput
    label="Matched with job seekers"
    source="matchUsers_gte"
    parse={(v) => (v ? 1 : 0)}
    alwaysOn
  />,
];

const JobCreateButton = () => <CreateButton label="Create new job" />;

const JobListActions = () => (
  <TopToolbar>
    <JobCreateButton />
    <ExportButton />
    <RefreshButton baseUrl="/postjobs"></RefreshButton>
  </TopToolbar>
);

const JobPanel = () => {
  const record = useRecordContext();
  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: record.description }} />

      <MatchUsers matchUsers={record.matchUsers}></MatchUsers>
    </>
  );
};

const ListScreen = () => {
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
          <TableCell align="center" colSpan={8} sx={{ border: "none", pb: 0 }}>
            <Divider>
              <strong>JOBs</strong>
            </Divider>
          </TableCell>
          <TableCell align="center" colSpan={2} sx={{ border: "none", pb: 0 }}>
            <Divider>
              <strong>APPLICATIONs</strong>
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

  const [record, setRecord] = React.useState(null);
  const rowClick = (id, resource, record) => {
    setRecord(record);
    return null;
  };

  return (
    <Box display="flex">
      <List
        empty={false}
        emptyWhileLoading
        filters={filters}
        perPage={10}
        sort={{ field: "createdAt", order: "desc" }}
        hasCreate
        filter={{ queryType: "employer", isApproved: true }}
        sx={{
          flexGrow: 1,
          transition: (theme: any) =>
            theme.transitions.create(["all"], {
              duration: theme.transitions.duration.enteringScreen,
            }),
        }}
        actions={<JobListActions />}
        aside={<JobAppSteps record={record} queryType="employer"></JobAppSteps>}
      >
        <Datagrid
          rowClick={rowClick}
          expand={<JobPanel />}
          header={DatagridHeader}
        >
          <TextField source="name" label="Job" />
          <CurrencyNumberField
            source="budget"
            threshold={10000}
            label="Budget ($)"
            textAlign="left"
          />

          <ReferenceArrayField
            reference="skills"
            source="skills"
            label="Required skills"
          >
            <SingleFieldList>
              <ChipField source="name" />
            </SingleFieldList>
          </ReferenceArrayField>

          <DateField source="expireDate" showTime label="Expire date" />
          <DateField source="createdAt" showTime label="Posted at" />
          <BooleanField source="isApproved" label="Approval" />
          <MatchedUsersField label="Matched users" source="matchUsers" />

          <LinkBidField />

          <EditButton />
          <ShowJob />
        </Datagrid>
      </List>
    </Box>
  );
};

export default ListScreen;
