import {
  UPDATE_LEAVE_STATUS,
  FAILED_UPDATE_LEAVE_STATUS,
} from "../../ActionTypes/index";
import axios from "axios";

export const UpdateLeaveStatus = (Approvedleave, token) => async (dispatch) => {
  try {
    const res = await axios.put(
      "http://localhost:3100/leave/updateLeaveStatus",
      Approvedleave,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    dispatch({
      type: UPDATE_LEAVE_STATUS,
      payload: { data: res.data },
    });
  } catch (error) {
    dispatch({
      type: FAILED_UPDATE_LEAVE_STATUS,
      payload: { data: error.response.data },
    });
  }
};
