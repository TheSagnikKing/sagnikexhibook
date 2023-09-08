import { ADMIN_SIGNUP_REQ,ADMIN_SIGNUP_SUCCESS,ADMIN_SIGNUP_FAIL, ADMIN_LOGOUT, ADMIN_SIGNIN_REQ, ADMIN_SIGNIN_SUCCESS, ADMIN_SIGNIN_FAIL, ADMIN_RESETEMAIL_REQ, ADMIN_RESETEMAIL_SUCCESS, ADMIN_RESETEMAIL_FAIL, ADMIN_VERIFYOTP_REQ, ADMIN_VERIFYOTP_SUCCESS, ADMIN_VERIFYOTP_FAIL, ADMIN_RESETPASSWORD_REQ, ADMIN_RESETPASSWORD_SUCCESS, ADMIN_RESETPASSWORD_FAIL, APPROVE_USER_REQ, APPROVE_USER_SUCCESS, APPROVE_USER_FAIL } from "../constants/adminAuthConstants"

export const adminSignupReducer = (state = {},action) => {
    switch(action.type){
        case ADMIN_SIGNUP_REQ:
            return {loading:true}
        case ADMIN_SIGNUP_SUCCESS:
            return {loading:false, userinfo:action.payload}
        case ADMIN_SIGNUP_FAIL:
            return {loading:false, error:action.payload}
        case ADMIN_LOGOUT:
            return {}
        default: 
            return state
    }
}

export const adminSigninReducer = (state = {},action) => {
    switch(action.type){
        case ADMIN_SIGNIN_REQ:
            return {loading:true}
        case ADMIN_SIGNIN_SUCCESS:
            return {loading:false, userinfo:action.payload}
        case ADMIN_SIGNIN_FAIL:
            return {loading:false, error:action.payload}
        case ADMIN_LOGOUT:
            return {}
        default:
            return state
    }
}

export const adminResetEmailReducer = (state = {},action) => {
    switch(action.type){
        case ADMIN_RESETEMAIL_REQ:
            return {loading:true}
        case ADMIN_RESETEMAIL_SUCCESS:
            return {loading:false, resetemail:action.payload}
        case ADMIN_RESETEMAIL_FAIL:
            return {loading:false, error:action.payload}
        default:
            return state
    }
}

export const adminVerifyOtpReducer = (state = {},action) => {
    switch(action.type){
        case ADMIN_VERIFYOTP_REQ:
            return {loading:true}
        case ADMIN_VERIFYOTP_SUCCESS:
            return {loading:false, verifyotp:action.payload}
        case ADMIN_VERIFYOTP_FAIL:
            return {loading:false, error:action.payload}
        default:
            return state
    }
}

export const adminResetPasswordReducer = (state = {},action) => {
    switch(action.type){
        case ADMIN_RESETPASSWORD_REQ:
            return {loading:true}
        case ADMIN_RESETPASSWORD_SUCCESS:
            return {loading:false, resetpassword:action.payload}
        case ADMIN_RESETPASSWORD_FAIL:
            return {loading:false, error:action.payload}
        default:
            return state
    }
}


export const approveuserReducer = (state = {},action) => {
    switch(action.type){
        case APPROVE_USER_REQ:
            return {loading:true}
        case APPROVE_USER_SUCCESS:
            return {loading:false, ...action.payload}
        case APPROVE_USER_FAIL:
            return {loading:false, error:action.payload}
        default:
            return state
    }
}
