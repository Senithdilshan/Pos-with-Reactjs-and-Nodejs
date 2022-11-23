import React, { useState } from "react";
import Navbar from '../../../Components/Navbar'
import "bootstrap/dist/css/bootstrap.min.css";
import { Formik, Form, Field } from 'formik';
import TextFields from '../AddSupplierPayments/TextFields';
import * as Yup from 'yup';
import './add.css'
import { Select, TextInput } from "@mantine/core";
import { addSupplierPayment } from './Addsupplierpayment.helper';
import { useEffect } from "react";
import axios from "axios";
import { Link, Navigate, useNavigate } from "react-router-dom";


export default function AddSupplierPayment() {
  const navigate = useNavigate() 

  const [Supplier, setsupplier] = useState([]);
  const fetchsupplier = () => {
    axios
      .get('http://localhost:5000/supplier', {
        headers: {
          "authorization": localStorage.getItem("token")
        },
      })
      .then(res => {
        // console.log(res)
        setsupplier(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }
  useEffect(() => {
    fetchsupplier()
  }, [])

  //---------------------------------------------------------Warehouse-------------------------
  const [bank, setbank] = useState([]);
  const fetchbank = () => {
    axios
      .get('http://localhost:5000/bank' , {
        headers: {
          "authorization": localStorage.getItem("token")
        },
      })
      .then(res => {
        // console.log(res)
        setbank(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }
  useEffect(() => {
    fetchbank()
  }, [])
  //-------------------------------------------------------------------------------------------
  const validate = Yup.object({
    paymentId: Yup.string().required('required'),
    supplierId: Yup.string().required('required'),
    supplierName: Yup.string().required('required'),
    paymentDescription : Yup.string().required('required'),
    paymentAmount: Yup.number().positive('Invalid Quantity').required('required').typeError('Invalid Input Type'),
    accountNumber: Yup.string(),
  })

  // const isValid = validate.isValid(res.body)
  // const validatedData = validate.validate(res.body)

  return (
    <>
      <Navbar />
      <div className="container mt-3" >
        <div className="row">
          <div className="col md-5" >
            <Formik
              initialValues={{
                paymentId: '',
                supplierId: '',
                supplierName: '',
                paymentDescription: '',
                paymentAmount: '',
                accountNumber: '',

              }}
              validationSchema={validate}
            >
              {formik => {
                console.log(formik.values);
                return (
                  <div>
                    <h1 className="my-4 font-weight-bold-display-4">Add to Stock</h1>
                    <Form>
                    <TextFields label="payment ID" name="paymentId" type="text" />
{/* ----------------------------------------------------------------------------------------------------------- */}
                      <Field name="supplier ID">
                        {({
                          field,// { name, value, onChange, onBlur }
                          form: { touched, errors, }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                          meta,
                        }) => {
                          console.log(errors);
                          return (
                            <Select
                              error={errors['supplierId']}
                              required
                              onChange={(v) => {

                                formik.setFieldValue('supplierId', v)
                              }}
                              label="supplier ID"
                              placeholder="Select a Supplier ID"
                              data={Supplier.map(sid => (
                                { value: sid.supplierId, label: sid.supplierId }
                              ))}
                            />
                          )
                        }}
                      </Field>
{/* ----------------------------------------------------------------------------------------------------------- */}
                      <Field name="supplier Name">
                        {({
                          field,// { name, value, onChange, onBlur }
                          form: { touched, errors, }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                          meta,
                        }) => (

                          <Select
                          error={errors['supplierName']}
                            onChange={(v) => {
                              // console.log(v);
                              formik.setFieldValue('supplierName', v)
                            }}
                            label="Supplier Name"
                            placeholder="Select Supplier Name"
                            data={Supplier.map(sid => (
                              { value: sid.supplierName, label: sid.supplierName }
                            ))}
                          />
                        )}
                      </Field>
                      <TextFields label="Payment Description" name="paymentDescription" type="text" />
                      <TextFields label="Payment Amount" name="paymentAmount" type="number" />

                      <Field name="Bank Account Number">
                        {({
                          field,// { name, value, onChange, onBlur }
                          form: { touched, errors, }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                          meta,
                        }) => (

                          <Select
                          error={errors['accountNumber']}
                            onChange={(v) => {
                              formik.setFieldValue('accountNumber', v)
                            }}
                            label="Account Number"
                            placeholder="Select Bank Account Number"
                            data={bank.map(acc => (
                              { value: acc.accountNumber, label: acc.accountNumber }
                            ))}
                          />
                        )}
                      </Field>

                      <button className="add"
                        onClick={() => {
                          addSupplierPayment(formik.values)
                            .then(() => {
                              formik.resetForm()
                              fetch()
                              window.alert('Payment Added Successfully')
                              navigate('/viewsupplier')
                            })
                            .catch((err) => {
                              window.alert('Failed to Add the payment')
                            })
                        }}
                      >Add Supplier Payment</button>
                      <button className="reset" type='reset'>Reset</button>
                      <Link to={'/viewsupplier'}>
                        <button className="back">Back</button>
                      </Link>
                    </Form>
                  </div>
                )
              }}
            </Formik>
          </div>
          <div className="col md-7" style={{
            height: 300,
            overflowY: 'scroll',
            marginTop: 105
          }}>
            <table className="table table-striped table-dark">
              <thead className="thead-light">
                <tr>
                  <th scope="col">Supplier ID</th>
                  <th scope="col">supplier Name</th>
                  <th scope="col">Outstanding Ammount</th>
                </tr>
              </thead>
              <tbody>
                {
                  Supplier.map(gets => (
                    <tr key={gets.id}>
                      <td>{gets.supplierId}</td>
                      <td>{gets.supplierName}</td>
                      <td>{gets.outstandingAmount}</td>
                    </tr>
                  ))
                }

              </tbody>
            </table>
          </div>
        </div>
      </div>


    </>
  );
};
