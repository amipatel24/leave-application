import { ADMIN_USER_LIST, FAILED_ADMIN_LIST } from "../../ActionTypes/index";
import axios from "axios";

export const AdminUserList = (AccessToken) => async (dispatch) => {
  console.log("AccessTokenAction", AccessToken);
  const token = AccessToken;
  try {
    const AdminUserList = await axios.get("http://localhost:3100/userslist", {
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch({
      type: ADMIN_USER_LIST,
      payload: AdminUserList.data,
    });
  } catch (error) {
    dispatch({
      type: FAILED_ADMIN_LIST,
      payload: { data: error.response.data },
    });
  }
};
