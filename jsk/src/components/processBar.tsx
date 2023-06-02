import * as React from "react";
import Box from "@mui/material/Box";
import CircularProgress, {
  circularProgressClasses,
  CircularProgressProps,
} from "@mui/material/CircularProgress";
import LinearProgress from "@mui/material/LinearProgress";

function WalletProgress(props: CircularProgressProps) {
  return (
    <Box sx={{ position: "relative" }}>
      <CircularProgress
        variant="determinate"
        sx={{
          color: (theme) =>
            theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
        }}
        size={40}
        thickness={2}
        {...props}
        value={100}
      />
      <CircularProgress
        variant="indeterminate"
        disableShrink
        sx={{
          color: "gray",
          animationDuration: "700ms",
          position: "absolute",
          left: 0,
          [`& .${circularProgressClasses.circle}`]: {
            strokeLinecap: "round",
          },
        }}
        size={40}
        thickness={2}
        {...props}
      />
    </Box>
  );
}

export default function ProgressBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <WalletProgress />
      <br />
      <LinearProgress
        color="secondary"
        sx={{ height: 2, color: "orange", width: "50%" }}
      />
    </Box>
  );
}
