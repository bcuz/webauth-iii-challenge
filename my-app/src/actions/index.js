import axios from "axios";

export const LOGIN_START = "LOGIN_START";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";

export const login = creds => dispatch => {
  dispatch({ type: LOGIN_START });

  return axios
    .post("http://localhost:5001/api/login", creds)
    .then(res => {
      localStorage.setItem("token", res.data.authToken);
      dispatch({ type: LOGIN_SUCCESS });
    })
    .catch(err => {
      console.log("login err: ", err);
      if (err.response && err.response.status === 401) {
        localStorage.removeItem("token");
      }
      dispatch({ type: LOGIN_FAILURE });
    });
};

export const REGISTER_START = "REGISTER_START";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAILURE = "REGISTER_FAILURE";

export const register = creds => dispatch => {
  dispatch({ type: REGISTER_START });

  return axios
    .post("http://localhost:5001/api/register", creds)
    .then(res => {
      localStorage.setItem("token", res.data.authToken);
      dispatch({ type: REGISTER_SUCCESS });
    })
    .catch(err => {
      console.log("login err: ", err);
      dispatch({ type: REGISTER_FAILURE });
      return false
    });
};

export const FETCH_DATA_START = "FETCH_DATA_START";
export const FETCH_DATA_SUCCESS = "FETCH_DATA_SUCCESS";

export const getUsersSuccess = apiData => {
  return {type: FETCH_DATA_SUCCESS, users: apiData}
}

export const getUsers = () => dispatch => {
  dispatch({ type: FETCH_DATA_START });
  axios
  .get("http://localhost:5001/api/users", {
      headers: { Authorization: localStorage.getItem("token") }
    })
    .then(res => {
      // console.log(res);
      
      dispatch(getUsersSuccess(res.data))
    })
  }