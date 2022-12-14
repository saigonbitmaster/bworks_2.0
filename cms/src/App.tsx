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
import postjobs from "./postjobs";
import jobbids from "./jobbids";
import FetchGithub from "./tools/fetchGithub";
import FetchCardano from "./tools/fetchCardano";
import queues from './queues';
import contracts from './contracts'
const loginUrl = process.env.REACT_APP_LOGIN_URL;
const apiUrl = process.env.REACT_APP_API_URL;

const token = localStorage.getItem("access_token");
const restProvider = dataProvider(apiUrl, token);
const i18nProvider = polyglotI18nProvider((locale) => {
  if (locale === "fr") {
    return import("./i18n/fr").then((messages) => messages.default);
  }
  // Always fallback on english
  return englishMessages;
}, "en");

const _authProvider = authProvider(loginUrl);
const App = () => {
  return (
    <Admin
      title="bWorks"
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
      </CustomRoutes>
      <Resource name="postjobs" {...postjobs} />
      <Resource name="contracts" {...contracts} />
      <Resource name="jobbids" {...jobbids} />
      <Resource name="queues" {...queues} />
    </Admin>
  );
};

export default App;
