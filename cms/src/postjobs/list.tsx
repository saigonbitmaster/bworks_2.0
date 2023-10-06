import * as React from "react";
import {
  List,
  Datagrid,
  TextField,
  EditButton,
  DateField,
  SingleFieldList,
  ChipField,
  ReferenceArrayField,
  ReferenceField,
  BooleanField,
  useRecordContext,
  useRefresh,
  useUpdate,
  TextInput
} from "react-admin";
import CurrencyNumberField from "../components/currencyNumberField";
import LinkBidField from "../components/linkBidsField";
import Button from "@mui/material/Button";

const filters = [<TextInput label="Search" source="textSearch" alwaysOn />];

const ListScreen = () => {
  const SelectButton = (props) => {
    const record = useRecordContext();
    const diff = { isApproved: !record.isApproved };
    const refresh = useRefresh();
    const [update, { isLoading, error }] = useUpdate("postjobs/approve", {
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
    <List perPage={25}  sort={{ field: "createdAt", order: "desc" }} filters={filters}>
      <Datagrid bulkActionButtons={false}>
        <TextField source="name" />
        <ReferenceField reference="users" source="employerId">
          <TextField source="fullName" />
        </ReferenceField>
        <DateField source="createdAt" showTime />
        <LinkBidField />
        <CurrencyNumberField source="budget" threshold={10000} />
        <ReferenceArrayField reference="skills" source="skills">
          <SingleFieldList>
            <ChipField source="name" />
          </SingleFieldList>
        </ReferenceArrayField>
        <SelectButton source="isApproved" label="Approve" />
        <DateField source="expireDate" showTime />
      </Datagrid>
    </List>
  );
};

export default ListScreen;
