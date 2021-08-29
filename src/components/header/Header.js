import React from 'react';
import { Link } from "react-router-dom";
import { IconContext } from "react-icons";
import {  AiOutlineUser } from "react-icons/ai";

import './Header.scss';

function Header(props) {
  // const [value3, setValue3] = useState('');
  // const [searchInputState, setSearchInputState] = useState(false);


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

              {/* <div className="search-container">
                <div className="search-icon-btn">
                <IconContext.Provider value={{ size: '24px' }}>
                  <AiOutlineSearch />
                </IconContext.Provider>
                </div>
              
                <div className={searchInputState ? 'search-input open-search': 'search-input'} >
                  <span className="p-input-icon-right">
                    <i className="pi pi-search " />  
                    <InputText onFocus={() => setSearchInputState(true)} onBlur={()=> setSearchInputState(false)} className="search-bar" value={value3} onChange={(e) => setValue3(e.target.value)} placeholder="Search" />
                  </span>
                </div>
            </div> 
            
            */}

              {/* <div className="p-inputgroup">
                <InputText className="p-inputtext-sm" value={value3} onChange={(e) => setValue3(e.target.value)} placeholder="Search" />
                <Button icon="pi pi-search" className="search-button" />
              </div> */}

            </li>
            <li className="nav-item-user-action">
              <a href="http://localhost:3000/" className="nav-link">
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
