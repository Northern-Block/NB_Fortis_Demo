import React from "react";
import { Link } from "react-router-dom";
import sidebar_logo from "../assets/image/sidebar_logo.png";
import veritx_logo from "../assets/image/veritx_logo.png";

export default function Sidebar() {
  return (
    <>
      <aside>
        <Link to="/file-vault" className="logo-desktop" title="Fortis">
          <img src={sidebar_logo} alt="logo" />
        </Link>

        <div className="sidebar-menu-main">
          <ul className="menu-block">
            <li>
              <Link to="/file-vault" className="active" title="File Vault">
                File Vault
              </Link>
            </li>

            <li>
              <Link to="/addfile" title="My Files">
                My Files
              </Link>
            </li>

            <li>
              <Link
                to={`${process.env.PUBLIC_URL}/modify`}
                title="Modify Files"
              >
                Modify Files
              </Link>
            </li>

            <li>
              <Link
                to={`${process.env.PUBLIC_URL}/search`}
                title="User Activity"
              >
                User Activity
              </Link>
            </li>
          </ul>

          <Link to="/file-vault" className="vertex-logo" title="veritx">
            <p>Powered by:</p>
            <img src={veritx_logo} alt="veritx-logo" />
          </Link>
        </div>
      </aside>
    </>
  );
}
