import React from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Signin from './components/signin/Signin'
//Admin routes
import AdminSignin from './components/admin/signin/Signin'
import AdminSignup from './components/admin/signup/Signup'
import AdminResetemail from './components/admin/resetemail/Resetemail'
import AdminResetotp from './components/admin/resetotp/Resetotp'
import AdminResetpassword from './components/admin/resetpassword/Resetpassword'
import CreateEvent from './components/admin/createevent/CreateEvent'
import Userlist from './components/admin/userlist/Userlist'
import Createuser from './components/admin/userlist/Createuser'
import Exhibition from './components/admin/exhibition/Exhibition'
import Bookrequest from './components/admin/bookrequest/Bookrequest'
import Events from './components/admin/events/Events'
import Editevent from './components/admin/editevent/Editevent'

//User routes
import UserSignin from './components/user/signin/Signin'
import UserResetemail from './components/user/resetemail/Resetemail'
import UserSignup from './components/user/signup/Signup'
import UserResetotp from './components/user/resetotp/Resetotp'
import UserResetpassword from './components/user/resetpassword/Resetpassword'
import Userevent from './components/user/user_event/Userevent'
import User_rooms from './components/user/user_rooms/User_rooms'
import Roomtime from './components/user/roomtime/Roomtime'
import Bookinglist from './components/user/bookinglist/Bookinglist'


const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* ADMIN ROUTES */}
          <Route path='/' element={<Signin />} />
          <Route path='/admin/signin' element={<AdminSignin />} />
          <Route path='/admin/signup' element={<AdminSignup />} />
          <Route path='/admin/resetemail' element={<AdminResetemail />} />
          <Route path='/admin/resetotp' element={<AdminResetotp />} />
          <Route path='/admin/resetpassword' element={<AdminResetpassword />} />
          <Route path='/admin/createevent' element={<CreateEvent/>}/>
          <Route path='/admin/userlist' element={<Userlist/>}/>
          <Route path='/admin/createuser' element={<Createuser/>}/>
          <Route path='/admin/exhibition' element={<Exhibition/>}/>
          <Route path='/admin/bookrequest' element={<Bookrequest/>}/>
          <Route path='/admin/event' element={<Events/>}/>
          <Route path='/admin/editevent/:EventId/:EventName' element={<Editevent/>}/>
 
          {/* USER ROUTES */}
          <Route path='/user/signin' element={<UserSignin />} />
          <Route path='/user/signup' element={<UserSignup />} />
          <Route path='/user/resetemail' element={<UserResetemail />} />
          <Route path='/user/resetotp' element={<UserResetotp />} />
          <Route path='/user/resetpassword' element={<UserResetpassword />} />
          <Route path='/user/userevent' element={<Userevent/>}/>
          <Route path='/user/userroom/:id' element={<User_rooms/>}/>
          <Route path='/user/roomtime/:EventId/:RoomName/:EventName' element={<Roomtime/>}/>
          <Route path='/user/bookinglist' element={<Bookinglist/>}/>

          <Route path="*" element={<p>404 Error</p>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App