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
  FunctionField
} from "react-admin";
import Button from "@mui/material/Button";
import Checkbox from '@mui/material/Checkbox';


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
      
      resource="plutustxs"
    >
      <Datagrid bulkActionButtons={false}>
     
        <ReferenceField source="name" reference="postJobs" label="Job">
          <TextField source="name" />
        </ReferenceField>
        <ReferenceField source="jobBidId" reference="jobbids">
          <TextField source="name" />
        </ReferenceField>
        <FunctionField label="Paid" render={record =>  <Checkbox  disabled checked={!!record.unlockedTxHash} />} />
        <TextField source="lockedTxHash" />
        <DateField source="lockDate" showTime />
        <TextField source="lockMessage" />
        <TextField source="unlockedTxHash" />
        <DateField source="unlockDate" showTime />
        <TextField source="unlockMessage" />
      </Datagrid>
    </List>
  );
};

export default ListScreen;
