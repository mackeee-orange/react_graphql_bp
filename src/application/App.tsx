import React, { FC, Fragment } from "react";
import { ApolloProvider } from "@apollo/react-hooks";
import ExceptionHandler from "./helpers/ExceptionHandler";
import IndexRouter from "application/IndexRouter";
import GlobalContextProvider from "data/utilities/GlobalContextProvider";
import client from "data/utilities/graphQLClient";
import { BrowserRouter } from "react-router-dom";

const AppContent: FC = () => {
  return (
    <Fragment>
      <IndexRouter />
    </Fragment>
  );
};

const App: FC = () => (
  <BrowserRouter>
    <ExceptionHandler>
      <GlobalContextProvider>
        <ApolloProvider client={client}>
          <AppContent />
        </ApolloProvider>
      </GlobalContextProvider>
    </ExceptionHandler>
  </BrowserRouter>
);

export default App;
