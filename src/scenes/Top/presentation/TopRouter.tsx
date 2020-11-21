import React, { FC, Fragment } from "react";
import { Route } from "react-router-dom";
import routes from "commons/constants/routes";
import TopPage from "./TopPage";

const TopRouter: FC = () => {
  return (
    <Fragment>
      <Route exact path={routes.top()} component={TopPage} />
    </Fragment>
  );
};

export default TopRouter;
