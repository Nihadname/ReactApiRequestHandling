import axios from 'axios';
import  { useState } from 'react';

import './index.css'

export default function Login() {
  const [FormData, setFormData]= useState({
    userName:'',
    password:'',
});
 const handleSubmit = (event) => {
  event.preventDefault();
  FetchLogInUser();
};
const FetchLogInUser= async () =>{
  try{
    const response = await axios.post('http://localhost:5104/api/Auth/LogIn', FormData);
    const token = response.data.token;
    localStorage.setItem('jwtToken', token);
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    console.log('User registered successfully:', token);
  }catch (error) {
      console.error('Error registering user:', error);
         }
}
  return (
    <div>
      <form onSubmit={handleSubmit} >
        <div className="imgcontainer">
          <img src="img_avatar2.png"  className="avatar" />
        </div>

        <div className="container">
          <label >
            <b>Username</b>
          </label>
          <input
            type="text"
            placeholder="Enter Username"
            onChange={(e) =>
              setFormData((prevFormData) => ({
                ...prevFormData,
                userName: e.target.value,
              }))
            }
            required
          />

          <label>
            <b>Password</b>
          </label>
          <input
            type="password"
            placeholder="Enter Password"
            onChange={(e) =>
              setFormData((prevFormData) => ({
                ...prevFormData,
                password: e.target.value,
              }))
            }
            required
          />
          <button type="submit">Login</button>
         
        </div>

       
      </form>
    </div>
  );
}
