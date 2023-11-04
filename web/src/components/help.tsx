import * as React from "react";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";
import ButtonBase from "@mui/material/ButtonBase";

export default function Register() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography
          variant="overline"
          sx={{ m: 1, width: 500, textAlign: "center", fontWeight: "bold" }}
        >
          Help center
        </Typography>
      </Box>
    </Box>
  );
}
