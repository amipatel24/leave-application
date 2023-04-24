import { CANCEL_LEAVE, FAILED_CANCEL_LEAVE } from "../../ActionTypes/index";

import axios from "axios";

export const CancelLeave = (leave_id, token) => async (dispatch) => {
  console.log("leaveid", leave_id);
  try {
    const res = await axios.delete(`http://localhost:3100/leave/${leave_id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    dispatch({
      type: CANCEL_LEAVE,

      payload: { data: res.data },
    });
  } catch (error) {
    dispatch({
      type: FAILED_CANCEL_LEAVE,
      payload: { data: error.response.data },
    });
  }
};
