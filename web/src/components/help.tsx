import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { useGetList, RichTextField } from "react-admin";

export default function Register() {
  const { data, total, isLoading, error, refetch } = useGetList("settings", {
    filter: { key: "help" },
  });
  if (error || isLoading || data?.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        height: "100vh",
        p: 1,
      }}
    >
      <RichTextField record={data[0]} source="description" fullWidth />
    </Box>
  );
}
