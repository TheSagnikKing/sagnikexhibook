import React, { useState } from 'react'
import "./Editevent.css"
import Navbar from '../../navbar/Navbar'
import Sidebar from '../../sidebar/Sidebar'
import { useParams } from 'react-router-dom';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Editevent = () => {
    const {EventId,EventName} = useParams()

    const [data, setData] = useState([]);
    const [Users, setUsers] = useState('');
    const [Slots, setSlots] = useState(0)

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


    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    const handleAdd = () => {
        // Check if Users is a valid email address
        if (!emailRegex.test(Users)) {
            toast.error('Invalid email address!', {
                style: {
                    fontSize: '1.4rem',
                },
            });

        }

        const newData = [...data, { id: Date.now(), Users, Slots }];
        setData(newData);
        setUsers('');
        setSlots(0)

    };

    const editHandler = () => {
        if (data.length === 0) {
            toast.error('AllowedUsers cannot be empty!', {
                style: {
                    fontSize: '1.4rem',
                },
            });
        }
       
    }
    return (
        <>
            <Navbar />
            <Sidebar height={90} />
            <div className='editevent'>
                <div className='editevent-header'>
                    <h1>Edit event</h1>
                    <button onClick={editHandler}>Save</button>
                </div>

                <div className="editevent-content">
                    <div>
                        <label htmlFor="">Users :</label>
                        <input
                            type="text"
                            placeholder='Enter email'
                            value={Users}
                            onChange={(e) => setUsers(e.target.value)}
                        />
                    </div>

                    <div>
                        <label htmlFor="">Slots</label>
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
                            >Add Slot</button>
                        </div>
                    </div>

                    <div className='edit-user-list'>
                        {
                            data.map((user) => (
                                <p key={user.id} onClick={() => handleEdit(user.id)}>{user.Users}</p>
                            ))
                        }
                    </div>
                </div>
            </div>
            <ToastContainer />
        </>
    )
}

export default Editevent