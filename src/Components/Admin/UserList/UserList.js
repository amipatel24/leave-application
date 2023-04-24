import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AdminUserList } from "../../../Store/Action/AdminUserList/index";
import EditForm from "../Form/Form";
import LeftnavigationBar from "../LeftnavigationBar/LeftnavigationBar";
import "./index.css";

export default function UserList(props) {
  const { Userlist } = props;
  const dispatch = useDispatch();
  const [editmodel, setEditmodel] = useState(false);
  const [addusermodel, setAddUsermodel] = useState(false);
  const [leftnavigation, setLeftNavigation] = useState(false);
  const successLoginData = useSelector((state) => state?.UserLoginReducer);
  if (successLoginData?.LoginData?.accessToken) {
    localStorage.setItem(
      "LoginData",
      JSON.stringify(successLoginData?.LoginData)
    );
  }
  const Login_data = JSON.parse(localStorage.getItem("LoginData"));
  useEffect(() => {
    dispatch(AdminUserList(Login_data?.accessToken));
  }, [Login_data?.accessToken]);

  return (
    <>
      <div style={{ display: "flex" }}>
        {" "}
        {leftnavigation ? (
          <LeftnavigationBar setLeftNavigation={setLeftNavigation} />
        ) : (
          ""
        )}
        <div className="wrapper">
          {editmodel || addusermodel ? (
            <EditForm
              editmodel={editmodel}
              setEditmodel={setEditmodel}
              userdata={editmodel}
              AlluserData={Userlist?.AdminUserList}
              token={Login_data?.accessToken}
              setAddUsermodel={setAddUsermodel}
            />
          ) : (
            ""
          )}
          <div>
            <h6
              style={{
                fontSize: "30px",
                marginLeft: 30,
                cursor: "pointer",
                color: "var(--dark)",
              }}
              onClick={() => setLeftNavigation(true)}
            >
              {" "}
              &#9776; {""}
            </h6>
          </div>
          <div className="usertable">
            <div className="Table-header">
              <div>
                <p>Users Details</p>
              </div>
              <div className="AddBtn">
                <button onClick={() => setAddUsermodel(true)}>Add user</button>
              </div>
            </div>
            <table style={{ width: "100%" }}>
              <thead>
                <tr>
                  <th>Username</th>
                  <th>Email</th>
                  <th>DOB</th>
                  <th>Phone</th>
                  <th>Reporting Person</th>
                  <th>Edit</th>
                </tr>
              </thead>
              {Userlist?.AdminUserList.map((udata, id) => (
                <tbody>
                  <tr key={id}>
                    <td data-label="Username">{udata.name}</td>
                    <td data-label="Email">{udata.email}</td>
                    <td data-label="DOB">{udata.dob}</td>
                    <td data-label="Phone">{udata.phone}</td>
                    <td data-label="Reporting Person">
                      {udata.reporting_person_name
                        ? udata.reporting_person_name
                        : "N/A"}
                    </td>
                    <td data-label="Edit">
                      <button
                        className="editbtn"
                        onClick={() => setEditmodel(udata)}
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                </tbody>
              ))}
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
