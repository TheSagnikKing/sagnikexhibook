import { APPROVE_EVENTS_FAIL, APPROVE_EVENTS_REQ, APPROVE_EVENTS_SUCCESS, CREATE_EVENT_FAIL, CREATE_EVENT_REQ, CREATE_EVENT_SUCCESS, GET_ALL_EVENTS_FAIL, GET_ALL_EVENTS_REQ, GET_ALL_EVENTS_SUCCESS, GET_ALL_EXHIBITION_FAIL, GET_ALL_EXHIBITION_REQ, GET_ALL_EXHIBITION_SUCCESS, GET_ALL_USERS_FAIL, GET_ALL_USERS_REQ, GET_ALL_USERS_SUCCESS } from "../constants/adminEventsConstants";

export const getAllEventsReducer = (state = {}, action) => {
    switch (action.type) {
        case GET_ALL_EVENTS_REQ:
            return { loading: true }
        case GET_ALL_EVENTS_SUCCESS:
            return { loading: false, Events: action.payload }
        case GET_ALL_EVENTS_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const createEventReducer = (state = {}, action) => {
    switch (action.type) {
        case CREATE_EVENT_REQ:
            return { loading: true }
        case CREATE_EVENT_SUCCESS:
            return { loading: false, newEvent: action.payload }
        case CREATE_EVENT_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const getAllExhibitionReducer = (state = {}, action) => {
    switch (action.type) {
        case GET_ALL_EXHIBITION_REQ:
            return { loading: true }
        case GET_ALL_EXHIBITION_SUCCESS:
            return { loading: false, Exhibitions: action.payload }
        case GET_ALL_EXHIBITION_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const approveEventReducer = (state = {}, action) => {
    switch (action.type) {
        case APPROVE_EVENTS_REQ:
            return { loading: true }
        case APPROVE_EVENTS_SUCCESS:
            return { loading: false, approval: action.payload }
        case APPROVE_EVENTS_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const getAllusersReducer = (state = {}, action) => {
    switch (action.type) {
        case GET_ALL_USERS_REQ:
            return { loading: true }
        case GET_ALL_USERS_SUCCESS:
            return { loading: false, ...action.payload }
        case GET_ALL_USERS_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}
