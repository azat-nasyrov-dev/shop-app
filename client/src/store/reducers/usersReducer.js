import {
  LOGIN_USER_FAILURE,
  LOGIN_USER_REQUEST, LOGIN_USER_SUCCESS, LOGOUT_USER,
  REGISTER_USER_FAILURE,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS
} from '../actions/usersActions';

export const initialState = {
  registerLoading: false,
  registerError: null,
  loginLoading: false,
  loginError: null,
  user: null,
};

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_USER_REQUEST:
      return {...state, registerLoading: true};
    case REGISTER_USER_SUCCESS:
      return {...state, registerLoading: false, user: action.user};
    case REGISTER_USER_FAILURE:
      return {...state, registerLoading: false, registerError: action.error};
    case LOGIN_USER_REQUEST:
      return {...state, loginLoading: true};
    case LOGIN_USER_SUCCESS:
      return {...state, loginLoading: false, user: action.user};
    case LOGIN_USER_FAILURE:
      return {...state, loginLoading: false, loginError: action.error};
    case LOGOUT_USER:
      return {...state, user: null};
    default:
      return state;
  }
};

export default usersReducer;