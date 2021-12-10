import React from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css'

const Navbar = () => {
    
    return (
        <div className="navbar">
            <Link to = '/'> <button className='home-btn'>Home</button> </Link>
            <Link to = '/'> <h1>Borrow App</h1> </Link>
        </div>
    )
}

export default Navbar

