import React, { useEffect, useState } from 'react'
import "./CreateEvent.css"
import Navbar from '../../navbar/Navbar'
import Sidebar from '../../sidebar/Sidebar'
import Modal from '../../modal/Modal'
import { useDispatch, useSelector } from 'react-redux'
import { createEventAction } from '../../../redux/actions/adminEventsActions'
import ReactCalendar from 'react-calendar';
import moment from 'moment';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom'

const CreateEvent = () => {
  const [showModal, setShowModal] = useState(false);

  const [data, setData] = useState([]);
  const [Users, setUsers] = useState('');

  const [openCalender, setOpenCalender] = useState(false);
  const [openCalender2, setOpenCalender2] = useState(false)

  const handleDelete = (id) => {
    const newData = data.filter(item => item.id !== id);
    setData(newData);
  };

  const handleEdit = (id) => {
    const itemToEdit = data.find(item => item.id === id);
    if (itemToEdit) {
      setUsers(itemToEdit.Users)
      handleDelete(id);
    }
  };

  const [roomdata, setRoomdata] = useState([]);
  const [Name, setName] = useState('');


  const handleroomDelete = (id) => {
    const newroomData = roomdata.filter(item => item.id !== id);
    setRoomdata(newroomData);
  };

  const handleroomEdit = (id) => {
    const itemToEdit = roomdata.find(item => item.id === id);
    if (itemToEdit) {
      setName(itemToEdit.Name)
      handleroomDelete(id);
    }
  };

  const [EventName, setEventName] = useState("")
  const [Description, setDescription] = useState("")
  const [StartDate, setStartDate] = useState("")
  const [EndDate, setEndDate] = useState("")
  const [StartTime, setStartTime] = useState("")
  const [EndTime, setEndTime] = useState("")
  const [MorningPremiumStartTime, setMorningPremiumStartTime] = useState("")
  const [MorningPremiumEndTime, setMorningPremiumEndTime] = useState("")
  const [EveningPremiumStartTime, setEveningPremiumStartTime] = useState("")
  const [EveningPremiumEndTime, setEveningPremiumEndTime] = useState("")
  const [IntervalTime, setIntervalTime] = useState(0)
  const [Location, setLocation] = useState("")
  const [Capacity, setCapacity] = useState(0)
  const [Feature1, setFeature1] = useState("")
  const [Feature2, setFeature2] = useState("")
  const [Slots, setSlots] = useState(0)
  const [SeatingCapacity, setSeatingCapacity] = useState(0)
  const [AllowedUsers, setAllowedUsers] = useState(data)
  const [Rooms, setRooms] = useState(roomdata)

  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedDate2, setSelectedDate2] = useState(null)

  const onChange = (date) => {
    if (date instanceof Date) {
      const formattedDate = moment(date).format('DD/MM/YY');
      setStartDate(formattedDate)
    }
  };

  const onChange2 = (date) => {
    if (date instanceof Date) {
      const formattedDate = moment(date).format('DD/MM/YY');
      setEndDate(formattedDate)
    }
  };

  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  const intervalTimeRegex = /^([1-9]|[1-5][0-9]|60)$/;

  const handleAdd = () => {
    // Check if Users is a valid email address
    if (!emailRegex.test(Users)) {
      toast.error('Invalid email address!', {
        style: {
          fontSize: '1.4rem',
        },
      });
      return;
    }

    const newData = [...data, { id: Date.now(), Users, Slots }];
    setData(newData);
    setUsers('');
    setSlots(0)
  };

  useEffect(() => {
    setAllowedUsers(data);
  }, [data]);

  useEffect(() => {
    setRooms(roomdata);
  }, [roomdata]);


  const handleroomAdd = () => {

    const newroomData = [...roomdata, { id: Date.now(), Name, SeatingCapacity: parseInt(SeatingCapacity), Feature1, Feature2 }];
    setRoomdata(newroomData);
    setName('');
    setSeatingCapacity(0);
    setFeature1('');
    setFeature2('');
  };

  const increaseSlot = () => {
    if (Slots == 10) {
      return Slots
    } else {
      setSlots(Slots + 1)
    }
  }

  const decreaseSlot = () => {
    if (Slots == 0) {
      return Slots
    } else {
      setSlots(Slots - 1)
    }
  }

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const adminSignin = useSelector(state => state.adminSignin)

  useEffect(() => {
    if (adminSignin.userinfo && Object.keys(adminSignin.userinfo).length === 0) {
      navigate("/admin/signin")
    }
  }, [adminSignin.userinfo, navigate])

  const submitHandler = async () => {
    if (!EventName || !Description || !StartDate || !EndDate || !StartTime || !EndTime || !MorningPremiumStartTime || !MorningPremiumEndTime || !EveningPremiumStartTime || !EveningPremiumEndTime || !IntervalTime || !Location || !Capacity && !AllowedUsers || !Rooms) {
      toast.error('All fields are required!', {
        style: {
          fontSize: '1.4rem',
        },
      });
    } else if (!EventName) {
      toast.error('EventName is required!', {
        style: {
          fontSize: '1.4rem',
        },
      });
    } else if (!Description) {
      toast.error('Description is required!', {
        style: {
          fontSize: '1.4rem',
        },
      });
    } else if (!StartDate) {
      toast.error('StartDate is required!', {
        style: {
          fontSize: '1.4rem',
        },
      });
    } else if (!EndDate) {
      toast.error('EndDate is required!', {
        style: {
          fontSize: '1.4rem',
        },
      });
    } else if (!StartTime) {
      toast.error('StartTime is required!', {
        style: {
          fontSize: '1.4rem',
        },
      });
    } else if (StartTime.length < 5 || StartTime.length > 5) {
      toast.error('StartTime must be in HH:MM format!', {
        style: {
          fontSize: '1.4rem',
        },
      });
    } else if (!EndTime) {
      toast.error('EndTime is required!', {
        style: {
          fontSize: '1.4rem',
        },
      });
    } else if (EndTime.length < 5 || EndTime.length > 5) {
      toast.error('EndTime must be in HH:MM format!', {
        style: {
          fontSize: '1.4rem',
        },
      });
    } else if (!MorningPremiumStartTime) {
      toast.error('Morning Premium StartTime is required!', {
        style: {
          fontSize: '1.4rem',
        },
      });
    } else if (MorningPremiumStartTime.length < 5 || MorningPremiumStartTime.length > 5) {
      toast.error('MorningPremiumStartTime must be in HH:MM format!', {
        style: {
          fontSize: '1.4rem',
        },
      });
    } else if (!MorningPremiumEndTime) {
      toast.error('Morning Premium EndTime is required!', {
        style: {
          fontSize: '1.4rem',
        },
      });
    } else if (MorningPremiumEndTime.length < 5 || MorningPremiumEndTime.length > 5) {
      toast.error('MorningPremiumEndTime must be in HH:MM format!', {
        style: {
          fontSize: '1.4rem',
        },
      });
    } else if (!EveningPremiumStartTime) {
      toast.error('Evening Premium StartTime is required!', {
        style: {
          fontSize: '1.4rem',
        },
      });
    } else if (EveningPremiumStartTime.length < 5 || EveningPremiumStartTime.length > 5) {
      toast.error('EveningPremiumStartTime must be in HH:MM format!', {
        style: {
          fontSize: '1.4rem',
        },
      });
    } else if (!EveningPremiumEndTime) {
      toast.error('Evening Premium EndTime required!', {
        style: {
          fontSize: '1.4rem',
        },
      });
    } else if (EveningPremiumEndTime.length < 5 || EveningPremiumEndTime.length > 5) {
      toast.error('EveningPremiumEndTime must be in HH:MM format!', {
        style: {
          fontSize: '1.4rem',
        },
      });
    }

    else if (!IntervalTime) {
      toast.error('Interval Time is required!', {
        style: {
          fontSize: '1.4rem',
        },
      });
    } else if (!intervalTimeRegex.test(IntervalTime)) {
      toast.error('Give correct Interval Time in MM format!', {
        style: {
          fontSize: '1.4rem',
        },
      });
    }

    else if (!Location) {
      toast.error('Location is required!', {
        style: {
          fontSize: '1.4rem',
        },
      });
    } else if (!Capacity) {
      toast.error('Capacity is required!', {
        style: {
          fontSize: '1.4rem',
        },
      });
    } else if (AllowedUsers.length === 0) {
      toast.error('AllowedUsers cannot be empty!', {
        style: {
          fontSize: '1.4rem',
        },
      });
    } else if (Rooms.length === 0) {
      toast.error('Rooms cannot be emptys!', {
        style: {
          fontSize: '1.4rem',
        },
      });
    }

    else {
      const eventdata = {
        EventName, Description, StartDate, EndDate, StartTime, EndTime,
        MorningPremiumStartTime, MorningPremiumEndTime, EveningPremiumStartTime,
        EveningPremiumEndTime, IntervalTime: parseInt(IntervalTime), Location, Capacity: parseInt(Capacity), AllowedUsers, Rooms
      }
      dispatch(createEventAction(eventdata))
      setShowModal(true);
    }

  }

  return (
    <>
      <Navbar />
      <Sidebar height={210.2} />
      <main className='event'>
        <div className='event-header'>
          <h1>New event</h1>
          <button onClick={submitHandler}>Save</button>
        </div>

        <div className='event-main'>

          <div>
            <label htmlFor="">Event Name :</label>
            <input
              type="text"
              placeholder='Name'
              value={EventName}
              onChange={(e) => setEventName(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="">Event Description :</label>
            <input
              type="text"
              placeholder='Description'
              value={Description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="">Start Date :</label>
            <input
              type="text"
              placeholder='DD/MM/YY'
              value={StartDate}
              readOnly
              onClick={() => setOpenCalender(!openCalender)}
            />
            {
              openCalender && <div onMouseLeave={() => setOpenCalender(false)}><ReactCalendar
                className="react-cal-ad"
                value={selectedDate}
                onChange={onChange}
              /></div>
            }
          </div>

          <div>
            <label htmlFor="">End Date :</label>
            <input
              type="text"
              placeholder="DD/MM/YY"
              value={EndDate}
              readOnly
              onClick={() => setOpenCalender2(!openCalender2)}
            />
            {
              openCalender2 && <div onMouseLeave={() => setOpenCalender2(false)}><ReactCalendar
                value={selectedDate2}
                onChange={onChange2}
              /></div>
            }
          </div>

          <div>
            <label htmlFor="">Start Time :</label>
            <input
              type="text"
              placeholder='00:00'
              value={StartTime}
              onChange={(e) => setStartTime(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="">End Time :</label>
            <input
              type="text"
              placeholder="00:00"
              value={EndTime}
              onChange={(e) => setEndTime(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="">Morning Premium Start Time :</label>
            <input
              type="text"
              placeholder='00:00'
              value={MorningPremiumStartTime}
              onChange={(e) => setMorningPremiumStartTime(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="">Morning Premium End Time :</label>
            <input
              type="text"
              placeholder="00:00"
              value={MorningPremiumEndTime}
              onChange={(e) => setMorningPremiumEndTime(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="">Evening Premium Start Time :</label>
            <input
              type="text"
              placeholder='00:00'
              value={EveningPremiumStartTime}
              onChange={(e) => setEveningPremiumStartTime(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="">Evening Premium End Time :</label>
            <input
              type="text"
              placeholder="00:00"
              value={EveningPremiumEndTime}
              onChange={(e) => setEveningPremiumEndTime(e.target.value)}
            />
          </div>



          <div>
            <label htmlFor="">Interval Time :</label>
            <input
              type="Number"
              placeholder='00'
              value={IntervalTime}
              onChange={(e) => setIntervalTime(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="">Location :</label>
            <input
              type="text"
              placeholder="location"
              value={Location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="">Capacity :</label>
            <input
              type="Number"
              placeholder='00'
              value={Capacity}
              onChange={(e) => setCapacity(e.target.value)}
            />
          </div>

          <div>
            <div>
              <label htmlFor="">Users :</label>
              <input
                type="text"
                placeholder='Enter email'
                value={Users}
                onChange={(e) => setUsers(e.target.value)}
              />
            </div>

            <div className='create-slots'>
            <label htmlFor="">Slots :</label>
            <div>
              <div>
                
                <button
                  onClick={decreaseSlot}
                  disabled={!Users || !emailRegex.test(Users)}
                >-</button>
                <p>{Slots}</p>
                <button
                  onClick={increaseSlot}
                  disabled={!Users || !emailRegex.test(Users)}
                >+</button>
              </div>

              <button
                onClick={handleAdd}
                disabled={!Users || !emailRegex.test(Users)}
              >Add</button>
            </div>
          </div>

            <div className='create-user-list'>
              {
                AllowedUsers.map((user) => (
                  <p key={user.id} onClick={() => handleEdit(user.id)}>{user.Users}</p>
                ))
              }
            </div>
          </div>

          <div className='create-room-list'>
            <p>Rooms :</p>

            <div> 
              {
                Rooms.map((user) => (
                  <p key={user.id} onClick={() => handleroomEdit(user.id)}>{user.Name}</p>
                ))
              }
            </div>
          </div>

         <div></div>


          <div>
            <label htmlFor="">Name :</label>
            <input
              type="text"
              placeholder='Room Name'
              value={Name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="">Features 1 :</label>
            <input
              type="text"
              placeholder=""
              value={Feature1}
              onChange={(e) => setFeature1(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="">Seat Capacity :</label>
            <input
              type="Number"
              placeholder=""
              value={SeatingCapacity}
              onChange={(e) => setSeatingCapacity(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="">Features 2 :</label>
            <input
              type="text"
              placeholder=""
              value={Feature2}
              onChange={(e) => setFeature2(e.target.value)}
            />
          </div>

        </div>

        <div className="event-btm">
          <button
            onClick={handleroomAdd}
            disabled={!Feature1 || !Feature2 || !SeatingCapacity}
          >Add Room</button>
        </div>
      </main>
      <Modal showModal={showModal} setShowModal={setShowModal} />
      <ToastContainer />

    </>
  )
}

export default CreateEvent

