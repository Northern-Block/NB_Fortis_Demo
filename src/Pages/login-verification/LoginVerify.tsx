import { LinearProgress } from "@mui/material";
import * as React from "react";
import { Link } from "react-router-dom";
import fortis_logo from "../../assets/image/fortis-logo.png";
import lock_icon from "../../assets/image/lock_icon.svg";
import unlock_icon from "../../assets/image/unlock_icon.svg";
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
            <em className="verify-icon">
              <img src={lock_icon} alt="lock" />
              {/* <img src={unlock_icon} alt="un-lock" /> */}
            </em>
            <p className="h5">Verifying Credentials</p>
            <LinearProgress variant="determinate" value={progress} />
            <Link to="/" className="bottom-logo" title="veritx">
              <p>Powered by:</p>
              <img src={veritx_logo} alt="veritx-logo" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
