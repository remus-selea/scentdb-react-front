import React from 'react';
import { Link } from "react-router-dom";
import { AiOutlineUser } from "react-icons/ai";
import { Button } from 'primereact/button';
import { isUserAuthenticated } from '../../../util/authUtils';

import './Header.scss';

function Header(props) {

  const isAuthenticated = isUserAuthenticated();

  return (
    <div className="container">
      <header className="header ">

        <nav className="nav-menu">

          <div className="nav-item-list">
            <div className="nav-item logo">
              <Link className="nav-link" to="/">
                <div className="nav-item-text">ScentDB</div></Link>
            </div>
            <div className="nav-item">
              <Link className="nav-link" to="/perfumes"> <div className="nav-item-text">PERFUMES</div></Link>
            </div>
            <div className="nav-item">
              <Link className="nav-link" to="/notes"><div className="nav-item-text">NOTES</div> </Link>
            </div>
            <div className="nav-item">
              <Link className="nav-link" to="/perfumers"> <div className="nav-item-text">PERFUMERS</div>  </Link>
            </div>
            <div className="nav-item">
              <Link className="nav-link" to="/brands"> <div className="nav-item-text">BRANDS</div> </Link>
            </div>
          </div>

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
