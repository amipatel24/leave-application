
import { CANCEL_LEAVE} from "../../ActionTypes";

const initialstate = {
  UserData: [],
};

const CancelLeaveReducer = (state = initialstate, action) => {
  switch (action.type) {
    case CANCEL_LEAVE:
      return {
        ...state,
        ...action.payload,
      };

    default:
      return state;
  }
};
export default CancelLeaveReducer;