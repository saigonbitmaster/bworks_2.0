import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Check from "@mui/icons-material/Check";
import RateField from "./rateField";
import {
  useRecordContext,
  useGetList,
  ReferenceField,
  TextField,
  useGetOne,
  BooleanField,
  DateField,
  useRedirect,
} from "react-admin";
import Rating from "@mui/material/Rating";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { stringify } from "query-string";

export default function VerticalLinearStepper(props) {
  const redirect = useRedirect();

  const record = props.record;
  const [jobBids, setJobBids] = React.useState([]);
  const { data, total, isLoading, error } = useGetList("jobbids", {
    pagination: { page: 1, perPage: 4 },
    sort: { field: "createdAt", order: "DESC" },
    filter: { jobId: record.id },
  });

  React.useEffect(() => {
    if (!isLoading && !error) {
      setJobBids(data);
    }
  }, [data]);

  const label = props.label || `${total || 0} Applications`;

  const onClick = () => {
    const filter = JSON.stringify({ jobId: record.id });

    redirect(`/jobbidscms?&filter=${filter}`);
  };

  return (
    <Box
      sx={{
        minWidth: 300,
        maxWidth: 300,
        marginTop: "4em",
        marginLeft: "0",
        padding: "0.5em",
        boxShadow: "none",
        border: "none",
      }}
    >
      <Paper
        elevation={0}
        sx={{ padding: "1em", boxShadow: "none", border: "none" }}
      >
        <Typography variant="h6" gutterBottom>
          {label}
        </Typography>
        <Stepper orientation="vertical">
          {jobBids.length > 0 &&
            jobBids.map((step, index) => (
              <Step key={step.name} active={true}>
                <StepLabel>{step.name}</StepLabel>
                <StepContent>
                  <ReferenceField
                    record={step}
                    source="jobSeekerId"
                    reference="users"
                  >
                    <TextField source="fullName" />
                  </ReferenceField>
                </StepContent>
                <StepContent>
                  <DateField record={step} source="createdAt" showTime />
                </StepContent>
                <StepContent>
                  <Rating name="read-only" value={step.rate} readOnly />
                </StepContent>
                <StepContent>
                  <Typography> Requested {step.bidValue} Ada</Typography>
                </StepContent>

                <StepContent>
                  <span> Selected </span>
                  <BooleanField record={step} source="isSelected" />
                </StepContent>
                <StepContent>
                  <span> Paid </span>
                  <BooleanField record={step} source="isPaid" />
                </StepContent>
              </Step>
            ))}
        </Stepper>
        <Button onClick={onClick} sx={{ mt: 2 }} disabled={total === 0}>
          View all applications
        </Button>
      </Paper>
    </Box>
  );
}
