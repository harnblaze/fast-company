import React, { FC, useState } from "react";
import LoginForm from "../components/ui/LoginForm";
import { useParams } from "react-router-dom";
import RegisterForm from "../components/ui/RegisterForm";

const Login: FC = () => {
  const type = useParams();
  const [formType, setFormType] = useState<string>(
    type === "register" ? type : "login"
  );

  const toggleFormType = (): void => {
    setFormType((prevState) =>
      prevState === "register" ? "login" : "register"
    );
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-lg-6  col-md-6 col-sm-10 mx-auto p-4 shadow">
          {formType === "register" ? (
            <>
              <h3 className="mb-4">Register</h3>
              <RegisterForm />
              <p className="mt-2 mx-auto">
                Already have account?&nbsp;
                <a role="button" onClick={toggleFormType}>
                  Sign In
                </a>
              </p>
            </>
          ) : (
            <>
              <h3 className="mb-4">Login</h3>
              <LoginForm />
              <p className="mt-2 mx-auto">
                Don&apos;t have account?&nbsp;
                <a role="button" onClick={toggleFormType}>
                  Sign Up
                </a>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
