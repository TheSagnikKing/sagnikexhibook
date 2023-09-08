import { createStore, applyMiddleware, combineReducers } from "redux"
import thunk from "redux-thunk"
import { composeWithDevTools } from 'redux-devtools-extension';
import { adminSignupReducer,adminSigninReducer,adminResetEmailReducer,adminVerifyOtpReducer,adminResetPasswordReducer,approveuserReducer} from "./reducers/adminAuthReducer";
import {userSignupReducer,userSigninReducer,userResetEmailReducer,userVerifyOtpReducer,userResetPasswordReducer} from "./reducers/userAuthReducer"
import { getAllEventsReducer,createEventReducer,getAllExhibitionReducer,approveEventReducer,getAllusersReducer} from "./reducers/adminEventsReducer";
import { getAllBookingReducer,changeBookingStatusReducer,getTimeslotsByRoomNameAndDateReducer } from "./reducers/adminBookingReducer";

import { usergetAllEventsReducer,userbookListReducer,createEventRequestReducer } from "./reducers/userEventsReducer";
import { checkpremiumReducer,timeslotsRoomnameReducer,createbookReducer } from "./reducers/userRoomReducer";

const reducers = combineReducers({
    //Admin Reducers
    adminSignup:adminSignupReducer,
    adminSignin:adminSigninReducer,
    adminResetEmail:adminResetEmailReducer,
    adminVerifyOtp:adminVerifyOtpReducer,
    adminResetPassword:adminResetPasswordReducer,
    getAllEvents:getAllEventsReducer,
    createEvent:createEventReducer,
    getAllExhibition:getAllExhibitionReducer,
    approveEvent:approveEventReducer,
    getAllBooking:getAllBookingReducer,
    changeBookingStatus:changeBookingStatusReducer,
    getAllusers:getAllusersReducer,
    approveuser:approveuserReducer,
    getTimeslotsByRoomNameAndDate:getTimeslotsByRoomNameAndDateReducer,

    //User Reducers
    userSignup:userSignupReducer,
    userSignin:userSigninReducer,
    userResetEmail:userResetEmailReducer,
    userVerifyOtp:userVerifyOtpReducer,
    userResetPassword:userResetPasswordReducer,
    usergetAllEvents:usergetAllEventsReducer,
    userbookList:userbookListReducer,
    checkpremium:checkpremiumReducer,
    timeslotsRoomname:timeslotsRoomnameReducer,
    createbook:createbookReducer,
    createEventRequest:createEventRequestReducer
})

const userInfoFromLocalStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : {}

const personInfoFromLocalStorage = localStorage.getItem('personInfo') ? JSON.parse(localStorage.getItem('personInfo')) : {}

const timeslotsRoomnameLocalStorage = localStorage.getItem('TimeSlot') ? JSON.parse(localStorage.getItem('TimeSlot')) : {}

const initialState = {
    adminSignin: {
        userinfo: userInfoFromLocalStorage
    },
    userSignin: {
        personinfo: personInfoFromLocalStorage
    },
    timeslotsRoomname:timeslotsRoomnameLocalStorage
}

const middleware = [thunk]

const store = createStore(reducers, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store
