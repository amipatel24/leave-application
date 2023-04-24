import { UPDATE_USER_LIST } from "../../ActionTypes/index";

const initialstate = {};

const UpdateUserListReducer = (state = initialstate, action) => {
  switch (action.type) {
    case UPDATE_USER_LIST:
      return {
        ...state,
        ...action.payload,
      };

    default:
      return state;
  }
};
export default UpdateUserListReducer;
