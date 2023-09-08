import React, { useEffect } from 'react'
import "./Bookinglist.css"
import Navbar2 from '../../navbar/Navbar2'
import { useDispatch, useSelector } from 'react-redux'
import { userbookListAction } from "../../../redux/actions/userEventsAction"
import { useNavigate } from 'react-router-dom'
import { ColorRing } from "react-loader-spinner"

const Bookinglist = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const userSignin = useSelector(state => state.userSignin)
    const { response } = userSignin.personinfo

    useEffect(() => {
        const bookdata = { Email: response && response.Email }

        dispatch(userbookListAction(bookdata))
    }, [])

    useEffect(() => {
        if (userSignin.personinfo && Object.keys(userSignin.personinfo).length === 0) {
            navigate("/user/signin")
        }
    }, [userSignin.personinfo, navigate]);

    const userbookList = useSelector(state => state.userbookList)
    const { booklist,loading } = userbookList


    return (
        <>
            <Navbar2 />
            <main className='bookilist'>
                <div className="book-head">
                    <p>Exhibiton Name</p>
                    <p>Room no</p>
                    <p>Booking Date</p>
                    <p>Booking Time</p>
                    <p>Booking Status</p>
                </div>

                <div className="book-content">
                    {
                        loading ? <div className='loader-div'><ColorRing
                        colors={['#fff', '#fff', '#fff', '#fff', '#fff']}
                      /></div> : 
                            booklist && booklist.length > 0 && booklist.map((user) => (
                                <div key={user._id}>
                                    <p>{user.EventName}</p>
                                    <p>{user.RoomName}</p>
                                    <p>{user.BookingDate}</p>
                                    {
                                    user.IsPremium ? <div className='premium-ur-time'>
                                        <p>{user.TimeSlot}</p>
                                        <img src="/vector.png" alt="" />
                                    </div> : <p className='time1'>{user.TimeSlot}</p>
                                }
                                    
                                    {
                                        user.BookingStatus === "Approved" ? <p style={{ color: "green",fontWeight:"bold" }}>Approved</p> :
                                        user.BookingStatus === "Rejected" ? <p style={{ color: "red",fontWeight:"bold" }}>Rejected</p> :
                                        user.BookingStatus === "Waiting" && <p style={{ color: "white",fontWeight:"bold" }}>Waiting</p>
                                    }
                                </div>
                            ))
                    }
                </div>
            </main>
        </>
    )
}

export default Bookinglist