import * as React from "react";
import {
  Box,
  Button,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import CommentIcon from "@mui/icons-material/Comment";
import { Link } from "react-router-dom";
import DynamicFeedOutlinedIcon from "@mui/icons-material/DynamicFeedOutlined";

import { useGetList, useTranslate, TextField, DateField } from "react-admin";

import { stringify } from "query-string";
import CardWithIcon from "./cardWithIcon";
import LinkBidField from "../components/linkBidsFieldDashboard";
import AppRegistrationOutlinedIcon from "@mui/icons-material/AppRegistrationOutlined";
const text = {
  color: "#33ab9f",
};

const Spacer = () => <span style={{ width: "3em" }} />;

const PostedJob = (props) => {
  interface Props {
    postedJobs: number;
    bids: number;
  }
  const { postedJobs = 0, bids = 0 } = props;

  const translate = useTranslate();
  const { data: postedjobs, total } = useGetList<any>("postjobs", {
    sort: { field: "createdAt", order: "DESC" },
    pagination: { page: 1, perPage: 8 },
  });

  const display = "block";

  return (
    <CardWithIcon
      to={{
        pathname: "/postjobs",
        search: stringify({
          filter: JSON.stringify({ status: "active" }),
        }),
      }}
      icon={DynamicFeedOutlinedIcon}
      title={translate("pos.dashboard.postedJob")}
      subtitle={`${postedJobs} jobs, ${bids} bids`}
    >
      <List sx={{ display }}>
        {postedjobs?.map((record: any) => (
          <>
            <ListItem key={record.id} alignItems="center">
              <ListItemAvatar>
                <AppRegistrationOutlinedIcon></AppRegistrationOutlinedIcon>
              </ListItemAvatar>
              <TextField
                record={record}
                source="name"
                /*  sx={{ color: "primary", fontSize: 15, textAlign: "left", fontWeight: 'bold', }} */
              ></TextField>
              <Spacer />
              <DateField record={record} source="createdAt"></DateField>
            </ListItem>

            <ListItem
              key={record.id + 1}
              button
              component={Link}
              to={`/jobbids/?filter=${JSON.stringify({ jobId: record.id })}`}
              alignItems="flex-start"
            >
              <ListItemText primaryTypographyProps={{ variant: "caption" }}>
                Attended applications
              </ListItemText>
              <LinkBidField record={record} />
            </ListItem>
          </>
        ))}
      </List>
      <Box flexGrow={1}>&nbsp;</Box>
      <Button
        sx={{ borderRadius: 0 }}
        component={Link}
        to="/postjobs"
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
