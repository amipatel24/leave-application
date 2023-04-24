import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { UpdateUserList } from "../../../Store/Action/UpdateUserList/index";
import { CreateUser } from "../../../Store/Action/CreateUserAction";

const UseForm = (
  userdata,
  token,
  setEditmodel,
  editmodel,
  setAddUsermodel,
  validate
) => {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({});
  const [findErrors, setFindErrors] = useState(null);
  const date = editmodel ? userdata?.dob.split("-").reverse().join("-") : "";
  const [values, setvalues] = useState(
    editmodel
      ? {
          id: userdata.id,
          name: userdata.name,
          email: userdata.email,
          dob: date,
          phone: userdata.phone,
          reporting_person: userdata.reporting_person,
        }
      : null
  );
  console.log("values----->", values);

  console.log(errors, "errors");
  const handleSubmit = () => {
    setFindErrors(true);
    setErrors(validate(values));
    // const data = values;
    // dispatch(UpdateUserList(data, token));
    // setEditmodel(false);
    // window.location.reload();
  };

  const handleAdd = () => {
    setFindErrors(true);
    setErrors(validate(values));
    // const formdata = values;
    console.log("adduser");
    // dispatch(CreateUser(formdata, token));
  };

  useEffect(() => {
    function handleEscapeKey(event) {
      if (event.code === "Escape") {
        setEditmodel(false);
        setAddUsermodel(false);
      }
    }
    document.addEventListener("keydown", handleEscapeKey);
    return () => document.removeEventListener("keydown", handleEscapeKey);
  }, [setAddUsermodel, setEditmodel]);
  useEffect(() => {
    if (findErrors) {
      setErrors(validate(values));
    }
  }, [findErrors, validate, values]);

  return {
    handleSubmit,
    values,
    setvalues,
    handleAdd,
    errors,
  };
};
export default UseForm;
