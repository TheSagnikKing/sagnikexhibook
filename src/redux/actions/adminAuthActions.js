import { ADMIN_LOGOUT, ADMIN_RESETEMAIL_FAIL, ADMIN_RESETEMAIL_REQ, ADMIN_RESETEMAIL_SUCCESS, ADMIN_RESETPASSWORD_FAIL, ADMIN_RESETPASSWORD_REQ, ADMIN_RESETPASSWORD_SUCCESS, ADMIN_SIGNIN_FAIL, ADMIN_SIGNIN_REQ, ADMIN_SIGNIN_SUCCESS, ADMIN_SIGNUP_FAIL, ADMIN_SIGNUP_REQ, ADMIN_SIGNUP_SUCCESS, ADMIN_VERIFYOTP_FAIL, ADMIN_VERIFYOTP_REQ, ADMIN_VERIFYOTP_SUCCESS, APPROVE_USER_FAIL, APPROVE_USER_REQ, APPROVE_USER_SUCCESS } from "../constants/adminAuthConstants"
import axios from "axios"

export const adminSignupAction = (admindata) => async (dispatch, getState) => {
    try {
        dispatch({ type: ADMIN_SIGNUP_REQ })

        const { data } = await axios.post(`https://exhibookbackend.onrender.com/api/admin/registerAdmin`, admindata)
        dispatch({
            type: ADMIN_SIGNUP_SUCCESS,
            payload: data
        })
        
    } catch (error) {
        dispatch({
            type: ADMIN_SIGNUP_FAIL,
            payload: error
        })
    }
}

export const adminSigninAction = (admindata) => async (dispatch, getState) => {
    try {
        dispatch({
            type: ADMIN_SIGNIN_REQ
        })

        const { data } = await axios.post(`https://exhibookbackend.onrender.com/api/admin/loginAdmin`, admindata)

        dispatch({
            type: ADMIN_SIGNIN_SUCCESS,
            payload: data
        })
        localStorage.setItem("userInfo", JSON.stringify(getState().adminSignin.userinfo))
    } catch (error) {
        dispatch({
            type: ADMIN_SIGNIN_FAIL,
            payload: error
        })
    }
}

export const adminLogoutAction = () => async(dispatch) => {
    localStorage.removeItem("userInfo")
    dispatch({ type: ADMIN_LOGOUT })
}

export const adminResetEmailAction = (resetemaildata) => async (dispatch, getState) => {
    try {
        dispatch({
            type: ADMIN_RESETEMAIL_REQ,
        });

        const { data } = await axios.post(
            `https://exhibookbackend.onrender.com/api/admin/forgetPassword`,
            resetemaildata
        );
        console.log("Response from backend:", data);

        dispatch({
            type: ADMIN_RESETEMAIL_SUCCESS,
            payload: data,
        });
        localStorage.setItem("resetemail", JSON.stringify(resetemaildata))

    } catch (error) {
        dispatch({
            type: ADMIN_RESETEMAIL_FAIL,
            payload: error,
        });
    }
}

export const adminVerifyOtpAction = (admindata) => async (dispatch, getState) => {
    try {
        dispatch({
            type: ADMIN_VERIFYOTP_REQ,
        });

        const { data } = await axios.post(
            `https://exhibookbackend.onrender.com/api/admin/otpVerification`,
            admindata
        );

        dispatch({
            type: ADMIN_VERIFYOTP_SUCCESS,
            payload: data,
        });

    } catch (error) {
        dispatch({
            type: ADMIN_VERIFYOTP_FAIL,
            payload: error,
        });
    }
}

export const adminResetPasswordAction = (admindata) => async (dispatch, getState) => {
    try {
        dispatch({
            type: ADMIN_RESETPASSWORD_REQ,
        });

        const { data } = await axios.post(
            `https://exhibookbackend.onrender.com/api/admin/changePassword`,
            admindata
        );

        dispatch({
            type: ADMIN_RESETPASSWORD_SUCCESS,
            payload: data,
        });

    } catch (error) {
        dispatch({
            type: ADMIN_RESETPASSWORD_FAIL,
            payload: error,
        });
    }
}

export const approveuserAction = (approveemail) => async(dispatch) => {
    try {
        dispatch({type:APPROVE_USER_REQ})

        const {data} = await axios.put("https://exhibookbackend.onrender.com/api/user/approveUser",approveemail)

        dispatch({
            type:APPROVE_USER_SUCCESS,
            payload:data
        })
    } catch (error) {
        dispatch({
            type:APPROVE_USER_FAIL,
            payload:error
        })
    }
}
