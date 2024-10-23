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
import QrCodeOutlinedIcon from "@mui/icons-material/QrCodeOutlined";
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
import DoneAllIcon from "@mui/icons-material/DoneAll";

type MenuName =
  | "smartContracts"
  | "manageFund"
  | "reports"
  | "settings"
  | "tools";

const Menu = ({ dense = false }: MenuProps) => {
  const [state, setState] = useState({
    smartContracts: true,
    manageFund: true,
    reports: true,
    settings: true,
    tools: true,
  });
  const translate = useTranslate();
  const [open] = useSidebarState();

  const handleToggle = (menu: MenuName) => {
    setState((state) => ({ ...state, [menu]: !state[menu] }));
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
        handleToggle={() => handleToggle("smartContracts")}
        isOpen={state.smartContracts}
        name="pos.menu.smartContracts"
        icon={<DoneAllOutlinedIcon />}
        dense={dense}
      >
        <MenuItemLink
          to="/contracts"
          state={{ _scrollToTop: true }}
          primaryText={translate(`resources.smartContracts.name`, {
            smart_count: 2,
          })}
          leftIcon={<GradingOutlinedIcon />}
          dense={dense}
        />
      </SubMenu>

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
          primaryText={translate(`resources.plutustxs.name`, {
            smart_count: 2,
          })}
          leftIcon={<QrCodeOutlinedIcon />}
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
        handleToggle={() => handleToggle("reports")}
        isOpen={state.reports}
        name="pos.menu.reports"
        icon={<FileCopyOutlinedIcon />}
        dense={dense}
      >
        <MenuItemLink
          to="/scontractreports"
          state={{ _scrollToTop: true }}
          primaryText={translate(`resources.postJobReports.name`, {
            smart_count: 2,
          })}
          leftIcon={<NotesIcon />}
          dense={dense}
        />

        <MenuItemLink
          to="/apicallreports"
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
        <MenuItemLink
          to="/audittxs"
          state={{ _scrollToTop: true }}
          primaryText={translate(`resources.auditTxs.name`, {
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
          to="/auditcontract"
          state={{ _scrollToTop: true }}
          primaryText={translate(`resources.verifySmartContract.name`, {
            smart_count: 2,
          })}
          leftIcon={<DoneAllIcon />}
          dense={dense}
        />

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
        handleToggle={() => handleToggle("tools")}
        isOpen={state.tools}
        name="pos.menu.settings"
        icon={<ConstructionIcon />}
        dense={dense}
      >
        <MenuItemLink
          to="/news"
          state={{ _scrollToTop: true }}
          primaryText="News"
          leftIcon={<FormatListNumberedOutlinedIcon />}
          dense={dense}
        />

        <MenuItemLink
          to="/changePassword"
          state={{ _scrollToTop: true }}
          primaryText={translate(`resources.changePassword.name`, {
            smart_count: 2,
          })}
          leftIcon={<PeopleOutlinedIcon />}
          dense={dense}
        />
      </SubMenu>
    </Box>
  );
};

export default Menu;
