import React from "react";
import { withRouter } from "react-router-dom";
import { ACCESS_TOKEN } from '../../util/constants';
import AuthContext from "../../contexts//AuthContext";

const parseJwt = (token) => {
  try {
    return JSON.parse(window.atob(token.split(".")[1]));
  } catch (e) {
    return null;
  }
};

function AuthVerify(props) {
  const { resetAuthState } = React.useContext(AuthContext)

  const handleLogout = () => {
    resetAuthState(props);
  }

  props.history.listen(() => {
    const accessToken = localStorage.getItem(ACCESS_TOKEN);

    if (accessToken) {
      const decodedJwt = parseJwt(accessToken);

      if (decodedJwt.exp * 1000 < Date.now()) {
        handleLogout();
      }
    }
  });

  return <div></div>;
};

export default withRouter(AuthVerify);