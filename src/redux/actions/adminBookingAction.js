import axios from "axios"
import { CHANGE_BOOKSTATUS_FAIL, CHANGE_BOOKSTATUS_REQ, CHANGE_BOOKSTATUS_SUCCESS, GET_ALL_BOOKING_FAIL, GET_ALL_BOOKING_REQ, GET_ALL_BOOKING_SUCCESS, TIMESLOTSBYROOMNAMEANDDATE_FAIL, TIMESLOTSBYROOMNAMEANDDATE_REQ, TIMESLOTSBYROOMNAMEANDDATE_SUCCESS } from "../constants/adminBookingConstants"

export const getAllBookingAction = () => async (dispatch) => {
    try {
        dispatch({ type: GET_ALL_BOOKING_REQ })

        const { data } = await axios.get("https://exhibookbackend.onrender.com/api/booking/getAllBookings")

        dispatch({
            type: GET_ALL_BOOKING_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: GET_ALL_BOOKING_FAIL,
            payload: error
        })
    }
}

export const changeBookingStatusAction = (changedata) => async (dispatch) => {
    try {
        dispatch({ type: CHANGE_BOOKSTATUS_REQ })

        const { data } = await axios.put("https://exhibookbackend.onrender.com/api/booking/changeBookingStatus", changedata)

        dispatch({
            type: CHANGE_BOOKSTATUS_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: CHANGE_BOOKSTATUS_FAIL,
            payload: error
        })
    }
}

export const getTimeslotsByRoomNameAndDateAction = (bookdateDetails) => async (dispatch) => {
    try {
        dispatch({ type: TIMESLOTSBYROOMNAMEANDDATE_REQ })

        const { data } = await axios.post("https://exhibookbackend.onrender.com/api/timeSlots/getTimeSlotsByRoomNameAndDate",bookdateDetails)

        dispatch({
            type: TIMESLOTSBYROOMNAMEANDDATE_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: TIMESLOTSBYROOMNAMEANDDATE_FAIL,
            payload: error
        })
    }
}