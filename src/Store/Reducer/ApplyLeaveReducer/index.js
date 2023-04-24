import { APPLY_LEAVE } from "../../ActionTypes/index";

const initialstate = {
    
}
const ApplyLeaveReducer = (state = initialstate, action) => {
  switch (action.type) {
    case APPLY_LEAVE:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};
export default ApplyLeaveReducer;
