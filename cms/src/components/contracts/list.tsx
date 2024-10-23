import * as React from "react";
import {
  List,
  Datagrid,
  TextField,
  EditButton,
  DateField,
  RichTextField,
  ReferenceField,
  useRecordContext,
  useUpdate,
  useRefresh,
  Labeled,
  NumberField,
  BooleanField,
  TextInput,
  BooleanInput,
  ReferenceInput,
  AutocompleteInput,
} from "react-admin";
import Button from "@mui/material/Button";
import LinkResoureField from "../components/linkResourceField";
import ShowJob from "../components/showButton";

const ListScreen = () => {
  const filterToQuery = (searchText) => ({ textSearch: searchText });

  const filters = [
    <TextInput
      label="Search"
      source="textSearch"
      alwaysOn
      sx={{ width: 300 }}
    />,
    <ReferenceInput source="author" reference="users" alwaysOn>
      <AutocompleteInput
        filterToQuery={filterToQuery}
        fullWidth
        optionText="username"
        label="Search by user"
        sx={{ width: 300 }}
      />
    </ReferenceInput>,
    <BooleanInput
      label="Audited contracts"
      source="isFunctionVerified"
      alwaysOn
    />,
  ];

  const SelectButton = (props) => {
    const record = useRecordContext();
    const diff = { isApproved: !record.isApproved };
    const refresh = useRefresh();
    const [update, { isLoading, error }] = useUpdate("contracts/approve", {
      id: record?.id,
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
      <Labeled>
        <Button variant="text" onClick={handleClick}>
          {record?.isApproved ? "Disapprove" : "Approve"}
        </Button>
      </Labeled>
    );
  };

  const VerifyButton = (props) => {
    const record = useRecordContext();
    const diff = { isFunctionVerified: !record?.isFunctionVerified };
    const refresh = useRefresh();
    const [update, { isLoading, error }] = useUpdate("contracts/approve", {
      id: record?.id,
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
      <Labeled>
        <Button variant="text" onClick={handleClick}>
          {record.isFunctionVerified ? "Reject" : "Verify"}
        </Button>
      </Labeled>
    );
  };

  return (
    <List
      perPage={25}
      sort={{ field: "date", order: "desc" }}
      resource="contracts"
      hasCreate={false}
      filters={filters}
    >
      <Datagrid bulkActionButtons={false} rowClick={false}>
        <TextField source="name" />
        <ReferenceField source="author" reference="users">
          <TextField source="fullName" />
        </ReferenceField>
        <TextField source="contractType" />
        <BooleanField source="isCompiled" />
        <BooleanField source="isSourceCodeVerified" />
        <BooleanField source="isFunctionVerified" />
        <BooleanField source="isApproved" />
        <LinkResoureField resource="plutustxs" />

        <RichTextField source="description" />
        <DateField source="createdAt" label="Published at" showTime />
        <VerifyButton label="Verify functions"></VerifyButton>
        <SelectButton label="Approve"></SelectButton>
        <ShowJob customLabel="Detail" label="View detail" />
      </Datagrid>
    </List>
  );
};

export default ListScreen;
