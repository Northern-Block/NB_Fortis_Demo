import { Menu, MenuItem } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import sidebar_logo from "../assets/image/sidebar_logo.png";
import user_profile from "../assets/image/user_profile.png";

export default function Header() {
  const handleMenuClick = () => {
    document.body.classList.toggle("menu-open");
  };

  const [headerMenu, setHeaderMenu] = React.useState<null | HTMLElement>(null);
  const smallMenuOpen = Boolean(headerMenu);
  const headerMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setHeaderMenu(event.currentTarget);
  };
  const headerMenuClose = () => {
    setHeaderMenu(null);
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
            <em
              className="mobile-user-detail"
              title="User"
              onClick={headerMenuOpen}
              id="menu-button"
              aria-controls={smallMenuOpen ? "header-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={smallMenuOpen ? "true" : undefined}
              role="button"
              tabIndex={0}
            >
              <img src={user_profile} alt="user-pic" />
              <span>Welcome Kris!</span>
            </em>

            <em className="user-detail" title="User">
              <img src={user_profile} alt="user-pic" />
            </em>

            <Menu
              id="header-menu"
              anchorEl={headerMenu}
              open={smallMenuOpen}
              onClose={headerMenuClose}
              MenuListProps={{
                "aria-labelledby": "user-menu",
              }}
            >
              <MenuItem onClick={headerMenuClose} title="Settings">
                <Link to="/file-vault">Settings</Link>
              </MenuItem>
              <MenuItem onClick={headerMenuClose} title="Help">
                <Link to="/file-vault">Help</Link>
              </MenuItem>
              <MenuItem onClick={headerMenuClose} title="Logout">
                <Link to="/">Logout</Link>
              </MenuItem>
            </Menu>

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
