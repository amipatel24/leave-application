export default function validate(values) {
  let errors = {};
  console.log(values, "values");
  if (!values.name) {
    errors.name = "Name is required";
  }

  if (!values?.email) {
    errors.email = "Email address is required";
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = "Email address is invalid";
  }
  if (!values?.phone) {
    errors.phone = "phone number is required";
  } else if (
    !/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(values?.phone)
  ) {
    errors.phone = "phone number is invalid";
  }

  if (!new Date(values?.dob)) {
    errors.dob = "birthday is invalide";
  }

  if (!values.password) {
    errors.password = "Password is required";
  } else if (values?.password?.length < 6) {
    errors.password = "Password must be 6 or more characters";
  }
  if (!values.confirmpassword) {
    errors.confirmPassword = "Confirm Password is required";
  } else if (values?.password !== values?.confirmpassword) {
    errors.confirmPassword = "Confirm Password is not match to Password";
  }

  return errors;
}
