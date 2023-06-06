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
  useGetOne,
  BooleanField,
} from "react-admin";
import Button from "@mui/material/Button";

const ListScreen = () => {
  const UnlockButton = () => {
    const record = useRecordContext();
    const {
      data: jobBid,
      isLoading,
      error,
    } = useGetOne("jobbids", { id: record.jobBidId });

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
        {jobBid?.isCompleted ? "Pay to jobSeeker" : "Return to employer"}
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
      <Datagrid bulkActionButtons={false}>
        <ReferenceField source="name" reference="postjobs">
          <TextField source="name" />
        </ReferenceField>

        <ReferenceField source="jobBidId" reference="jobbids">
          <TextField source="name" />
        </ReferenceField>
        <TextField source="lockedTxHash" />
        <DateField source="lockDate" showTime />
        <TextField source="lockMessage" />
        <TextField source="unlockedTxHash" />
        <TextField source="unlockType" />
        <DateField source="unlockDate" showTime />
        <TextField source="unlockMessage" />
        <ReferenceField source="jobBidId" reference="jobbids" label="Job completed">
          <BooleanField source="isCompleted" />
        </ReferenceField>
        <UnlockButton />
      </Datagrid>
    </List>
  );
};

export default ListScreen;
