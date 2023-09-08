import React, { useState } from 'react'
import "./Navbar.css"
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { adminLogoutAction } from '../../redux/actions/adminAuthActions'
import { useLocation } from 'react-router-dom';

const menudata = [
  {
    id: 1,
    name: "Exhibitions/Events",
    background: "--bg-color-2",
    url: "/admin/event"
  },
  {
    id: 2,
    name: "Users",
    background: "--bg-color-2",
    url: "/admin/userlist"
  },
  {
    id: 3,
    name: "Exhibitions Request",
    background: "--bg-color-2",
    url: "/admin/exhibition"
  },
  {
    id: 4,
    name: "Booking Request",
    background: "--bg-color-2",
    url: "/admin/bookrequest"
  },
]

const Navbar = () => {

  const [mobilemenu, setMobilemenu] = useState(false)
  const currentLocation = useLocation().pathname;

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const logoutHandler = () => {
    dispatch(adminLogoutAction())
    navigate("/admin/signin")
  }

  const mobilelogoutHandleradmin = () => {
    dispatch(adminLogoutAction())
    navigate("/admin/signin")
  }

  return (
    <>
      <header className='nav'>
        <Link to="/admin/event" className='nav1-logo'>
          <div>
            <img src="/booklogo.png" alt="booklogo" />
          </div>
          <div>
            <img src="/booklogo2.png" alt="booklogo2" />
          </div>
        </Link>

        <p onClick={logoutHandler} style={{ cursor: "pointer" }}>Log Out</p>
      </header>

      {/* Mobile-Screen */}
      <header className='mobile-nav'>
        <div className='mobile-nav-v2'>
          <div>
            <div>
              <img src="/booklogo.png" alt="booklogo" />
            </div>
            <div>
              <img src="/booklogo2.png" alt="booklogo2" />
            </div>
          </div>
          <div onClick={() => setMobilemenu(!mobilemenu)}>
            <img src="/menu2.png" alt="menu-icon" />
          </div>
        </div>
      </header>
      {
        mobilemenu && <div className='mobile-menu-content'>
          {
            menudata.map((menu) => (
              <div key={menu.id}>
                <Link to={`${menu.url}`} className={`mobile-menu-link ${menu.url == currentLocation ? 'active' : ''}`}>{menu.name}</Link>
              </div>
            ))
          }
          <p className='mobile-menu-link' onClick={mobilelogoutHandleradmin}>Logout</p>
        </div>
      }


    </>
  )
}

export default Navbar