import { APPROVE_EVENTS_FAIL, APPROVE_EVENTS_REQ, APPROVE_EVENTS_SUCCESS, CREATE_EVENT_FAIL, CREATE_EVENT_REQ, CREATE_EVENT_SUCCESS, GET_ALL_EVENTS_FAIL, GET_ALL_EVENTS_REQ, GET_ALL_EVENTS_SUCCESS, GET_ALL_EXHIBITION_FAIL, GET_ALL_EXHIBITION_REQ, GET_ALL_EXHIBITION_SUCCESS, GET_ALL_USERS_FAIL, GET_ALL_USERS_REQ, GET_ALL_USERS_SUCCESS } from "../constants/adminEventsConstants"
import axios from "axios"

export const getAllEventsAction = () => async (dispatch) => {
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

export const createEventAction = (eventdata) => async (dispatch) => {
    try {
        dispatch({ type: CREATE_EVENT_REQ })

        const { data } = await axios.post("https://exhibookbackend.onrender.com/api/events/createEvent", eventdata)
        console.log(data)
        dispatch({
            type: CREATE_EVENT_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: CREATE_EVENT_FAIL,
            payload: error
        })
    }
}

export const getAllExhibitionAction = () => async (dispatch) => {
    try {
        dispatch({ type: GET_ALL_EXHIBITION_REQ })

        const { data } = await axios.get(`https://exhibookbackend.onrender.com/api/eventRequest/getAllEventRequests`)

        dispatch({
            type: GET_ALL_EXHIBITION_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: GET_ALL_EXHIBITION_FAIL,
            payload: error
        })
    }
}

export const approveEventAction = (approvedata) => async (dispatch) => {
    try {
        dispatch({ type: APPROVE_EVENTS_REQ })

        const { data } = await axios.put(`https://exhibookbackend.onrender.com/api/eventRequest/approveEventRequests`, approvedata)

        dispatch({
            type: APPROVE_EVENTS_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: APPROVE_EVENTS_FAIL,
            payload: error
        })
    }
}

export const getAllusersAction = () => async(dispatch) => {
    try {
        dispatch({type:GET_ALL_USERS_REQ})

        const {data} = await axios.get("https://exhibookbackend.onrender.com/api/user/getAllUsers")

        dispatch({
            type:GET_ALL_USERS_SUCCESS,
            payload:data
        })
    } catch (error) {
        dispatch({
            type:GET_ALL_USERS_FAIL,
            payload:error
        })
    }
}
