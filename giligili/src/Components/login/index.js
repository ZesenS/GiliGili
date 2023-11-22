import { useEffect, useRef } from "react";
import { jwtDecode } from "jwt-decode";
import "./index.css"
function Login() {
    const googleButton = useRef(null);

    const handleGoogleResponse = (response) => {
        console.log(response.credential);
        console.log(jwtDecode(response.credential))

    }

    useEffect(()=> {
        /*global google*/ 
        google.accounts.id.initialize({
            client_id: "713466947312-g3v2bpcc53kuu45t0pb0pn6mn019ib6t.apps.googleusercontent.com",
            callback: handleGoogleResponse
        });
        google.accounts.id.renderButton(
            googleButton.current,
            {theme: "outline", size: "large"}
        )
    })

    return (
        <div id="loginBox">
            <h3>Sign in</h3>
            <div id="inputArea">
                <input type="text" className="typeArea" defaultValue="USERNAME" />
                <input type="text" className="typeArea" defaultValue="PASSWORD" />
            </div>
            <div className="typeArea" id="thirdPartyLogin">
                <div id="signInDiv" ref={googleButton}></div>
            </div>
            <div className="typeArea" id="stay">
                <span><input type="checkbox" /></span>
                <span className="typeArea">Stay signed In</span>
            </div>
            <button>➔</button>
            <div className="typeArea">
  
                <div><a href="https://www.google.com/">CAN'T SIGN IN?</a></div>
                <div><a href="https://www.google.com/">CREATE ACCOUNT</a></div>

        </div>
        </div>
    );

}


export default Login