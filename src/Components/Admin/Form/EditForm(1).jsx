import React from "react";
import UseForm from "./UseForm";
import "./index.css";
import validate from "./formValidation";

export default function EditForm(props) {
  const {
    editmodel,
    setEditmodel,
    userdata,
    AlluserData,
    token,
    setAddUsermodel,
  } = props;

  const { handleSubmit, values, setvalues, handleAdd, errors } = UseForm(
    userdata,
    token,
    setEditmodel,
    editmodel,
    setAddUsermodel,
    validate
  );
  const fiterdata = AlluserData.filter((udata) => udata.name !== userdata.name);
  const ModelTitle = editmodel ? "EditForm" : "Add User";
  return (
    <div>
      <div className="maindiv" onClick={() => setEditmodel(false)}></div>
      <div className="form-popup">
        <p
          style={{
            marginBottom: 0,
            marginTop: 5,
            display: "flex",
            alignItems: "center",
          }}
        >
          {ModelTitle}
        </p>
        <button
          className="closeBtn"
          onClick={() =>
            editmodel ? setEditmodel(false) : setAddUsermodel(false)
          }
        >
          x
        </button>
        <div className="form-inputs">
          <label htmlFor="">UserName</label>
          {/* <br /> */}
          <input
            type="text"
            name="name"
            value={values?.name}
            placeholder="Enter Name"
            onChange={(e) =>
              setvalues((prev) => {
                return {
                  ...prev,
                  name: e.target.value,
                };
              })
            }
            required
          />
          <h6 style={{ color: "red", marginLeft: "10%" }}>{errors?.name}</h6>
          <label htmlFor="">Email Address</label>
          {/* <br /> */}
          <input
            type="text"
            name="email"
            value={values?.email}
            placeholder="Enter email"
            onChange={(e) =>
              setvalues((prev) => {
                return {
                  ...prev,
                  email: e.target.value,
                };
              })
            }
            required
          />
          <h6 style={{ color: "red", marginLeft: "10%" }}>{errors?.email}</h6>
          {/* <br /> */}
          <label htmlFor="">DOB</label>
          <br />
          <input
            type="date"
            name="dob"
            value={values?.dob}
            onChange={(e) =>
              setvalues((prev) => {
                return {
                  ...prev,
                  dob: e.target.value,
                };
              })
            }
            required
          />
          <h6 style={{ color: "red", marginLeft: "10%" }}>{errors?.dob}</h6>
          <label htmlFor="">Phone Number</label>
          {/* <br /> */}
          <input
            type="tel"
            name="phone"
            value={values?.phone}
            placeholder="Enter Phone Number"
            onChange={(e) =>
              setvalues((prev) => {
                return {
                  ...prev,
                  phone: e.target.value,
                };
              })
            }
            required
          />
          {/* <br /> */}
          <h6 style={{ color: "red", marginLeft: "10%" }}>{errors?.phone}</h6>
          <label htmlFor="">Reporting to</label>
          <br />
          <select
            name="reporting_person"
            id="reporting"
            onChange={(e) =>
              setvalues((prev) => {
                return {
                  ...prev,
                  reporting_person: e.target.value,
                };
              })
            }
            required
          >
            {userdata?.reporting_person_name ? (
              <>
                {fiterdata?.map((data, id) => {
                  return (
                    <option
                      selected={
                        values?.reporting_person === data.id ? `selected` : ""
                      }
                      key={data.id}
                      value={data.id}
                    >
                      {data.name}
                    </option>
                  );
                })}
              </>
            ) : (
              <>
                <option>select from drodown</option>
                {fiterdata?.map((data, id) => {
                  return (
                    <option key={id} value={data.id}>
                      {data.name}
                    </option>
                  );
                })}
              </>
            )}
          </select>
          {!editmodel ? (
            <div className="password" style={{ display: "flex", gap: 60 }}>
              <div>
                <label htmlFor="">Password</label>
                {/* <br /> */}
                <input
                  style={{ width: "110%" }}
                  type="password"
                  name="password"
                  placeholder="Enter password"
                  onChange={(e) =>
                    setvalues((prev) => {
                      return {
                        ...prev,
                        password: e.target.value,
                      };
                    })
                  }
                  required
                />
                <h6 style={{ color: "red", marginLeft: "10%" }}>
                  {errors?.password}
                </h6>
              </div>
              <div>
                <label htmlFor="">Confirm password</label>
                {/* <br /> */}
                <input
                  style={{ width: "110%" }}
                  type="password"
                  name="ConfirmPassword"
                  placeholder="Enter confirm password"
                  onChange={(e) =>
                    setvalues((prev) => {
                      return {
                        ...prev,
                        confirmpassword: e.target.value,
                      };
                    })
                  }
                  required
                />
                <h6 style={{ color: "red", marginLeft: "10%" }}>
                  {errors?.confirmPassword}
                </h6>
              </div>
            </div>
          ) : (
            ""
          )}
          <div className="actioncontainer">
            <button
              className="Submitbtn"
              onClick={editmodel ? handleSubmit : handleAdd}
            >
              Submit
            </button>
            <button
              className="cancelbtn"
              onClick={() =>
                editmodel ? setEditmodel(false) : setAddUsermodel(false)
              }
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
