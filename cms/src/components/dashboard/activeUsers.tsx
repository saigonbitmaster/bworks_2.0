import * as React from "react";
import {
  Avatar,
  Box,
  Button,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import CustomerIcon from "@mui/icons-material/PersonAdd";
import { Link } from "react-router-dom";
import { useTranslate } from "react-admin";
import { subDays } from "date-fns";

import CardWithIcon from "./cardWithIcon";

interface Props {
  jobSeekers: number;
  employers: number;
}

const ActiveUsers = (props: Props) => {
  const { jobSeekers = 0, employers = 0 } = props;
  const translate = useTranslate();

  const aMonthAgo = subDays(new Date(), 30);
  aMonthAgo.setDate(aMonthAgo.getDate() - 30);
  aMonthAgo.setHours(0);
  aMonthAgo.setMinutes(0);
  aMonthAgo.setSeconds(0);
  aMonthAgo.setMilliseconds(0);

  return (
    <CardWithIcon
      to="/users"
      icon={CustomerIcon}
      title="Active users"
      subtitle={`${jobSeekers} dApp developers, ${employers} contract developers`}
    ></CardWithIcon>
  );
};

export default ActiveUsers;
