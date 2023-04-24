import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { ApplyLeave } from "../../Store/Action/ApplyLeaveAction";
import { CancelLeave } from "../../Store/Action/CancelLeaveAction";
import { UpdateLeaveStatus } from "../../Store/Action/UpdateLeaveStatusAction";
import { Sucessnotify, Failednotify } from "../../Helpers/Toasthelper";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import "./index.css";

export default function LeaveForm(props) {
  const {
    startDate,
    endDate,
    setModel,
    Model,
    reason,
    userID,
    leave_id,
    reporting_person,
    token,
    Login_user_id,
  } = props;
  const dispatch = useDispatch();
  const [leavereason, setLeaveReason] = useState(null);
  const [error, setError] = useState(null);
  let button1 = Model === "reportingperson" ? "Approved" : "Apply";
  let button2 = Model === "reportingperson" ? "Rejected" : "cancel";

  useEffect(() => {
    function handleEscapeKey(event) {
      if (event.code === "Escape") {
        setModel(false);
      }
    }
    document.addEventListener("keydown", handleEscapeKey);
    return () => document.removeEventListener("keydown", handleEscapeKey);
  }, [setModel]);

  const Handlereason = (e) => {
    setLeaveReason(e.target.value);
  };

  const HandleCancelLeave = () => {
    if (leave_id) { 
      dispatch(CancelLeave(leave_id, token));
      window.location.reload();
    }
    // Sucessnotify("Sucessfully Cancel leave");
  };
  const handleApply = () => {
    if (leavereason === null || leavereason === "") {
      setError("Please Apply The leave Reason ");
    }
    const ApplyleaveData = {
      start_date: startDate,
      end_date: endDate,
      reason: leavereason,
      user_id: userID,
    };
    if (leavereason) {
      setError(null);
      dispatch(ApplyLeave(ApplyleaveData, token));
      Sucessnotify("Leave Apply Sucessfully");
      setTimeout(() => {
        setModel(false);
        window.location.reload();
      }, 3000);
    }
  };

  const handleApproved = () => {
    const Approvedleave = {
      user_id: userID,
      leave_id: leave_id,
      reporting_person: reporting_person,
      status: 2,
    };
    dispatch(UpdateLeaveStatus(Approvedleave, token));
    Sucessnotify("Approved!");
    setTimeout(() => {
      setModel(false);
      window.location.reload();
    }, 3000);
  };
  const CloseButton = () => {
    setModel(false);
  };
  const RejectedLeave = () => {
    const Rejectedleave = {
      user_id: userID,
      leave_id: leave_id,
      reporting_person: reporting_person,
      status: 3,
    };
    dispatch(UpdateLeaveStatus(Rejectedleave, token));
    Failednotify("Rejected leave");
    setTimeout(() => {
      setModel(false);
      window.location.reload();
    }, 3000);
  };
  return (
    <>
      {" "}
      <ToastContainer />
      <div className="maindiv" onClick={() => setModel(false)} />
      <div className="model">
        <div className="LeaveModel">
          <h5>Apply For Leave</h5>
          <button className="closeBtn" onClick={() => setModel(false)}>
            x
          </button>
          <div className="modalContent">
            <div>
              <b>
                {" "}
                <p style={{ margin: 0 }}>Start-Date</p>
              </b>
              {startDate}
            </div>
            <div>
              <b>
                {" "}
                <p style={{ margin: 0 }}>End-Date</p>
              </b>
              {endDate}
            </div>
          </div>
          <div className="TeaxArea">
            <b>
              {" "}
              <p style={{ margin: 0 }} htmlFor="">
                Reason
              </p>
            </b>
            <textarea
              name=""
              placeholder="Enter Reason"
              disabled={reason ? true : ""}
              defaultValue={reason}
              onChange={Handlereason}
            ></textarea>
            {error && (
              <p style={{ fontWeight: "600", color: "red" }}>{error}</p>
            )}
          </div>
          <div className="modalActions">
            <div className="actionsContainer">
              {Model === "user" || Model === "reportingperson" ? (
                <>
                  {userID === Login_user_id ||
                  Login_user_id === reporting_person ? (
                    <>
                      {" "}
                      <button
                        className="Submitbtn"
                        onClick={
                          Model === "reportingperson"
                            ? handleApproved
                            : handleApply
                        }
                      >
                        {button1}
                      </button>
                      <button
                        className="rejectedbtn"
                        onClick={
                          Model === "reportingperson"
                            ? RejectedLeave
                            : () => setModel(false)
                        }
                      >
                        {button2}
                      </button>
                    </>
                  ) : (
                    <button className="cancelBtn" onClick={() => CloseButton()}>
                      Close
                    </button>
                  )}
                </>
              ) : (
                <>
                  {userID === Login_user_id ||
                  Login_user_id === reporting_person ? (
                    <>
                      <button
                        className="cancelBtn"
                        onClick={() => CloseButton()}
                      >
                        Close
                      </button>
                      <button className="cancelBtn" onClick={HandleCancelLeave}>
                        CancelLeave
                      </button>
                    </>
                  ) : (
                    <button className="cancelBtn" onClick={() => CloseButton()}>
                      Close
                    </button>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
