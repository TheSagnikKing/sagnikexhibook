import React from 'react'
import './Signin.css'
import { Link } from 'react-router-dom'
import Navbar3 from '../navbar/Navbar3'

const Signin = () => {
    return (
        <>
        <Navbar3/>
        <main className='signin'>
            <p>Sign in</p>
            <p>You are a</p>

            <div className='user'>
                <Link to="/admin/signin" className='button'>Admin</Link>
                <Link to="/user/signin" className='button'>User</Link>
            </div>

            <div>
                <img src='/mode.png' alt="" className='mode' />
            </div>
            <div className='wave1'>
                <img src="/wave1.png" alt="" className='wave1' />
            </div>
            <div className='wave2'>
                <img src="/wave2.png" alt="" className='wave2' />
            </div>
        </main>
        </>
    )
}

export default Signin