import React, { useEffect } from 'react'
import "./Userevent.css"
import Navbar2 from '../../navbar/Navbar2'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import { useDispatch, useSelector } from 'react-redux';
import { usergetAllEventsAction } from '../../../redux/actions/userEventsAction'
import { useNavigate } from 'react-router-dom';
import { createEventRequestAction } from '../../../redux/actions/userEventsAction';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ColorRing } from "react-loader-spinner"

const Userevent = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(usergetAllEventsAction())
  }, [dispatch])

  const usergetAllEvents = useSelector(state => state.usergetAllEvents)
  const { Events } = usergetAllEvents

  const userSignin = useSelector(state => state.userSignin)
  const { response } = userSignin.personinfo

  const getAllEvents = useSelector(state => state.getAllEvents)
  const { loading } = getAllEvents

  useEffect(() => {
    if (userSignin.personinfo && Object.keys(userSignin.personinfo).length === 0) {
        navigate("/user/signin")
    } 
  }, [userSignin.personinfo,navigate]);

  const showrooms = (id) => {

    const currentEvent = Events && Events.find((event) => event._id === id)

    if (currentEvent) {
      const user = currentEvent.AllowedUsers.find((user) => user.Users === response.Email)
      if (user && user.Users) {
        console.log(`User is Present:${user.Users}`)
        navigate(`/user/userroom/${id}`)
      } else {
        console.log("User is not Present")
        let modal = window.confirm("You are not allowed.Ask For permission?")
        if (modal) {
          const userreqdata = { Email: response.Email, EventName: currentEvent.EventName, EventId: currentEvent.EventId, PremiumSlots: 10 }
          console.log(userreqdata)
          dispatch(createEventRequestAction(userreqdata))
          console.log("permission sent")
        } else {
          console.log("no")
        }
      }
    }

  }

  return (
    <>
      <Navbar2 />
      <main className='user-event-dashboard'>
        <div style={{ display: "none" }}>
          <div className='us-crt-btn'>Create New</div>
        </div>

        {
           loading ? <div className='loader-div'><ColorRing
           colors={['#fff', '#fff', '#fff', '#fff', '#fff']}
         /></div> : <Carousel
         showThumbs={false}
         showStatus={false}
       >       
         {
           Events && Events.length > 0 && Events.map((event) => (
             <div className='carousel-slide' key={event._id} onClick={() => showrooms(event._id)}>
           <div>
             <img src="/booklogo.png" alt='dsei-image'/>
           </div>
           <div>
             <div>
               <p>Event Name : {event.EventName}</p>
               <p>Description : {event.Description}</p>
               <p>StartDate : {event.StartDate}</p>
               <p>EndDate : {event.EndDate}</p>
             </div>
             <div>
               <p>IntervalTime : {event.IntervalTime}</p>
               <p>Location : {event.Location}</p>
               <p>Capacity : {event.Capacity}</p>
             </div>
           </div>
         </div>
           ))
         }

       </Carousel>
        }
        
        {/* <div className='user-event-header'>
          <p>Event Name</p>
          <p>Description</p>
          <p>StartDate</p>
          <p>EndDate</p>
          <p>IntervalTime</p>
          <p>Location</p>
          <p>Capacity</p>
        </div> */}

        {/* <div className='user-event-content'>
          {
            loading ? <div className='loader-div'><ColorRing
              colors={['#fff', '#fff', '#fff', '#fff', '#fff']}
            /></div> :
              Events && Events.length > 0 && Events.map((event) => (
                <div key={event._id} onClick={() => showrooms(event._id)}>
                  <p>{event.EventName}</p>
                  <p>{event.Description}</p>
                  <p>{event.StartDate}</p>
                  <p>{event.EndDate}</p>
                  <p>{event.IntervalTime}</p>
                  <p>{event.Location}</p>
                  <p>{event.Capacity}</p>
                </div>
              ))
          }
        </div> */}
      </main>
      <ToastContainer />
    </>
  )
}

export default Userevent

