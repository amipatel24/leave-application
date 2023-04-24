import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { EmployeeCard } from "../Components/EmployeeCard";
import { Failednotify } from "../Helpers/Toasthelper";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router";

export default function LeaveCalendar() {
  const navigate = useNavigate();
  const UserData = useSelector((state) => state?.getUserReducer);

  useEffect(() => {
    if (UserData?.AutherationError?.statusCode) {
      Failednotify("your session is expried");
      setTimeout(() => {
        navigate("/");
        localStorage.clear();
        window.location.reload();
      }, 3000);
    }
  }, [UserData.AutherationError.statusCode]);

  return (
    <div>
      <ToastContainer />
      <EmployeeCard />
    </div>
  );
}
