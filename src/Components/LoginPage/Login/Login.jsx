/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import { userLogin } from "../../../Store/Action/AuthAction/index";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { Sucessnotify, Failednotify } from "../../../Helpers/Toasthelper";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState(null);
  const [password, setpassWord] = useState(null);
  const successLoginData = useSelector((state) => state?.UserLoginReducer);
  const LoginInfo = {
    email: email,
    password: password,
  };
  const handleSubmit = () => {
    dispatch(userLogin(LoginInfo));
  };

  const handleForgotpass = () => {
    navigate("/forgotpass");
  };

  useEffect(() => {
    if (
      email === successLoginData?.LoginData?.email &&
      successLoginData?.LoginData?.statusCode === "200" &&
      successLoginData?.LoginData?.role_id === 2
    ) {
      Sucessnotify("Login Sucessfully");
      setTimeout(() => {
        navigate("/leaveapplication");
      }, 3000);
      if (successLoginData?.LoginData?.accessToken) {
        localStorage.setItem(
          "LoginData",
          JSON.stringify(successLoginData?.LoginData)
        );
      }
    }
    if (
      email === successLoginData?.LoginData?.email &&
      successLoginData?.LoginData?.statusCode === "200" &&
      successLoginData?.LoginData?.role_id === 1
    ) {
      Sucessnotify("Login Sucessfully");
      setTimeout(() => {
        navigate("/adminpage");
      }, 3000);
      if (successLoginData?.LoginData?.accessToken) {
        localStorage.setItem(
          "LoginData",
          JSON.stringify(successLoginData?.LoginData)
        );
      }
    }
    if (successLoginData?.FailedLoginData?.statusCode === "401") {
      Failednotify(successLoginData?.FailedLoginData?.message);
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    }
  }, [email, navigate, successLoginData]);

  return (
    <div className="bg-image">
      <ToastContainer />

      <div className="logingpage">
        <p className="login-text">Login</p>
        <div className="loginform">
          <label htmlFor="">
            <h6>Email:</h6>{" "}
          </label>

          <input
            type="text"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <label htmlFor="">
              <h6>Password:</h6>{" "}
            </label>
            <a
              style={{
                color: "#574CA3",
                fontWeight: "bold",
                textDecoration: "underline",
                cursor: "pointer",
              }}
              onClick={handleForgotpass}
            >
              Forgot Password?
            </a>
          </div>
          <input
            type="password"
            id="pass"
            onChange={(e) => setpassWord(e.target.value)}
          />
          <div className="checkbox">
            <input type="checkbox" id="Remember" />
            <label htmlFor="Remember">Remember Me</label>
          </div>
          <div className="actionsContainer">
            <button className="Submitbtn" onClick={handleSubmit}>
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
