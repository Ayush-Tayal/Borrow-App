import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useEffect } from 'react/cjs/react.development';
import './Dashboard.css'
import firebase, { database } from "../../firebase";

export const Dashboard = () => {
    const history = useHistory();
    const [requests, setRequests] = useState([])
    

    const handleNewReq = () => {
        history.push('/borrow');
    }

    const readRequestsFromDB = ()=> {
        database.ref("borrowReq").on("value", (snapshot)=>{
            let allRequests = []

            snapshot.forEach((snap)=>{
                const currRequest = snap.val();
                allRequests.push({
                    borrowAmount:currRequest.borrowAmount,
                    borrowDuration:currRequest.borrowDuration,
                    borrowReason:currRequest.borrowReason,
                    borrowUpiID:currRequest.borrowUpiID
                });
            })

            console.log("all users",allRequests)
            setRequests(allRequests);
            
        })
    }

    useEffect( ()=> {
        readRequestsFromDB();
    }, [])

    const handleSignOut = () => {

        firebase.auth().signOut().then(() => {
            localStorage.removeItem("userPhone");
            history.push('/');
            alert("Sign Out Successfully...")
            console.log("Sign Out");
          })
          .catch((error) => {
            console.log("Error During SignOut", error)
        });
    }
    
    return (
        <div className='dashboard'>
            {
                requests ? 
                <div className='requests'>
                    <h1>All Requests</h1>

                    <div className='details'>
                    {   
                        requests.map((req, i)=>
                            <div className='req' key={i}>
                                <li> Amount: {req.borrowAmount} </li>
                                <li> Duration: {req.borrowDuration} </li>
                                <li> Reason: {req.borrowReason} </li>
                                <li> Upi ID: {req.borrowUpiID} </li>
                            </div> 
                        )
                    }
                    </div>        
                    
                    <div className="signout-btn">
                        <button onClick={handleSignOut}>Sign Out</button>
                    </div>
                </div> 
                : 
                <h2>No Requests Found</h2>
                        
            }

            <div className='raiseNewReq' >
                <button onClick={handleNewReq}>Raise New Request</button>            
            </div>

        </div>
    )
}
