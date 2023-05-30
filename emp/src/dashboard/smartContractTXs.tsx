import * as React from "react";
import {
  useTranslate,
  useGetList,
  ReferenceField,
  TextField,
  FunctionField,
} from "react-admin";

import CardWithIcon from "./cardWithIcon";
import GradingIcon from "@mui/icons-material/Grading";
import { subDays } from "date-fns";
import { Link } from "react-router-dom";
import ReorderIcon from "@mui/icons-material/Reorder";
import Tooltip from "@mui/material/Tooltip";

import {
  Avatar,
  Box,
  Button,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";

import DynamicFeedOutlinedIcon from "@mui/icons-material/DynamicFeedOutlined";
import PaymentsOutlinedIcon from '@mui/icons-material/PaymentsOutlined';
interface Props {
  lockTxs: number;
  unlockTxs: number;
}

const SmartContractTxs = (props: Props) => {
  const { lockTxs = 0, unlockTxs = 0 } = props;

  const text = {
    color: "orange",
  };
  const aMonthAgo = subDays(new Date(), 30);
  aMonthAgo.setDate(aMonthAgo.getDate() - 30);
  aMonthAgo.setHours(0);
  aMonthAgo.setMinutes(0);
  aMonthAgo.setSeconds(0);
  aMonthAgo.setMilliseconds(0);

  const { isLoading, data: plutustxs } = useGetList<any>("plutustxs", {
    filter: {
      has_ordered: true,
      first_seen_gte: aMonthAgo.toISOString(),
    },
    sort: { field: "first_seen", order: "DESC" },
    pagination: { page: 1, perPage: 8 },
  });


  const translate = useTranslate();
  return (
    <CardWithIcon
      to="/plutustxs"
      icon={GradingIcon}
      title="Smart contract TXs"
      subtitle={`${lockTxs} locked TXs, ${unlockTxs} unlocked TXs`}
    >
      <List sx={{ display: isLoading ? "none" : "block" }}>
        {plutustxs
          ? plutustxs.map((record: any) => (
              <>
                <ListItem key={record.id}>
                  <ListItemAvatar>
                    <PaymentsOutlinedIcon></PaymentsOutlinedIcon>
                  </ListItemAvatar>
                  <ReferenceField
                    record={record}
                    source="jobBidId"
                    reference="jobbids"
                    link={false}
                  >
                    <FunctionField
                      render={(plutusTx: any) => (
                        <TextField record={plutusTx} source="name" />
                      )}
                    />
                  </ReferenceField>
                </ListItem>
                <ListItem
                  key={record.id + 1}
                  button
                  component={Link}
                  to={`/plutustxs/?filter=${JSON.stringify({
                    jobBidId: record.jobBidId,
                  })}`}
                  alignItems="center"
                >
                  <Tooltip title={record.lockedTxHash}>
                    <ListItemText primaryTypographyProps={{ style: text }}>
                      Lock Tx
                    </ListItemText>
                  </Tooltip>
                  <Tooltip title={record.unlockedTxHash || ""}>
                    <ListItemText primaryTypographyProps={{ style: text }}>
                      {record.unlockedTxHash ? "Unlock Tx" : "UnPaid"}
                    </ListItemText>
                  </Tooltip>
                  <Box>{record.amount} Ada</Box>
                </ListItem>
              </>
            ))
          : null}
      </List>
      <Box flexGrow={1}>&nbsp;</Box>
      <Button
        sx={{ borderRadius: 0 }}
        component={Link}
        to="/plutustxs"
        size="small"
        color="primary"
      >
        <Box p={1} sx={{ color: "primary.main" }}>
          {translate("pos.dashboard.allPlutusTxs")}
        </Box>
      </Button>
    </CardWithIcon>
  );
};

export default SmartContractTxs;
