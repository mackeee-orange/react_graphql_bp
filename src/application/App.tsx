import React, { FC, Fragment } from "react";
import { ApolloProvider } from "@apollo/client";
import IndexRouter from "application/IndexRouter";
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
    <ApolloProvider client={client}>
      <AppContent />
    </ApolloProvider>
  </BrowserRouter>
);

export default App;
