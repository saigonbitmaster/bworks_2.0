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
} from "react-admin";
import Button from "@mui/material/Button";

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

  return (
    <List
      filters={filters}
      perPage={25}
      sort={{ field: "createdAt", order: "desc" }}
      hasCreate
    >
      <Datagrid>
        <TextField source="username" />
        <TextField source="email" />
        <TextField source="contact" />
        <ReferenceArrayField reference="skills" source="skills">
          <SingleFieldList>
            <ChipField source="name" />
          </SingleFieldList>
        </ReferenceArrayField>
        <BooleanField source="isShowContact" />
        <DateField source="createdAt" showTime />
        <ApproveButton label="Approval" />
      </Datagrid>
    </List>
  );
};

export default ListScreen;
