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
  useListContext,
  NumberField,
  FunctionField,
  useRefresh,
  useUpdate,
} from "react-admin";
import Rating from "@mui/material/Rating";
import Button from "@mui/material/Button";
import { stringify } from "query-string";
import Link from "@mui/material/Link";
import { Link as LinkRouter } from "react-router-dom";

export default function JobAppSteps(props) {
  const { data, isLoading } = useListContext();
  const _record = props.record || data[0];

  console.log(3, _record);
  const redirect = useRedirect();
  const refresh = useRefresh();
  const [
    update,
    { data: updateData, isLoading: updateLoading, error: updateError },
  ] = useUpdate();

  const [record, setRecord] = React.useState(null);

  React.useEffect(() => {
    refresh();
    updateData && setRecord(updateData);
  }, [updateData]);

  React.useEffect(() => {
    setRecord(_record);
  }, [_record]);

  if (isLoading || !record) return null;

  const explorerUrl = process.env.REACT_APP_IS_MAINNET
    ? process.env.REACT_APP_CARDANO_EXPLORER_MAINNET_URL
    : process.env.REACT_APP_CARDANO_EXPLORER_PREPROD_URL;

  const handleClick = (key) => {
    const diff = { [key]: !record[key] };
    update("jobbids", {
      id: record?.id,
      data: diff,
      previousData: record,
    });
  };

  const activeStep = record.isPaid
    ? 5
    : record.isCompleted
    ? 4
    : record.jobDone
    ? 3
    : record.isSignedTx
    ? 2
    : record.isSelected
    ? 1
    : 0;

  return (
    <Box
      sx={{
        minWidth: 250,
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
        sx={{ padding: "1em", pt: 1, pb: 0, boxShadow: "none", border: "none" }}
      >
        <Typography variant="subtitle1">
          <strong>Application progress</strong>
        </Typography>
        <Typography variant="subtitle1">{record.name}</Typography>
        <Stepper orientation="vertical" activeStep={activeStep} sx={{ mb: 2 }}>
          <Step active={true}>
            <StepLabel>
              <Button variant="text" disabled={true}>
                {record.isSelected ? "Deselect" : "Select"}
              </Button>
            </StepLabel>
            <StepContent>
              <BooleanField record={record} source="isSelected" />
              <span>
                {record.isSelected
                  ? " Selected application"
                  : " Not selected application"}
              </span>
            </StepContent>
          </Step>
          <Step active={true}>
            <StepLabel>
              <Button
                sx={{ borderRadius: 0 }}
                component={LinkRouter}
                to={{
                  pathname: "/smartcontract",
                  search: stringify({
                    jobbidid: JSON.stringify(record.id),
                  }),
                }}
                size="small"
                color="primary"
                disabled={true}
              >
                Sign Plutus TX
              </Button>
            </StepLabel>
            <StepContent>
              <BooleanField record={record} source="isSignedTx" />
              <span>
                {record.isSignedTx
                  ? " Signed payment Tx "
                  : " Not signed payment Tx yet"}
              </span>
            </StepContent>
            {record.isSignedTx && (
              <>
                <StepContent>
                  <span>Amount ($): </span>
                  <ReferenceField
                    record={record}
                    reference="plutustxs"
                    source="plutusTxId"
                    label="Lock amount($)"
                    link={false}
                  >
                    <NumberField source="amount" />
                  </ReferenceField>
                </StepContent>

                <StepContent>
                  <ReferenceField
                    record={record}
                    reference="plutustxs"
                    source="plutusTxId"
                    label="Lock date"
                    link={false}
                  >
                    <DateField source="lockDate" showTime />
                  </ReferenceField>
                </StepContent>

                <StepContent>
                  <span>Unlock user: </span>
                  <ReferenceField
                    record={record}
                    reference="plutustxs"
                    source="plutusTxId"
                    label="Unlock user"
                  >
                    <ReferenceField
                      reference="users"
                      source="unlockUserId"
                      label="Unlock user"
                    >
                      <TextField source="fullName" />
                    </ReferenceField>
                  </ReferenceField>
                </StepContent>

                <StepContent>
                  <ReferenceField
                    record={record}
                    reference="plutustxs"
                    source="plutusTxId"
                    label="Lock date"
                    link={false}
                  >
                    <FunctionField
                      label="UnLock TxHash"
                      render={(record) => (
                        <>
                          {record.lockedTxHash && (
                            <Link
                              href={`${explorerUrl}${record.lockedTxHash}`}
                              target="_blank"
                            >
                              View Tx
                            </Link>
                          )}
                        </>
                      )}
                    />
                  </ReferenceField>
                </StepContent>
              </>
            )}
          </Step>
          <Step active={true}>
            <StepLabel>
              {" "}
              <Button
                variant="text"
                disabled={!record.isSignedTx || record.isPaid}
                onClick={() => handleClick("jobDone")}
              >
                {record.jobDone ? "Mark in progress" : "Mark job done"}
              </Button>{" "}
            </StepLabel>

            <StepContent>
              <BooleanField record={record} source="jobDone" />
              <span>
                {" "}
                {record.jobDone
                  ? "Job seeker completed the job"
                  : "In progress job"}
              </span>
            </StepContent>
          </Step>

          <Step active={true}>
            <StepLabel>
              <Button variant="text" disabled={true}>
                {record.isCompleted ? "Mark in progress" : "Confirm complete"}
              </Button>
            </StepLabel>
            <StepContent>
              <BooleanField record={record} source="isCompleted" />
              <span>
                {" "}
                {record.isCompleted
                  ? "Employer confirmed job is completed"
                  : "In progress job"}
              </span>
            </StepContent>
          </Step>

          <Step active={true}>
            <StepLabel>Paid</StepLabel>

            <StepContent>
              <BooleanField record={record} source="isPaid" />
              <span>
                {record.isPaid ? " Complete payment " : " pending payment"}
              </span>
            </StepContent>
            {record.isPaid && (
              <>
                <StepContent>
                  <ReferenceField
                    record={record}
                    reference="plutustxs"
                    source="plutusTxId"
                    label="Lock date"
                    link={false}
                  >
                    <DateField source="unlockDate" showTime />
                  </ReferenceField>
                </StepContent>

                <StepContent>
                  <span>Payment type: </span>
                  <ReferenceField
                    record={record}
                    reference="plutustxs"
                    source="plutusTxId"
                    link={false}
                  >
                    <TextField source="unlockType" />
                  </ReferenceField>
                </StepContent>

                <StepContent>
                  <ReferenceField
                    record={record}
                    reference="plutustxs"
                    source="plutusTxId"
                    label="Lock date"
                    link={false}
                  >
                    <FunctionField
                      label="UnLock TxHash"
                      render={(record) => (
                        <>
                          {record.lockedTxHash && (
                            <Link
                              href={`${explorerUrl}${record.unlockedTxHash}`}
                              target="_blank"
                            >
                              View Tx
                            </Link>
                          )}
                        </>
                      )}
                    />
                  </ReferenceField>
                </StepContent>
              </>
            )}
          </Step>
        </Stepper>
        <Button onClick={() => redirect(`/jobbidsjsk/${record.id}/show`)}>
          View application
        </Button>
      </Paper>
    </Box>
  );
}
