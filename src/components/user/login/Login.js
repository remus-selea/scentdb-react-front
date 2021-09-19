import React from "react";
import { GOOGLE_AUTH_URL, GITHUB_AUTH_URL, FACEBOOK_AUTH_URL } from '../../../util/constants';

import './Login.scss'

function Login(props) {
  return (
    <div className="container">
      <h1 className="section-title">Sign in </h1>

      <div className="social-login-buttons">
        <div className="template">

          <a className="login-link p-button p-component google" href={GOOGLE_AUTH_URL}>
              <i className="pi pi-google"></i>
              <span className="btn-label">Sign in with Google</span>
          </a>

          <a className="login-link p-button p-component facebook" href={FACEBOOK_AUTH_URL}>
              <i className="pi pi-facebook "></i>
              <span className="btn-label">Sign in with Facebook</span>
          </a>

          <a className="login-link p-button p-component github" href={GITHUB_AUTH_URL}>
              <i className="pi pi-github "></i>
              <span className="btn-label">Sign in with Github</span>
          </a>

        </div>

      </div>
      <div className="login-footer">
        By continuing, you acknowledge you've read the <a href="http://localhost:3000/login">Privacy Policy</a> and the <a href="http://localhost:3000/login">Community Guidelines</a>.
      </div>
    </div>
  );
}

export default Login;
