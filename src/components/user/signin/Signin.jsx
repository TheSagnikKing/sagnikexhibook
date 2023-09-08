import React, { useState,useEffect } from 'react'
import './Signup.css'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { userSigninAction } from '../../../redux/actions/userAuthAction'
import Navbar3 from '../../navbar/Navbar3'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ColorRing } from "react-loader-spinner"

const Signin = () => {
    const [Email, setEmail] = useState("")
    const [Password, setPassword] = useState("")

    const userSignin = useSelector(state => state.userSignin)
    const { loading,personinfo } = userSignin

    const navigate = useNavigate()

    useEffect(() => {
        if(personinfo && personinfo.message && (personinfo.message === "Enter Valid Password" || personinfo.message === "Enter Valid EmailId")){
            toast.error(personinfo.message, {
                style: {
                    fontSize: '1.4rem',
                },
            });
            navigate("/user/signin")
            localStorage.removeItem("personInfo")
        }else if(personinfo && personinfo.response && personinfo.response.Email){
            toast.success('Login Successfully!', {
                style: {
                    fontSize: '1.4rem',
                },
            });
            setTimeout(() => {
                navigate("/user/userevent")
            },1000)    
        }
    },[personinfo,navigate])

    const dispatch = useDispatch()

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    const submitHandler = async () => {
        if (!Email && !Password) {
            toast.error('All fields are required!', {
                style: {
                    fontSize: '1.4rem',
                },
            });
        } else if (!Email) {
            toast.error('Email is required!', {
                style: {
                    fontSize: '1.4rem',
                },
            });
        } else if (!emailRegex.test(Email)) {
            toast.error('Invalid email format!', {
                style: {
                    fontSize: '1.4rem',
                },
            });
        } else if (!Password) {
            toast.error('Password is required!', {
                style: {
                    fontSize: '1.4rem',
                },
            });
        } else if (Password.length < 8) {
            toast.error('Password length must be 8 charecters!', {
                style: {
                    fontSize: '1.4rem',
                },
            });
        } else {
            const userdata = { Email, Password }
            dispatch(userSigninAction(userdata))
        }
    }

    return (
        <>
        <Navbar3/>
            <main className='user-signin'>

                <div className='ur-sgn-box'>
                    <p>Sign in</p>
                    <p>User</p>

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
                        <Link to="/user/resetemail"><p className='ur-forgot'>Forgot password?</p></Link>
                    </div>

                    <button onClick={submitHandler}>
                        {loading ? <ColorRing
                            colors={['#fff', '#fff', '#fff', '#fff', '#fff']}
                        /> : "Login"}
                    </button>

                    <div>
                        <p>Do not have login id?</p>
                        <Link to="/user/signup"><p className='ur-reg'>Register now</p></Link>
                    </div>
                    <ToastContainer />
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