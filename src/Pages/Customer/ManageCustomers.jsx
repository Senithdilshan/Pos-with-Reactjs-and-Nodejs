import React, { useState } from "react";
import { Formik, Form } from 'formik';
import { useEffect } from "react";
import axios from "axios";
import * as Yup from 'yup';
import Navbar from '../../Components/Navbar';
import TextFields from '../../Components/Elements/InputField';
import SearchBar from '../../Components/Elements/SearchBar';
import { FaEdit, FaTrashAlt, FaUserPlus, FaHighlighter } from "react-icons/fa";
//import { addCustomer } from "./addCustomer";
import { addCustomer } from "./Actions/addCustomer";

import { editCustomer } from "./Actions/editCustomer";
import './ManageCustomers.css';
import { serverUrl } from "../../Config";

const ManageCustomers = () => {
  const [mngCustomers, setmngCustomers] = useState([]);
  const fetch = () => {
    axios
      .get('http://localhost:5000/manage-customers')
      .then(res => {
        setmngCustomers(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }
  useEffect(() => {
    fetch()
  }, [])

  const validate = Yup.object({
    customer_id: Yup.string().required(),
    name: Yup.string().required(),
    mobile: Yup.number().required(),
    loyalty_points: Yup.number().nullable(),
    email: Yup.string().required(),
  })

  return (
    <>
      <Navbar />
      <div className="container" >
        <div className="row">
          <div className="md-12 lg-12" >
            <Formik
              initialValues={{
                customer_id: '',
                name: '',
                mobile: '',
                loyalty_points: '',
                email: ''
              }}
              validationSchema={validate}
            >
              {formik => {
                return (
                  <div>
                    <div className="row d-flex align-items-center my-4">
                      <div className="col-md-5 col-lg-6">
                        <SearchBar />
                      </div>
                      <div className="col-md-7 col-lg-6 d-flex justify-content-end">
                        <h1 className="page__title">Customers</h1>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-12 col-lg-12 data__table">
                        <table className="table table-striped table-hover">
                          <thead className="thead-light">
                            <tr>
                              <th scope="col">Customer ID</th>
                              <th scope="col">Customer Name</th>
                              <th scope="col">Mobile</th>
                              <th scope="col">Loyalty Points</th>
                              <th scope="col">Email</th>
                              <th scope="col">Joined</th>
                              <th scope="col">Updated</th>
                              <th scope="col">Status</th>
                              <th colSpan="2">Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {
                              mngCustomers.map(getp => (
                              
                                <tr key={getp.id}>
                                  <td>{getp.customer_id}</td>
                                  <td>{getp.name}</td>
                                  <td>{getp.mobile}</td>
                                  <td>{getp.loyalty_points}</td>
                                  <td>{getp.email}</td>
                                  <td>{getp.createdAt}</td>
                                  <td>{getp.updatedAt}</td>
                                  <td>{getp.status}</td>
                                  <td className="icon__td">
                                  <button className="action__button" 
                                          data-tblid={getp.customer_id}
                                          data-tblname={getp.name}
                                          data-tblmob={getp.mobile}
                                          data-tblpoints={getp.loyalty_points}
                                          data-tblemail={getp.email}
                                          onClick={ e => {
                                      /*formik.resetForm()*/
                                      const tblid = e.currentTarget.getAttribute('data-tblid');
                                      const tblname = e.currentTarget.getAttribute('data-tblname');
                                      const tblmob = e.currentTarget.getAttribute('data-tblmob');
                                      const tblpoints = e.currentTarget.getAttribute('data-tblpoints');
                                      const tblemail = e.currentTarget.getAttribute('data-tblemail');
                                      editCustomer(tblid, tblname, tblmob, tblpoints, tblemail)
                                    }}>
                                    <FaEdit />
                                    </button>
                                  </td> 
                                  <td className="icon__td">
                                    <button className="action__button action__button--red" data-cid={getp.customer_id} onClick={ e => { 
                                      const cid = e.currentTarget.getAttribute('data-cid');
                                      axios.put( `${serverUrl}/manage-customers/deactiveCustomer/`+cid)  
                                        .then(() => {
                                          //formik.resetForm()
                                          fetch()
                                          window.alert('Custpmer deactivate Sucessfully!');
                                          //formik.resetForm()
                                        })
                                        .catch((err) => {
                                          window.alert('Failed to deactivate the customer!');
                                        })
                                      }}>
                                      <FaTrashAlt />
                                    </button>
                                  </td>
                                </tr>
                              ))
                            }
                          </tbody>
                        </table>
                      </div>
                    </div>

                    <div className="row container data__form--wrapper">
                      <div className="col-md-12 col-lg-12 data__form px-0">
                        <Form>
                          <div className="row">
                            <div className="col-md-6 col-lg-4">
                              <TextFields label="Customer ID" name="customer_id" type="text" />
                              <TextFields label="Customer Name" name="name" type="text" />
                              <TextFields label="Customer Mobile" name="mobile" type="text" />
                            </div>
                            <div className="col-md-6 col-lg-4">
                              <TextFields label="Customer Email" name="email" type="text" />
                              <TextFields label="Loyalty Points" name="loyalty_points" type="text" />
                            </div>
                            <div className="col-md-6 col-lg-4 d-flex data__button--wrapper">
                              <button className="btn__standard" onClick={() => {
                                addCustomer(formik.values)
                                  .then(() => {
                                    formik.resetForm()
                                    fetch()
                                    window.alert('Customer was added sucessfully!');
                                  })
                                  .catch((err) => {
                                    window.alert('Could not add the customer!');
                                  })
                              }}><FaUserPlus /> Add</button>
                              <button className="btn__standard" type='reset'><FaHighlighter />Clear</button>
                              {/* {notification} */}
                            </div>
                          </div>
                        </Form>
                      </div>
                    </div>

                  </div>
                )
              }}
            </Formik>
          </div>

        </div>
      </div>


    </>
  )
}

export default ManageCustomers
