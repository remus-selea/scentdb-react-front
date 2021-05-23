import React from "react";
import {Link} from "react-router-dom";
import './Header.scss';
import { IconContext } from "react-icons";
import { AiOutlineSearch, AiOutlineUser } from "react-icons/ai";

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
                <Link className="nav-link"  to="/perfumes">PERFUMES</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link"  to="/notes">NOTES</Link>
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
            <ul className="nav-item-list nav-item-list-actions">
              <li className="nav-item-user-action">
                <a href="#" className="nav-link">
                   <IconContext.Provider value={{ size: '24px' }}>
                        <AiOutlineSearch />
                    </IconContext.Provider>
                </a>
              </li>
              <li className="nav-item-user-action">
                <a href="#" className="nav-link">
                    <IconContext.Provider value={{ size: '24px' }}>
                          <AiOutlineUser />
                    </IconContext.Provider>
                </a>
              </li>
            </ul>
          </nav>
        </header>
       
      </div>
    );
}
  
export default Header;
