import React, { useEffect, useState } from "react";
import "./index.css";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import "react-calendar/dist/Calendar.css";
import moment, { ISO_8601 } from "moment/moment";
import { enumerateDaysBetweenDates } from "../../Helpers/misc";
import LeaveForm from "../LeaveForm/LeaveForm";
import { convert } from "../../Helpers/misc";

export default function LeaveDateBox(props) {
  const { userdata, Login_user_id, token } = props;
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [Model, setModel] = useState();
  const [activeLeaves, setActiveLeaves] = useState([]);
  const [approvedLeave, setApprovedLeave] = useState([]);
  const [rejected, setRejected] = useState([]);
  const [reportingperson, setReportingperson] = useState([]);
  const [excludeDays, setExcludeDays] = useState([]);
  const [test, setTest] = useState([]);

  const onChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  useEffect(() => {
    const excludedaysed = activeLeaves?.dates?.map((date) => {
      return moment(date, "DD-MM-YYYY")["_d"];
    });
    setExcludeDays(excludedaysed);
  }, [activeLeaves]);

  useEffect(() => {
    if (startDate) {
      if (approvedLeave?.dates?.includes(convert(startDate))) {
        if (approvedLeave?.ApprovedLeaveIdWise?.length > 0) {
          approvedLeave.ApprovedLeaveIdWise.map((tdata) => {
            if (tdata) {
              if (tdata.date.includes(convert(startDate))) {
                setTest({
                  date: tdata.date,
                  reason: tdata.reason,
                  reporting_person: tdata.reporting_person,
                  leave_id: tdata.leave_id,
                });
                setModel("approvedLeave");
                window.scroll(0, 0);
              }
            }
            return null;
          });
        }
      } else if (rejected?.dates?.includes(convert(startDate))) {
        if (rejected.RejectedleaveIdWise.length > 0) {
          rejected.RejectedleaveIdWise.map((tdata) => {
            if (tdata) {
              if (tdata.date.includes(convert(startDate))) {
                setTest({
                  date: tdata.date,
                  reason: tdata.reason,
                  reporting_person: tdata.reporting_person,
                  leave_id: tdata.leave_id,
                });
                setModel("RejectedLeave");
                window.scroll(0, 0);
              }
            }
            return null;
          });
        }
      } else if (reportingperson?.dates?.includes(convert(startDate))) {
        if (reportingperson.ReportingIdWiseLeave.length > 0) {
          reportingperson.ReportingIdWiseLeave.map((tdata) => {
            if (tdata) {
              if (tdata.date.includes(convert(startDate))) {
                setTest({
                  date: tdata.date,
                  reason: tdata.reason,
                  reporting_person: tdata.reporting_person,
                  leave_id: tdata.leave_id,
                });
                setModel("reportingperson");
                window.scroll(0, 0);
              }
            }
            return null;
          });
        }
      } else if (activeLeaves?.dates?.includes(convert(startDate))) {
        if (activeLeaves.ActiveLeaveIdWise.length > 0) {
          activeLeaves.ActiveLeaveIdWise.map((tdata) => {
            if (tdata) {
              if (tdata.date.includes(convert(startDate))) {
                setTest({
                  date: tdata.date,
                  reason: tdata.reason,
                  leave_id: tdata.leave_id,
                  reporting_person: tdata.reporting_person,
                });
                setModel("ActiveLeave");
                window.scroll(0, 0);
              }
            }
            return null;
          });
        }
      } else if (startDate && endDate) {
        setTest([]);
        setModel("user");
        window.scroll(0, 0);
      }
    }
  }, [
    startDate,
    endDate,
    approvedLeave?.dates,
    approvedLeave.ApprovedLeaveIdWise,
    rejected?.dates,
    rejected.RejectedleaveIdWise,
    reportingperson?.dates,
    reportingperson.ReportingIdWiseLeave,
    activeLeaves?.dates,
    activeLeaves.ActiveLeaveIdWise,
  ]);

  // eslint-disable-next-line no-extend-native
  Array.prototype.getUnique = function () {
    var o = {},
      a = [];
    for (var i = 0; i < this.length; i++) o[this[i]] = 1;
    for (var e in o) a.push(e);
    return a;
  };

  useEffect(() => {
    if (userdata.leaves.length > 0) {
      let dates = [];
      userdata.leaves.map((data, index) => {
        if (data.start_date && data.end_date) {
          const daterange1 = enumerateDaysBetweenDates(
            moment(moment(data.start_date).format("DD-MM-YYYY"), "DD-MM-YYYY"),
            moment(moment(data.end_date).format("DD-MM-YYYY"), "DD-MM-YYYY")
          );
          dates.push({
            date: daterange1,
            status: data.status,
            reason: data.reason,
            reporting_person: userdata.reporting_person,
            leave_id: data.leave_id,
            user_id: userdata.id,
          });
        }
        return null;
      });
      const status1 = dates.filter((Fdata) => Fdata.status === 1);
      const status2 = dates.filter((Fdata) => Fdata.status === 2);
      const status3 = dates.filter((Fdata) => Fdata.status === 3);
      const TL = dates.filter(
        (Fdata) =>
          Fdata.reporting_person === Login_user_id && Fdata.status === 1
      );
      if (TL) {
        setReportingperson({
          dates: [].concat
            .apply(
              [],
              TL.map((data) => data.date)
            )
            .getUnique(),
          ReportingIdWiseLeave: TL,
        });
      }

      if (status1) {
        setActiveLeaves({
          dates: [].concat
            .apply(
              [],
              status1.map((data) => data.date)
            )
            .getUnique(),
          ActiveLeaveIdWise: status1,
        });
      }
      if (status2) {
        setApprovedLeave({
          dates: [].concat
            .apply(
              [],
              status2.map((data) => data.date)
            )
            .getUnique(),
          ApprovedLeaveIdWise: status2,
        });
      }
      if (status3) {
        setRejected({
          dates: [].concat
            .apply(
              [],
              status3.map((data) => data.date)
            )
            .getUnique(),
          RejectedleaveIdWise: status3,
        });
      }
    }
  }, [Login_user_id, userdata]);

  return (
    <div className="Date-picker">
      {Model ? (
        <LeaveForm
          startDate={
            test?.date?.length > 0 && test.date?.includes(convert(startDate))
              ? test.date[0]
              : convert(startDate)
          }
          endDate={
            test?.date?.length > 0 && test.date?.includes(convert(startDate))
              ? test.date[test.date.length - 1]
              : convert(endDate)
          }
          reason={
            test?.date?.length > 0 && test.date.includes(convert(startDate))
              ? test.reason
              : ""
          }
          setModel={setModel}
          Model={Model}
          userID={userdata.id}
          Login_user_id={Login_user_id}
          leave_id={
            test?.date?.length > 0 && test.date.includes(convert(startDate))
              ? test?.leave_id
              : ""
          }
          reporting_person={
            test?.date?.length > 0 && test.date.includes(convert(startDate))
              ? test?.reporting_person
              : ""
          }
          token={token}
        />
      ) : (
        ""
      )}
      <DatePicker
        selected={startDate}
        onChange={onChange}
        startDate={startDate}
        endDate={endDate}
        selectsRange
        selectsDisabledDaysInRange
        inline
        // excludeDates={excludeDays}
        dayClassName={(date) => {
          if (
            reportingperson &&
            reportingperson?.dates?.includes(
              moment(date, ISO_8601).format("DD-MM-YYYY")
            )
          ) {
            return "Blue";
          }
          if (
            activeLeaves &&
            activeLeaves?.dates?.includes(
              moment(date, ISO_8601).format("DD-MM-YYYY")
            )
          ) {
            return "isLeaveApplied";
          }
          if (
            approvedLeave &&
            approvedLeave?.dates?.includes(
              moment(date, ISO_8601).format("DD-MM-YYYY")
            )
          ) {
            return "ApprovedLeave";
          }
          if (
            rejected &&
            rejected?.dates?.includes(
              moment(date, ISO_8601).format("DD-MM-YYYY")
            )
          ) {
            return "Rejected";
          }
        }}
      />
    </div>
  );
}
