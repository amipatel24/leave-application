import { UPDATE_USER_LIST, FAILED_USER_LIST } from "../../ActionTypes/index";
import axios from "axios";

export const UpdateUserList = (data, token) => async (dispatch) => {
  try {
    const res = await axios.put(
      "http://localhost:3100/updateuserroles",
      data,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    dispatch({
      type: UPDATE_USER_LIST,
      payload: { data: res.data },
    });
  } catch (error) {
    dispatch({
      type: FAILED_USER_LIST,
      payload: { data: error.response.data },
    });
  }
};
