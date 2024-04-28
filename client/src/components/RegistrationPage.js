// RegistrationPage.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function RegistrationPage() {
  const [registrationData, setRegistrationData] = useState({
    cfname: '',
    clname: '',
    cstreet: '',
    ccity: '',
    czip: '',
    cstate: '',
    username: '',
    password: ''
  });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRegistrationData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleRegistration = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(registrationData)
      });

      const data = await response.json();
      if (response.ok) {
        navigate('/login'); // Redirect to login page on successful registration
      } else {
        alert(data.error); // Display error from server
      }
    } catch (error) {
      alert('Failed to register. Please try again later.');
    }
  };

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={(e) => {
        e.preventDefault();
        handleRegistration();
      }}>
        <input type="text" name="cfname" value={registrationData.cfname} onChange={handleInputChange} placeholder="First Name" required />
        <input type="text" name="clname" value={registrationData.clname} onChange={handleInputChange} placeholder="Last Name" required />
        <input type="text" name="cstreet" value={registrationData.cstreet} onChange={handleInputChange} placeholder="Street" required />
        <input type="text" name="ccity" value={registrationData.ccity} onChange={handleInputChange} placeholder="City" required />
        <input type="text" name="czip" value={registrationData.czip} onChange={handleInputChange} placeholder="Zip Code" required />
        <input type="text" name="cstate" value={registrationData.cstate} onChange={handleInputChange} placeholder="State" required />
        <input type="text" name="username" value={registrationData.username} onChange={handleInputChange} placeholder="Username" required />
        <input type="password" name="password" value={registrationData.password} onChange={handleInputChange} placeholder="Password" required />
        <button type="submit">Submit</button>
      </form>
      <p>Already registered? <a href="/login">Login Here</a></p>
    </div>
  );
}

export default RegistrationPage;
