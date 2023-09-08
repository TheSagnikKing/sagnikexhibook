import React,{useEffect, useState} from 'react'
import "./Resetpassword.css"
import { adminResetPasswordAction } from '../../../redux/actions/adminAuthActions';
import { useDispatch,useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Navbar3 from '../../navbar/Navbar3';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ColorRing } from "react-loader-spinner"

const Resetpassword = () => {

    const resetEmailData = JSON.parse(localStorage.getItem("resetemail"));
    const email = (resetEmailData && resetEmailData.Email)

    const adminResetPassword = useSelector(state => state.adminResetPassword)
    const {loading,resetpassword} = adminResetPassword

    const newresetpassword = (resetpassword && resetpassword.message)

    const [NewPassword,setNewPassword] = useState("")
    const [ReEnterPassword, setReEnterPassword] = useState("")

    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        if(!email){
            navigate("/admin/resetemail")
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
                navigate("/admin/signin")
            },1000)
        }
    },[newresetpassword,navigate])
    
    const submitHandler = async() => {
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
            const admindata = {Email:email,NewPassword,ReEnterPassword}
            dispatch(adminResetPasswordAction(admindata))
            toast.success('Password reset successfully!', {
                style: {
                    fontSize: '1.4rem',
                },
            });
            setTimeout(() => {
                navigate("/admin/signin")
            },1000)
        }



        // if(NewPassword !== ReEnterPassword){
        //     alert("Password donot match")
        // }else if(NewPassword.length < 8){
        //     alert("length must be 8 charecters")
        // }else if(ReEnterPassword.length < 8){
        //     alert("length must be 8 charecters")
        // }else{
        //     const admindata = {Email,NewPassword,ReEnterPassword}
        //     try {
        //         await dispatch(adminResetPasswordAction(admindata))
        //         alert("Password Changed successfully")
        //         navigate("/admin/signin")
        //     } catch (error) {
                
        //     }
        // }    
    } 

    return (
        <>
        <Navbar3/>
            <main className='admin-resetpswd'>
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
                    <button onClick={submitHandler} style={{cursor:"pointer"}}>{
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