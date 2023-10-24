import * as React from "react";
import {
  AppBar,
  Logout,
  UserMenu,
  DateField,
  useDataProvider,
} from "react-admin";
import { Link } from "react-router-dom";
import {
  Box,
  MenuItem,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
  Theme,
} from "@mui/material";

import Badge from "@mui/material/Badge";
import MailIcon from "@mui/icons-material/Mail";
import SettingsIcon from "@mui/icons-material/Settings";
import Logo from "./Logo";
import SearchAppBar from "./search";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import IconButton from "@mui/material/IconButton";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import Typography from "@mui/material/Typography";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import PaidIcon from "@mui/icons-material/Paid";
import { useNavigate } from "react-router-dom";

const CustomUserMenu = () => {
  const dataProvider = useDataProvider();
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);

  //close drawer when click outside the component
  const useOutsideAlerter = (ref) => {
    React.useEffect(() => {
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          setOpen(false);
        }
      }
      // add the event listener
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        // remove the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  };

  const wrapperRef = React.useRef(null);
  useOutsideAlerter(wrapperRef);

  const [messages, setMessages] = React.useState([]);
  const authorizationToken = localStorage.getItem("accessToken");

  React.useEffect(() => {
    const api = `http://localhost:3000/events/jobbids?access_token=${authorizationToken}`;
    const es = new EventSource(api);

    // Listen to API to receive realtime events. Effect will run every time server send message
    es.addEventListener("notification", (e) => {
      const message = JSON.parse(e.data);
      setMessages(message);
    });
  }, []);

  /*
close drawer & delete a clicked event, navigate to item screen
*/
  const onClick = (event) => {
    setOpen(false);
    dataProvider
      .customMethod(`events/remove/${event.id}`, { filter: {} }, "GET")
      .then((result) => console.log(result))
      .catch((error) => console.error(error));

    if (event.type === "job" || event.type === "message") {
      if (event.userType === "employer") {
        navigate(`/jobbids/${event.message}/show`);
      }
      if (event.userType === "jobSeeker") {
        navigate(`/jobbidsjsk/${event.message}/show`);
      }
    }
    if (event.type === "payment") {
      const filter = JSON.stringify({ _id: event.message });
      navigate(`/plutustxs?filter=${filter}`);
    }
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 350 }}
      role="presentation"
    >
      <List>
        {messages.map((text, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton onClick={() => onClick(text)}>
              <ListItemIcon sx={{ minWidth: 30 }}>
                {text.type === "job" ? (
                  <CheckBoxIcon fontSize="small" />
                ) : text.type === "payment" ? (
                  <PaidIcon></PaidIcon>
                ) : (
                  <MailIcon fontSize="small" />
                )}
              </ListItemIcon>
              <ListItemText
                primary={
                  <Typography variant="body2">
                    {text.type === "message"
                      ? "New message"
                      : text.type === "payment"
                      ? "New payment update"
                      : "New job update"}
                  </Typography>
                }
              />
              <DateField record={text} source="date" showTime />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box ref={wrapperRef} sx={{ display: "flex", flexDirection: "row" }}>
      <UserMenu>
        <Logout />
      </UserMenu>

      <Badge
        color="info"
        badgeContent={messages.length || 0}
        sx={{
          "& .MuiBadge-badge": {
            fontSize: 10,
            height: 15,
            minWidth: 15,
            mt: 0.5,
            mr: 0.1,
          },
        }}
      >
        <IconButton
          aria-label="delete"
          sx={{ m: 0, p: 0 }}
          onClick={() => {
            setOpen(!open);
          }}
        >
          <NotificationsNoneOutlinedIcon />
        </IconButton>
      </Badge>

      <Drawer
        variant="persistent"
        open={open && messages.length > 0}
        anchor="right"
        onClose={() => {}}
        PaperProps={{
          sx: {
            minWidth: 370,
            height: "auto",
            mt: 6,
            mr: 0,
          },
        }}
      >
        {list("top")}
      </Drawer>
    </Box>
  );
};

const CustomAppBar = (props: any) => {
  const isLargeEnough = useMediaQuery<Theme>((theme) =>
    theme.breakpoints.up("sm")
  );
  return (
    <AppBar
      {...props}
      color="secondary"
      elevation={1}
      userMenu={<CustomUserMenu />}
    >
      {isLargeEnough && <Logo />}
      {isLargeEnough && <Box component="span" sx={{ flex: 1 }} />}
      {isLargeEnough && <Box component="span" sx={{ flex: 1 }} />}
      {isLargeEnough && <Box component={SearchAppBar} />}
    </AppBar>
  );
};

export default CustomAppBar;
