import React from "react";
import { Link } from "react-router-dom";
import sidebar_logo from "../assets/image/sidebar_logo.png";
import user_profile from "../assets/image/user_profile.png";

export default function Header() {
  const handleMenuClick = () => {
    document.body.classList.toggle("menu-open");
  };

  return (
    <>
      <header>
        <div className="header-outer">
          <div className="header-left">
            <Link to="/file-vault" className="logo-mobile" title="Fortis">
              <img src={sidebar_logo} alt="logo" />
            </Link>
            <h1>
              Welcome <span>Kris!</span>
            </h1>
          </div>

          <div className="header-right">
            <div
              className="menu-block"
              onClick={handleMenuClick}
              onKeyDown={handleMenuClick}
              role="button"
              tabIndex={0}
            >
              <span />
              <span />
              <span />
            </div>

            <em className="user-detail" title="User">
              <img src={user_profile} alt="user-pic" />
            </em>

            <ul className="header-menu">
              <li>
                <Link to="/file-vault" title="Settings">
                  Settings
                </Link>
              </li>
              <li>
                <Link to="/file-vault" title="Help">
                  Help
                </Link>
              </li>
              <li>
                <Link to="/" title="Logout">
                  Logout
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </header>
    </>
  );
}
