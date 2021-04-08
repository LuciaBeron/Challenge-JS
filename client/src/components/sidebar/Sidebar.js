import React, { useState, useEffect } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { Link, useHistory } from 'react-router-dom';
import { SidebarData } from './SidebarData';
import '../styles.css';
import Axios from 'axios';
import { IconContext } from 'react-icons';

function Navbar() {
  let history = useHistory();
  const [sidebar, setSidebar] = useState(false);
  const [logout, setLogout] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);
  const setLogoutState = () => {
    setLogout(!logout);
  }

  useEffect(() => {
    if (logout === true) {
      Axios.get("http://localhost:3040/logout")
      .then(res => {
        console.log(res);
          history.push('/login');
    })}
  });

  useEffect(() => {

      Axios.get("http://localhost:3040/login")
      .then(res => {
          if (res.data.loggedIn === false) {
            history.push('/login');
          }
    })}
  );



  return (
    <>
      <IconContext.Provider value={{ color: '#fff' }}>
        <div className='navbar'>
          <Link to='#' className='menu-bars'>
            <FaIcons.FaBars onClick={showSidebar} />
          </Link>
        </div>
        <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
          <ul className='nav-menu-items' onClick={showSidebar}>
            <li className='navbar-toggle'>
              <Link to='#' className='menu-bars move'>
                <AiIcons.AiOutlineClose />
              </Link>
            </li>
            {SidebarData.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}

            <div className="bottom">
              <button onClick={setLogoutState} className="btn bg-light center">
                Logout              
              </button> 
            </div>           
          </ul>
        </nav>
      </IconContext.Provider>  
      


    </>
  );
}

export default Navbar;
