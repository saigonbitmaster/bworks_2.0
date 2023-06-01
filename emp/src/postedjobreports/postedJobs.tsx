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

import {
  ReferenceField,
  FunctionField,
  useGetList,
  useTranslate,
  TextField,
  DateField,
  useDataProvider,
  NumberField,
} from "react-admin";

import ReorderIcon from "@mui/icons-material/Reorder";
import { stringify } from "query-string";
import CardWithIcon from "./cardWithIcon";
import LinkBidField from "../components/linkBidsField";
import AppRegistrationOutlinedIcon from "@mui/icons-material/AppRegistrationOutlined";
const text = {
  color: "orange",
};

const Spacer = () => <span style={{ width: "3em" }} />;

const PostedJob = (props) => {
  const dataProvider = useDataProvider();

  const [postedJobs, setPostedJobs] = React.useState([]);

  React.useEffect(() => {
    dataProvider
      .customMethod(
        "customapis/getmonthlyjobreport",
        { filter: { queryType: "emp" } },
        "GET"
      )
      .then((result) => setPostedJobs(result.data.reverse()))
      .catch((error) => console.error(error));
  }, []);

  const translate = useTranslate();
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
      subtitle={`Last 12 months posted jobs`}
    >
      <List sx={{ display }}>
        {postedJobs?.map((record: any) => (
          <>
            <ListItem key={record.id} alignItems="center">
              <ListItemAvatar>
                <AppRegistrationOutlinedIcon></AppRegistrationOutlinedIcon>
              </ListItemAvatar>
              <NumberField record={record} source="numberOfPostedJobs"></NumberField>
              <Spacer />
              <TextField record={record} source="_id" label="abc"></TextField>
            </ListItem>

            <ListItem
              key={record.id + 1}
              button
              component={Link}
              to={`/jobbids/?filter=${JSON.stringify({ jobId: record.id })}`}
              alignItems="flex-start"
            >
              <ListItemText primaryTypographyProps={{ style: text }}>
                Current bids
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
