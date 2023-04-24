import { CREATE_USER, FAILED_CREATE_USER_API } from "../../ActionTypes/index";

import axios from "axios";

export const CreateUser = (formdata, token) => async (dispatch) => {
  console.log("formdata=>", formdata);
  try {
    const res = await axios.post("http://localhost:3100/users", formdata, {
      headers: { Authorization: `Bearer ${token}` },
    });

    dispatch({
      type: CREATE_USER,

      payload: { data: res.data },
    });
  } catch (error) {
    dispatch({
      type: FAILED_CREATE_USER_API,
      payload: { data: error.response.data },
    });
  }
};
