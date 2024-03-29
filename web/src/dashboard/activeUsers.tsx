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

  return (
    <CardWithIcon
      to="/users"
      icon={CustomerIcon}
      title="Active users"
      subtitle={`${jobSeekers} job seekers, ${employers} employers`}
    ></CardWithIcon>
  );
};

export default ActiveUsers;
