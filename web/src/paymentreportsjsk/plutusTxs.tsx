import * as React from "react";
import { Box, Button } from "@mui/material";
import { Link } from "react-router-dom";
import DynamicFeedOutlinedIcon from "@mui/icons-material/DynamicFeedOutlined";
import { useDataProvider, useTranslate } from "react-admin";
import { stringify } from "query-string";
import CardWithIcon from "./cardWithIcon";
import Table from "../components/table";

const PostedJob = (props) => {
  const dataProvider = useDataProvider();

  const [postedJobs, setPostedJobs] = React.useState([]);

  React.useEffect(() => {
    dataProvider
      .customMethod(
        "customapis/getmonthlyplutustxsreport",
        { filter: { queryType: "jsk" } },
        "GET"
      )
      .then((result) => setPostedJobs(result.data.reverse()))
      .catch((error) => console.error(error));
  }, []);


  const translate = useTranslate();
  const headers = [
    { key: "_id", name: "Month" },
    { key: "numberOfLockTxs", name: "Lock Txs" },
    { key: "numberOfUnlockedTxs", name: "Unlock Txs" },
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
      title={translate("pos.dashboard.plutusTxs")}
      subtitle={`Last 12 months Payment TXs`}
    >
      <Table headers={headers} data={postedJobs}></Table>
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

export default PostedJob;
