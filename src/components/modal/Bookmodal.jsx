import React, { useEffect } from 'react'
import ReactDOM from 'react-dom';
import "./Bookmodal.css"
import { useSelector } from 'react-redux';
import { ColorRing } from "react-loader-spinner"

const Bookmodal = ({ bookshowmodal, setBookshowmodal }) => {


    const MyBookmodal = ({ setBookshowmodal }) => {
        const bookmodalsave = () => {
            setBookshowmodal(false);
        };

        const getTimeslotsByRoomNameAndDate = useSelector(state => state.getTimeslotsByRoomNameAndDate)
        const { response, loading } = getTimeslotsByRoomNameAndDate

        console.log(response && response.TimeSlots)
        return ReactDOM.createPortal(
            <>
                <div className='book-modal-wrapper' onClick={() => setBookshowmodal(false)}>
                    <div className='book-modal-container'>
                        {
                            loading ? <div className='bookmodal-loader'><ColorRing
                                colors={['#fff', '#fff', '#fff', '#fff', '#fff']}
                            /></div> : <><div className='book-modal-head'>
                                <p>Timeslots</p>
                                <p>Booked</p>
                            </div>
                                <div className='book-modal-content'>
                                    {
                                        response && response.TimeSlots && response.TimeSlots.map((time) => (
                                            <div key={time._id}>
                                                <div>
                                                    {time.IsPremium ? <div className='bookmodal-premium-ur-time'>
                                                        <p>{time.Value}</p>
                                                        <img src="/vector.png" alt="" />
                                                    </div> : <p className='bookmodal-nonpremium-ur-time'>{time.Value}</p>}
                                                </div>

                                                {time.IsBooked ? <p>True</p> : <p>False</p>}
                                            </div>
                                        ))
                                    }
                                </div>
                            </>
                        }

                        {/* <div>
                           { 2!=2 ? <div className='premium-ur-time'>
                                <p>22:00-21:00</p>
                                <img src="/vector.png" alt="" />
                            </div> : <p className='time1'>23:00-24:00</p>}
                        </div> */}
                    </div>
                </div>
            </>,
            document.querySelector(".mybookPortalModalDiv")
        );
    };

    useEffect(() => {
        if (bookshowmodal) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }

        return () => {
            document.body.style.overflow = 'auto'; // Reset overflow on component unmount
        };
    }, [bookshowmodal]);


    return (<>
        {bookshowmodal && <MyBookmodal bookshowmodal={bookshowmodal} setBookshowmodal={setBookshowmodal} />}
    </>
    )
}

export default Bookmodal