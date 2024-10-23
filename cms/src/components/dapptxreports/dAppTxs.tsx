import * as React from "react";
import { Box, Button } from "@mui/material";
import { Link } from "react-router-dom";
import DynamicFeedOutlinedIcon from "@mui/icons-material/DynamicFeedOutlined";
import { useDataProvider, useTranslate } from "react-admin";
import { stringify } from "query-string";
import CardWithIcon from "./cardWithIcon";
import Table from "../components/table";
import moment from "moment";

const PlutusTXs = (props) => {
  const dataProvider = useDataProvider();

  const months = [];
  for (let i = 0; i < 12; i++) {
    const month = moment().subtract(i, "month").format("M-YYYY").toString();
    const shortYear = moment().subtract(i, "month").format("MM-YY").toString();
    const date = moment().subtract(i, "month").toDate();
    months.push({ _id: month, shortYear, date });
  }
  const [data, setData] = React.useState(months.reverse());

  React.useEffect(() => {
    dataProvider
      .customMethod("customapis/sumtxsbymonth", { filter: {} }, "GET")
      .then((result) => setData(result.data.reverse()))
      .catch((error) => console.error(error));
  }, []);

  const translate = useTranslate();

  const headers = [
    { key: "_id", name: "Month" },
    { key: "numberOfLockTxs", name: "Locked TXs" },
    { key: "numberOfUnlockedTxs", name: "Unlocked TXs" },
    { key: "sumLockedAmounts", name: "Locked amounts ($Ada)" },
    { key: "sumUnlockedAmounts", name: "Unlocked amount ($Ada)" },
  ];
  return (
    <CardWithIcon
      to={{
        pathname: "/plutustxs",
        search: stringify({
          filter: JSON.stringify({ status: "active" }),
        }),
      }}
      icon={DynamicFeedOutlinedIcon}
      title="dApp TXs"
      subtitle={`Last 12 months dApp TXs`}
    >
      <Table headers={headers} data={data}></Table>
      <Box flexGrow={1}>&nbsp;</Box>
      <Button
        sx={{ borderRadius: 0 }}
        component={Link}
        to="/plutustxs"
        size="small"
        color="primary"
      >
        <Box p={1} sx={{ color: "primary.main" }}>
          {translate("pos.dashboard.allPlutusTxs")}
        </Box>
      </Button>
    </CardWithIcon>
  );
};

export default PlutusTXs;
