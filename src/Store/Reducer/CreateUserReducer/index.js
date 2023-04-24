import { CREATE_USER } from "../../ActionTypes/index";

const initialstate = {};
const CreateUserReducer = (state = initialstate, action) => {
  switch (action.type) {
    case CREATE_USER:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};
export default CreateUserReducer;
