import * as React from "react";
import {
  List,
  Datagrid,
  TextField,
  DateField,
  SelectInput,
  FunctionField,
} from "react-admin";
import { choices } from "./data";

const ListScreen = () => {
  const filters = [
    <SelectInput source="jobStatus" alwaysOn choices={choices} />,
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
