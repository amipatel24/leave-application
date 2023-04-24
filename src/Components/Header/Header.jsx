import React, { useEffect } from "react";
import "./Header.css";
import { LogOut, LeaveUserIcon, UserIcon } from "../../Images/Index";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";

export default function Header() {
  let Login_data = JSON.parse(localStorage.getItem("LoginData") || null);
  const successLoginData = useSelector((state) => state?.UserLoginReducer);

  let token = Login_data?.accessToken;

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    token = Login_data?.accessToken;
  }, [successLoginData]);

  const navigate = useNavigate();

  const handleLogout = () => {
    alert("logout successfully");
    navigate("/");
    localStorage.clear();
    window.location.reload();
  };
  return (
    <div>
      <div className="Header-Wrapper">
        <div className="Header-Text">
          <p>Apply Leave</p>
        </div>
        {token ? (
          <div className="User-logout">
            <div className="User-img">
              <img src={UserIcon} alt="UserIcon" width={33} height={30} />
            </div>
            <div className="log-out">
              <img
                src={LogOut}
                alt="Logout"
                width={30}
                height={30}
                onClick={handleLogout}
              />
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
