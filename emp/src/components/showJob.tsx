import { ShowButton } from "react-admin";

const ShowJob = (props) => <ShowButton label="view" />;

//column name
ShowJob.defaultProps = { label: "" };

export default ShowJob;
