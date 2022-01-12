import React from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css'

const Navbar = () => {
    
    return (
        <div className="navbar">
            
            <Link to = '/'> <h1>Borrow App</h1> </Link>

            <div>
                <Link to = '/' className='home-btn'> Home </Link>
            </div>
        </div>
    )
}

export default Navbar

