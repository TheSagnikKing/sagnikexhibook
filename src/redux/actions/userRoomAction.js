import axios from "axios";
import { CHECKPREMIUM_FAIL, CHECKPREMIUM_REQ, CHECKPREMIUM_SUCCESS, CREATE_BOOK_FAIL, CREATE_BOOK_REQ, CREATE_BOOK_RESET, CREATE_BOOK_SUCCESS, TIMESLOTSBY_ROOMNAME_FAIL, TIMESLOTSBY_ROOMNAME_REQ, TIMESLOTSBY_ROOMNAME_SUCCESS } from "../constants/userRoomConstants";

export const checkpremiumAction = (calenderdata) => async (dispatch) => {
    try {
        dispatch({ type: CHECKPREMIUM_REQ })

        const { data } = await axios.post("https://exhibookbackend.onrender.com/api/booking/checkPreniumLimit", calenderdata)

        dispatch({
            type: CHECKPREMIUM_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: CHECKPREMIUM_FAIL,
            payload: error
        })
    }
}

export const timeslotsRoomnameAction = (timeslotdata) => async (dispatch) => {
    try {
        dispatch({ type: TIMESLOTSBY_ROOMNAME_REQ })

        const { data } = await axios.post("https://exhibookbackend.onrender.com/api/timeSlots/getTimeSlotsByRoomName", timeslotdata)
        console.log(data)
        dispatch({
            type: TIMESLOTSBY_ROOMNAME_SUCCESS,
            payload: data
        })
        localStorage.setItem("TimeSlot", JSON.stringify(data))
    } catch (error) {
        dispatch({
            type: TIMESLOTSBY_ROOMNAME_FAIL,
            payload: error
        })
    }
}

export const createbookAction = (bookdata) => async (dispatch) => {
    try {
        dispatch({ type: CREATE_BOOK_REQ })

        const { data } = await axios.post("https://exhibookbackend.onrender.com/api/booking/createBooking", bookdata)

        dispatch({
            type: CREATE_BOOK_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: CREATE_BOOK_FAIL,
            payload: error
        })
    }
}

export const createbookActionReset = () => async(dispatch) => {
        dispatch({
            type:CREATE_BOOK_RESET
        })
}