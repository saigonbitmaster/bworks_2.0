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
import {
  useTranslate,
  DashboardMenuItem,
  MenuItemLink,
  MenuProps,
  useSidebarState,
} from "react-admin";

import SubMenu from "./SubMenu";

type MenuName = "postJobs" | "manageFund" | "reports" | "settings" | "tools";

const Menu = ({ dense = false }: MenuProps) => {
  const [state, setState] = useState({
    postJobs: true,
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
        width: open ? 200 : 50,
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
        name="pos.menu.postJobs"
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
        <MenuItemLink
          to="/contractedjobs"
          state={{ _scrollToTop: true }}
          primaryText={translate(`resources.contractedJobs.name`, {
            smart_count: 2,
          })}
          leftIcon={<QrCodeOutlinedIcon />}
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
          to="/wallets"
          state={{ _scrollToTop: true }}
          primaryText={translate(`resources.wallets.name`, {
            smart_count: 2,
          })}
          leftIcon={<FitbitIcon />}
          dense={dense}
        />
        <MenuItemLink
          to="/withdraws"
          state={{ _scrollToTop: true }}
          primaryText={translate(`resources.withdraws.name`, {
            smart_count: 2,
          })}
          leftIcon={<FormatListBulletedIcon />}
          dense={dense}
        />
        <MenuItemLink
          to="/smartcontract"
          state={{ _scrollToTop: true }}
          primaryText={translate(`resources.smartContracts.name`, {
            smart_count: 2,
          })}
          leftIcon={<FormatListBulletedIcon />}
          dense={dense}
        />
      </SubMenu>
      <SubMenu
        handleToggle={() => handleToggle("reports")}
        isOpen={state.reports}
        name="pos.menu.reports"
        icon={<FileCopyOutlinedIcon />}
        dense={dense}
      >
        <MenuItemLink
          to="/jobreports"
          state={{ _scrollToTop: true }}
          primaryText={translate(`resources.postJobReports.name`, {
            smart_count: 2,
          })}
          leftIcon={<NotesIcon />}
          dense={dense}
        />
        <MenuItemLink
          to="/walletreports"
          state={{ _scrollToTop: true }}
          primaryText={translate(`resources.walletReports.name`, {
            smart_count: 2,
          })}
          leftIcon={<BlurOnIcon />}
          dense={dense}
        />
        <MenuItemLink
          to="/contractreports"
          state={{ _scrollToTop: true }}
          primaryText={translate(`resources.smartContractReports.name`, {
            smart_count: 2,
          })}
          leftIcon={<AttachMoneyIcon />}
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
      </SubMenu>
      <MenuItemLink
        to="/settings"
        state={{ _scrollToTop: true }}
        primaryText={translate(`resources.settings.name`, {
          smart_count: 2,
        })}
        leftIcon={<ConstructionIcon />}
        dense={dense}
      />
    </Box>
  );
};

export default Menu;
