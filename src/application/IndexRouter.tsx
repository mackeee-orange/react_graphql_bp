import React, { FC, Fragment, useEffect, useState } from "react";
import { Route, useLocation } from "react-router-dom";

import { ScrollToTop } from "./helpers/ScrollToTopOnMount";
import AuthScene from "scenes/Auth";
import RegistrationScene from "../scenes/Registration";
import DashboardScene from "scenes/Dashboard";
import FavoriteScene from "scenes/Favorite";
import PortfolioScene from "scenes/Portfolio";
import ServiceScene from "scenes/Service";
import SettingScene from "scenes/Setting";
import ToDoScene from "scenes/ToDo";
import TopScene from "scenes/Top";
import RoadmapScene from "scenes/Roadmap";
import BoilerplateScene from "scenes/Boilerplate";
import NoteScene from "scenes/Note";
import FeatureHubScene from "scenes/FeatureHub";
import RankingScene from "scenes/Ranking";
import CodeReviewScene from "scenes/CodeReview";
import SpScene from "scenes/Sp";
import ProjectScene from "scenes/Project";
import OrganizationScene from "../scenes/Organization";
import TaskScene from "scenes/Task";
import NotFoundPage from "../components/pages/NotFoundPage";
import routes from "../commons/constants/routes";

function getAllPath(obj: DictionaryLike): string[] {
  let res: string[] = [];
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      if (typeof obj[key] === "object") {
        res = [...res, ...getAllPath(obj[key] as DictionaryLike)];
      } else if (typeof obj[key] === "function") {
        res = [...res, `^${(obj[key] as (some?: string) => string)("[0-9a-zA-Z-_=]*")}$`];
      } else if (typeof obj[key] === "string") {
        res = [...res, `^${obj[key] as string}$`];
      }
    }
  }
  return res;
}
const allPath = getAllPath(routes);
function matchRoute(path: string): boolean {
  return allPath.some((rPath) => {
    const reg = new RegExp(rPath);
    return reg.test(path);
  });
}
const IndexRouter: FC = () => {
  const [match, setMatch] = useState(true);
  const { pathname } = useLocation();
  useEffect(() => {
    setMatch(matchRoute(pathname));
  }, [setMatch, pathname]);

  return (
    <Fragment>
      <ScrollToTop />

      <TopScene />

      {/* 認証系 */}
      <AuthScene />
      <RegistrationScene />

      {/* アプリケーションンリソース */}
      <OrganizationScene />
      <DashboardScene />
      <RankingScene />
      <FeatureHubScene />

      {/* マイリソース */}
      <ServiceScene />
      <ToDoScene />
      <PortfolioScene />
      <FavoriteScene />
      <CodeReviewScene />
      <NoteScene />
      <RoadmapScene />
      <BoilerplateScene />
      <SettingScene />
      <ProjectScene />
      <TaskScene />

      {/* utils */}
      <SpScene />

      <Route path="*">
        <div>{!match && <NotFoundPage />}</div>
      </Route>
    </Fragment>
  );
};

export default IndexRouter;
