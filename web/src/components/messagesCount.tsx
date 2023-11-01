import { useRecordContext, useGetList } from "react-admin";
import ForwardToInboxIcon from "@mui/icons-material/ForwardToInbox";
import IconButton from "@mui/material/IconButton";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const MessagesCount = (props) => {
  const record = useRecordContext(props);
  const navigate = useNavigate();
  const onClick = () => {
    navigate(`/jobbids/${record.id}/show`);
  };
  return record?.messages ? (
    <IconButton aria-label="delete" size="small" onClick={onClick}>
      {record.messages.length || 0}
      <ForwardToInboxIcon fontSize="small" sx={{ m: 0.5 }} />
    </IconButton>
  ) : null;
};

MessagesCount.defaultProps = { label: "" };

export default MessagesCount;
