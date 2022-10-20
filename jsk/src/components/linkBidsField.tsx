import { useRecordContext, useGetList } from "react-admin";
import { Link } from "react-router-dom";
import { stringify } from "query-string";

const LinkBidField = (props) => {
  const record = useRecordContext(props);
  const { data, total, isLoading, error } = useGetList("jobbids", {
    filter: { jobId: record.id, queryType: "jobSeeker" },
  });
  if (isLoading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p style={{ color: "red" }}>Error!</p>;
  }

console.log(record, data);

  return record ? (
    <Link
      to={{
        pathname: "/jobbids",
        search: stringify({
          filter: JSON.stringify({ jobId: record.id }),
        }),
      }}
    >
      {total}
    </Link>
  ) : null;
};

LinkBidField.defaultProps = { label: "Current bids" };

export default LinkBidField;
