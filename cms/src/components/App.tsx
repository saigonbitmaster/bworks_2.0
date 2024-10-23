import * as React from "react";
import { Admin, CustomRoutes, Resource, fetchUtils } from "react-admin";
import polyglotI18nProvider from "ra-i18n-polyglot";
import { Route } from "react-router";
import { authProvider } from "ra-nest-rest";
import { Login, Layout } from "./layout";
import { Dashboard } from "./dashboard";
import englishMessages from "./i18n/en";
import { lightTheme } from "./layout/themes";
import Configuration from "./configuration/Configuration";
import dataProvider from "ra-nest-rest";
import FetchGithub from "./tools/fetchGithub";
import FetchCardano from "./tools/fetchCardano";
import queues from "./queues";
import plutustxs from "./plutustx";
import adminWallets from "./wallet/";
import { MeshProvider } from "@meshsdk/react";
import ParseAddress from "./tools/parseAddress";
import ChangePassword from "./components/changePassword";
import plutustscripts from "./contracts";
import AuditContract from "./auditcontract/functionAudit";
import Typography from "@mui/material/Typography";
import users from "./users";
import audittxs from "./audittx";
import news from "./news";

import { ContractReports } from "./contractreports";
import { ApiCallReports } from "./dapptxreports";

const loginUrl = process.env.NEXT_PUBLIC_LOGIN_URL;
const apiUrl = process.env.NEXT_PUBLIC_API_URL;
const renewTokenUrl = process.env.NEXT_PUBLIC_RENEW_ACCESS_TOKEN_URL;
const logoutUrl = process.env.NEXT_PUBLIC_LOGOUT_URL;
const walletLoginUrl = process.env.NEXT_PUBLIC_WALLET_LOGIN_URL;

const _authProvider = authProvider(
  loginUrl,
  renewTokenUrl,
  logoutUrl,
  walletLoginUrl
);
const restProvider = dataProvider(apiUrl);

const i18nProvider = polyglotI18nProvider((locale) => {
  if (locale === "fr") {
    return import("./i18n/fr").then((messages) => messages.default);
  }
  // Always fallback on english
  return englishMessages;
}, "en");


const App = () => {
  return (
    <MeshProvider>
      <Admin
        title="paas"
        dataProvider={restProvider}
        authProvider={_authProvider}
        dashboard={Dashboard}
        loginPage={Login}
        layout={Layout}
        i18nProvider={i18nProvider}
        disableTelemetry
        theme={lightTheme}
      >
        <CustomRoutes>
          <Route path="/configuration" element={<Configuration />} />
          <Route path="/fetchCardano" element={<FetchCardano />} />
          <Route path="/fetchGithub" element={<FetchGithub />} />
          <Route path="/parseaddress" element={<ParseAddress />} />
          <Route path="/changepassword" element={<ChangePassword />} />
          <Route path="/auditContract" element={<AuditContract />} />
          <Route path="/scontractreports" element={<ContractReports />} />
          <Route path="/apicallreports" element={<ApiCallReports />} />
        </CustomRoutes>
        <Resource name="contracts" {...plutustscripts} />
        <Resource name="users" {...users} />
        <Resource name="plutustxs" {...plutustxs} />
        <Resource name="audittxs" {...audittxs} />
        <Resource name="queues" {...queues} />
        <Resource name="adminWallets" {...adminWallets} />
        <Resource name="news" {...news} />
      </Admin>
      <Typography
        variant="subtitle2"
        align="left"
        color="orange"
        sx={{ position: "fixed", right: 0, bottom: 10, left: 10, zIndex: 100 }}
      >
        @ {new Date().getFullYear()} Built on Cardano <br />
      </Typography>
    </MeshProvider>
  );
};

export default App;
