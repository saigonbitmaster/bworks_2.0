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
  const [label, setLabel] = React.useState("Payment TXs");
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
      .customMethod("customapis/dashboardplutus", { filter: {} }, "GET")
      .then((result) => setData(result.data))
      .catch((error) => console.error(error));
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  React.useEffect(() => {
    if (checked) {
      setLabel("Payment TXs");
      setDataKeys({
        y1: "numberOfLockTxs",
        y2: "numberOfUnlockedTxs",
        y1Name: "Lock Txs",
        y2Name: "Unlock Txs",
      });
    } else {
      setLabel("Payment TXAmounts ($Ada)");
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
        sx={{ pb: 0 }}
        /*  title="Payment TXs"
        titleTypographyProps={{ variant: "subtitle1" }} */
      />
      <FormGroup sx={{ ml: 2 }}>
        <FormControlLabel
          control={
            <Checkbox size="small" checked={checked} onChange={handleChange} />
          }
          label={label}
        />
      </FormGroup>
      <CardContent sx={{ p: 0 }}>
        <div style={{ width: "100%", height: 270 }}>
          <ResponsiveContainer>
            <BarChart
              width={700}
              height={270}
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

              <Bar
                name={dataKeys.y1Name}
                dataKey={dataKeys.y1}
                fill="#ffc658"
              />
              <Bar
                name={dataKeys.y2Name}
                dataKey={dataKeys.y2}
                fill="#8884d8"
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

export default PaymentChart;
