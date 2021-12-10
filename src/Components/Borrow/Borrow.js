import React, { useEffect, useRef, useState } from 'react'
import firebase, { database } from "../../firebase";
import { useHistory } from 'react-router-dom';
import { borrowRequest } from '../../db';
import './Borrow.css'


const Borrow = () => {

    const history = useHistory();

    const [borrowAmount, setBorrowAmount] = useState("")
    const [borrowReason, setBorrowReason] = useState("")
    const [borrowDuration, setBorrowDuration] = useState("")
    const [borrowUpiID, setBorrowUpiID] = useState("")
    const [users, setUsers] = useState([])

    const ref = useRef("")

    useEffect(() => {
        try{
            ref.current.focus();
        }
        catch(err){
            // console.log(err);
        }
    }, [])

    const handleSignOut = () => {

        firebase.auth().signOut().then(() => {
            localStorage.removeItem("userPhone");
            history.push('/');
            alert("Sign Out Successfully...")
            // console.log("Sign Out");
          })
          .catch((error) => {
            // console.log("Error During SignOut", error)
        });
    }

    const handleBorrowRequest = (e) => {
        e.preventDefault();
        
        if(borrowAmount && borrowDuration && borrowRequest && borrowUpiID )
        {
            borrowRequest(borrowAmount, borrowReason, borrowDuration, borrowUpiID)
            history.push('/dashboard')
        }  
        else{
            alert("Input Fields can't be empty ")
        }    
        // console.log("Request Raised")
    }

    const readUsersFromDB=()=>{
        database.ref("users").on("value", (snapshot)=>{
            let chatUsers = []

            snapshot.forEach((snap)=>{
                const currUser = snap.val();
                chatUsers.push({
                    name:currUser.name,
                    phoneNo:currUser.phoneNo    
                });
            })

            // console.log("all users",chatUsers)
            setUsers(chatUsers);
            
        })
    }

    useEffect( ()=> {
        readUsersFromDB();
        
    }, [])


    return (
        <div className='borrow-comp'>  
            <div className='users'>
                <h1>Current Users</h1>
                {
                    users ? 
                    <div>
                        {users.map((user, i)=>
                            <div className='user' key={i}>
                                <li> {user.name} </li>
                            </div> 
                        )}
                    </div> 
                    : 
                    <h2>No Users Found</h2>
                }
            </div>
            
            <div className='borrow'>
                <h1>REQUEST HERE</h1>
                <form>
                    <div className='borrow-fields'>
                        <label> Borrow Amount </label>
                        <input
                            type = "number"
                            value = {borrowAmount}
                            placeholder = 'Enter the borrow amount'
                            onChange = { (e) => {setBorrowAmount(e.target.value)} }
                            ref = {ref}
                            required
                            />
                    </div>

                    <div className='borrow-fields'>
                        <label> Borrow Reason </label>
                        <input
                            type = "text"
                            value = {borrowReason}
                            placeholder = 'Reason for Borrowing'
                            onChange = { (e) => {setBorrowReason(e.target.value)} }
                            required
                            />
                    </div>

                    <div className='borrow-fields'>
                        <label> Borrow Duration </label>
                        <input
                            type = "text" 
                            value = {borrowDuration}
                            placeholder = 'Enter the Borrow Duration'
                            onChange = { (e) => {setBorrowDuration(e.target.value)} }
                            required
                            />
                    </div>

                    <div className='borrow-fields'>
                        <label> UPI ID </label>
                        <input  
                            value = {borrowUpiID}
                            placeholder = 'Enter your UPI ID'
                            onChange = { (e) => {setBorrowUpiID(e.target.value)} }
                            required
                            />
                    </div>

                    <div className='raise-request'>
                        <button onClick={handleBorrowRequest}>Raise Borrow Request</button>
                    </div>

                    <div className="signout-btn">
                        <button onClick={handleSignOut}>Sign Out</button>
                    </div>
                </form>

            </div>
        </div>
    )
}

export default Borrow
