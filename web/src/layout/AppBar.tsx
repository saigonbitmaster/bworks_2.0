import * as React from "react";
import { AppBar, Logout, UserMenu, useTranslate } from "react-admin";
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

const ConfigurationMenu = React.forwardRef((props, ref) => {
  const translate = useTranslate();
  return (
    <MenuItem
      component={Link}
      // @ts-ignore
      ref={ref}
      {...props}
      to="/configuration"
    >
      <ListItemIcon>
        <SettingsIcon />
      </ListItemIcon>
      <ListItemText>{translate("pos.configuration")}</ListItemText>
    </MenuItem>
  );
});

const CustomUserMenu = () => {
  const [open, setOpen] = React.useState(false);

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 300 }}
      role="presentation"
    >
      <List>
        {[
          "Applications is selected ",
          "Applications ABC got new message",
          "Applications is selected",
          "Applications ABC got new message",
        ].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton
              onClick={() => {
                setOpen(false);
              }}
            >
              <ListItemIcon sx={{ minWidth: 30 }}>
                {index % 2 === 0 ? (
                  <CheckBoxIcon fontSize="small" />
                ) : (
                  <MailIcon fontSize="small" />
                )}
              </ListItemIcon>
              <ListItemText
                primary={<Typography variant="body2">{text}</Typography>}
              />
              <Typography variant="body2">{new Date().toString()}</Typography>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <UserMenu>
        {/*   <ConfigurationMenu /> */}
        <Logout />
      </UserMenu>

      <Badge
        color="info"
        badgeContent={99}
        sx={{
          "& .MuiBadge-badge": { fontSize: 10, height: 16, minWidth: 15 },
          mr: 0.1,
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
        open={open}
        anchor="right"
        onClose={() => {}}
        PaperProps={{
          sx: {
            minWidth: 300,
            height: "auto",
            mt: 6,
            mr: 0,
          },
        }}
      >
        {list("top")}
      </Drawer>
    </>
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

/*

import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';

type Anchor = 'top' | 'left' | 'bottom' | 'right';

export default function TemporaryDrawer() {
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }

      setState({ ...state, [anchor]: open });
    };

  const list = (anchor: Anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <div>
      {(['left', 'right', 'top', 'bottom'] as const).map((anchor) => (
        <React.Fragment key={anchor}>
          <Button onClick={toggleDrawer(anchor, true)}>{anchor}</Button>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
*/
