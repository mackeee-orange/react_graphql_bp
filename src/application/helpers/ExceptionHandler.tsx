import React, { Component } from "react";
import * as Sentry from "@sentry/browser";
import { withRouter, RouteComponentProps } from "react-router";
import { UnAuthorizedError } from "commons/utilities/exceptions";
import routes from "../../commons/constants/routes";

if (process.env.NODE_ENV !== "development") {
  Sentry.init({
    dsn: "https://0930c8cd27ec472ab8c77f0e31f0061e@sentry.io/5176209",
  });
}

type Props = Record<string, unknown> & RouteComponentProps;
type State = {
  error?: Error;
  errorInfo?: React.ErrorInfo;
};

class ExceptionHandler extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      error: undefined,
      errorInfo: undefined,
    };
  }

  handleError: (error: Error) => void = (error: Error) => {
    if (error instanceof UnAuthorizedError) {
      this.props.history.push(routes.signIn());
    }
  };

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    this.setState({ error });
    this.handleError(error);
    // CurrentUserをsentryに送るかどうかは要検討
    if (process.env.NODE_ENV !== "development") {
      Sentry.configureScope((scope) => {
        Object.keys(errorInfo).forEach((key) => {
          scope.setExtra(key, errorInfo);
        });
      });
      Sentry.captureException(error);
    }
  }

  render(): React.ReactNode {
    return <div>{this.props.children}</div>;
  }
}

export default withRouter(ExceptionHandler);
