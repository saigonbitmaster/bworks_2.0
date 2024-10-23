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
  TextInput,
} from "react-admin";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";

const ListScreen = () => {
  const isMainnet = process.env.NEXT_PUBLIC_IS_MAINNET;

  const explorerUrl = isMainnet
    ? process.env.NEXT_PUBLIC_CARDANO_EXPLORER_MAINNET_URL
    : process.env.NEXT_PUBLIC_CARDANO_EXPLORER_PREPROD_URL;
  const unlockUri = isMainnet ? "queues/unlockMainnet" : "queues/unlock";
  console.log(unlockUri);

  const filterToQuery = (searchText) => ({ textSearch: searchText });
  const filters = [
    <ReferenceInput source="unlockUserId" reference="users" alwaysOn>
      <AutocompleteInput
        filterToQuery={filterToQuery}
        fullWidth
        optionText="username"
        label="Search by user"
        sx={{ width: 300 }}
      />
    </ReferenceInput>,
    <TextInput
      label="Text search"
      source="textSearch"
      alwaysOn
      fullWidth
      sx={{ width: 300 }}
    />,
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
        <FunctionField
          label="Lock TxHash"
          render={(record) =>
            record.lockedTxHash ? (
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
            ) : (
              <p>Transaction submission failed</p>
            )
          }
        />
        <FunctionField
          label="Datum"
          render={(record) => (
            <div
              dangerouslySetInnerHTML={{ __html: JSON.stringify(record.datum) }}
            />
          )}
        />
        <ReferenceField source="smartContractId" reference="contracts">
          <TextField source="name" />
        </ReferenceField>
        <DateField source="lockDate" showTime />
        <ReferenceField source="lockUserId" reference="users">
          <TextField source="username" />
        </ReferenceField>
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
        <FunctionField
          label="Redeemer"
          render={(record) => (
            <>
              {record.redeemer && (
                <div
                  dangerouslySetInnerHTML={{
                    __html: JSON.stringify(record.redeemer),
                  }}
                />
              )}
            </>
          )}
        />
        <DateField source="unlockDate" showTime />
        <ReferenceField source="unlockUserId" reference="users">
          <TextField source="username" />
        </ReferenceField>
      </Datagrid>
    </List>
  );
};

export default ListScreen;
