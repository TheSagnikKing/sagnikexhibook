import React,{useEffect, useState} from 'react'
import "./Resetemail.css"
import { useDispatch,useSelector } from 'react-redux'
import {adminResetEmailAction} from '../../../redux/actions/adminAuthActions'
import { useNavigate } from 'react-router-dom'
import Navbar3 from '../../navbar/Navbar3'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ColorRing } from "react-loader-spinner"

const Resetemail = () => {

    const [Email,setEmail] = useState("")

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    const adminResetEmail = useSelector(state => state.adminResetEmail)
    const {loading,resetemail} = adminResetEmail

    useEffect(() => {
        if(resetemail && resetemail.message){
            toast.success("OTP has been sent to your Email",{
                style: {
                    fontSize: '1.4rem',
                },
            })
            setTimeout(() => {
                navigate("/admin/resetotp")
            },1000)
            setTimeout(() => {
                localStorage.removeItem("resetemail");
            }, 300000);
        }
    },[resetemail,navigate])

    const submitHandler = async() => {
        const admindata = {Email}
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
            dispatch(adminResetEmailAction(admindata))
        }
    }
    return (
        <>
        <Navbar3/>
            <main className='admin-reset'>
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
                    <button onClick={submitHandler}
                    style={{cursor:"pointer"}}
                    >{
                        loading ? <ColorRing
                        height={40}
                        width={40}
                        colors={['#fff', '#fff', '#fff', '#fff', '#fff']}
                    /> : "Get OTP"
                    }</button>
                </div>

                <div>
                    <p>Remember Password?</p>
                    <p>Login Now</p>
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