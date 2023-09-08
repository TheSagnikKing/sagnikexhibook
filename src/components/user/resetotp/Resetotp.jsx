import React, { useEffect, useState } from 'react'
import "./Resetotp.css"
import { useDispatch, useSelector } from 'react-redux'
import { userVerifyOtpAction } from '../../../redux/actions/userAuthAction'
import { useNavigate } from 'react-router-dom'
import Navbar3 from '../../navbar/Navbar3'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ColorRing } from "react-loader-spinner"

const Resetotp = () => {

    const resetEmailData = JSON.parse(localStorage.getItem("userResetemail"));

    const email = resetEmailData && resetEmailData.Email

    const [otp, setOtp] = useState("")
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        if(!email){
            navigate("/user/resetemail")
        }
    },[navigate,email])

    const userVerifyOtp = useSelector(state => state.userVerifyOtp)
    const { loading,verifyotp } = userVerifyOtp

    const nowuserverifyotp = verifyotp && verifyotp.message === "OTP doesnot match"
    const nowuserverifyotpsuccess = verifyotp && verifyotp.message === "OTP matched successfully"

    useEffect(() => {
        if(nowuserverifyotp){
            toast.error("Otp doesnot match", {
                style: {
                    fontSize: '1.4rem',
                },
            });
        }else if(nowuserverifyotpsuccess){
            toast.success("otp matched successfully", {
                style: {
                    fontSize: '1.4rem',
                },
            });
            setTimeout(() => {
                navigate("/user/resetpassword")
            }, 1000)
        }
    },[nowuserverifyotp,nowuserverifyotpsuccess,navigate])

    const submitHandler = async () => {
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
            const userdata = { email, otp }
            dispatch(userVerifyOtpAction(userdata))
        }
    }
    return (
        <>
            <Navbar3 />
            <main className='user-reset-otp'>
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
                    <button onClick={submitHandler}>{
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