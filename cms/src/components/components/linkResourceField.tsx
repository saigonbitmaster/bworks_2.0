import { useRecordContext, useGetList } from "react-admin";
import { Link } from "react-router-dom";
import { stringify } from "query-string";

//<LinkResoureField resource="contracts"> -> will sum contracts
const LinkResoureField = (props) => {
  const record = useRecordContext();
  const { data, total, isLoading, error } = useGetList(props.resource, {
    filter: { smartContractId: record.id },
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
        pathname: `/${props.resource}`,
        search: stringify({
          filter: JSON.stringify({ smartContractId: record.id }),
        }),
      }}
    >
      {total}
    </Link>
  ) : null;
};

LinkResoureField.defaultProps = { label: "dApp TXs" };

export default LinkResoureField;
