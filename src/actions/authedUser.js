export const SET_AUTHED_USER = "SET_AUTH_USER";
export const LOGOUT = "LOGOUT";

function setAuthedUser(id) {
  return {
    type: SET_AUTHED_USER,
    id,
  };
}

function logout() {
  return {
    type: LOGOUT,
  };
}

export function handleLogin(id) {
  return (dispatch) => {
    dispatch(setAuthedUser(id));
  };
}

export function handleLogout() {
  return (dispatch) => {
    dispatch(logout());
  };
}
