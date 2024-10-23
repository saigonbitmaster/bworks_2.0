import { useRecordContext, useGetList } from "react-admin";
import { Link } from "react-router-dom";
import { stringify } from "query-string";

const LinkBidField = (props) => {
  const record = useRecordContext(props);
  const smartContractId = props.record?.id || record.id;
  const { data, total, isLoading, error } = useGetList("plutustxs", {
    filter: { smartContractId },
  });
  if (isLoading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p style={{ color: "red" }}>Error!</p>;
  }

  return record ? (
    <Link
      to={{
        pathname: "/plutustxs",
        search: stringify({
          filter: JSON.stringify({ jobId: record.id }),
        }),
      }}
    >
      {total}
    </Link>
  ) : null;
};

LinkBidField.defaultProps = { label: "Current applications" };

export default LinkBidField;
