import * as React from "react";
import {
  List,
  Datagrid,
  TextField,
  DateField,
  SingleFieldList,
  ChipField,
  ReferenceArrayField,
  ReferenceField,
  TextInput,
  BooleanField,
  ExportButton,
  TopToolbar,
  useRecordContext,
  BooleanInput,
  useListSortContext,
} from "react-admin";
import CurrencyNumberField from "../components/currencyNumberField";
import LinkBidField from "../components/sumBidsField";
import ApplyButton from "../components/applyButton";
import { Box, Drawer } from "@mui/material";
import JobAppSteps from "../components/jobApplicationAside";
import RateField from "../components/rateField";
import MatchUsers from "../components/matchedUsers";
import RefreshButton from "../components/refreshButton";
import ShowJob from "../components/showButton";
import Divider from "@mui/material/Divider";
import { TableHead, TableRow, TableCell } from "@mui/material";
import { DatagridHeaderProps, FieldProps } from "react-admin";
import ButtonBase from "@mui/material/ButtonBase";

const filters = [
  <TextInput label="Search" source="textSearch" alwaysOn sx={{ width: 300 }} />,
  <BooleanInput
    label="Your suitable jobs"
    source="matchRate_gte"
    parse={(v) => (v ? 1 : 0)}
    alwaysOn
  />,
];

const JobListActions = () => {
  return (
    <TopToolbar>
      <ExportButton />
      <RefreshButton baseUrl="/postjobsjsk"></RefreshButton>
    </TopToolbar>
  );
};

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
        resource="postjobsjsk"
        filters={filters}
        perPage={25}
        sort={{ field: "createdAt", order: "desc" }}
        hasCreate
        sx={{
          flexGrow: 1,
          transition: (theme: any) =>
            theme.transitions.create(["all"], {
              duration: theme.transitions.duration.enteringScreen,
            }),
        }}
        actions={<JobListActions />}
        filter={{
          queryType: "jobSeeker",
          isApproved: true,
          expireDate_gte: new Date(),
        }}
        aside={
          <JobAppSteps record={record} queryType="jobSeeker"></JobAppSteps>
        }
      >
        <Datagrid
          rowClick={rowClick}
          bulkActionButtons={false}
          expand={<JobPanel />}
          header={DatagridHeader}
        >
          <TextField source="name" label="Job name" />
          <CurrencyNumberField
            source="budget"
            threshold={10000}
            textAlign="left"
          />
          <ReferenceField
            reference="users"
            source="employerId"
            link={"show"}
            textAlign="left"
          >
            <TextField source="fullName" />
          </ReferenceField>
          <ReferenceArrayField
            reference="skills"
            source="skills"
            label="Required skills"
          >
            <SingleFieldList>
              <ChipField source="name" />
            </SingleFieldList>
          </ReferenceArrayField>

          <RateField source="matchRate" label="Your match" />
          <DateField source="expireDate" showTime />
          <DateField source="createdAt" showTime />
          <LinkBidField queryType={null} />
          <ApplyButton />
          <ShowJob />
        </Datagrid>
      </List>
    </Box>
  );
};

export default ListScreen;
