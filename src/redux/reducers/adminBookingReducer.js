import { CHANGE_BOOKSTATUS_FAIL, CHANGE_BOOKSTATUS_REQ, CHANGE_BOOKSTATUS_SUCCESS, GET_ALL_BOOKING_FAIL, GET_ALL_BOOKING_REQ, GET_ALL_BOOKING_SUCCESS, TIMESLOTSBYROOMNAMEANDDATE_FAIL, TIMESLOTSBYROOMNAMEANDDATE_REQ, TIMESLOTSBYROOMNAMEANDDATE_SUCCESS } from "../constants/adminBookingConstants";

export const getAllBookingReducer  = (state = {bookings:[]}, action) => {
    switch(action.type){
        case GET_ALL_BOOKING_REQ:
            return {loading:true}
        case GET_ALL_BOOKING_SUCCESS:
            return {loading:false, bookings:action.payload}
        case GET_ALL_BOOKING_FAIL:
            return {loading:false, error:action.payload}
        default:
            return state
    }
}

export const changeBookingStatusReducer  = (state = {}, action) => {
    switch(action.type){
        case CHANGE_BOOKSTATUS_REQ:
            return {loading:true}
        case CHANGE_BOOKSTATUS_SUCCESS:
            return {loading:false, ...action.payload}
        case CHANGE_BOOKSTATUS_FAIL:
            return {loading:false, error:action.payload}
        default:
            return state
    }
}

export const getTimeslotsByRoomNameAndDateReducer  = (state = {}, action) => {
    switch(action.type){
        case TIMESLOTSBYROOMNAMEANDDATE_REQ:
            return {loading:true}
        case TIMESLOTSBYROOMNAMEANDDATE_SUCCESS:
            return {loading:false, ...action.payload}
        case TIMESLOTSBYROOMNAMEANDDATE_FAIL:
            return {loading:false, error:action.payload}
        default:
            return state
    }
}