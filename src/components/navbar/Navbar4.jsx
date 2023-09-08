import React,{useState} from 'react'
import "./Navbar4.css"
import { Link } from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux'
import { userLogoutAction } from '../../redux/actions/userAuthAction'
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const menudata4 = [
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

const Navbar4 = () => {
  const [mobilemenu4, setMobilemenu4] = useState(false)
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
    <header className='nav4'>
        <Link to="/user/userevent" className='nav4-logo'>
          <div>
            <img src="/booklogo2.png" alt="" />
          </div>
          <div>
            <img src="/booklogo.png" alt="" />
          </div>
        </Link>
        
        <div>
        <Link to="/user/userevent" className='nav4-link'>New Booking</Link>
        <Link to="/user/bookinglist" className='nav4-link'>My booking</Link>
        <p className='nav4-link' onClick={logoutHandler}>Logout</p>
        </div>
    </header>

    <header className='mobile-navbar-4'>
        <div className='mobile-navbar-4-vf'>
          <Link to="/user/userevent">
            <img src="/booklogo.png" alt="logo" />
          </Link>
          <div onClick={() => setMobilemenu4(!mobilemenu4)}>
            <img src="/menu2.png" alt="menu-icon" />
          </div>
        </div>
      </header>

      {
        mobilemenu4 && <div className='mobile-menu-content4'>
          {
            menudata4.map((menu) => (
              // <div key={menu.id}>
                <Link key={menu.id} to={`${menu.url}`} className={`mobile-menu-link4 ${menu.url == currentLocation ? 'active4' : ''}`}
                >{menu.name}</Link>
              // </div>
            ))
          }
          <p className='mobile-menu-link4' style={{border:"none"}} onClick={logmenuHandler}>Logout</p>
        </div>
      }
    </>
  )
}

export default Navbar4