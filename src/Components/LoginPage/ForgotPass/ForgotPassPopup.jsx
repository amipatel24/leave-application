import React, { useState } from "react";
import "./index.css";
import { ResetPassWord } from "../../../Store/Action/ResetPassAction/index";
import { useDispatch } from "react-redux";

export default function ForgotPassPopup() {
  const dispatch = useDispatch();
  const [values, setvalues] = useState();
  console.log("values", values);

  const handleChange = (e) => {
    setvalues({ ...values, [e.target.name]: e.target.value });
  };
  const handleResetpass = () => {
    dispatch(ResetPassWord(values));
  };
  return (
    <>
      <div className="FogotPasswrapper">
        <p>Reset Password</p>{" "}
        <div className="FogotPassPopUp">
          <div className="input">
            <label>Enter Your Email id</label>
            <br />
            <input type="text" name="email" onChange={handleChange} />
          </div>
          <div className="input">
            <label>Existing Password</label>
            <br />
            <input type="password" name="oldPassword" onChange={handleChange} />
          </div>
          <div className="input">
            <label>New Password</label>
            <br />
            <input type="password" name="newPassword" onChange={handleChange} />
          </div>
          <div className="submitbtn">
            <button onClick={handleResetpass}>Reset Password</button>
          </div>
        </div>
      </div>
    </>
  );
}
