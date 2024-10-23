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

const SmartContractChart = () => {
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

  return (
    <Card>
      <CardHeader
        title="Published contracts statistics"
        titleTypographyProps={{ variant: "subtitle1" }}
      />
      <CardContent>
        <div style={{ width: "100%", height: 300 }}>
          <ResponsiveContainer>
            <AreaChart
              width={730}
              height={350}
              data={data}
              margin={{ top: 10, right: 0, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                </linearGradient>
              </defs>
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
                name="Published smart contracts"
                dataKey="numberOfPublishedContracts"
                stroke="#8884d8"
                fillOpacity={1}
                fill="url(#colorUv)"
              />
              <Area
                type="monotone"
                name="Approved smart contracts"
                dataKey="numberOfApprovedContracts"
                stroke="#82ca9d"
                fillOpacity={1}
                fill="url(#colorPv)"
              />
              <Legend
                wrapperStyle={{ position: "relative", marginTop: "0.1px" }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default SmartContractChart;
