import * as React from "react";
import { Card, CardHeader, CardContent } from "@mui/material";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  Cell,
} from "recharts";

import { useDataProvider } from "react-admin";
import moment from "moment";

const months = [];
for (let i = 0; i < 12; i++) {
  const month = moment().subtract(i, "month").format("M-YYYY").toString();
  const shortYear = moment().subtract(i, "month").format("MM-YY").toString();
  const date = moment().subtract(i, "month").toDate();
  months.push({ _id: month, shortYear, date });
}

const PostedJobChart = () => {
  const [data, setData] = React.useState(months.reverse());
  const dataProvider = useDataProvider();

  React.useEffect(() => {
    dataProvider
      .customMethod(
        "customapis/getmonthlyjobreport",
        { filter: { queryType: "emp" } },
        "GET"
      )
      .then((result) => setData(result.data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <Card>
      <CardHeader
        title="Hiring statistic"
        titleTypographyProps={{ variant: "subtitle1" }}
        sx={{ mb: 0, pb: 0 }}
      />
      <CardContent sx={{ mt: 0, pt: 0 }}>
        <div style={{ width: "100%", height: 358 }}>
          <ResponsiveContainer>
            <BarChart
              width={730}
              height={358}
              data={data}
              margin={{ top: 10, right: 0, left: 0, bottom: 0 }}
            >
              <XAxis
                tick={{ fontSize: 15 }}
                dataKey="shortYear"
                tickSize={0}
                interval="preserveStartEnd"
                angle={-35}
                textAnchor={"end"}
                offset={5}
              />

              <YAxis tick={{ fontSize: 15 }} />
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip />
              <Area
                type="monotone"
                name="Posted jobs"
                dataKey="numberOfPostedJobs"
                stroke="#8884d8"
                fillOpacity={1}
                fill="url(#colorUv)"
              />
              <Area
                type="monotone"
                name="Submitted applications"
                dataKey="numberOfBids"
                stroke="#82ca9d"
                fillOpacity={1}
                fill="url(#colorPv)"
              />
              <Bar
                dataKey="numberOfPostedJobs"
                fill="#ffc658"
                name="Posted jobs"
              />
              <Bar
                dataKey="numberOfBids"
                stackId="a"
                fill="#8884d8"
                name="Submitted applications"
              />
              <Bar
                dataKey="numberOfCompletedJobs"
                stackId="a"
                fill="#82ca9d"
                name="Selected applications"
              />
              <Bar
                dataKey="numberOfPaidJobs"
                stackId="a"
                fill="#4db6ac"
                name="Paid jobs"
              />
              <Legend
                wrapperStyle={{ position: "relative", marginTop: "0.1px" }}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default PostedJobChart;
