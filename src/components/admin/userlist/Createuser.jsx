import React, { useEffect, useState } from 'react'
import "./Createuser.css"
import Navbar from "../../navbar/Navbar"
import Sidebar from "../../sidebar/Sidebar"
import { useDispatch, useSelector } from 'react-redux'
import { userSignupAction } from '../../../redux/actions/userAuthAction'
import { useNavigate } from 'react-router-dom'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ColorRing } from "react-loader-spinner"

const Createuser = () => {
    const [FirstName, setFirstName] = useState("")
    const [LastName, setLastName] = useState("")
    const [Email, setEmail] = useState("")
    const [MobileNo, setMobileNo] = useState("")
    const [Password, setPassword] = useState("")
    const [ConfirmPassword, setConfirmPassword] = useState("")


    const dispatch = useDispatch()
    const navigate = useNavigate()

    const adminSignin = useSelector(state => state.adminSignin)

    useEffect(() => {
        if (adminSignin.userinfo && Object.keys(adminSignin.userinfo).length === 0) {
            navigate("/admin/signin")
        }
    }, [adminSignin.userinfo, navigate])


    const userSignup = useSelector(state => state.userSignup)
    const {personinfo,loading} = userSignup

    useEffect(() => {
        if(personinfo && personinfo.message === "New user Created"){
            toast.success('User is created successfully!', {
                style: {
                    fontSize: '1.4rem',
                },
            });
            setTimeout(() => {
                navigate("/admin/userlist")
                window.location.reload()
            },1000)
        }
    },[personinfo,navigate])

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    const submitHandler = async () => {
        const userdata = { FirstName, LastName, Email, MobileNo, Password }

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
            dispatch(userSignupAction(userdata))
        }

    }

    return (
        <>
            <Navbar />
            <Sidebar height={90} />
            <main className='admin-signup2'>
                <p>Sign up</p>

                <div className='ad-sgup-box2'>
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
                            placeholder='Enter Your Mobile no'
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
                            placeholder='Enter Your Password'
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

                <ToastContainer />
            </main>
        </>
    )
}

export default Createuser