import * as React from "react";
import {
  List,
  Datagrid,
  TextField,
  DateField,
  SingleFieldList,
  ChipField,
  ReferenceArrayField,
  TextInput,
  useRecordContext,
  useRefresh,
  useUpdate,
  BooleanField,
  NumberField,
  ArrayField,
  useListContext,
} from "react-admin";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";

import LinkBidField from "../components/linkBidsField";

const filters = [<TextInput label="Search" source="textSearch" alwaysOn />];

const ListScreen = () => {
  const ApproveButton = (props) => {
    const record = useRecordContext();
    const diff = { isApproved: !record.isApproved };
    const refresh = useRefresh();
    const [update, { isLoading, error }] = useUpdate("users/approve", {
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

  const Roles = () => {
    const { data } = useListContext();
    return (
      <>
        {data.map((role) => (
          <Chip label={role} sx={{ m: 0.5 }} />
        ))}
      </>
    );
  };

  return (
    <List
      filters={filters}
      perPage={25}
      sort={{ field: "createdAt", order: "desc" }}
      hasCreate
    >
      <Datagrid>
        <TextField source="username" />
        <ArrayField source="roles">
          <Roles />
        </ArrayField>
        <TextField source="email" />
        <TextField source="contact" />
        <ReferenceArrayField reference="skills" source="skills">
          <SingleFieldList>
            <ChipField source="name" />
          </SingleFieldList>
        </ReferenceArrayField>
        <BooleanField source="isShowContact" />
        <BooleanField source="isShowEmail" />
        <BooleanField source="isJobSeeker" />
        <BooleanField source="isEmployer" />
        <BooleanField source="isNotified" />
        <NumberField source="workHoursPerMonth" />
        <DateField source="createdAt" showTime />
        <ApproveButton label="Approval" />
      </Datagrid>
    </List>
  );
};

export default ListScreen;
