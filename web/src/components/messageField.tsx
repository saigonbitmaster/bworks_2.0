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
  RichTextField,
  useCreate,
  useRefresh,
  useDataProvider,
  useNotify,
} from "react-admin";
import Rating from "@mui/material/Rating";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { stringify } from "query-string";

import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

export default function MessageField(props) {
  const record = useRecordContext() || { messages: [], id: "" };
  const refresh = useRefresh();
  const notify = useNotify();
  const dataProvider = useDataProvider();

  const onClick = (messageId) => {
    dataProvider
      .customMethod(
        `jobbids/messages/${record.id}/${messageId}`,
        { data: {} },
        "POST"
      )
      .then((result) => {
        refresh();
      })
      .catch((error) => {
        notify(error.message, { type: "warning" });
      });

    ///messages/:id/:messageId
  };
  return (
    <Box
      sx={{
        marginTop: "0em",
        marginLeft: "0",
        padding: "0em",
        boxShadow: "none",
        border: "none",
      }}
    >
      <Paper
        elevation={0}
        sx={{ padding: "0em", boxShadow: "none", border: "none" }}
      >
        <Stepper orientation="vertical" connector={<></>}>
          {record.messages?.length > 0 &&
            record.messages.map((step, index) => (
              <Step key={index} active={true}>
                <StepLabel>
                  <ReferenceField
                    record={step}
                    source="userId"
                    reference="users"
                  >
                    <TextField source="fullName" sx={{ ml: 1, mr: 1 }} />
                  </ReferenceField>
                  <DateField record={step} source="createdAt" showTime />

                  <IconButton
                    aria-label="delete"
                    size="small"
                    onClick={() => onClick(step.id)}
                  >
                    <DeleteIcon fontSize="small" sx={{ color: "red" }} />
                  </IconButton>
                </StepLabel>

                <StepContent>
                  <RichTextField record={step} source="body" fullWidth />
                </StepContent>
              </Step>
            ))}
        </Stepper>
      </Paper>
    </Box>
  );
}
