import axios from 'axios';
import React, {useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import Navbar from '../../Components/Navbar'
import './Login.css'
// import { passwordcheck } from './Login.helper'
import { Link } from 'react-router-dom';



export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginStatus, setLoginStatus] = useState(false);
  const navigate = useNavigate()

  const reset = () => {
    setEmail('');
    setPassword('');
  }
  const handlesubmit = () => {
    // e.preventDefault();
    // console.log(e);
    const data = {
      email: email,
      password: password,
    }
    console.log({data});
   
    axios
      .post('http://localhost:5000/user/login', data)
      .then(res => {
        localStorage.setItem("token","Bearer "+res.data.accessToken)
        setLoginStatus(true)
        navigate('/stock')
      })
      .catch(err => {
        setLoginStatus(false);
        window.alert('Login Faild')
        console.log(err)
      })
  }

  return (
    <div>
      <Navbar />
      <div className="Auth-form-container">
        <div className="Auth-form" >
          <div className="Auth-form-content">
            <h2 className="Auth-form-title1">Dealz Super</h2>
            <h3 className="Auth-form-title">Sign In</h3>
            <div className="form-group mt-3">
              <label>Email address</label>
              <input
                type="email"
                className="form-control mt-1"
                placeholder="Enter email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group mt-3">
              <label>Password</label>
              <input
                type="password"
                className="form-control mt-1"
                placeholder="Enter password"
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </div>
            <div className="d-grid gap-2 mt-3">
              <button className="btn btn-primary" onClick={() => {
                handlesubmit()
              }}>Sign In
              </button>
              <button  className="btn btn-danger mb-5" onClick={reset}>
                Reset
              </button>
              {/* {loginStatus && <button>Hello Im loged</button>} */}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
