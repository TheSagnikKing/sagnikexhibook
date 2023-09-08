import React, { useEffect, useState } from 'react'
import "./Exhibition.css"
import Navbar from '../../navbar/Navbar'
import Sidebar from '../../sidebar/Sidebar'
import { useDispatch, useSelector } from 'react-redux'
import { getAllExhibitionAction, approveEventAction } from "../../../redux/actions/adminEventsActions"
import { ColorRing } from 'react-loader-spinner';
import { useNavigate } from 'react-router-dom'

const Exhibition = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(getAllExhibitionAction())
  }, [dispatch])

  const adminSignin = useSelector(state => state.adminSignin)

  useEffect(() => {
    if(adminSignin.userinfo && Object.keys(adminSignin.userinfo).length === 0){
      navigate("/admin/signin")
    }
  },[adminSignin.userinfo,navigate])

  const getAllExhibition = useSelector(state => state.getAllExhibition)
  const exhibition_data = getAllExhibition.Exhibitions

  const getExhibitionLoader = useSelector(state => state.getAllExhibition)
  const { loading } = getExhibitionLoader

  // Define an initial state for user approvals
  const initialUserApprove = {};

  const [userApprove, setUserApprove] = useState(initialUserApprove);

  const [Slots, setSlots] = useState(4)

  const increaseSlot = (id) => {

    const getIndex = exhibition_data.findIndex(obj => {
      return obj._id === id;
    });

    exhibition_data[getIndex].PremiumSlots = exhibition_data[getIndex].PremiumSlots + 1;
    setSlots(exhibition_data[getIndex].PremiumSlots)

  }

  const decreaseSlot = (id) => {
    const getIndex = exhibition_data.findIndex(obj => {
      return obj._id === id;
    });

    exhibition_data[getIndex].PremiumSlots = exhibition_data[getIndex].PremiumSlots - 1;
    setSlots(exhibition_data[getIndex].PremiumSlots)
  }

  const approveHandler = async (Email, EventId, EventName) => {
    const approvedata = { Email, EventId, EventName, PremiumSlots: Slots }
    dispatch(approveEventAction(approvedata))
    alert("Approved")
    setUserApprove((prevUserApprove) => ({
      ...prevUserApprove,
      [Email]: true, 
      [EventId]:true
    }));
  }


  return (
    <>
      <Navbar />
      <Sidebar height={95} />
      <main className='exhibition'>
        <div className='exhibition-header'>
          <p>Email address</p>
          <p>Exhibition Name</p>
          <p>Premium Slots</p>
          <p>Action</p>
        </div>

        <div className='exhibition-content'>
          {
            loading ? <div className='admin-loader'><ColorRing
              colors={['#fff', '#fff', '#fff', '#fff', '#fff']}
            /></div> : exhibition_data && exhibition_data.length > 0 && exhibition_data.map((user) => (
              <div key={user._id}>
                <p>{user.Email}</p>
                <p>{user.EventName}</p>
                <div>
                <div onClick={() => decreaseSlot(user._id)}>-</div>
                  <p>{user.PremiumSlots}</p>
                  <div onClick={() => increaseSlot(user._id)} >+</div>
                </div>
                {user.IsApproved || userApprove[user.Email] && userApprove[user.EventId] ? <div className='ex_approve2'>Approve</div> : <div className='ex_approve1' onClick={() => approveHandler(user.Email, user.EventId, user.EventName)}>Approve</div>}
              </div>
            ))
          }
        </div>
      </main>
    </>
  )
}

export default Exhibition