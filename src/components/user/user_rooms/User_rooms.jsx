import React, { useEffect } from 'react'
import "./User_rooms.css"
// import Navbar2 from '../../navbar/Navbar2'
import Navbar4 from '../../navbar/Navbar4'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { usergetAllEventsAction } from '../../../redux/actions/userEventsAction'
import { timeslotsRoomnameAction } from '../../../redux/actions/userRoomAction'
import { useNavigate } from 'react-router-dom'

import { ColorRing } from "react-loader-spinner"

const User_rooms = () => {

    const { id } = useParams()

    const dispatch = useDispatch()
    const usergetAllEvents = useSelector(state => state.usergetAllEvents)
    const { Events, loading } = usergetAllEvents

    const userSignin = useSelector(state => state.userSignin)
    const { response } = userSignin.personinfo

    useEffect(() => {
        dispatch(usergetAllEventsAction())
    }, [dispatch])

    const currentEvent = Events && Events.find((event) => event._id === id)

    const navigate = useNavigate()

    useEffect(() => {
        if (userSignin.personinfo && Object.keys(userSignin.personinfo).length === 0) {
            navigate("/user/signin")
        }
    }, [userSignin.personinfo, navigate]);

    const submitHandler = async (RoomName) => {

        const timeslotdata = {
            EventId: currentEvent.EventId, RoomName
        }
        dispatch(timeslotsRoomnameAction(timeslotdata))
        navigate(`/user/roomtime/${currentEvent.EventId}/${RoomName}/${currentEvent.EventName}`)
    }

    return (
        <>
            <Navbar4 />
            <main className='user-rooms'>
                {
                    loading ? <div className='loader-div-userroom'><ColorRing
                        colors={['#fff', '#fff', '#fff', '#fff', '#fff']}
                    /></div> : <div>
                        {
                            currentEvent && currentEvent.Rooms.map((room) => (
                                <div key={room._id}>
                                    <h1>ROOM</h1>
                                    <div>
                                        <p>Name: {room.Name}</p>
                                        <p>Seating Capacity: {room.SeatingCapacity}</p>
                                        <p>Feature1: {room.Feature1}</p>
                                        <p>Feature2: {room.Feature2}</p>
                                    </div>
                                    <div className='room-btn' onClick={() => submitHandler(room.Name)}>Book</div>
                                </div>
                            ))
                        }
                    </div>
                }

            </main>
        </>
    )
}

export default User_rooms