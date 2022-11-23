import { Blockquote, Center } from '@mantine/core'
import React from 'react'
import Navbar from '../../Components/Navbar'
import './Home.css'
import logo from "./logo.png"
export default function Home() {
  return (
    <div>
      <Navbar />
      <div className="Auth-form-container">
        <div className="Auth-form" >
          <div className="Auth-form-content">
            <h1 className="Auth-form-title1">Welcome To Dealz Super</h1>
            <div className="background">
              <img className='img' src={logo} alt="" />
              <p className='head'>The Future Of Grocery Stores Are Bright</p>
              <p>Developed By</p>
              <p className='dev'>Team Semicolon</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
