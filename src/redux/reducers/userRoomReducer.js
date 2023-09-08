import { CHECKPREMIUM_FAIL, CHECKPREMIUM_REQ, CHECKPREMIUM_SUCCESS, CREATE_BOOK_FAIL, CREATE_BOOK_REQ, CREATE_BOOK_RESET, CREATE_BOOK_SUCCESS, TIMESLOTSBY_ROOMNAME_FAIL, TIMESLOTSBY_ROOMNAME_REQ, TIMESLOTSBY_ROOMNAME_SUCCESS } from "../constants/userRoomConstants";

export const checkpremiumReducer = (state = {}, action) => {
    switch(action.type){
        case CHECKPREMIUM_REQ:
            return {loading:true}
        case CHECKPREMIUM_SUCCESS:
            return {loading:false, ...action.payload}
        case CHECKPREMIUM_FAIL:
            return {loading:false, error:action.payload}
        default:
            return state
    }
}

export const timeslotsRoomnameReducer = (state = {}, action) => {
    switch(action.type){
        case TIMESLOTSBY_ROOMNAME_REQ:
            return {loading:true}
        case TIMESLOTSBY_ROOMNAME_SUCCESS:
            return {loading:false, ...action.payload}
        case TIMESLOTSBY_ROOMNAME_FAIL:
            return {loading:false, error:action.payload}
        default:
            return state
    }
}

export const createbookReducer = (state = {},action) => {
    switch(action.type){
        case CREATE_BOOK_REQ:
            return {loading:true}
        case CREATE_BOOK_SUCCESS:
            return {loading:false,...action.payload}
        case CREATE_BOOK_FAIL:
            return {loading:false,error:action.payload}
        case CREATE_BOOK_RESET:
            return {}
        default:
            return state
    }
}