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
        filter={{ queryType: "jobSeeker", isApproved: true }}
        aside={
          <JobAppSteps record={record} queryType="jobSeeker"></JobAppSteps>
        }
      >
        <Datagrid
          rowClick={rowClick}
          bulkActionButtons={false}
          expand={<JobPanel />}
        >
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
