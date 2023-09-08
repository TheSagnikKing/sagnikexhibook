import React, { useState,useEffect } from 'react'
import './Signup.css'
import { useDispatch, useSelector } from 'react-redux'
import { adminSigninAction } from '../../../redux/actions/adminAuthActions'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import Navbar3 from '../../navbar/Navbar3'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ColorRing } from "react-loader-spinner"

const Signin = () => {

    const adminSignin = useSelector(state => state.adminSignin)
    const {userinfo,loading} = adminSignin

    const [Email, setEmail] = useState("")
    const [Password, setPassword] = useState("")

    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        if(userinfo && userinfo.message && (userinfo.message === "Enter Valid Password" || userinfo.message === "Enter Valid EmailId")){
            toast.error(userinfo.message, {
                style: {
                    fontSize: '1.4rem',
                },
            });
            navigate("/admin/signin")
            localStorage.removeItem("userInfo")
        }else if(userinfo && userinfo.response && userinfo.response.Email){
            toast.success('Login Successfully!', {
                style: {
                    fontSize: '1.4rem',
                },
            });
            setTimeout(() => {
                navigate("/admin/event")
            },1000)    
        }
    },[userinfo,navigate])

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    const submitHandler = async () => {
        if (!Email && !Password) {
            toast.error('All fields are required!', {
                style: {
                    fontSize: '1.4rem',
                },
            });
        }else if (!Email) {
            toast.error('Email is required!', {
                style: {
                    fontSize: '1.4rem',
                },
            });
        }else if (!emailRegex.test(Email)) {
            toast.error('Invalid email format!', {
                style: {
                    fontSize: '1.4rem',
                },
            });
        }else if (!Password) {
            toast.error('Password is required!', {
                style: {
                    fontSize: '1.4rem',
                },
            });
        }else if (Password.length < 8) {
            toast.error('Password length must be 8 charecters!', {
                style: {
                    fontSize: '1.4rem',
                },
            });
        }else{
            const admindata = { Email, Password }
            dispatch(adminSigninAction(admindata))
        }
    }
    return (
        <>
            <Navbar3 />
            <main className='admin-signin'>

                <div className='ad-sgn-box'>
                    <p>Sign in</p>
                    <p>Admin</p>

                    <input
                        type="email"
                        placeholder='Enter Your Email'
                        value={Email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder='Enter Your Password'
                        value={Password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <div>
                        <div>
                            <input type="checkbox" />
                            <p>Remember me</p>
                        </div>
                        <Link to="/admin/resetemail"><p className='ad-forgot'>Forgot password?</p></Link>
                    </div>

                    <button onClick={submitHandler}>{loading ? <ColorRing
                            height={40}
                            width={40}
                            colors={['#fff', '#fff', '#fff', '#fff', '#fff']}
                        /> : "Login"}</button>

                    <div>
                        <p>Do not have login id?</p>
                        <Link to="/admin/signup"><p className='ad-reg'>Register now</p></Link>
                    </div>
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
            <ToastContainer />
        </>
    )
}

export default Signin