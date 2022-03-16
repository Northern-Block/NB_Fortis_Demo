import React, { useState } from "react";
import { Link } from "react-router-dom";
import sidebar_logo from "../assets/image/sidebar_logo.png";
import veritx_logo from "../assets/image/veritx_logo.png";

export default function Sidebar() {
  const [ index, setIndex ] = useState();
 

  const toggleTab = (ind:any) =>{
    setIndex(ind);
   
  }
  
  return (
    <>
      <aside>
        <Link to="/" className="logo-desktop" title="Fortis" >
          <img src={sidebar_logo} alt="logo"  />
        </Link>

        <div className="sidebar-menu-main">
          <ul className="menu-block">
            <li>
              <Link to="/file-vault" className={index == 1 ? "active": undefined} title="File Vault" onClick={()=>toggleTab(1)}>
              File Repository
              </Link>
            </li>

            <li>
              <Link to="/my-files" className={index == 2 ? "active": undefined} title="My Files" onClick={()=>toggleTab(2)}>
                My Files
              </Link>
            </li>

            <li>
              <Link
                to={`${process.env.PUBLIC_URL}/modify-files`}
                className={index == 3 ? "active": undefined}
                title="Modify Files"
                onClick={()=>toggleTab(3)}
              >
                Modify Files
              </Link>
            </li>

            {/* <li>
              <Link
                to={`${process.env.PUBLIC_URL}/user-activity`}
                className={index == 4 ? "active": undefined}
                title="User Activity"
                onClick={()=>toggleTab(4)}
              >
                User Activity
              </Link>
            </li> */}
          </ul>

          <Link to="/file-vault" className="vertex-logo" title="Veritx">
            <p>Powered by:</p>
            <img src={veritx_logo} alt="veritx-logo" />
          </Link>
        </div>
      </aside>
    </>
  );
}
