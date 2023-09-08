import React, { useEffect, useState } from 'react'
import "./Userlist.css"
import Navbar from '../../navbar/Navbar.jsx'
import Sidebar from '../../sidebar/Sidebar.jsx'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getAllusersAction } from '../../../redux/actions/adminEventsActions'
import { approveuserAction } from '../../../redux/actions/adminAuthActions'
import { ColorRing } from 'react-loader-spinner';
import { useNavigate } from 'react-router-dom'

const Userlist = () => {

  // Define an initial state for user approvals
  const initialUserApprove = {};

  const [userApprove, setUserApprove] = useState(initialUserApprove);

  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(getAllusersAction())
  }, [dispatch])


  const adminSignin = useSelector(state => state.adminSignin)

  useEffect(() => {
    if(adminSignin.userinfo && Object.keys(adminSignin.userinfo).length === 0){
      navigate("/admin/signin")
    }
  },[adminSignin.userinfo,navigate])

  const getAllusers = useSelector(state => state.getAllusers)
  const { response, loading } = getAllusers

  const approveHandler = (Email) => {
    const approveEmail = { Email }

    dispatch(approveuserAction(approveEmail))
    alert("User Approved")
    
    setUserApprove((prevUserApprove) => ({
      ...prevUserApprove,
      [Email]: true, // Set approval status for the specific user
    }));
  }

  return (
    <>
      <Navbar />
      <Sidebar height={110} />
      <main className="userlist">
        <div className="userlist-header">
          <p>First Name</p>
          <p>Last Name</p>
          <p>Email address</p>
          <p>Mobile No.</p>
          <p>Action</p>
        </div>

        <div className="userlist-content">
          {
            loading ? <div className='admin-loader'><ColorRing
              colors={['#fff', '#fff', '#fff', '#fff', '#fff']}
            /></div> : response && response.length > 0 && response.map((user) => (
              <div key={user._id}>
                <p>{user.FirstName}</p>
                <p>{user.LastName}</p>
                <p>{user.Email}</p>
                <p>{user.MobileNo}</p>
                {
                  user.IsApproved || userApprove[user.Email] ? <button className='user-approve'>Approved</button> : <button className='not-approve' onClick={() => approveHandler(user.Email)}>Approve</button>
                }
              </div>
            ))
          }
        </div>

        <Link to="/admin/createuser" className='create-link'>Create New</Link>
      </main>
    </>
  )
}

export default Userlist