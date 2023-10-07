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
} from "react-admin";
import CurrencyNumberField from "../components/currencyNumberField";
import LinkBidField from "../components/linkBidsField";
import { Box, Drawer } from "@mui/material";
import Steps from "../components/jobApplicationAside";

const filters = [<TextInput label="Search" source="textSearch" alwaysOn />];

const ListScreen = () => {
  const [record, setRecord] = React.useState(null);
  const rowClick = (id, resource, record) => {
    setRecord(record);
    return "";
  };

   console.log(1, record)
  return (
    <Box display="flex">
      <List
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
          marginRight: record ? "300px" : 0,
        }}
      >
        <Datagrid rowClick={rowClick}>
          <TextField source="name" label="Job name" />
         
          <CurrencyNumberField source="budget" threshold={10000} />
          <ReferenceField reference="users" source="employerId" link={"show"}>
            <TextField source="fullName" />
          </ReferenceField>
          <ReferenceArrayField reference="skills" source="skills">
            <SingleFieldList>
              <ChipField source="name" />
            </SingleFieldList>
          </ReferenceArrayField>
          <BooleanField source="isApproved" />

          <DateField source="expireDate" showTime />
          <DateField source="createdAt" showTime />
          <LinkBidField />
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

/*
import * as React from "react";
import {
  List,
  Datagrid,
  TextField,
  EditButton,
  UrlField,
  SearchInput,
  ShowButton
} from "react-admin";
import Button from '@mui/material/Button';


import { Box, Drawer } from "@mui/material";
import Steps from "../components/proposalSteps";

const ListScreen = (title = "List of posts") => {
 
  const Filters = [<SearchInput source="keyword" alwaysOn />];
   const [record, setRecord] = React.useState(null);
  const rowClick = (id, resource, record) => {
    setRecord(record);
    return "";
  };

  return (
    <Box display="flex">
      <List
        perPage={25}
        sort={{ field: "date", order: "desc" }}
        hasCreate={false}

        filters={Filters}
        sx={{
          flexGrow: 1,
          transition: (theme: any) =>
            theme.transitions.create(["all"], {
              duration: theme.transitions.duration.enteringScreen,
            }),
          marginRight: record ? "300px" : 0,
        }}
      >
        <Datagrid rowClick={rowClick}   bulkActionButtons={false}>
          <TextField source="fullName" label="Name" />
          <UrlField source="telegram" />
          <TextField source="walletAddress" />
          <Button variant="text">View proposals</Button>
          <ShowButton />
        </Datagrid>
      </List>
      <Drawer
        variant="persistent"
        open={record}
        anchor="right"
        sx={{ zIndex: 100 }}
      >
        {record && <Steps record={record} />}
      </Drawer>
    </Box>
  );
};

export default ListScreen;

*/
