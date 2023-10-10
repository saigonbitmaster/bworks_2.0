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

import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { useDataProvider } from "react-admin";
import moment from "moment";

const months = [];
for (let i = 0; i < 12; i++) {
  const month = moment().subtract(i, "month").format("M-YYYY").toString();
  const shortYear = moment().subtract(i, "month").format("MM-YY").toString();
  const date = moment().subtract(i, "month").toDate();
  months.push({ _id: month, shortYear, date });
}

const PaymentChart = () => {
  const [checked, setChecked] = React.useState(true);
  const [label, setLabel] = React.useState("Plutus TXs");
  const [dataKeys, setDataKeys] = React.useState({
    y1: "numberOfLockTxs",
    y2: "numberOfUnlockedTxs",
    y1Name: "Lock Txs",
    y2Name: "Unlock Txs",
  });

  const [data, setData] = React.useState(months.reverse());
  const dataProvider = useDataProvider();

  React.useEffect(() => {
    dataProvider
      .customMethod("public/dashboardplutus", { filter: {} }, "GET")
      .then((result) => setData(result.data))
      .catch((error) => console.error(error));
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  React.useEffect(() => {
    if (checked) {
      setLabel("Plutus TXs");
      setDataKeys({
        y1: "numberOfLockTxs",
        y2: "numberOfUnlockedTxs",
        y1Name: "Lock Txs",
        y2Name: "Unlock Txs",
      });
    } else {
      setLabel("Plutus TX Amounts ($Ada)");
      setDataKeys({
        y1: "sumLockedAmounts",
        y2: "sumUnlockedAmounts",
        y1Name: "Locked amounts",
        y2Name: "Unlocked amounts",
      });
    }
  }, [checked]);

  return (
    <Card>
      <CardHeader
        title="Plutus TXs"
        titleTypographyProps={{ variant: "subtitle1" }}
      />
      <FormGroup sx={{ ml: 2 }}>
        <FormControlLabel
          control={
            <Checkbox
              defaultChecked
              size="small"
              checked={checked}
              onChange={handleChange}
            />
          }
          label={label}
        />
      </FormGroup>
      <CardContent>
        <div style={{ width: "100%", height: 260 }}>
          <ResponsiveContainer>
            <AreaChart
              width={730}
              height={260}
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
                name={dataKeys.y1Name}
                dataKey={dataKeys.y1}
                stroke="#8884d8"
                fillOpacity={1}
                fill="url(#colorPv)"
              />
              <Area
                type="monotone"
                name={dataKeys.y2Name}
                dataKey={dataKeys.y2}
                stroke="#82ca9d"
                fillOpacity={1}
                fill="url(#colorUv)"
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

export default PaymentChart;
