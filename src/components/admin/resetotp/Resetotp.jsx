import React,{useEffect, useState} from 'react'
import "./Resetotp.css"
import { useDispatch,useSelector } from 'react-redux'
import {adminVerifyOtpAction} from '../../../redux/actions/adminAuthActions'
import { useNavigate } from 'react-router-dom'
import Navbar3 from '../../navbar/Navbar3'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ColorRing } from "react-loader-spinner"

const Resetotp = () => {

    const resetEmailData = JSON.parse(localStorage.getItem("resetemail"));

    const email = resetEmailData && resetEmailData.Email

    const [otp,setOtp] = useState("")
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const adminVerifyOtp = useSelector(state => state.adminVerifyOtp)
    const { loading,verifyotp } = adminVerifyOtp

    const nowadminverifyotp = verifyotp && verifyotp.message === "OTP doesnot match"
    const nowadminverifyotpsuccess = verifyotp && verifyotp.message === "OTP matched successfully"

    useEffect(() => {
        if(nowadminverifyotp){
            toast.error("Otp doesnot match", {
                style: {
                    fontSize: '1.4rem',
                },
            });
        }else if(nowadminverifyotpsuccess){
            toast.success("otp matched successfully", {
                style: {
                    fontSize: '1.4rem',
                },
            });
            setTimeout(() => {
                navigate("/admin/resetpassword")
            }, 1000)
        }
    },[nowadminverifyotp,nowadminverifyotpsuccess,navigate])

    const submitHandler = async() => {
        if (!otp) {
            toast.error('Otp is required!', {
                style: {
                    fontSize: '1.4rem',
                },
            });
        } else if (otp.length < 4) {
            toast.error('otp length must be 4 charecters', {
                style: {
                    fontSize: '1.4rem',
                },
            });
        } else if (otp.length > 5) {
            toast.error('otp length cannot exceed 4 charecters', {
                style: {
                    fontSize: '1.4rem',
                },
            });
        } else {
            const admindata = {email,otp}
            dispatch(adminVerifyOtpAction(admindata))
            // toast.success('Otp has been successfully verified!', {
            //     style: {
            //         fontSize: '1.4rem',
            //     },
            // });
            // setTimeout(() => {
            //     navigate("/admin/resetpassword")
            // }, 1000)
        }
    }

    return (
        <>
        <Navbar3/>
            <main className='admin-reset-otp'>
                <p>Reset Password</p>

                <div>
                    <input 
                    type="text" 
                    placeholder="Enter OTP" 
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    />
                </div>

                <div>
                    <button onClick={submitHandler} style={{cursor:"pointer"}}>{
                        loading ? <ColorRing
                            height={40}
                            width={40}
                            colors={['#fff', '#fff', '#fff', '#fff', '#fff']}
                        /> : "Reset"
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

            <ToastContainer />
        </>
    )
}

export default Resetotp