import React, { FC } from "react";
import { useAuth } from "../../hooks/useAuth";
import { Redirect, Route, useHistory } from "react-router-dom";
import { RouteComponentProps } from "react-router";

interface IProtectedRuteProps {
  path?: string | undefined;
  children?: React.ReactNode;
  component?:
    | React.ComponentType<RouteComponentProps<any>>
    | React.ComponentType<any>
    | undefined;
}

const ProtectedRoute: FC<IProtectedRuteProps> = ({
  component: Component,
  children,
  ...rest
}) => {
  const { currentUser } = useAuth();
  const history = useHistory();
  return (
    <Route
      {...rest}
      render={(props) => {
        if (currentUser === undefined) {
          return (
            <Redirect
              to={{ pathname: "/login", state: { from: history.location } }}
            />
          );
        }
        return Component !== undefined ? <Component {...props} /> : children;
      }}
    />
  );
};

export default ProtectedRoute;
