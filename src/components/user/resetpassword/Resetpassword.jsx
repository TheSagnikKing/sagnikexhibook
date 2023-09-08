import React, { useEffect, useState } from 'react'
import "./Resetpassword.css"
import { userResetPasswordAction } from '../../../redux/actions/userAuthAction';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Navbar3 from '../../navbar/Navbar3';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ColorRing } from "react-loader-spinner"

const Resetpassword = () => {

    const userresetEmailData = JSON.parse(localStorage.getItem("userResetemail"));
    const email = (userresetEmailData && userresetEmailData.Email)

    const userResetPassword = useSelector(state => state.userResetPassword)
    const {loading,resetpassword} = userResetPassword

    const newresetpassword = (resetpassword && resetpassword.message)

    const [NewPassword, setNewPassword] = useState("")
    const [ReEnterPassword, setReEnterPassword] = useState("")

    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        if(!email){
            navigate("/user/resetemail")
        }
    },[navigate,email])

    useEffect(() => {
        if(newresetpassword){
            toast.success('Password reset successfully!', {
                style: {
                    fontSize: '1.4rem',
                },
            });
            setTimeout(() => {
                navigate("/user/signin")
            },1000)
        }
    },[newresetpassword,navigate])


    const submitHandler = async () => {
        if (!NewPassword && !ReEnterPassword) {
            toast.error('All fields are required!', {
                style: {
                    fontSize: '1.4rem',
                },
            });
        } else if (NewPassword.length < 8) {
            toast.error('Password length must be 8 charecters!', {
                style: {
                    fontSize: '1.4rem',
                },
            });
        } else if (ReEnterPassword.length < 8) {
            toast.error('Confirm password length must be 8 charecters!', {
                style: {
                    fontSize: '1.4rem',
                },
            });
        } else if (NewPassword !== ReEnterPassword) {
            toast.error('Password donot match!', {
                style: {
                    fontSize: '1.4rem',
                },
            });
        } else {
            const userdata = { Email:email, NewPassword, ReEnterPassword }
            dispatch(userResetPasswordAction(userdata))
        }

    }
    return (
        <>
        <Navbar3/>
            <main className='user-resetpswd'>
                <p>Reset Password</p>

                <div>
                    <div>
                        <label htmlFor="">Password :</label>
                        <input
                            type="password"
                            placeholder="Enter Password"
                            value={NewPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                    </div>

                    <div>
                        <label htmlFor="">Confirm Password :</label>
                        <input
                            type="password"
                            placeholder="Enter Confirm Password"
                            value={ReEnterPassword}
                            onChange={(e) => setReEnterPassword(e.target.value)}
                        />
                    </div>
                </div>

                <div>
                    <button onClick={submitHandler}>{
                        loading ? <ColorRing
                        height={40}
                        width={40}
                        colors={['#fff', '#fff', '#fff', '#fff', '#fff']}
                    /> : "Reset Password"
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
            <ToastContainer/>
        </>
    )
}

export default Resetpassword