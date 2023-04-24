import { RESET_PASSWORD } from "../../ActionTypes/index";
import axios from "axios";

export const ResetPassWord = (data, token) => async (dispatch) => {
  const res = await axios.put("http://localhost:3100/reset/Password", data, {
    headers: { Authorization: `Bearer ${token}` },
  });

  dispatch({
    type: RESET_PASSWORD,
    payload: { data: res.data },
  });
};
