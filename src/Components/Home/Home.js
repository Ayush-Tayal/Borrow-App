import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css'

const Home = () => {
    return (
        <div className = "home" >
            <h1>Borrow Money.?</h1>

            <div className='apply-btn'>
                <Link to = '/signin'>
                    <button> Borrow Now </button>
                </Link>
            </div>

        </div>
    )
}

export default Home
