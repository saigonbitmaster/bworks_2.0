import * as React from "react";
import get from "lodash/get";
import { useRecordContext } from "react-admin";
import Rating from "@mui/material/Rating";

const TextField = ({ source }) => {
  const record = useRecordContext();

  return record ? (
    <Rating name="read-only" value={get(record, source)} readOnly />
  ) : null;
};
TextField.defaultProps = { label: "" };
export default TextField;
