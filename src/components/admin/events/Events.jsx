import React, { useEffect, useState } from 'react';
import './Events.css';
import Navbar from '../../navbar/Navbar';
import Sidebar from '../../sidebar/Sidebar';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { useDispatch, useSelector } from 'react-redux';
import { getAllEventsAction } from '../../../redux/actions/adminEventsActions';
import { Link } from 'react-router-dom';
import { ColorRing } from 'react-loader-spinner';
import { useNavigate } from 'react-router-dom';

const Events = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(getAllEventsAction());
  },[dispatch])

  const getAllEvents = useSelector((state) => state.getAllEvents);
  const { Events, loading } = getAllEvents;

  const adminSignin = useSelector(state => state.adminSignin)

  useEffect(() => {
    if(adminSignin.userinfo && Object.keys(adminSignin.userinfo).length === 0){
      navigate("/admin/signin")
    }
  },[adminSignin.userinfo,navigate])

  // const EditHandler = (EventId,EventName) => {
  //   navigate(`/admin/editevent/${EventId}/${EventName}`)
  // }

  return (
    <>
      <Navbar/>
      <Sidebar height={88}/>
      <main className="event-dashboard">
        <div>
          <Link to="/admin/createevent" className="crt-btn">
            Create New
          </Link>
        </div>

        <div className="admin-event-header">
          <p>EventName</p>
          <p>Description</p>
          <p>StartDate</p>
          <p>EndDate</p>
          <p>IntervalTime</p>
          <p>Location</p>
          <p>Capacity</p>
        </div>

        <div className="admin-event-content">
          {loading ? (
            <div className="admin-loader">
              <ColorRing colors={['#fff', '#fff', '#fff', '#fff', '#fff']} />
            </div>
          ) : Events && Events.length > 0 ? (
            Events.map((event) => (
              <div key={event._id}>
                <p>{event.EventName}</p>
                <p>{event.Description}</p>
                <p>{event.StartDate}</p>
                <p>{event.EndDate}</p>
                <p>{event.IntervalTime}</p>
                <p>{event.Location}</p>
                <p>{event.Capacity}</p>
                {/* <button onClick={() => EditHandler(event.EventId,event.EventName)}>Edit</button> */}
              </div>
            ))
          ) : (
            <p>No events available.</p>
          )}
        </div>
      </main>
    </>
  );
};

export default Events;
