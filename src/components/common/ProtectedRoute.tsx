import React, { FC } from "react";
import { useAuth } from "../../hooks/useAuth";
import { Redirect, Route } from "react-router-dom";
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
  return (
    <Route
      {...rest}
      render={(props) => {
        if (currentUser === undefined) {
          return <Redirect to={"/login"} />;
        }
        return Component !== undefined ? <Component {...props} /> : children;
      }}
    />
  );
};

export default ProtectedRoute;
