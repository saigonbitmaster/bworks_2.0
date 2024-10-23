import * as React from "react";
import { Card, CardHeader, CardContent } from "@mui/material";
import { ResponsiveContainer, Tooltip, Legend } from "recharts";
import { useDataProvider } from "react-admin";
import { PieChart, Pie, Cell } from "recharts";
import Typography from "@mui/material/Typography";

const ContractPieChart = () => {
  const [data2, setData] = React.useState({
    _id: "sumContracts",
    plutusContracts: 0,
    aikenContracts: 0,
    marloweContracts: 0,
    isSourceCodeVerified: 0,
    isFunctionVerified: 0,
    isApproved: 0,
    hasTxContracts: 0,
  });
  const dataProvider = useDataProvider();

  React.useEffect(() => {
    dataProvider
      .customMethod("customapis/sumcontracts", { filter: {} }, "GET")
      .then((result) => setData(result.data))
      .catch((error) => console.error(error));
  }, []);

  const data1 = [
    { name: "Plutus contracts", value: data2.plutusContracts },
    {
      name: "Aiken contracts",
      value: data2.aikenContracts,
    },
    {
      name: "Marlowe contracts",
      value: data2.marloweContracts,
    },
  ];
  const data = [
    { name: "Has dApp TX", value: data2.hasTxContracts },
    {
      name: "No dApp TX",
      value:
        data2.plutusContracts +
        data2.aikenContracts +
        data2.marloweContracts -
        data2.hasTxContracts,
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
        title="Published contract analyzer"
        titleTypographyProps={{ variant: "subtitle1" }}
        subheader={
          <Typography variant="subtitle2" gutterBottom>
            {`Plutus contracts: ${data2.plutusContracts}, Aiken contracts: ${data2.aikenContracts}, Marlowe contracts: ${data2.marloweContracts}, Has dApp Tx contracts: ${data2.hasTxContracts}`}
          </Typography>
        }
      />
      <CardContent>
        <div
          style={{
            width: "100%",
            height: 380,
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

export default ContractPieChart;
