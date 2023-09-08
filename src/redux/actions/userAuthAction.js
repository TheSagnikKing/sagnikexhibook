import { USER_SIGNUP_REQ, USER_SIGNUP_SUCCESS, USER_SIGNUP_FAIL, USER_SIGNIN_REQ, USER_SIGNIN_SUCCESS, USER_SIGNIN_FAIL, USER_RESETEMAIL_REQ, USER_RESETEMAIL_SUCCESS, USER_RESETEMAIL_FAIL, USER_VERIFYOTP_REQ, USER_VERIFYOTP_SUCCESS, USER_VERIFYOTP_FAIL, USER_RESETPASSWORD_REQ, USER_RESETPASSWORD_SUCCESS, USER_RESETPASSWORD_FAIL, USER_LOGOUT } from "../constants/userAuthConstants"
import axios from "axios"

export const userSignupAction = (userdata) => async (dispatch, getState) => {
    try {
        dispatch({ type: USER_SIGNUP_REQ })

        const { data } = await axios.post(`https://exhibookbackend.onrender.com/api/user/registerUser`, userdata)
        dispatch({
            type: USER_SIGNUP_SUCCESS,
            payload: data
        })
        
    } catch (error) {
        dispatch({
            type: USER_SIGNUP_FAIL,
            payload: error
        })
    }
}

export const userSigninAction = (userdata) => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_SIGNIN_REQ
        })

        const { data } = await axios.post(`https://exhibookbackend.onrender.com/api/user/loginUser`, userdata)

        dispatch({
            type: USER_SIGNIN_SUCCESS,
            payload: data
        })
        localStorage.setItem("personInfo", JSON.stringify(getState().userSignin.personinfo))
    } catch (error) {
        dispatch({
            type: USER_SIGNIN_FAIL,
            payload: error
        })
    }
}

export const userLogoutAction = () => async(dispatch) => {
    localStorage.removeItem("personInfo")
    dispatch({ type: USER_LOGOUT })
}

export const userResetEmailAction = (resetemaildata) => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_RESETEMAIL_REQ,
        });

        const { data } = await axios.post(
            `https://exhibookbackend.onrender.com/api/user/forgetPassword`,
            resetemaildata
        );
        console.log("Response from backend:", data);

        dispatch({
            type: USER_RESETEMAIL_SUCCESS,
            payload: data,
        });
        localStorage.setItem("userResetemail", JSON.stringify(resetemaildata))

    } catch (error) {
        dispatch({
            type: USER_RESETEMAIL_FAIL,
            payload: error,
        });
    }
}

export const userVerifyOtpAction = (userdata) => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_VERIFYOTP_REQ,
        });

        const { data } = await axios.post(
            `https://exhibookbackend.onrender.com/api/user/otpVerification`,
            userdata
        );

        dispatch({
            type: USER_VERIFYOTP_SUCCESS,
            payload: data,
        });

    } catch (error) {
        dispatch({
            type: USER_VERIFYOTP_FAIL,
            payload: error,
        });
    }
}

export const userResetPasswordAction = (userdata) => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_RESETPASSWORD_REQ,
        });

        const { data } = await axios.post(
            `https://exhibookbackend.onrender.com/api/user/changePassword`,
            userdata
        );

        dispatch({
            type: USER_RESETPASSWORD_SUCCESS,
            payload: data,
        });

    } catch (error) {
        dispatch({
            type: USER_RESETPASSWORD_FAIL,
            payload: error,
        });
    }
}
