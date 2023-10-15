import * as React from "react";
import {
  List,
  Datagrid,
  TextField,
  DateField,
  NumberField,
  ReferenceField,
  TextInput,
  BooleanField,
  SelectInput,
  ReferenceInput,
  useUpdate,
  useRefresh,
  useRecordContext,
} from "react-admin";
import Button from "@mui/material/Button";

const filters = [
  <TextInput label="Search" source="textSearch" alwaysOn />,
  <ReferenceInput source="jobId" reference="postjobs" alwaysOn>
    <SelectInput optionText="name" fullWidth />
  </ReferenceInput>,
];

const ListScreen = () => {
  const ApproveButton = (props) => {
    const record = useRecordContext();
    const diff = { isApproved: !record.isApproved };
    const refresh = useRefresh();
    const [update, { isLoading, error }] = useUpdate("jobbidscms/approve", {
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

  return (
    <List
      perPage={25}
      sort={{ field: "createdAt", order: "desc" }}
      hasCreate={false}
      resource="jobbidscms"
      filters={filters}
    >
      <Datagrid bulkActionButtons={false}>
        <TextField source="name" />
        <ReferenceField reference="postJobs" source="jobId">
          <TextField source="name" />
        </ReferenceField>
        <ReferenceField reference="users" source="jobSeekerId" link={"show"}>
          <TextField source="fullName" />
        </ReferenceField>
        <ReferenceField reference="users" source="employerId" link={"show"}>
          <TextField source="fullName" />
        </ReferenceField>
        <NumberField source="bidValue" />
        <ReferenceField reference="postJobs" source="jobId" label="Currency">
          <ReferenceField reference="currencies" source="currencyId">
            <TextField source="name" />
          </ReferenceField>
        </ReferenceField>
        <DateField source="completeDate" showTime label="Applied deadline" />

        <ReferenceField
          reference="postJobs"
          source="jobId"
          label="Job deadline"
        >
          <DateField source="expectDate" showTime />
        </ReferenceField>
        <ApproveButton label="Approval" />
        <BooleanField source="isSelected" label="Selected" />
        <BooleanField source="isSignedTx" label="is Signed lock Tx" />
        <BooleanField source="jobDone" label="Job seeker work done" />
        <BooleanField source="isCompleted" />
        <BooleanField source="isPaid" />
      </Datagrid>
    </List>
  );
};

export default ListScreen;
