import { ShowButton } from "react-admin";

const ShowButtonWithLabel = (props) => (
  <ShowButton label={props.customLabel || "View"} />
);

//column name
ShowButtonWithLabel.defaultProps = { label: "" };

export default ShowButtonWithLabel;
