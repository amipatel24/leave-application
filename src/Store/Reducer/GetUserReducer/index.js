import { GET_USER, FAILED_USER_API } from "../../ActionTypes";

const initialstate = {
  UserData: [],
  AutherationError: [],
};

const getUserReducer = (state = initialstate, action) => {
  console.log("action payload", action.payload);
  switch (action.type) {
    case GET_USER:
      return {
        ...state,
        UserData: action.payload,
      };
    case FAILED_USER_API:
      return {
        ...state,
        AutherationError: action.payload.data,
      };

    default:
      return state;
  }
};
export default getUserReducer;
