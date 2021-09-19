import React from 'react';
import { Link } from "react-router-dom";
import { AiOutlineUser } from "react-icons/ai";
import { Button } from 'primereact/button';
import { isUserAuthenticated } from '../../../util/authUtils';

import './Header.scss';

function Header(props) {

  const isAuthenticated = isUserAuthenticated();

  return (
    <div>
      <header className="header container mx-auto">
        <nav className="nav-menu">
          <ul className="nav-item-list">
            <li className="nav-item logo">
              <Link className="nav-link" to="/">ScentDB</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/perfumes">PERFUMES</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/notes">NOTES</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/perfumers">PERFUMERS</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/brands">BRANDS</Link>
            </li>
          </ul>
        </nav>

        <nav className="nav-user-actions">
          <ul className="nav-item-list nav-item-list-actions">
            <li className="nav-item-user-action">

              <Link className="add-company-link"
                to={{
                  pathname: (isAuthenticated ? "/profile" : "/login")
                }}
              >
                <Button
                  type="button"
                  icon={<AiOutlineUser className="user-icon" />}
                  className='custom-user-btn p-button-rounded p-button-text p-button-plain'
                />
              </Link>

            </li>
          </ul>
        </nav>
      </header>

    </div>
  );
}

export default Header;
