import {database} from "./firebase";

export function registerUsers (name, phoneNo) {
    database.ref("users").push({
        name:name,
        phoneNo:phoneNo
    });
}

export function borrowRequest(borrowAmount, borrowReason,borrowDuration,borrowUpiID){
    database.ref("borrowReq").push({
        borrowAmount : borrowAmount,
        borrowReason : borrowReason,
        borrowDuration : borrowDuration,
        borrowUpiID : borrowUpiID
    })
}