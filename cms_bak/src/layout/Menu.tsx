import * as React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import BlurOnIcon from "@mui/icons-material/BlurOn";
import DeselectIcon from "@mui/icons-material/Deselect";
import FitbitIcon from "@mui/icons-material/Fitbit";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import DoneAllOutlinedIcon from "@mui/icons-material/DoneAllOutlined";
import FormatListNumberedOutlinedIcon from "@mui/icons-material/FormatListNumberedOutlined";
import GradingOutlinedIcon from "@mui/icons-material/GradingOutlined";
import NotesIcon from "@mui/icons-material/Notes";
import FileCopyOutlinedIcon from "@mui/icons-material/FileCopyOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import ConstructionIcon from "@mui/icons-material/Construction";
import FormatIndentIncreaseIcon from "@mui/icons-material/FormatIndentIncrease";
import {
  useTranslate,
  DashboardMenuItem,
  MenuItemLink,
  MenuProps,
  useSidebarState,
} from "react-admin";
import ListAltOutlinedIcon from "@mui/icons-material/ListAltOutlined";
import SubMenu from "./SubMenu";
import DriveFileRenameOutlineOutlinedIcon from "@mui/icons-material/DriveFileRenameOutlineOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import PasswordOutlinedIcon from "@mui/icons-material/PasswordOutlined";

type MenuName =
  | "postJobs"
  | "manageFund"
  | "reports"
  | "settings"
  | "tools"
  | "operations";

