import * as React from "react";
import {
  List,
  Datagrid,
  TextField,
  DateField,
  SelectInput,
  FunctionField,
} from "react-admin";

const ListScreen = () => {
  const filters = [
    <SelectInput
      source="jobStatus"
      alwaysOn
      choices={[
        { id: "waiting", name: "Waiting" },
        { id: "active", name: "Active" },
        { id: "completed", name: "Completed" },
        { id: "failed", name: "Failed" },
        { id: "delayed", name: "Delayed" },
      ]}
    />,
  ];

  return (
    <List
      perPage={25}
      sort={{ field: "timestamp", order: "desc" }}
      filters={filters}
      hasCreate={false}
    >
      <Datagrid>
        <TextField source="id" />
        <TextField source="name" />
        <TextField source="data" />

        <FunctionField
          sx={{ color: "red" }}
          label="Jobs status"
          render={(record) =>
            record.failedReason ? `failed: ${record.failedReason}` : "success"
          }
        />
        <DateField source="timestamp" showTime />
        <DateField source="processedOn" showTime />
        <DateField source="finishedOn" showTime />
      </Datagrid>
    </List>
  );
};

export default ListScreen;
