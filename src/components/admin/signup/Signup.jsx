import React,{useEffect, useState} from 'react'
import "./Signup.css"
import { useDispatch,useSelector } from 'react-redux'
import { adminSignupAction } from '../../../redux/actions/adminAuthActions'
import Navbar3 from '../../navbar/Navbar3'
import { useNavigate } from 'react-router-dom'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ColorRing } from "react-loader-spinner"

const Signup = () => {

    const adminSignup = useSelector(state => state.adminSignup)
    const {loading,userinfo} = adminSignup

    const [FirstName, setFirstName] = useState("")
    const [LastName, setLastName] = useState("")
    const [Email, setEmail] = useState("")
    const [MobileNo, setMobileNo] = useState("")
    const [Password, setPassword] = useState("")
    const [ConfirmPassword, setConfirmPassword] = useState("")

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        if(userinfo && userinfo.message === "New admin Created"){
            toast.success('Signup Successfully!', {
                style: {
                    fontSize: '1.4rem',
                },
            });
            setTimeout(() => {
                navigate("/admin/signin")
                window.location.reload()
            },1000)
        }
    },[userinfo,navigate])

    const submitHandler = async() => {
        const admindata = {FirstName,LastName,Email,MobileNo,Password,}
        if(!FirstName && !LastName && !Email && !MobileNo && !Password){
            toast.error('All fields are required!', {
                style: {
                    fontSize: '1.4rem',
                },
            });
        }else if(!FirstName){
            toast.error('FirstName is required!', {
                style: {
                    fontSize: '1.4rem',
                },
            });
        }else if(!LastName){
            toast.error('LastName is required!', {
                style: {
                    fontSize: '1.4rem',
                },
            });
        }else if(!Email){
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
        }else if(!MobileNo){
            toast.error('MobileNo is required!', {
                style: {
                    fontSize: '1.4rem',
                },
            });
        }else if(MobileNo.length < 10){
            toast.error('Mobileno length must be 10 digits', {
                style: {
                    fontSize: '1.4rem',
                },
            });
        }else if(MobileNo.length > 10){
            toast.error('Mobileno cannot exceed 10 digits ', {
                style: {
                    fontSize: '1.4rem',
                },
            });
        }else if(!Password){
            toast.error('Password is required', {
                style: {
                    fontSize: '1.4rem',
                },
            });
        }else if(Password.length < 8){
            toast.error('Password length must be 8 charecters!', {
                style: {
                    fontSize: '1.4rem',
                },
            });
        }else if(!ConfirmPassword){
            toast.error('Confirm Password is required', {
                style: {
                    fontSize: '1.4rem',
                },
            });
        }else if(ConfirmPassword.length < 8){
            toast.error('Password length must be 8 charecters!', {
                style: {
                    fontSize: '1.4rem',
                },
            });
        }else if(Password !== ConfirmPassword){
            toast.error('Password donot match!', {
                style: {
                    fontSize: '1.4rem',
                },
            });
        }else{
            dispatch(adminSignupAction(admindata))
            toast.success('Signup Successfully!', {
                style: {
                    fontSize: '1.4rem',
                },
            });
            setTimeout(() => {
                navigate("/admin/signin")
            },1000)
        }
    }

    return (
        <>
        <Navbar3/>
        <main className='admin-signup'>
            <p>Sign up</p>

            <div className='ad-sgup-box'>

                    <div>
                        <label htmlFor="">First Name :</label>
                        <input 
                        type="text" 
                        placeholder='Enter Your Name' 
                        value={FirstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        />
                    </div>

                    <div>
                        <label htmlFor="">Last Name :</label>
                        <input 
                        type="text" 
                        placeholder='Enter Your Name' 
                        value={LastName}
                        onChange={(e) => setLastName(e.target.value)}
                        />
                    </div>

                    <div>
                        <label htmlFor="">Email address :</label>
                        <input 
                        type="email" 
                        placeholder='Enter Your Email' 
                        value={Email}
                        onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div>
                        <label htmlFor="">Mobile No :</label>
                        <input 
                        type="number" 
                        placeholder='Enter Your Mobile No.' 
                        value={MobileNo}
                        onChange={(e) => setMobileNo(e.target.value)}
                        />
                    </div>

                    <div>
                        <label htmlFor="">Password :</label>
                        <input 
                        type="password" 
                        placeholder='Enter Your Password' 
                        value={Password}
                        onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
    
                    <div>
                        <label htmlFor="">Confirm Password :</label>
                        <input 
                        type="password" 
                        placeholder='Enter Your ConfirmPassword' 
                        value={ConfirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>

                    </div>

            <div className='btn-box'>
                <button onClick={submitHandler}>{
                    loading ? <ColorRing
                    height={40}
                    width={40}
                    colors={['#fff', '#fff', '#fff', '#fff', '#fff']}
                    /> : "Sign up"
                }</button>
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

export default Signup