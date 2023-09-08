import { CREATE_EVENTREQUEST_FAIL, CREATE_EVENTREQUEST_REQ, CREATE_EVENTREQUEST_SUCCESS, GET_ALL_EVENTS_FAIL, GET_ALL_EVENTS_REQ, GET_ALL_EVENTS_SUCCESS, USER_BOOKLIST_EMAIL_FAIL, USER_BOOKLIST_EMAIL_REQ, USER_BOOKLIST_EMAIL_SUCCESS } from "../constants/userEventsConstant"
import axios from "axios"

export const usergetAllEventsAction = () => async (dispatch) => {
    try {
        dispatch({ type: GET_ALL_EVENTS_REQ })

        const { data } = await axios.get(`https://exhibookbackend.onrender.com/api/events/getAllEvents`)

        dispatch({
            type: GET_ALL_EVENTS_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: GET_ALL_EVENTS_FAIL,
            payload: error
        })
    }
}

export const userbookListAction = (useremail) => async (dispatch) => {
    try {
        dispatch({ type: USER_BOOKLIST_EMAIL_REQ })

        const { data } = await axios.post("https://exhibookbackend.onrender.com/api/booking/getBookingList", useremail)

        dispatch({
            type: USER_BOOKLIST_EMAIL_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: USER_BOOKLIST_EMAIL_FAIL,
            payload: error
        })
    }
}

export const createEventRequestAction = (userreqdata) => async(dispatch) => {
    try {
        dispatch({ type:CREATE_EVENTREQUEST_REQ})

        const {data} = await axios.post("https://exhibookbackend.onrender.com/api/eventRequest/createEventRequest",userreqdata)

        dispatch({
            type:CREATE_EVENTREQUEST_SUCCESS,
            payload:data
        })
    } catch (error) {
        dispatch({
            type:CREATE_EVENTREQUEST_FAIL,
            payload:error
        })
    }
}