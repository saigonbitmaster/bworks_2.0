import * as React from "react";
import Box from "@mui/material/Box";
import CircularProgress, {
  circularProgressClasses,
  CircularProgressProps,
} from "@mui/material/CircularProgress";
import LinearProgress from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";

interface MyProps extends CircularProgressProps {
  label?: string;
}

function WalletProgress(props: MyProps) {
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
      {props.label && (
        <Typography sx={{ display: "inline", ml: 1 }} variant="caption">
          {props.label}
        </Typography>
      )}
    </Box>
  );
}

export default function ProgressBar(props) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <WalletProgress label={props.label || null} />

      <LinearProgress
        color="secondary"
        sx={{ height: 2, color: "orange", width: "25%", mb: 1 }}
      />
    </Box>
  );
}
