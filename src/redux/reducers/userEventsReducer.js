import { CREATE_EVENTREQUEST_FAIL, CREATE_EVENTREQUEST_REQ, CREATE_EVENTREQUEST_SUCCESS, GET_ALL_EVENTS_FAIL, GET_ALL_EVENTS_REQ, GET_ALL_EVENTS_SUCCESS, USER_BOOKLIST_EMAIL_FAIL, USER_BOOKLIST_EMAIL_REQ, USER_BOOKLIST_EMAIL_SUCCESS } from "../constants/userEventsConstant"

export const usergetAllEventsReducer = (state = {},action) => {
    switch(action.type){
        case GET_ALL_EVENTS_REQ:
            return {loading:true}
        case GET_ALL_EVENTS_SUCCESS:
            return {loading:false, Events:action.payload}
        case GET_ALL_EVENTS_FAIL:
            return {loading:false, error:action.payload}
        default:
            return state
    }
}

export const userbookListReducer = (state = {}, action) => {
    switch(action.type){
        case USER_BOOKLIST_EMAIL_REQ:
            return {loading:true}
        case USER_BOOKLIST_EMAIL_SUCCESS:
            return {loading:false, booklist:action.payload}
        case USER_BOOKLIST_EMAIL_FAIL:
            return {loading:false, error:action.payload}
        default:
            return state
    }
}

export const createEventRequestReducer = (state = {}, action) => {
    switch(action.type){
        case CREATE_EVENTREQUEST_REQ:
            return {loading:true}
        case CREATE_EVENTREQUEST_SUCCESS:
            return {loading:false, ...action.payload}
        case CREATE_EVENTREQUEST_FAIL:
            return {loading:false, error:action.payload}
        default:
            return state
    }
}