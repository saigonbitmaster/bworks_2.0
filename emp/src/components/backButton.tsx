import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const BackButton = (props) => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  return (
    <Button
      sx={{ borderRadius: 0, width: 40 }}
      onClick={goBack}
      size="small"
      color="primary"
      disabled={props.disabled}
      startIcon={<ArrowBackIcon />}
    >
      Back
    </Button>
  );
};

BackButton.defaultProps = { label: "" };

export default BackButton;
