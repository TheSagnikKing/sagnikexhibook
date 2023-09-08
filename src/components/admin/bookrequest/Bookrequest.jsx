import React, { useEffect, useState } from 'react'
import "./Bookrequest.css"
import Navbar from "../../navbar/Navbar"
import Sidebar from "../../sidebar/Sidebar"
import { useDispatch, useSelector } from 'react-redux'
import { getAllBookingAction, changeBookingStatusAction,getTimeslotsByRoomNameAndDateAction } from '../../../redux/actions/adminBookingAction'
import { ColorRing } from 'react-loader-spinner';
import { useNavigate } from 'react-router-dom'
import Bookmodal from '../../modal/Bookmodal'

const Bookrequest = () => {

    const [bookshowmodal, setBookshowmodal] = useState(false)

    // Define an initial state for user approvals
    const initialUserApprove = {};

    const [userApprove, setUserApprove] = useState(initialUserApprove);

    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(getAllBookingAction())
    }, [dispatch])

    const adminSignin = useSelector(state => state.adminSignin)

    useEffect(() => {
        if (adminSignin.userinfo && Object.keys(adminSignin.userinfo).length === 0) {
            navigate("/admin/signin")
        }
    }, [adminSignin.userinfo, navigate])

    const getAllBooking = useSelector(state => state.getAllBooking)
    const { bookings, loading } = getAllBooking


    const rejectHandler = async (Email, EventId, BookingId, BookingStatus) => {
        const changedata = { Email, EventId, BookingId, BookingStatus }
        dispatch(changeBookingStatusAction(changedata))
        setTimeout(() => {
            window.location.reload()
        }, 1200);
    }

    const approveHandler = async (Email, EventId, BookingId, BookingStatus) => {
        const changedata = { Email, EventId, BookingId, BookingStatus }
        dispatch(changeBookingStatusAction(changedata))
        setTimeout(() => {
            window.location.reload()
        }, 1200);
    }

    const bookdatelistHandler = (EventId,RoomName,Date) => {
        setBookshowmodal(true)
        const bookdateDetails = {EventId,RoomName,Date}
        console.log(bookdateDetails)
        dispatch(getTimeslotsByRoomNameAndDateAction(bookdateDetails))
    }

    return (
        <>
            <Navbar />
            <Sidebar height={95} />
            <main className='bookrequest'>
                <div className="bookrequest-header">
                    <p>Email address</p>
                    <p>Exhibition name</p>
                    <p>Room Name</p>
                    <p>Booking Date</p>
                    <p>Booking Time</p>
                    <p>Booking Status</p>
                </div>

                <div className='bookrequest-content'>
                    {
                        loading ? <div className='admin-loader'><ColorRing
                            colors={['#fff', '#fff', '#fff', '#fff', '#fff']}
                        /></div> : bookings && bookings.length > 0 && bookings.map((user) => (
                            <div key={user._id}>
                                <p>{user.Email}</p>
                                <p>{user.EventName}</p>
                                <p>{user.RoomName}</p>
                                <p onClick={() => bookdatelistHandler(user.EventId,user.RoomName,user.BookingDate)}
                                style={{cursor:"pointer",textDecoration:"underline",color:"var(--bg-color-2)"}}
                                >{user.BookingDate}</p>
                                {
                                    user.IsPremium ? <div>
                                        <p>{user.TimeSlot}</p>
                                        <img src="/vector.png" alt="" />
                                    </div> : <p className='time1'>{user.TimeSlot}</p>
                                }

                                {
                                    user.BookingStatus === "Waiting" &&
                                    <div>
                                        <div onClick={() => approveHandler(user.Email, user.EventId, user.BookingId, "Approved")} className='approve1'>Approve</div>
                                        <div onClick={() => rejectHandler(user.Email, user.EventId, user.BookingId, "Rejected")} className='reject1'>Reject</div>
                                    </div>
                                }


                                {
                                    user.BookingStatus === "Approved" &&
                                    <div>
                                        <div className='approve2' style={{ cursor: "default" }}>Approved</div>
                                        <div className='reject2'>Reject</div>
                                    </div>
                                }
                                {
                                    user.BookingStatus === "Rejected" &&
                                    <div>
                                        <div className='approve3'>Approve</div>
                                        <div className='reject3'>Rejected</div>
                                    </div>
                                }
                            </div>

                        ))
                    }

                </div>
            </main>
            <Bookmodal bookshowmodal={bookshowmodal} setBookshowmodal={setBookshowmodal} />
        </>
    )
}

export default Bookrequest