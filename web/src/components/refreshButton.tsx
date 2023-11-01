import Button from "@mui/material/Button";
import { stringify } from "query-string";
import { Link } from "react-router-dom";
import RefreshOutlinedIcon from "@mui/icons-material/RefreshOutlined";
/*
to reset search filter after a navigate action
<RefreshButton baseUrl="/jobbidsjsk"/>
*/
const RefreshButton = (props) => {
  return props.baseUrl ? (
    <Button
      sx={{ borderRadius: 0 }}
      component={Link}
      to={{
        pathname: props.baseUrl,
        search: stringify({
          filter: JSON.stringify({}),
        }),
      }}
      size="small"
      color="primary"
      disabled={props.disabled}
      startIcon={<RefreshOutlinedIcon />}
    >
      {props.label || "refresh"}
    </Button>
  ) : null;
};

RefreshButton.defaultProps = { label: "" };

export default RefreshButton;
