import { GET_USER, FAILED_USER_API } from "../../ActionTypes/index";
import axios from "axios";

export const Getuser = (AccessToken) => async (dispatch) => {
  console.log("AccessTokenAction", AccessToken);
  const token = AccessToken;
  try {
    const GetUserRes = await axios.get("http://localhost:3100/users", {
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch({
      type: GET_USER,
      payload: GetUserRes.data,
    });
  } catch (error) {
    dispatch({
      type: FAILED_USER_API,
      payload: { data: error.response.data },
    });
  }
};
