import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <>
      <footer>
        <div className="footer-outer">
          <ul className="footer-link">
            <li>
              <Link to="/file-vault" title="Privacy Policy">
                Privacy Policy
              </Link>
            </li>
            <li className="has-border">
              <Link to="/file-vault" title="Terms & Conditions">
                Terms & Conditions
              </Link>
            </li>
            <li>
              <Link to="/file-vault" title="www.veritx.com">
                www.veritx.co
              </Link>
            </li>
          </ul>

          <p className="copyright">
            VeriTX Confidential and Proprietary &copy;2022
          </p>
        </div>
      </footer>
    </>
  );
}
