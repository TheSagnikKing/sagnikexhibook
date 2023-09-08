import React,{useState} from 'react'
import "./Navbar2.css"
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { userLogoutAction } from '../../redux/actions/userAuthAction'
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom';

const menudata2 = [
  {
    id: 1,
    name: "New Booking",
    background: "--bg-color-2",
    url: "/user/userevent"
  },
  {
    id: 2,
    name: "My Booking",
    background: "--bg-color-2",
    url: "/user/bookinglist"
  }
]

const Navbar2 = () => {

  const [mobilemenu2, setMobilemenu2] = useState(false)
  const currentLocation = useLocation().pathname;

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const logoutHandler = () => {
    dispatch(userLogoutAction())
    navigate("/user/signin")
  }

  const logmenuHandler = () => {
    dispatch(userLogoutAction())
    navigate("/user/signin")
  }
  return (
    <>
      <header className='nav2'>
        <Link to="/user/userevent" className='nav2-logo'>
          <div>
            <img src="/booklogo2.png" alt="" />
          </div>
        </Link>

        <div>
          <Link to="/user/userevent" className='nav2-link'>New Booking</Link>
          <Link to="/user/bookinglist" className='nav2-link'>My booking</Link>
          <p className='nav2-link' onClick={logoutHandler}>Log Out</p>
        </div>
      </header>

      <header className='mobile-navbar-2'>
        <div className='mobile-navbar-2-vf'>
          <Link to="/user/userevent">
            <img src="/booklogo2.png" alt="logo2" />
          </Link>
          <div onClick={() => setMobilemenu2(!mobilemenu2)}>
            <img src="/menu2.png" alt="menu-icon" />
          </div>
        </div>
      </header>

      {
        mobilemenu2 && <div className='mobile-menu-content'>
          {
            menudata2.map((menu) => (
              // <div key={menu.id}>
                <Link key={menu.id} to={`${menu.url}`} className={`mobile-menu-link ${menu.url == currentLocation ? 'active' : ''}`}
                >{menu.name}</Link>
              // </div>
            ))
          }
          <p className='mobile-menu-link' style={{border:"none"}} onClick={logmenuHandler}>Logout</p>
        </div>
      }
    </>
  )
}

export default Navbar2