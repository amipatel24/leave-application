import { ADMIN_USER_LIST, FAILED_ADMIN_LIST } from "../../ActionTypes";

const initialstate = {
  AdminUserList: [],
  AutherationError: [],
};

const AdminUserListReducer = (state = initialstate, action) => {
  console.log("action payload", action.payload);
  switch (action.type) {
    case ADMIN_USER_LIST:
      return {
        ...state,
        AdminUserList: action.payload,
      };
    case FAILED_ADMIN_LIST:
      return {
        ...state,
        AutherationError: action.payload.data,
      };

    default:
      return state;
  }
};
export default AdminUserListReducer;
