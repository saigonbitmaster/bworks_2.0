import * as React from "react";
import {
  useTranslate,
  useGetList,
  ReferenceField,
  TextField,
  FunctionField,
  DateField,
} from "react-admin";

import CardWithIcon from "./cardWithIcon";
import GradingIcon from "@mui/icons-material/Grading";
import { subDays } from "date-fns";
import { Link } from "react-router-dom";
import Tooltip from "@mui/material/Tooltip";
import MuiLink from "@mui/material/Link";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import DoneOutlinedIcon from "@mui/icons-material/DoneOutlined";

import {
  Box,
  Button,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";

import PaymentsOutlinedIcon from "@mui/icons-material/PaymentsOutlined";
import Typography from "@mui/material/Typography";
import { LockClockOutlined } from "@mui/icons-material";

interface Props {
  lockTxs: number;
  unlockTxs: number;
}

const SmartContractTxs = (props: Props) => {
  const explorerUrl = process.env.REACT_APP_IS_MAINNET
    ? process.env.REACT_APP_CARDANO_EXPLORER_MAINNET_URL
    : process.env.REACT_APP_CARDANO_EXPLORER_PREPROD_URL;
  const { lockTxs = 0, unlockTxs = 0 } = props;

  const text = {
    color: "orange",
  };

  const { isLoading, data: plutustxs } = useGetList<any>("plutustxs", {
    filter: { lockedTxHash: { $nin: [null, "", undefined] } },
    sort: { field: "createdAt", order: "DESC" },
    pagination: { page: 1, perPage: 9 },
  });

  const translate = useTranslate();
  return (
    <CardWithIcon
      to="/plutustxs"
      icon={GradingIcon}
      title="Smart contract TXs"
      subtitle={`${lockTxs} locked Txs, ${unlockTxs} unlocked Txs`}
      minHeight={890}
    >
      <List sx={{ display: isLoading ? "none" : "block" }}>
        {plutustxs
          ? plutustxs.map((record: any) => (
              <>
                <ListItem key={record.id} sx={{ m: 0, p: 0.6 }}>
                  <ListItemAvatar sx={{ minWidth: 30 }}>
                    {record.unlockedTxHash ? (
                      <DoneOutlinedIcon />
                    ) : (
                      <LockClockOutlined />
                    )}
                  </ListItemAvatar>
                  <ListItemText>
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
                  </ListItemText>

                  <DateField record={record} source="createdAt"></DateField>
                </ListItem>
                <ListItem
                  key={record.id + 1}
                  component={MuiLink}
                  alignItems="center"
                  sx={{ m: 0, p: 0.6 }}
                >
                  <Tooltip title={`${explorerUrl}${record.lockedTxHash}`}>
                    <ListItemText primaryTypographyProps={{ variant: "body2" }}>
                      <MuiLink
                        href={`${explorerUrl}${record.lockedTxHash}`}
                        target="_blank"
                      >
                        View lock Tx
                      </MuiLink>
                    </ListItemText>
                  </Tooltip>
                  <Tooltip
                    title={
                      record.unlockedTxHash
                        ? `${explorerUrl}${record.unlockedTxHash}`
                        : ""
                    }
                  >
                    <ListItemText
                      primaryTypographyProps={{
                        variant: "caption",
                        color: record.unlockedTxHash ? null : "red",
                      }}
                    >
                      {record.unlockedTxHash ? (
                        <MuiLink
                          href={`${explorerUrl}${record.unlockedTxHash}`}
                          target="_blank"
                        >
                          View unlock Tx
                        </MuiLink>
                      ) : (
                        "Pending"
                      )}
                    </ListItemText>
                  </Tooltip>
                  <Typography variant="body2" display="block" gutterBottom>
                    {record.amount} Ada
                  </Typography>
                </ListItem>
              </>
            ))
          : null}
      </List>
      <Box flexGrow={1} sx={{ m: 0, p: 0 }}>
        &nbsp;
      </Box>
      <Button
        sx={{ borderRadius: 0, m: 0, p: 0 }}
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
