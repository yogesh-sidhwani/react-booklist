import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import "./LoginForm.css";

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [redirectToBookDisplay, setRedirectToBookDisplay] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    // Send a POST request to your backend API to verify the credentials

    // Assuming the backend returns a token on successful login
    const token = "exampleToken";

    // Store the token in localStorage or some other storage mechanism
    localStorage.setItem("token", token);

    // Set redirectToBookDisplay to true to trigger the redirect
    setRedirectToBookDisplay(true);
  }

  // If redirectToBookDisplay is true, redirect to the BookDisplay page
  if (redirectToBookDisplay) {
    return <Redirect to="/books" />;
  }

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </label>
        <br />
        <label>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default LoginForm;
