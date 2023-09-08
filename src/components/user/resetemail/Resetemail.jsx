import React, { useEffect, useState } from 'react'
import "./Resetemail.css"
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { userResetEmailAction } from '../../../redux/actions/userAuthAction'
import Navbar3 from '../../navbar/Navbar3'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ColorRing } from "react-loader-spinner"

const Resetemail = () => {

    const [Email, setEmail] = useState("")

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    const userResetEmail = useSelector(state => state.userResetEmail)
    const {loading,resetemail} = userResetEmail

    useEffect(() => {
        if(resetemail && resetemail.message){
            toast.success("OTP has been sent to your Email",{
                style: {
                    fontSize: '1.4rem',
                },
            })
            setTimeout(() => {
                navigate("/user/resetotp")
            },1000)
            setTimeout(() => {
                localStorage.removeItem("userResetemail");
            }, 300000);
        }
    },[resetemail,navigate])

    const submitHandler = async () => {
        const userdata = { Email }
        if(!Email){
            toast.error('Email is required!', {
                style: {
                    fontSize: '1.4rem',
                },
            });
        }else if(!emailRegex.test(Email)){
            toast.error('Invalid email format!', {
                style: {
                    fontSize: '1.4rem',
                },
            });
        }else{
            dispatch(userResetEmailAction(userdata))
        }
    }

    return (
        <>
        <Navbar3/>
            <main className='user-reset'>
                <p>Reset Password</p>

                <div>
                    <input
                        type="email"
                        placeholder="Enter Your Email"
                        value={Email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div>
                    <button onClick={submitHandler}>{
                        loading ? <ColorRing
                        height={40}
                        width={40}
                        colors={['#fff', '#fff', '#fff', '#fff', '#fff']}
                    /> : "Get OTP"
                    }</button>
                </div>

                <div>
                    <p>Remember Password?</p>
                    <Link to="/user/signin" className='reset-p'>Login Now</Link>
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
            <ToastContainer/>
        </>
    )
}

export default Resetemail