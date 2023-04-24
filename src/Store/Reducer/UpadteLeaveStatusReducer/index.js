import {UPDATE_LEAVE_STATUS} from '../../ActionTypes/index'

const initialstate = {
};

const UpdateLeaveStatusReducer = (state = initialstate, action) => {
  switch (action.type) {
    case UPDATE_LEAVE_STATUS:
      return {
        ...state,
        ...action.payload,
      };

    default:
      return state;
  }
};
export default UpdateLeaveStatusReducer;