import React, { useState, useEffect } from 'react'
import "./Roomtime.css"
import Navbar4 from '../../navbar/Navbar4';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { checkpremiumAction } from '../../../redux/actions/userRoomAction'
import { useParams } from 'react-router-dom';
import { createbookAction } from '../../../redux/actions/userRoomAction'
import { useNavigate } from 'react-router-dom';
import ReactCalendar from 'react-calendar';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ColorRing } from "react-loader-spinner"
import { createbookActionReset } from '../../../redux/actions/userRoomAction';

const Roomtime = () => {

    const { EventId, RoomName, EventName } = useParams()

    const timeslotsRoomname = useSelector(state => state.timeslotsRoomname)
    const { message } = timeslotsRoomname

    const [newtimeslot, setNewtimeslot] = useState({})
    const [BookingDate, setBookingDate] = useState("")
    const [Description, setDescription] = useState("")
    const [IsPremium, setIsPremium] = useState(null)

    const [openCalender, setOpenCalender] = useState(false)

    const userSignin = useSelector(state => state.userSignin)
    const { response } = userSignin.personinfo

    const createbook = useSelector(state => state.createbook)
    const { loading, response: responsebook } = createbook

    console.log(responsebook)

    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        if (responsebook) {
            navigate("/user/bookinglist")
            dispatch(createbookActionReset())
        }
    }, [responsebook, navigate, dispatch])

    useEffect(() => {
        if (userSignin.personinfo && Object.keys(userSignin.personinfo).length === 0) {
            navigate("/user/signin")
        }
    }, [userSignin.personinfo, navigate]);

    const [selectedDate, setSelectedDate] = useState(null);

    const onChange = (date) => {
        if (date instanceof Date) {
            const formattedDate = moment(date).format('DD/MM/YY');
            if (formattedDate) {
                setBookingDate(formattedDate)
            }

            const currenttimeslot = message.find((time) => time.Date === formattedDate)
            setNewtimeslot(currenttimeslot)

            const calendardata = { Email: response.Email, BookingDate: formattedDate, EventId: EventId };

            dispatch(checkpremiumAction(calendardata))
        }
    };

    const checkpremium = useSelector(state => state.checkpremium)

    const { bookingStatusForEvents } = checkpremium

    const [dropdown, setDropdown] = useState(false)

    const [selectedTime, setSelectedTime] = useState("Select TimeSlot");
    
    const handleOptionClick = (item, premium) => {
        setSelectedTime(item.Value);
        setIsPremium(premium)
        setDropdown(false);
    };

    const bookhandler = async () => {
        if (!BookingDate && !selectedTime && !Description) {
            toast.error('All fields are required!', {
                style: {
                    fontSize: '1.4rem',
                },
            });
        } else if (!selectedTime) {
            toast.error('Timeslot must be present', {
                style: {
                    fontSize: '1.4rem',
                },
            });
        } else if (selectedTime === "Select TimeSlot") {
            toast.error('Timeslot must be present', {
                style: {
                    fontSize: '1.4rem',
                },
            });
        } else if (!Description) {
            toast.error('Description must be present', {
                style: {
                    fontSize: '1.4rem',
                },
            });
        } else {
            const bookdata = {
                Email: response.Email,
                EventName,
                RoomName,
                Description,
                BookingDate,
                EventId,
                TimeSlot: selectedTime,
                IsPremium
            }
            dispatch(createbookAction(bookdata))
            toast.success('Booking created successfully!', {
                style: {
                    fontSize: '1.4rem',
                },
            });
            console.log(bookdata)
        }
    }

    // console.log(bookingStatusForEvents && bookingStatusForEvents[0].RemainingSlots === 0 ? true : false)
    return (
        <>
            <Navbar4 />

            <main className='room-time'>
                <div>
                    <img src="https://image-tc.galaxy.tf/wijpeg-6mdcxnv1m5wtwwq0st73c9irc/meetingspace.jpg?width=2000" alt="" />
                </div>
                <div>
                    <div>
                        <h1>Calender</h1>
                        <div className='calender-div'>
                            <input
                                type="text"
                                value={BookingDate}
                                placeholder='DD/MM/YY'
                                onClick={() => setOpenCalender(!openCalender)}
                            />
                            {
                                openCalender && <div onMouseLeave={() => setOpenCalender(false)}><ReactCalendar
                                    onChange={onChange}
                                    value={selectedDate}
                                    minDate={moment(message && message[0].Date, "DD/MM/YY").toDate()}
                                    maxDate={moment(message && message[message.length - 1].Date, "DD/MM/YY").toDate()}
                                /></div>
                            }
                        </div>
                    </div>
                    <div>
                        <h1>Available Time Slots </h1>
                        <div>
                            <input
                                type="text"
                                onClick={() => setDropdown(!dropdown)}
                                value={selectedTime}
                                readOnly
                            />
                        </div>

                        {dropdown && (
                            <ul className='dropdown'>
                                {/* {
                                    newtimeslot && newtimeslot.TimeSlots ? newtimeslot.TimeSlots.map((time) => (
                                        time.IsPremium ? <button className={time.IsBooked ? "premium-time-book1" : "premium-time"} key={time._id} onClick={() => handleOptionClick(time, time.IsPremium)}
                                            disabled={time.IsBooked}
                                        >
                                            <p>{time.Value}</p>
                                            <div style={{
                                                borderBottom: "1px solid white",
                                                paddingBottom: "0.2rem"
                                            }}><img src="/vector.png" alt="premium"/></div>
                                        </button> : <button
                                            className={time.IsBooked ? "premium-time-book2" : 'premium-time2'}
                                            onClick={() => handleOptionClick(time, time.IsPremium)}
                                            key={time._id}
                                            disabled={time.IsBooked}
                                        ><p>{time.Value}</p></button>

                                    )) : <p style={{
                                        borderBottom: "none"
                                    }}>No TimeSlot Available</p>
                                } */}

                                {
                                    newtimeslot && newtimeslot.TimeSlots ? newtimeslot.TimeSlots.map((time) => (
                                        time.IsPremium ? (
                                            <button
                                                className={time.IsBooked ? "premium-time-book1" : "premium-time"}
                                                key={time._id}
                                                onClick={() => handleOptionClick(time, time.IsPremium)}
                                                disabled={time.IsBooked || (bookingStatusForEvents && bookingStatusForEvents[0].RemainingSlots === 0)}
                                            >
                                                <p>{time.Value}</p>
                                                <div style={{
                                                    borderBottom: "1px solid white",
                                                    paddingBottom: "0.2rem"
                                                }}><img src="/vector.png" alt="premium" /></div>
                                            </button>
                                        ) : (
                                            <button
                                                className={time.IsBooked ? "premium-time-book2" : 'premium-time2'}
                                                onClick={() => handleOptionClick(time, time.IsPremium)}
                                                key={time._id}
                                                disabled={time.IsBooked}
                                            >
                                                <p>{time.Value}</p>
                                            </button>
                                        )
                                    )) : <p style={{
                                        borderBottom: "none"
                                    }}>No TimeSlot Available</p>
                                }

                            </ul>
                        )}

                    </div>

                    <div className='premium'>

                        <h1 className='desc'>Description</h1>

                        <textarea placeholder="Enter Description" className='textarea' value={Description} onChange={(e) => setDescription(e.target.value)} >
                            At w3schools.com you will learn how to make a website. They offer free tutorials in all web development technologies.
                        </textarea>
                    </div>


                    <div>
                        <button className='room-btn2' onClick={bookhandler}>{
                            loading ? <ColorRing
                                height="40"
                                width="40"
                                colors={['#fff', '#fff', '#fff', '#fff', '#fff']}
                            /> : "Book Now"
                        }</button>

                        {
                            bookingStatusForEvents && bookingStatusForEvents.length > 0 && bookingStatusForEvents.map((book, index) => (
                                <div key={index} className='remaining-slot'>
                                    <div><img src="/vector.png" alt="premium" /></div>
                                    <p>Premium Balance : {book.RemainingSlots}  </p>
                                </div>
                            ))
                        }
                    </div>
                    <ToastContainer />
                </div>
            </main>
        </>
    )
}

export default Roomtime