import * as React from "react";
import { Card, CardHeader, CardContent } from "@mui/material";
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
  });
  const dataProvider = useDataProvider();

  dataProvider
    .customMethod("customapis/userstatistic", { filter: {} }, "GET")
    .then((result) => {
      setData(result.data);
    })
    .catch((error) => console.error(error));

  return (
    <>
      <Card>
        <CardContent sx={{ mb: 0, pb: 0 }}>
          <Typography variant="caption">
            <strong>
              <i>{fullName}</i>
            </strong>
          </Typography>
          <Typography variant="caption" display={"block"}>
            Posted jobs: {data?.postedJobs || null}, Got applications:
            {data?.gotApplications || null}, Applied jobs:
            {data?.submittedJobs || null}, Got jobs: {data?.gotJobs || null}
          </Typography>
        </CardContent>
      </Card>
    </>
  );
};

export default PostedJobChart;
