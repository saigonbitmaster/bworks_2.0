import * as React from "react";
import {
  Box,
  Button,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import { Link } from "react-router-dom";
import DynamicFeedOutlinedIcon from "@mui/icons-material/DynamicFeedOutlined";
import { useGetList, useTranslate, TextField, DateField } from "react-admin";
import { stringify } from "query-string";
import CardWithIcon from "./cardWithIcon";
import LinkBidField from "../components/linkBidsFieldDashboard";
import DoneOutlinedIcon from "@mui/icons-material/DoneOutlined";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import moment from "moment";
import GradeOutlinedIcon from "@mui/icons-material/GradeOutlined";

const PostedJob = (props) => {
  interface Props {
    postedJobs: number;
    bids: number;
  }
  const { postedJobs = 0, bids = 0 } = props;

  const translate = useTranslate();
  const { data: postedjobs, total } = useGetList<any>("postjobs", {
    sort: { field: "createdAt", order: "DESC" },
    pagination: { page: 1, perPage: 9 },
  });

  const display = "block";

  return (
    <CardWithIcon
      to={{
        pathname: "/postjobsjsk",
        search: stringify({
          filter: JSON.stringify({ jsApproved: true }),
        }),
      }}
      icon={DynamicFeedOutlinedIcon}
      title={translate("pos.dashboard.postedJob")}
      subtitle={`${postedJobs} jobs, ${bids} applications`}
      minHeight={890}
    >
      <List sx={{ display }}>
        {postedjobs?.map((record: any) => (
          <React.Fragment key={record.id}>
            <ListItem
              key={record.id}
              alignItems="center"
              sx={{ m: 0, p: 0.8 }}
              component={Link}
              to={encodeURI(
                `/postjobsjsk/?displayedFilters={}&filter=${JSON.stringify({
                  _id: record.id,
                })}`
              )}
            >
              <ListItemAvatar sx={{ minWidth: 30 }}>
                {record.budget > 10000 ? (
                  <GradeOutlinedIcon />
                ) : moment(record.expireDate).isAfter() ? (
                  <DoneOutlinedIcon />
                ) : (
                  <ClearOutlinedIcon />
                )}
              </ListItemAvatar>

              <ListItemText>
                <TextField record={record} source="name"></TextField>
              </ListItemText>

              <DateField
                sx={{ mr: 0 }}
                record={record}
                source="expireDate"
              ></DateField>
            </ListItem>

            <ListItem
              sx={{ m: 0, p: 0.6 }}
              /*    button
              component={Link}
              to={`/jobbids/?filter=${JSON.stringify({ jobId: record.id })}`} */
              alignItems="flex-start"
            >
              <ListItemText primaryTypographyProps={{ variant: "body2" }}>
                Applications
              </ListItemText>
              <LinkBidField record={record} />
            </ListItem>
          </React.Fragment>
        ))}
      </List>
      <Box flexGrow={1}>&nbsp;</Box>
      <Button
        sx={{ borderRadius: 0, m: 0, p: 0 }}
        component={Link}
        to="/postjobsjsk"
        size="small"
        color="primary"
      >
        <Box p={1} sx={{ color: "primary.main" }}>
          {translate("pos.dashboard.allPostedJobs")}
        </Box>
      </Button>
    </CardWithIcon>
  );
};

export default PostedJob;
