import * as React from "react";
import { Card, CardHeader, CardContent, Box } from "@mui/material";
import Typography from "@mui/material/Typography";

import { useDataProvider } from "react-admin";
const fullName =
  localStorage.getItem("fullName") || localStorage.getItem("username") || "";

const PostedJobChart = () => {
  const [data, setData] = React.useState({
    postedJobs: 0,
    gotApplications: 0,
    submittedJobs: 0,
    gotJobs: 0,
    completeJobs: 0,
    paidJobs: 0,
    employerCompleteJobs: 0,
    employerPaidJobs: 0,
  });
  const dataProvider = useDataProvider();

  dataProvider
    .customMethod("customapis/userstatistic", { filter: {} }, "GET")
    .then((result) => {
      setData(result.data);
    })
    .catch((error) => console.error(error));

  return (
    <Card>
      <CardContent
        sx={{
          mb: 0,
          pb: 0,
          "&:last-child": {
            paddingBottom: 1,
          },
        }}
      >
        <Typography variant="caption">
          <strong>{fullName}</strong>
        </Typography>

        <Typography variant="caption" display={"block"}>
          Posted jobs: {data?.postedJobs || 0}, Got applications:{" "}
          {data?.gotApplications || 0}, Got complete jobs{" "}
          {data?.employerCompleteJobs || 0}, Paid out:
          {data?.employerPaidJobs || 0}
          <br />
          Applied jobs: {data?.submittedJobs || 0}, Got jobs:{" "}
          {data?.gotJobs || 0}, Complete jobs: {data?.completeJobs || 0}
          ,Received payments: {data?.paidJobs || 0}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default PostedJobChart;
