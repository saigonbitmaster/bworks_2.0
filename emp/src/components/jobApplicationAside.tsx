import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Check from "@mui/icons-material/Check";
import {
  useRecordContext,
  useGetList,
  ReferenceField,
  TextField,
  useGetOne,
} from "react-admin";

export default function VerticalLinearStepper(props) {
  //{label: "label", steps: [{name: string, fundId: string, projectStatus: string}]}
  let steps = props.steps || [];
  const record = props.record;

  const [jobBids, setJobBids] = React.useState([]);
  const { data, total, isLoading, error } = useGetList("jobbids", {
    pagination: { page: 1, perPage: 50 },
    sort: { field: "createdAt", order: "DESC" },
    filter: { jobId: record.id, queryType: "employer" },
  });

  React.useEffect(() => {
    if (!isLoading && !error) {
      setJobBids(data);
    }
  }, [data]);

  steps = [
    {
      fundId: "Thang Tran",
      name: "Apply to the job",
      projectStatus: "Pending",
    },
    {
      fundId: "Peter Norvig",
      name: "Apply to the job",
      projectStatus: "Pending",
    },
  ];
  let label = props.label || "Applications";
  return (
    <Box
      sx={{
        minWidth: 300,
        maxWidth: 300,
        marginTop: "6em",
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
                <StepLabel StepIconComponent={Check}>{step.name}</StepLabel>
                <StepContent>
                  <Typography> Requested { step.bidValue} Ada</Typography>
                  <p>{step.isSelected}</p>
                </StepContent>
              </Step>
            ))}
        </Stepper>
      </Paper>
    </Box>
  );
}
