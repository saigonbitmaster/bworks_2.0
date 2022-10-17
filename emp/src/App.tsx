import * as React from "react";
import { Admin, CustomRoutes, Resource, fetchUtils } from "react-admin";
import polyglotI18nProvider from "ra-i18n-polyglot";
import { Route } from "react-router";

import { authProvider } from "ra-nest-rest";
import { Login, Layout } from "./layout";
import { Dashboard } from "./dashboard";
import englishMessages from "./i18n/en";
import { lightTheme } from "./layout/themes";

import members from "./members";
import Configuration from "./configuration/Configuration";
import Segments from "./segments/Segments";
import quizSets from "./quizSets";
import quizzes from "./quizzes";
import dataProvider from "ra-nest-rest";
import payouts from "./payout";
import proposers from "./proposer";
import postjobs from "./postjobs";
import jobbids from "./jobbids";
import FetchGithub from "./tools/fetchGithub";
import FetchCardano from "./tools/fetchCardano";
import ImportExcels from "./tools/importExcels";
import proposals from "./proposal";

const loginUrl = "http://localhost:3000/auth/login";
const apiUrl = "http://localhost:3000";

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
      title="cReport"
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
        <Route path="/importExcels" element={<Segments />} />
      </CustomRoutes>
      <Resource name="members" {...members} />
      <Resource name="proposers" {...proposers} />
      <Resource name="postjobs" {...postjobs} />
      <Resource name="jobbids" {...jobbids} />
      <Resource name="proposals" {...proposals} />
      <Resource name="quizSets" {...quizSets} />
      <Resource name="quizzes" {...quizzes} />
      <Resource name="payouts" {...payouts} />
    </Admin>
  );
};

export default App;
