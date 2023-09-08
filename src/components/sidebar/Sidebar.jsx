import React, { useState } from 'react'
import "./Sidebar.css"
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const menudata = [
    {
        id: 1,
        name: "Exhibitions/Events",
        background: "--bg-color-2",
        url: "/admin/event"
    },
    {
        id: 2,
        name: "Users",
        background: "--bg-color-2",
        url: "/admin/userlist"
    },
    {
        id: 3,
        name: "Exhibitions Request",
        background: "--bg-color-2",
        url: "/admin/exhibition"
    },
    {
        id: 4,
        name: "Booking Request",
        background: "--bg-color-2",
        url: "/admin/bookrequest"
    },
]

const Sidebar = ({height}) => {
    const [activeMenuItem, setActiveMenuItem] = useState(null);
    const currentLocation = useLocation().pathname;

    const handleMenuItemClick = (id) => {
        setActiveMenuItem(id);
    }; 

    return (
        <>
            <main className='sidebar'
            style={{
                height:`${height}rem`
            }}
            >
                {
                    menudata.map((menu) => (
                        <div 
                        className='sidemenu' 
                        key={menu.id} 
                        onClick={() => handleMenuItemClick(menu.id)}                       
                        >
                            <Link to={`${menu.url}`} className='sidelink'
                            style={{
                                background: menu.url === currentLocation ? `var(${menu.background})` : "none",
                            }}
                            >{menu.name}</Link>
                        </div>
                    ))
                }
            </main>
        </>
    )
}

export default Sidebar