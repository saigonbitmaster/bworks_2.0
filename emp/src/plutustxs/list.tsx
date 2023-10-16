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
  AutocompleteInput,
  TopToolbar,
  ExportButton,
} from "react-admin";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import RefreshButton from "../components/refreshButton";

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

  const explorerUrl = process.env.REACT_APP_IS_MAINNET
    ? process.env.REACT_APP_CARDANO_EXPLORER_MAINNET_URL
    : process.env.REACT_APP_CARDANO_EXPLORER_PREPROD_URL;

  const ListActions = () => (
    <TopToolbar>
      <ExportButton />
      <RefreshButton baseUrl="/plutustxs"></RefreshButton>
    </TopToolbar>
  );

  const filterToQuery = (searchText) => ({ textSearch: searchText });
  const filters = [
    <ReferenceInput source="name" reference="postjobs" alwaysOn>
      <AutocompleteInput
        filterToQuery={filterToQuery}
        fullWidth
        optionText="name"
        label="Search a job"
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
      perPage={25}
      sort={{ field: "lockDate", order: "DESC" }}
      resource="plutustxs"
      filter={{
        queryType: "user",
        lockedTxHash: { $nin: [null, "", undefined] },
      }}
      filters={filters}
      actions={<ListActions></ListActions>}
    >
      <Datagrid bulkActionButtons={false}>
        <ReferenceField source="name" reference="postjobs" label="Job">
          <TextField source="name" />
        </ReferenceField>
        <ReferenceField
          source="jobBidId"
          reference="jobbids"
          label="Job application"
        >
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

        <NumberField source="amount" label="Amount (Ada)" />
        <ReferenceField
          source="unlockUserId"
          reference="users"
          label="User to unlock"
          link={"show"}
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

        <DateField source="unlockDate" showTime />
        <TextField source="unlockMessage" />
      </Datagrid>
    </List>
  );
};

export default ListScreen;
