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
import SettingsIcon from "@mui/icons-material/Settings";
import Logo from "./Logo";
import SearchAppBar from "./search";


import { useTheme } from '@mui/material/styles';

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
const CustomUserMenu = () => (
  <UserMenu>
    <ConfigurationMenu />
    <Logout />
  </UserMenu>
);

const CustomAppBar = (props: any) => {
 
  const theme = useTheme();
  const isLargeEnough = useMediaQuery(theme.breakpoints.up('sm'));


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

