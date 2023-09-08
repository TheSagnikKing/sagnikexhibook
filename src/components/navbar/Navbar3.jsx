import React from 'react'
import "./Navbar3.css"
import { Link } from 'react-router-dom'

const Navbar3 = () => {
  return (
    <>
     <header className='nav3'>
        <Link to="/" className='nav3-logo'>
          <div>
            <img src="/booklogo2.png" alt="" />
          </div>
        </Link>
     </header>
    </>
  )
}

export default Navbar3