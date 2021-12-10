import React, { useEffect, useRef, useState } from "react";
import firebase from "../../firebase";
import './SignIn.css'
import { useHistory,Redirect } from 'react-router';
import { registerUsers } from "../../db";

export default function SignIn() {
    const history = useHistory();
    
    const [name, setName] = useState("");
    const [phoneNo, setPhoneNo] = useState("");
    const [otp, setOtp] = useState("");
    
    const ref = useRef("")

    useEffect(() => {
        try{
            ref.current.focus();
        }
        catch(err){
            // console.log(err);
        }
    }, [])

    const confiCaptcha = () => {
        window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier("sign-in-button",    
            {
                size: "invisible",
                callback: (response) => {
                    onSignInSubmit();
                },
            }
        );
    };

    const onSignInSubmit = (e) => {
        e.preventDefault();
        confiCaptcha();

        const phoneNumber = "+91" + phoneNo;
        console.log("Phone no is", phoneNumber);

        const appVerifier = window.recaptchaVerifier;
        firebase.auth()
        .signInWithPhoneNumber(phoneNumber, appVerifier)
        .then((confirmationResult) => {
            window.confirmationResult = confirmationResult;
            console.log("OTP sent");
            alert("OTP Sent")
        })
        .catch((err) => {
            alert("OTP Not Sent")
            console.log("OTP not sent", err);
        });
    };

    const onSubmitOTP = (e) => {
        e.preventDefault();

        const code = otp;
        window.confirmationResult.confirm(code)
        .then((result) => {
            // const user = result.user;

            registerUsers(name, phoneNo);
            localStorage.setItem("userPhone", phoneNo);
            console.log("Verified", history);
            history.push('/borrow')
            
            
        })

        .catch((err) => {
            alert("Invalid OTP")
            console.log("verification error");
        });
    };
    
    if(localStorage.getItem("userPhone")) {
        return <Redirect to='/borrow'/>
    }

    return (
        <>
            <div className="signin">
                <h1>Existing Customer   </h1>

                <div>
                    <form className="inp">
                        <label>Name</label>
                        <input
                            type = 'text'
                            required
                            value = {name}
                            placeholder = 'Enter Your Name ...'
                            ref={ref}
                            spellCheck="false"
                            onChange = {(e) => {setName(e.target.value)} }
                            />
                    </form>
                </div>

                <div className="inp"> 
                    <div>
                        <label>Gender</label>
                    </div>

                    <div>
                        <input type="radio" value="Male" name="gender" /> Male
                        <input type="radio" value="Female" name="gender" /> Female
                        <input type="radio" value="Other" name="gender" /> Other
                    </div>
                </div>
                
                <div>
                    <form onSubmit={onSignInSubmit} >
                        <div id="sign-in-button"></div>
                        <div className="inp">
                            <label> Phone Number </label>
                            <input
                                type = 'tel'
                                value = {phoneNo}
                                required
                                placeholder="Enter Phone Number ..."
                                onChange={ (e) => setPhoneNo(e.target.value)}
                            />
                        </div>
                            
                        <div className="send-otp"> <button>Send OTP</button> </div>
                    </form>
                </div>        
            
                <div>
                    <form onSubmit={onSubmitOTP}>
                        <div className="inp"> 
                            <label> Enter OTP </label>
                            <input
                                type = 'number'
                                required
                                placeholder="Enter OTP ..."
                                onChange={(e) => setOtp(e.target.value)}
                                />
                        </div>

                        <div className="verify-otp"> <button>Verify</button> </div>
                    </form>
                </div>
                
            </div>
        </>
    );
}