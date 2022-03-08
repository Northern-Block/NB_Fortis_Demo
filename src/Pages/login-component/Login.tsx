import * as React from "react";
import { Link } from "react-router-dom";
import fortis_logo from "../../assets/image/fortis-logo.png";
import code_scan from "../../assets/image/code-scan.png";
import veritx_logo from "../../assets/image/veritx_logo.png";
import "./login.scss";

export default function Login() {
  return (
    <>
      <div className="wrapper login-page">
        <div className="login-wrapper">
          <div className="login-inner">
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
