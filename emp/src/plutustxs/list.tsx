import * as React from "react";
import {
  List,
  Datagrid,
  TextField,
  EditButton,
  DateField,
  ReferenceField,
  useRecordContext,
  ReferenceOneField,
  useDataProvider,
  FunctionField,
  NumberField,
  TextInput,
  ReferenceInput,
  SelectInput,
} from "react-admin";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";

const ListScreen = () => {
  const UnlockButton = () => {
    const record = useRecordContext();
    const dataProvider = useDataProvider();
    const handleClick = () => {
      dataProvider
        .customMethod(
          "queues/unlock",
          {
            data: {
              jobBidId: record.jobBidId,
              scriptTxHash: record.lockedTxHash,
            },
          },
          "POST"
        )
        .then((result) => console.log(result))
        .catch((error) => console.error(error));
    };

    return (
      <Button variant="text" disabled={record.isUnlocked} onClick={handleClick}>
        UNLOCK
      </Button>
    );
  };

  const filters = [
    <ReferenceInput source="name" reference="postjobs" alwaysOn>
      <SelectInput optionText="name" fullWidth />
    </ReferenceInput>,
    <ReferenceInput source="jobBidId" reference="jobbids" alwaysOn>
      <SelectInput optionText="name" fullWidth />
    </ReferenceInput>,
  ];

  return (
    <List
      perPage={25}
      sort={{ field: "lockDate", order: "DESC" }}
      resource="plutustxs"
      filter={{ queryType: "employer" }}
      filters={filters}
    >
      <Datagrid bulkActionButtons={false}>
        <ReferenceField source="name" reference="postjobs" label="Job">
          <TextField source="name" />
        </ReferenceField>
        <ReferenceField source="jobBidId" reference="jobbids">
          <TextField source="name" />
        </ReferenceField>

        <TextField source="lockedTxHash" />

        <NumberField source="amount" label="Amount (Ada)" />
        <ReferenceField
          source="unlockUserId"
          reference="users"
          label="User to unlock"
        >
          <TextField source="username" />
        </ReferenceField>

        <DateField source="lockDate" showTime />
        <TextField source="lockMessage" />
        <FunctionField
          label="Unlocked"
          render={(record) => (
            <Checkbox disabled checked={!!record.unlockedTxHash} />
          )}
        />
        <TextField source="unlockType" />
        <TextField source="unlockedTxHash" />
        <DateField source="unlockDate" showTime />
        <TextField source="unlockMessage" />
      </Datagrid>
    </List>
  );
};

export default ListScreen;