const Menu = ({ dense = false }: MenuProps) => {
  const [state, setState] = useState({
    postJobs: true,
    operations: true,
    manageFund: true,
    reports: true,
    settings: true,
    tools: false,
  });
  const translate = useTranslate();
  const [open] = useSidebarState();

  const handleToggle = (menu: MenuName) => {
    // setState({ ...state, [menu]: !state[menu] });

    //keep open max 4 menus
    const menus = Object.keys(state).map((key) => ({
      menu: key,
      status: state[key],
    }));

    if (menus.filter((menu) => menu.status === true).length === 4) {
      const closeMenu = menus.find((i) => i.status === true).menu;
      setState({ ...state, [menu]: !state[menu], [closeMenu]: false });
      return;
    }
    setState({ ...state, [menu]: !state[menu] });
  };

  return (
    <Box
      sx={{
        width: open ? 250 : 50,
        marginTop: 1,
        marginBottom: 1,
        transition: (theme) =>
          theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
      }}
    >
      <DashboardMenuItem />

      <SubMenu
        handleToggle={() => handleToggle("postJobs")}
        isOpen={state.postJobs}
        name="pos.menu.manageJobs"
        icon={<DoneAllOutlinedIcon />}
        dense={dense}
      >
        <MenuItemLink
          to="/postjobs"
          state={{ _scrollToTop: true }}
          primaryText={translate(`resources.postJobs.name`, {
            smart_count: 2,
          })}
          leftIcon={<GradingOutlinedIcon />}
          dense={dense}
        />
        <MenuItemLink
          to="/jobbids"
          state={{ _scrollToTop: true }}
          primaryText={translate(`resources.jobBids.name`, {
            smart_count: 2,
          })}
          leftIcon={<FormatListNumberedOutlinedIcon />}
          dense={dense}
        />
      </SubMenu>
      <SubMenu
        handleToggle={() => handleToggle("operations")}
        isOpen={state.postJobs}
        name="pos.menu.operations"
        icon={<DoneAllOutlinedIcon />}
        dense={dense}
      >
        <MenuItemLink
          to="/messages"
          state={{ _scrollToTop: true }}
          primaryText={translate(`resources.contacts.name`, {
            smart_count: 2,
          })}
          leftIcon={<GradingOutlinedIcon />}
          dense={dense}
        />
        <MenuItemLink
          to="/customapis/campaigns"
          state={{ _scrollToTop: true }}
          primaryText={translate(`resources.campaigns.name`, {
            smart_count: 2,
          })}
          leftIcon={<FormatListNumberedOutlinedIcon />}
          dense={dense}
        />
      </SubMenu>

      <MenuItemLink
        to="/users"
        state={{ _scrollToTop: true }}
        primaryText={translate(`resources.users.name`, {
          smart_count: 2,
        })}
        leftIcon={<PeopleOutlinedIcon />}
        dense={dense}
      />

      <SubMenu
        handleToggle={() => handleToggle("manageFund")}
        isOpen={state.manageFund}
        name="pos.menu.manageFund"
        icon={<AttachMoneyIcon />}
        dense={dense}
      >
        <MenuItemLink
          to="/plutustxs"
          state={{ _scrollToTop: true }}
          primaryText={translate(`resources.plutusTxs.name`, {
            smart_count: 2,
          })}
          leftIcon={<FormatListBulletedIcon />}
          dense={dense}
        />
      </SubMenu>
      <MenuItemLink
        to="/jobtasks"
        state={{ _scrollToTop: true }}
        primaryText={translate(`resources.jobtasks.name`, {
          smart_count: 2,
        })}
        leftIcon={<ListAltOutlinedIcon />}
        dense={dense}
      />

      <SubMenu
        handleToggle={() => handleToggle("reports")}
        isOpen={state.reports}
        name="pos.menu.reports"
        icon={<FileCopyOutlinedIcon />}
        dense={dense}
      >
        <MenuItemLink
          to="/postedjobreport"
          state={{ _scrollToTop: true }}
          primaryText={translate(`resources.postJobReports.name`, {
            smart_count: 2,
          })}
          leftIcon={<NotesIcon />}
          dense={dense}
        />

        <MenuItemLink
          to="/paymentreport"
          state={{ _scrollToTop: true }}
          primaryText={translate(`resources.paymentReport.name`, {
            smart_count: 2,
          })}
          leftIcon={<AttachMoneyIcon />}
          dense={dense}
        />
        <MenuItemLink
          to="/queues"
          state={{ _scrollToTop: true }}
          primaryText={translate(`resources.jobQueues.name`, {
            smart_count: 2,
          })}
          leftIcon={<FormatIndentIncreaseIcon />}
          dense={dense}
        />
      </SubMenu>
      <SubMenu
        handleToggle={() => handleToggle("tools")}
        isOpen={state.tools}
        name="pos.menu.tools"
        icon={<DeselectIcon />}
        dense={dense}
      >
        <MenuItemLink
          to="/fetchCardano"
          state={{ _scrollToTop: true }}
          primaryText={translate(`resources.cardanos.name`, {
            smart_count: 2,
          })}
          leftIcon={<NotesIcon />}
          dense={dense}
        />
        <MenuItemLink
          to="/fetchGithub"
          state={{ _scrollToTop: true }}
          primaryText={translate(`resources.gits.name`, {
            smart_count: 2,
          })}
          leftIcon={<BlurOnIcon />}
          dense={dense}
        />
        <MenuItemLink
          to="/parseAddress"
          state={{ _scrollToTop: true }}
          primaryText={translate(`resources.parseAddress.name`, {
            smart_count: 2,
          })}
          leftIcon={<DriveFileRenameOutlineOutlinedIcon />}
          dense={dense}
        />
      </SubMenu>
      <SubMenu
        handleToggle={() => handleToggle("settings")}
        isOpen={state.settings}
        name="pos.menu.settings"
        icon={<ConstructionIcon />}
        dense={dense}
      >
        <MenuItemLink
          to="/adminWallets"
          state={{ _scrollToTop: true }}
          primaryText={translate(`resources.wallets.name`, {
            smart_count: 2,
          })}
          leftIcon={<FitbitIcon />}
          dense={dense}
        />
        <MenuItemLink
          to="/contracts"
          state={{ _scrollToTop: true }}
          primaryText={translate(`resources.smartContracts.name`, {
            smart_count: 2,
          })}
          leftIcon={<FormatListBulletedIcon />}
          dense={dense}
        />

        <MenuItemLink
          to="/skills"
          state={{ _scrollToTop: true }}
          primaryText={translate(`resources.skills.name`, {
            smart_count: 2,
          })}
          leftIcon={<FormatListBulletedIcon />}
          dense={dense}
        />
        <MenuItemLink
          to="/changePassword"
          state={{ _scrollToTop: true }}
          primaryText={translate(`resources.changePassword.name`, {
            smart_count: 2,
          })}
          leftIcon={<PasswordOutlinedIcon />}
          dense={dense}
        />
        <MenuItemLink
          to="/settings"
          state={{ _scrollToTop: true }}
          primaryText={translate(`resources.appSettings.name`, {
            smart_count: 2,
          })}
          leftIcon={<SettingsOutlinedIcon />}
          dense={dense}
        />
      </SubMenu>
    </Box>
  );
};

export default Menu;
