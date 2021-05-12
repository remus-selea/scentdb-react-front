import React from "react";
import {Link} from "react-router-dom";
import './Header.scss';
import userIcon from './user.svg'
import searchIcon from './search.svg'

function Header(props) {
    return (
      <div>
        <header className="header container mx-auto">
          <nav className="nav-menu">
            <ul className="nav-item-list">
              <li className="nav-item logo">
                <Link className="nav-link" to="/">ScentDB</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link"  to="/about">PERFUMES</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link"  to="/shop">NOTES</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link"  to="/perfumers">PERFUMERS</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link"  to="/brands">BRANDS</Link>
              </li>
            </ul>
          </nav>

          <nav className="nav-user-actions">
            <ul className="nav-item-list">
              <li className="nav-item-user-action">
                <a href="#" className="nav-link">
                  <img src={searchIcon} />
                </a>
              </li>
              <li className="nav-item-user-action">
                <a href="#" className="nav-link">
                  <img src={userIcon} />
                </a>
              </li>
            </ul>
          </nav>
        </header>
       
      </div>
    );
}
  
export default Header;
