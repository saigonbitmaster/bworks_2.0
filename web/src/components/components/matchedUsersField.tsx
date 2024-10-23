import * as React from "react";
import { useRecordContext } from "react-admin";
import Typography from "@mui/material/Typography";

const TextField = ({ source }) => {
  const record = useRecordContext();
  const matchedJobSeekers = record.matchUsers || [];

  return (
    <Typography> {`${matchedJobSeekers.length} Job seekers`}</Typography>
  );
};

TextField.defaultProps = { label: "Matched users" };

export default TextField;
