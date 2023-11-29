import { useEffect, useRef, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import loginCss from "./login.module.css";
import { connect } from "react-redux";
const Login = (props) => {
  const navigate = useNavigate();
  const googleButton = useRef(null);
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const loginButton = useRef(null);
  const [buttonStatus, setButtonStatus] = useState(loginCss.buttonNotReady)
  const handleGoogleResponse = (response) => {
    const googleResponse = jwtDecode(response.credential);
    if (googleResponse.email_verified) {
      props.sendAction(googleResponse.name);
      navigate("/");
    }
  };

  const login = () => {
    props.sendAction(username);
    navigate("/");
  }

  useEffect(() => {
    /*global google*/
    google.accounts.id.initialize({
      client_id:
        "713466947312-g3v2bpcc53kuu45t0pb0pn6mn019ib6t.apps.googleusercontent.com",
      callback: handleGoogleResponse,
    });
    google.accounts.id.renderButton(googleButton.current, {
      theme: "outline",
      size: "large",
    });
  });

  useEffect(() => {
    if (username && password) {
      setButtonStatus(loginCss.buttonReady);
    }
    else {
      setButtonStatus(loginCss.buttonNotReady);
    }

  }, [password, username]);

  return (
    <div id={loginCss.loginBox}>
      <h3>Sign in</h3>
      <div className={loginCss.inputArea}>
        <input
          onChange={(e) => {
            setUsername(e.target.value);
          }}
          type="text"
          className={loginCss.typeArea}
          value={username}
          placeholder="USERNAME"
        />
        <input
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          type="text"
          className={loginCss.typeArea}
          value={password}
          placeholder="PASSWORD"
        />
      </div>
      <div className={loginCss.typeArea} id={loginCss.thirdPartyLogin}>
        <div id={loginCss.signInDiv} ref={googleButton}></div>
      </div>
      <div className={loginCss.typeArea} id={loginCss.stay}>
        <span>
          <input type="checkbox" />
        </span>
        <span className={buttonStatus}>Stay signed In</span>
      </div>
      <button ref={loginButton} className={buttonStatus} onClick={login}>➔</button>
      <div className={loginCss.typeArea}>
        <div>
          <a href="https://www.google.com/">CAN'T SIGN IN?</a>
        </div>
        <div>
          <a href="https://www.google.com/">CREATE ACCOUNT</a>
        </div>
      </div>
    </div>
  );
};
const mapDispatchToProps = (dispatch) => {
  return {
    sendAction: (message) => {
      dispatch({
        type: "userInfo_action",
        name: message
      });
    },
  };
};

export default connect(null, mapDispatchToProps)(Login);
