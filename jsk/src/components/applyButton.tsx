import { useRecordContext, useGetList } from "react-admin";
import Button from "@mui/material/Button";
import { stringify } from "query-string";
import { Link } from "react-router-dom";

const ApplyButton = (props) => {
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

  return record ? (
    <Button
    
      sx={{ borderRadius: 0 }}
      component={Link}
      to={{
        pathname: "/jobbids/create",
        search: stringify({
          jobId: JSON.stringify(record.id),
        }),
      }}
      size="small"
      color="primary"
      disabled={props.disabled}
    >
      Apply
    </Button>
  ) : null;
};

ApplyButton.defaultProps = { label: "" };

export default ApplyButton;
