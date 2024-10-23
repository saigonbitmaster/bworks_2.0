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
  FunctionField,
  ReferenceInput,
  AutocompleteInput,
} from "react-admin";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";

const ListScreen = () => {
  const isMainnet = process.env.REACT_APP_IS_MAINNET;

  const explorerUrl = isMainnet
    ? process.env.REACT_APP_CARDANO_EXPLORER_MAINNET_URL
    : process.env.REACT_APP_CARDANO_EXPLORER_PREPROD_URL;
  const unlockUri = isMainnet ? "queues/unlockMainnet" : "queues/unlock";
  console.log(unlockUri);
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
          unlockUri,
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

  const filterToQuery = (searchText) => ({ textSearch: searchText });
  const filters = [
    <ReferenceInput source="name" reference="postjobs" alwaysOn>
      <AutocompleteInput
        filterToQuery={filterToQuery}
        optionText="name"
        label="Search a job"
        fullWidth
        sx={{ width: 300 }}
      />
    </ReferenceInput>,
    <ReferenceInput source="jobBidId" reference="jobbids" alwaysOn>
      <AutocompleteInput
        filterToQuery={filterToQuery}
        fullWidth
        optionText="name"
        label="Search a job application"
        sx={{ width: 300 }}
      />
    </ReferenceInput>,
    <ReferenceInput source="unlockUserId" reference="users" alwaysOn>
      <AutocompleteInput
        filterToQuery={filterToQuery}
        fullWidth
        optionText="username"
        label="Search a unlock user"
        sx={{ width: 300 }}
      />
    </ReferenceInput>,
  ];
  return (
    <List
      empty={<></>}
      emptyWhileLoading
      perPage={25}
      sort={{ field: "createdAt", order: "desc" }}
      hasCreate={false}
      resource="plutustxs"
      filters={filters}
    >
      <Datagrid bulkActionButtons={false}>
        <ReferenceField source="name" reference="postjobs" label="Job Name">
          <TextField source="name" />
        </ReferenceField>

        <ReferenceField source="jobBidId" reference="jobbids">
          <TextField source="name" />
        </ReferenceField>
        <FunctionField
          label="UnLock TxHash"
          render={(record) => (
            <>
              {record.lockedTxHash && (
                <Link
                  href={`${explorerUrl}${record.lockedTxHash}`}
                  target="_blank"
                >
                  View Tx
                </Link>
              )}
            </>
          )}
        />
        <ReferenceField source="unlockUserId" reference="users">
          <TextField source="username" />
        </ReferenceField>
        <DateField source="lockDate" showTime />
        <TextField source="lockMessage" />

        <FunctionField
          label="UnLock TxHash"
          render={(record) => (
            <>
              {record.unlockedTxHash && (
                <Link
                  href={`${explorerUrl}${record.unlockedTxHash}`}
                  target="_blank"
                >
                  View Tx
                </Link>
              )}
            </>
          )}
        />

        <TextField source="unlockType" />
        <DateField source="unlockDate" showTime />
        <TextField source="unlockMessage" />
        <ReferenceField
          source="jobBidId"
          reference="jobbids"
          label="Job completed"
        >
          <BooleanField source="isCompleted" />
        </ReferenceField>
        <UnlockButton />
      </Datagrid>
    </List>
  );
};

export default ListScreen;
