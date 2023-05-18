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
} from "react-admin";
import Button from "@mui/material/Button";

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

  return (
    <List
      perPage={25}
      sort={{ field: "date", order: "desc" }}
      hasCreate
      resource="plutustxs"
    >
      <Datagrid>
        <TextField source="name" />
        <ReferenceField source="jobBidId" reference="jobbids">
          <TextField source="name" />
        </ReferenceField>
        <TextField source="lockedTxHash" />
        <DateField source="lockDate" showTime />
        <TextField source="lockMessage" />
        <TextField source="unlockedTxHash" />
        <DateField source="unlockDate" showTime />
        <TextField source="unlockMessage" />
        <UnlockButton />
        <EditButton label="edit tx note" />
      </Datagrid>
    </List>
  );
};

export default ListScreen;
