import React from 'react'
import Navbar from '../../../Components/Navbar'
import "bootstrap/dist/css/bootstrap.min.css"; 
import { Formik, Form } from 'formik';
import userImage from "../Assests_user/user.png";
import TextFields from './UsertextFields';
import * as Yup from 'yup'; //to do the validations
import './add_user.css' //done

export default function AddUser() { //validations 
  const validate = Yup.object({
    user_id: Yup.string().required('required'),
    user_name: Yup.string().required('required'),
    mobile_no: Yup.number().required('required').max(10,'Incorrect phone number'), //check
    email: Yup.string().required('email is required').email('Email is invalid'), //checked
    address: Yup.string().required('required'),
    user_level: Yup.number().positive('Invalid user level').required('required').typeError('Invalid Input Type'),
    password: Yup.string().required('password is required').min(6,'Password must be at least 6 characters'),
    confirm_password: Yup.string().required('password is required').min(6,'Password must be at least 6 characters'),
    DOB: Yup.date().required('required'),
  })
  return (// set margin (m) and screen size
    <> 
      <Navbar />
      <div className="container mt-3">  
        <div className="row">
          <div className="col md-5">
            <Formik // check function
              initialValues={{
                user_id:'',
                user_name:'', 
                mobile_no:'', 
                email:'', 
                address:'',
                user_level:'',
                password:'',
                confirm_password:'',
                DOB:'',
              }}
              validationSchema={validate}
            >
              {formik => (
                <div>
                  <h1 className="my-4 font-weight-bold-display-4">Add User</h1>
                  <Form>
                    <TextFields label="User ID" name="user_id" type="text" />
                    <TextFields label="User Name" name="user_name" type="text" />
                    <TextFields label="Mobile_no" name="mobile_no" type="text" />
                    <TextFields label="Email" name="email" type="email" />
                    <TextFields label="Address" name="address" type="text" />
                    <TextFields label="User Level" name="user_level" type="text" />
                    <TextFields label="Password" name="password" type="password" />
                    <TextFields label="Confirm Password " name="confirm_password" type="password" />
                    <TextFields label="Date of birth" name="DOB" type="date" />
                    <button className="add">Add User</button>
                    <button className="reset" type='reset'>Reset</button>
                    {/* <div></div> */}
                  </Form>
                </div>
              )} 
            </Formik>
          </div> 
          <div className="col md-7 my-auto "> 
            { <img className="img-fluid w-100" src={userImage} alt='' /> }
          </div>
        </div>
      </div>
    </>
    // to get into desktop screen size
  )
}
