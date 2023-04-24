import { APPLY_LEAVE, FAILED_APPLIED_LEAVE } from "../../ActionTypes/index";

import axios from "axios";

export const ApplyLeave = (ApplyleaveData,token) => async (dispatch) => {
  try {
    const res = await axios.post(
      "http://localhost:3100/leave",
      ApplyleaveData,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    dispatch({
      type: APPLY_LEAVE,

      payload: { data: res.data },
    });
  } catch (error) {
    dispatch({
      type: FAILED_APPLIED_LEAVE,
      payload: { data: error.response.data },
    });
  }
};
