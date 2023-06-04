import * as React from "react";
import {
  List,
  Datagrid,
  TextField,
  EditButton,
  DateField,
  NumberField,
  ReferenceField,
  TextInput,
  BooleanField,
  useUpdate,
  useRecordContext,
  useRefresh,
  FunctionField,
  useGetList,
} from "react-admin";
import RateField from "../components/rateField";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { stringify } from "query-string";

const filters = [<TextInput label="Search" source="textSearch" alwaysOn />];

const SelectButton = () => {
  const record = useRecordContext();
  const diff = { isSelected: !record.isSelected };
  const refresh = useRefresh();
  const [update, { isLoading, error }] = useUpdate("jobbids", {
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
    <Button variant="text" disabled={record.isUnlocked && record.isSelected} onClick={handleClick}>
      {record.isSelected ? "deselect" : "select"}
    </Button>
  );
};

const SignButton = (props) => {
  const record = useRecordContext();
  return (
    <Button
      sx={{ borderRadius: 0 }}
      component={Link}
      to={{
        pathname: "/smartcontract",
        search: stringify({
          jobbidid: JSON.stringify(record.id),
        }),
      }}
      size="small"
      color="primary"
      disabled={props.disabled}
    >
      Sign Plutus TX
    </Button>
  );
};

const ListScreen = () => {
  return (
    <List
      perPage={25}
      sort={{ field: "date", order: "desc" }}
      hasCreate={false}
      resource="jobbids"
      filter={{ queryType: "employer" }}
      filters={filters}
    >
      <Datagrid bulkActionButtons={false}>
        <TextField source="name" />

        <ReferenceField reference="postJobs" source="jobId">
          <TextField source="name" />
        </ReferenceField>

        <ReferenceField reference="users" source="jobSeekerId">
          <TextField source="fullName" />
        </ReferenceField>
        <ReferenceField reference="users" source="employerId">
          <TextField source="fullName" />
        </ReferenceField>
        <NumberField source="bidValue" />
        <ReferenceField reference="postJobs" source="jobId" label="Currency">
          <ReferenceField reference="currencies" source="currencyId">
            <TextField source="name" />
          </ReferenceField>
        </ReferenceField>
        <RateField source="rate" />

        <BooleanField source="isSelected" label="Selected" />
        <DateField source="completeDate" showTime label="Your deadline" />

        <ReferenceField
          reference="postJobs"
          source="jobId"
          label="Job deadline"
        >
          <DateField source="expectDate" showTime />
        </ReferenceField>

        <SelectButton />

        <FunctionField
          render={(record) => <SignButton disabled={record.isSignedTx || !record.isSelected} />}
        />
      </Datagrid>
    </List>
  );
};

export default ListScreen;
