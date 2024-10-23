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
  ReferenceManyField,
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
      hasCreate={false}
    >
      <Datagrid>
        <TextField source="username" />
        <TextField source="fullName" />
        <TextField source="authType" />
        <BooleanField source="isdAppDev" label="dApp developer" />
        <BooleanField
          source="isSmartContractDev"
          label="Smart contract developer"
        />
        <ReferenceManyField
          reference="contracts"
          target="author"
          label="Published contracts"
        >
          <Datagrid bulkActionButtons={false}>
            <TextField source="name" />
            <DateField source="createdAt" />
          </Datagrid>
        </ReferenceManyField>
        <DateField source="createdAt" showTime />
        <ApproveButton label="Approval" />
      </Datagrid>
    </List>
  );
};

export default ListScreen;
