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
  BooleanField,
  useRecordContext,
  useRefresh,
  useUpdate,
  TextInput,
} from "react-admin";
import CurrencyNumberField from "../components/currencyNumberField";
import LinkBidField from "../components/linkBidsField";
import Button from "@mui/material/Button";
import Steps from "../components/jobApplicationAside";
import { Box, Drawer } from "@mui/material";

const filters = [<TextInput label="Search" source="textSearch" alwaysOn />];

const JobPanel = () => {
  const record = useRecordContext();
  return <div dangerouslySetInnerHTML={{ __html: record.description }} />;
};

const ListScreen = () => {
  const [record, setRecord] = React.useState(null);
  const rowClick = (id, resource, record) => {
    setRecord(record);
    return null;
  };
  const SelectButton = (props) => {
    const record = useRecordContext();
    const diff = { isApproved: !record.isApproved };
    const refresh = useRefresh();
    const [update, { isLoading, error }] = useUpdate("postjobs/approve", {
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
      <Button variant="text" disabled={record.isUnlocked} onClick={handleClick}>
        {record.isApproved ? "delist" : "list"}
      </Button>
    );
  };
  return (
    <List
      perPage={25}
      sort={{ field: "createdAt", order: "desc" }}
      filters={filters}
    >
      <Datagrid
        bulkActionButtons={false}
        expand={<JobPanel />}
        rowClick={rowClick}
      >
        <TextField source="name" />
        <ReferenceField reference="users" source="employerId" link={"show"}>
          <TextField source="fullName" />
        </ReferenceField>
        <DateField source="createdAt" showTime />
        <LinkBidField />
        <CurrencyNumberField source="budget" threshold={10000} />
        <ReferenceArrayField reference="skills" source="skills">
          <SingleFieldList>
            <ChipField source="name" />
          </SingleFieldList>
        </ReferenceArrayField>
        <SelectButton source="isApproved" label="Approve" />
        <DateField source="expireDate" showTime />
        <Drawer
          variant="persistent"
          open={record}
          anchor="right"
          sx={{ zIndex: 100 }}
        >
          {record && <Steps record={record}></Steps>}
        </Drawer>
      </Datagrid>
    </List>
  );
};

export default ListScreen;
