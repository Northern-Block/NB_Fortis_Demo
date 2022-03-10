import * as React from "react";
import { Link ,useHistory} from "react-router-dom";
import fortis_logo from "../../assets/image/fortis-logo.png";
import code_scan from "../../assets/image/code-scan.png";
import veritx_logo from "../../assets/image/veritx_logo.png";
import "./login.scss";

import LoginVerification from '../login-verification/LoginVerify'
export default function Login() {
  const history = useHistory()
  const handleClick =()=>{
  
    history.push('/login-verify')
  //  <LoginVerification/>
  }
  return (
    <>
      <div className="wrapper login-page">
        <div className="login-wrapper">
          <div className="login-inner" onClick={handleClick}>
            <Link to="/" title="Fortis">
              <img src={fortis_logo} alt="logo" />
            </Link>
            <p className="h5">Welcome to Fortis!</p>
            <em className="code-scan">
              <img src={code_scan} alt="scan" />
            </em>
            <p className="h5">Scan QR code to login</p>
            <Link to="/" className="bottom-logo" title="Veritx">
              <p>Powered by:</p>
              <img src={veritx_logo} alt="veritx-logo" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
