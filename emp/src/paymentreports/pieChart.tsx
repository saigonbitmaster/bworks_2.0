import * as React from "react";
import { Card, CardHeader, CardContent } from "@mui/material";
import { ResponsiveContainer, Tooltip, Legend } from "recharts";
import { useDataProvider } from "react-admin";
import { PieChart, Pie, Cell } from "recharts";
import Typography from "@mui/material/Typography";

const PaymentChart = () => {
  const [data2, setData] = React.useState({
    _id: "plutusReports",
    numberOfLockTxs: 0,
    numberOfUnlockedTxs: 0,
    sumUnlockedAmounts: 0,
    sumLockedAmounts: 0,
  });
  const dataProvider = useDataProvider();
  React.useEffect(() => {
    dataProvider
      .customMethod(
        "customapis/plutusreports",
        { filter: { queryType: "emp" } },
        "GET"
      )
      .then((result) => setData(result.data))
      .catch((error) => console.error(error));
  }, []);

  const data1 = [
    { name: "Unlock Txs", value: data2.numberOfUnlockedTxs },
    {
      name: "Pending Txs",
      value: data2.numberOfLockTxs - data2.numberOfUnlockedTxs,
    },
  ];
  const data = [
    { name: "Unlocked amounts", value: data2.sumUnlockedAmounts },
    {
      name: "Pending amounts",
      value: data2.sumLockedAmounts - data2.sumUnlockedAmounts,
    },
  ];
  const COLORS = ["#0088FE", "#FF8042"];
  const COLORS1 = ["#00C49F", "#FFBB28"];

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <Card>
      <CardHeader
        title="Payment statistic"
        titleTypographyProps={{ variant: "subtitle1" }}
        subheader={
          <Typography variant="subtitle2" gutterBottom>
            {`Lock Txs: ${data2.numberOfLockTxs}, Unlock Txs: ${data2.numberOfUnlockedTxs}, Locked amounts: ${data2.sumLockedAmounts}, Unlocked amounts: ${data2.sumUnlockedAmounts}`}
          </Typography>
        }
      />
      <CardContent>
        <div
          style={{
            width: "100%",
            height: 300,
            display: "flex",
            flexDirection: "row",
          }}
        >
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data1}
                cx="25%"
                cy="50%"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={120}
                fill="#8884d8"
                dataKey="value"
                animationDuration={1000}
              >
                {data1.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>

              <Pie
                data={data}
                cx="75%"
                cy="50%"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={120}
                fill="#8884d8"
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS1[index % COLORS1.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default PaymentChart;
