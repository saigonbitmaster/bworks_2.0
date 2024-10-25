import { useRecordContext, useGetList } from "react-admin";
import Button from "@mui/material/Button";

const LinkBidField = (props) => {
  const record = useRecordContext(props);
  const jobId = props.record?.id || record.id;
  const { data, total, isLoading, error } = useGetList("jobbids", {
    filter: { jobId },
  });
  if (isLoading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p style={{ color: "red" }}>Error!</p>;
  }

  return record ? <Button>{total} Applications</Button> : null;
};

LinkBidField.defaultProps = { label: "" };

export default LinkBidField;
