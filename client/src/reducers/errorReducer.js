import { GET_ERRORS } from '../actions/types';

const initializeState = {};

export default function(state = initializeState, action) {
  switch (action.type) {
    case GET_ERRORS:
      return action.payload
    default:
      return state;
  }
}
