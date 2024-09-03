import React, { useState } from 'react';
import './index.css';
import axios from 'axios';

export default function Register() {
  // const [fullName, setFullName] = useState('');
  // const [userName, setUserName] = useState('');
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');
  // const [repeatPassword, setRepeatPassword] = useState('');
const [FormData, setFormData]= useState({
    fullName:'',
    userName:'',
    email:'',
    password:'',
    repeatPassword:''
}) 
//const [errors, setErrors] = useState([]);
console.log(FormData)
  const handleSubmit = (event) => {
    event.preventDefault();
    fetchRegisterUser();
  };

  const fetchRegisterUser = async () => {
    try {
      const response = await axios.post('http://localhost:5104/api/Auth/Register', FormData);
      console.log('User registered successfully:', response.data);
    } catch (error) {
      console.error('Error registering user:', error);
         }
  };

  return (
    <React.Fragment>
      <form onSubmit={handleSubmit}>
        <div className="container">
          <h1>Register</h1>
          <p>Please fill in this form to create an account.</p>
          <hr />

          <label><b>Full Name</b></label>
          <input
            type="text"
            placeholder="Enter Full Name"
            onChange={(e) =>
              setFormData((prevFormData) => ({
                ...prevFormData,
                fullName: e.target.value,
              }))
            }
            required
          />

          <label><b>User Name</b></label>
          <input
            type="text"
            placeholder="Enter User Name"
            onChange={(e) =>
              setFormData((prevFormData) => ({
                ...prevFormData,
                userName: e.target.value,
              }))
            }            required
          />

          <label><b>Email</b></label>
          <input
            type="email"
            placeholder="Enter Email"
            onChange={(e) =>
              setFormData((prevFormData) => ({
                ...prevFormData,
                email: e.target.value,
              }))
            }            required
          />

          <label><b>Password</b></label>
          <input
            type="password"
            placeholder="Enter Password"
            onChange={(e) =>
              setFormData((prevFormData) => ({
                ...prevFormData,
                password: e.target.value,
              }))
            }            required
          />

          <label><b>Repeat Password</b></label>
          <input
            type="password"
            placeholder="Repeat Password"
            onChange={(e) =>
              setFormData((prevFormData) => ({
                ...prevFormData,
                repeatPassword: e.target.value,
              }))
            }            required
          />

          <p>
            By creating an account you agree to our{" "}
            <a href="#">Terms & Privacy</a>.
          </p>

          <button type="submit" className="registerbtn">Register</button>
        </div>
        {/* {Object.keys(errors).map((key)=>(
 <div  key={key} className="container">
           {errors[key].map((message, index) => (
          <div key={index}>{message}</div>
        ))}
 </div>
        ))} */}
       
        <div className="container signin">
          <p>
            Already have an account? <a href="#">Sign in</a>.
          </p>
        </div>
      </form>
    </React.Fragment>
  );
}
