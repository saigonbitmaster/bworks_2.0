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
} from "react-admin";
import CurrencyNumberField from "../components/currencyNumberField";
import LinkBidField from "../components/sumBidsField";
import ApplyButton from "../components/applyButton";
import { Box, Drawer } from "@mui/material";
import Steps from "../components/jobApplicationAside";
import RateField from "../components/rateField";

const filters = [<TextInput label="Search" source="textSearch" alwaysOn />];

const JobListActions = () => (
  <TopToolbar>
    <ExportButton />
  </TopToolbar>
);

const ListScreen = () => {
  const [record, setRecord] = React.useState(null);
  const rowClick = (id, resource, record) => {
    setRecord(record);
    return null;
  };

  return (
    <Box display="flex">
      <List
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
          marginRight: record ? "300px" : 0,
        }}
        actions={<JobListActions />}
        filter={{ queryType: "jobSeeker", isApproved: true }}
      >
        <Datagrid rowClick={rowClick}>
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
          <LinkBidField />
          <ApplyButton />
          <Drawer
            variant="persistent"
            open={record}
            anchor="right"
            sx={{ zIndex: 100 }}
          >
            {record && <Steps record={record}></Steps>}
          </Drawer>
          <EditButton />
        </Datagrid>
      </List>
    </Box>
  );
};

export default ListScreen;
