import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import UserList from "../Components/Admin/UserList/UserList";
import { Failednotify } from "../Helpers/Toasthelper";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AdminPage() {
  const navigate = useNavigate();
  const Userlist = useSelector((state) => state?.AdminUserListReducer);

  useEffect(() => {
    if (Userlist?.AutherationError?.statusCode) {
      Failednotify("your session is expried");
      setTimeout(() => {
        navigate("/");
        localStorage.clear();
        window.location.reload();
      }, 3000);
    }
  }, [Userlist?.AutherationError?.statusCode]);
  return (
    <div>
      <ToastContainer />
      <UserList Userlist={Userlist} />
    </div>
  );
}
