import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import "./LoginForm.css";
import axios from "axios";

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [signup, setSignup] = useState(false);
  const [signupUsername, setSignupUsername] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [userRole, setuserRole] = useState("");
  const [address, setaddress] = useState("");
  const [phone, setphone] = useState("");

  const [errorMessage, setErrorMessage] = useState("");
  const [signupError, setSignupError] = useState("");
  const [redirectToBookDisplay, setRedirectToBookDisplay] = useState(false);

  const handleLogin = (event) =>{
    event.preventDefault();
    // Send a POST request to your backend API to verify the credentials
    const postdata = {
      email: username,
      password: password,
    };
    axios
      .post("http://localhost:8080/users/admin/signin", postdata)
      .then((res) => {
        console.log("sucess");
        console.log(res.data);
        setRedirectToBookDisplay(true);
        setErrorMessage("")
      })
      .catch((error) => {
        console.log("error");
        setErrorMessage("Invalid username or password. Please try again.")
      });
  }

  const handleSignup = (event) => {
    event.preventDefault();
    // Send a POST request to your backend API to register
    const postdata = {
      firstName,
      lastName,
      userRole,
      email: username,
      password,
      address,
      phoneNumer: phone
    };
    axios
      .post("http://localhost:8080/customers/customer/saveCustomerdetails", postdata)
      .then((res) => {
        console.log("sucess");
        console.log(res.data);
        setRedirectToBookDisplay(true);
        setSignupError("")
      })
      .catch((error) => {
        console.log("error");
        setSignupError("Please check your information and try again.")
      });
  };


  // If redirectToBookDisplay is true, redirect to the BookDisplay page
  if (redirectToBookDisplay) {
    return <Redirect to="/books" />;
  }

  return (
    <div>
      {signup ? (
        <div>
          <h2>Signup</h2>
          <form onSubmit={handleSignup}>
            <label>
              FirstName:
              <input
                type="text"
                value={firstName}
                onChange={(e) => setfirstName(e.target.value)}
              />
            </label>
            <br />
            <label>
              LastName:
              <input
                type="text"
                value={lastName}
                onChange={(e) => setlastName(e.target.value)}
              />
            </label>
            <br />
            <label>
              UserRole:
              <input
                type="text"
                value={userRole}
                onChange={(e) => setuserRole(e.target.value)}
              />
            </label>
            <br />
            <label>
              Email:
              <input
                type="email"
                value={signupUsername}
                onChange={(e) => setSignupUsername(e.target.value)}
              />
            </label>
            <br />
            <label>
              Password:
              <input
                type="password"
                value={signupPassword}
                onChange={(e) => setSignupPassword(e.target.value)}
              />
            </label>
            <br />
            <label>
              Address:
              <input
                type="text"
                value={address}
                onChange={(e) => setaddress(e.target.value)}
              />
            </label>
            <br />
            <label>
              Phone:
              <input
                type="tel"
                value={phone}
                onChange={(e) => setphone(e.target.value)}
              />
            </label>
            <span className="error-message">{signupError}</span>
            <br />
            <input type="submit" value="Signup" />
          </form>
          <p className="text-center">
            Already have an account?{" "}
            <span className="span-link" onClick={() => setSignup(false)}>Login</span>
          </p>
        </div>
      ) : (
        <div>
          <h2>Login</h2>
          <form onSubmit={handleLogin}>
            <label>
              Username:
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </label>
            <br />
            <label>
              Password:
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
            <span className="error-message">{errorMessage}</span>
            <br />
            <input type="submit" value="Login" />
          </form>
          <p className="text-center">
            Don't have an account?{" "}
            <span className="span-link" onClick={() => setSignup(true)}>Signup</span>
          </p>
        </div>
      )}
    </div>
  );
}

export default LoginForm;
