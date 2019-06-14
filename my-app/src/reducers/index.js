import { 
  LOGIN_START,
  LOGIN_SUCCESS,
   LOGIN_FAILURE,
  REGISTER_START,
  REGISTER_SUCCESS,
   REGISTER_FAILURE,
   FETCH_DATA_SUCCESS,
   FETCH_DATA_START,
   } from "../actions";

const defaults = {
  users: [],
  fetchingData: false,
  loginError: null,
  loggingIn: false,
  registerError: null
}

const rootReducer = (state = defaults, action) => {
  switch (action.type) {
    case LOGIN_START: {
      return {
        ...state,
        loginError: null,
        loggingIn: true
      };
    }
    case LOGIN_SUCCESS: {
      return {
        ...state,
        loggingIn: false
      };
    }
    case LOGIN_FAILURE: {
      return {
        ...state,
        loginError: "failed login",
        loggingIn: false,
      };
    }
    case REGISTER_START: {
      return {
        ...state,
        registerError: null,
      };
    }
    case REGISTER_SUCCESS: {
      return {
        ...state,
      };
    }
    case REGISTER_FAILURE: {
      return {
        ...state,
        registerError: "failed register",
      };
    }
    case FETCH_DATA_START:
      return {
        ...state,
        // error: "",
        fetchingData: true
      };
    case FETCH_DATA_SUCCESS:
      // console.log(action.payload);
      return {
        ...state,
        // error: "",
        fetchingData: false,
        users: action.users
      };
    default:
      return state;
  }
}

export default rootReducer;