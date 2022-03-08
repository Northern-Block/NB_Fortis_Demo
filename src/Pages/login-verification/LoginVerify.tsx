import { LinearProgress } from "@mui/material";
import * as React from "react";
import { Link } from "react-router-dom";
import fortis_logo from "../../assets/image/fortis-logo.png";
import lock_icon from "../../assets/image/lock_icon.svg";
import unlock_icon from "../../assets/image/unlock-icon.svg";
import error_icon from "../../assets/image/error-icon.svg";
import request_check from "../../assets/image/request_check.svg";
import veritx_logo from "../../assets/image/veritx_logo.png";
import "./login-verify.scss";

export default function LoginVerification() {
  // Progressbar JS
  const [progress, setProgress] = React.useState(0);
  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          return 0;
        }
        const diff = Math.random() * 10;
        return Math.min(oldProgress + diff, 100);
      });
    }, 500);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <>
      <div className="wrapper login-page">
        <div className="login-wrapper">
          <div className="login-inner">
            <Link to="/" title="Fortis">
              <img src={fortis_logo} alt="logo" />
            </Link>
            <p className="h5">Welcome to Fortis!</p>
            <p className="h5">Please Wait</p>
            {/* <p className="h5 has-font-capital">ERROR</p> */}
            <em className="verify-icon">
              <img src={lock_icon} alt="lock" />
              {/* <img src={unlock_icon} alt="un-lock" /> */}
              {/* <img src={error_icon} alt="error" /> */}
              {/* <img src={request_check} alt="request" /> */}
            </em>
            <p className="h5">Verifying Credentials</p>
            {/* <p className="h5">You don’t have credentials</p> */}
            {/* <p className="h5">Verified</p> */}
            <LinearProgress variant="determinate" value={progress} />
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
