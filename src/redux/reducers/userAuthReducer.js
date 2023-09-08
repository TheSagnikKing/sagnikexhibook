import { USER_LOGOUT, USER_RESETEMAIL_FAIL, USER_RESETEMAIL_REQ, USER_RESETEMAIL_SUCCESS, USER_RESETPASSWORD_FAIL, USER_RESETPASSWORD_REQ, USER_RESETPASSWORD_SUCCESS, USER_SIGNIN_FAIL, USER_SIGNIN_REQ, USER_SIGNIN_SUCCESS, USER_SIGNUP_FAIL, USER_SIGNUP_REQ, USER_SIGNUP_SUCCESS, USER_VERIFYOTP_FAIL, USER_VERIFYOTP_REQ, USER_VERIFYOTP_SUCCESS } from "../constants/userAuthConstants"


export const userSignupReducer = (state = {},action) => {
    switch(action.type){
        case USER_SIGNUP_REQ:
            return {loading:true}
        case USER_SIGNUP_SUCCESS:
            return {loading:false, personinfo:action.payload}
        case USER_SIGNUP_FAIL:
            return {loading:false, error:action.payload}
        case USER_LOGOUT:
            return {}
        default: 
            return state
    }
}

export const userSigninReducer = (state = {},action) => {
    switch(action.type){
        case USER_SIGNIN_REQ:
            return {loading:true}
        case USER_SIGNIN_SUCCESS:
            return {loading:false, personinfo:action.payload}
        case USER_SIGNIN_FAIL:
            return {loading:false, error:action.payload}
        case USER_LOGOUT:
            return {personinfo:{}}
        default:
            return state
    }
}

export const userResetEmailReducer = (state = {},action) => {
    switch(action.type){
        case USER_RESETEMAIL_REQ:
            return {loading:true}
        case USER_RESETEMAIL_SUCCESS:
            return {loading:false, resetemail:action.payload}
        case USER_RESETEMAIL_FAIL:
            return {loading:false, error:action.payload}
        default:
            return state
    }
}

export const userVerifyOtpReducer = (state = {},action) => {
    switch(action.type){
        case USER_VERIFYOTP_REQ:
            return {loading:true}
        case USER_VERIFYOTP_SUCCESS:
            return {loading:false, verifyotp:action.payload}
        case USER_VERIFYOTP_FAIL:
            return {loading:false, error:action.payload}
        default:
            return state
    }
}

export const userResetPasswordReducer = (state = {},action) => {
    switch(action.type){
        case USER_RESETPASSWORD_REQ:
            return {loading:true}
        case USER_RESETPASSWORD_SUCCESS:
            return {loading:false, resetpassword:action.payload}
        case USER_RESETPASSWORD_FAIL:
            return {loading:false, error:action.payload}
        default:
            return state
    }
}