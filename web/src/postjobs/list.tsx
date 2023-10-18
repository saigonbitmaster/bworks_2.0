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
  const [record, setRecord] = React.useState(null);
  const rowClick = (id, resource, record) => {
    setRecord(record);
    return null;
  };

  return (
    <Box display="flex">
      <List
        empty={<></>}
        emptyWhileLoading
        filters={filters}
        perPage={25}
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
        <Datagrid rowClick={rowClick} expand={<JobPanel />}>
          <TextField source="name" label="Job name" />
          <CurrencyNumberField source="budget" threshold={10000} />
          <ReferenceField reference="users" source="employerId" link={"show"}>
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
          <BooleanField source="isApproved" label="Approval" />

          <DateField source="expireDate" showTime />
          <DateField source="createdAt" showTime />
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
