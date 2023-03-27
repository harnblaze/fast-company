import React, { FC } from "react";
import { Redirect, Route, useHistory } from "react-router-dom";
import { RouteComponentProps } from "react-router";
import { useAppSelector } from "../../store/hooks";
import { getIsLoggedIn } from "../../store/users";

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
  const isLoggedIn = useAppSelector(getIsLoggedIn());
  const history = useHistory();
  return (
    <Route
      {...rest}
      render={(props) => {
        if (!isLoggedIn) {
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
