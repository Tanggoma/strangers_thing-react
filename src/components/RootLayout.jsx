import React from 'react'
import { NavLink, Outlet, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react';
import logo from '../assets/logo.png';
import Home from './Home';

const Rootlayout = () => {

  const [isLogin, setIsLogin] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsLogin(
      location.pathname === '/profile' ||
      location.pathname === '/add' ||
      location.pathname === '/message' ||
      location.pathname.startsWith('/my-posts') ||
      location.pathname.startsWith('/message/reply/')
    );
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    setIsLogin(false);
  }

  return (

    <div className='root-layout'>
      <header header="true">
        <nav className="navbar">
          <div className="logo-container">
            <img
              id="logo-img"
              src={logo}
              alt="logo"
            />
          </div>

          <div className="nav-links">

            {isLogin ? (
              <>
                <NavLink to="profile"> All Posts</NavLink>
                <NavLink to="my-posts"> My Posts</NavLink>
                <NavLink to="message"> Messages</NavLink>
                <NavLink to="login" onClick={handleLogout}> Log out</NavLink>

              </>
            ) : (
              <>
                <NavLink to="home"> Home</NavLink>
                <NavLink to="posts"> Posts</NavLink>
                <NavLink to="login"> Login</NavLink>
              </>
            )}
          </div>
        </nav>
      </header>

      <main>
        {location.pathname === '/' ? <Home /> : <Outlet />}
      </main>

    </div >
  )
}

export default Rootlayout