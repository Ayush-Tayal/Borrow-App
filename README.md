#Borrow-App

There are 7 components in total, namely Navbar, Home, SignIn, Borrow, Dashboard, FourOFour.

This project is enabled with phone-number authentication by Google Firebase and after successfully entering the OTP at SignIn Component, the user is redirected to the next component i.e., Borrow Component.

At Borrow Component, the user can raise a request by entering the details like Borrow Amount, Duration, Reason, and the UPI ID of the user.

After successfully raising the request is created at the firebase and the user is redirected to the next component i.e., the dashboard component. 

At the Dashboard component, the user can see the all raised request at one place that is fetched from the firebase database, and also can raise another request. 

FouroFour is the component, that shows a message "Oops! Something went wrong.!" on the wrong path.

In the end, the User can SignOut from the app.

All the authentication is done using the Google Firebase method which is firebase/auth and firebase database is used.

Borrow and Dashboard Component are PrivateRoute. Without signing in, users are not able to access those components.

Tech Stack used: ReactJs, React-Router, React-hooks, Local Storage, Firebase.
