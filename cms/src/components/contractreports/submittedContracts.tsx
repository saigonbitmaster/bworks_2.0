import * as React from "react";
import { Box, Button } from "@mui/material";
import { Link } from "react-router-dom";
import DynamicFeedOutlinedIcon from "@mui/icons-material/DynamicFeedOutlined";
import { useTranslate, useDataProvider } from "react-admin";
import { stringify } from "query-string";
import CardWithIcon from "./cardWithIcon";
import Table from "../components/table";
import moment from "moment";

const SubmittedSmartContract = (props) => {
  const months = [];
  for (let i = 0; i < 12; i++) {
    const month = moment().subtract(i, "month").format("M-YYYY").toString();
    const shortYear = moment().subtract(i, "month").format("MM-YY").toString();
    const date = moment().subtract(i, "month").toDate();
    months.push({ _id: month, shortYear, date });
  }
  const [data, setData] = React.useState(months.reverse());
  const dataProvider = useDataProvider();

  React.useEffect(() => {
    dataProvider
      .customMethod(
        "customapis/sumPublishedContractByMonth",
        { filter: {} },
        "GET"
      )
      .then((result) => setData(result.data.reverse()))
      .catch((error) => console.error(error));
  }, []);

  const translate = useTranslate();
  const headers = [
    { key: "_id", name: "Month" },
    { key: "numberOfPublishedContracts", name: "Published contracts" },
    { key: "numberOfCompiledContracts", name: "Compiled contracts" },
    {
      key: "numberOfSourceCodeVerifiedContracts",
      name: "Source code verified contracts",
    },
    {
      key: "numberOfFunctionVerifiedContracts",
      name: "Function verified contracts",
    },
    { key: "numberOfApprovedContracts", name: "Approved contracts" },
  ];

  return (
    <CardWithIcon
      to={{
        pathname: "/contracts",
        search: stringify({
          filter: JSON.stringify({ status: "active" }),
        }),
      }}
      icon={DynamicFeedOutlinedIcon}
      title={translate("pos.dashboard.submittedSmartContracts")}
      subtitle={`Last 12 months submitted smart contracts`}
    >
      <Table headers={headers} data={data}></Table>
      <Box flexGrow={1}>&nbsp;</Box>
      <Button
        sx={{ borderRadius: 0 }}
        component={Link}
        to="/contracts"
        size="small"
        color="primary"
      >
        <Box p={1} sx={{ color: "primary.main" }}>
          {translate("pos.dashboard.allSmartContract")}
        </Box>
      </Button>
    </CardWithIcon>
  );
};

export default SubmittedSmartContract;
