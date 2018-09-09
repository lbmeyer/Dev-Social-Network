import { GET_ERRORS } from './types';

export const clearErrors = () => {
  return {
    type: GET_ERRORS,
    payload: {}
  }
}