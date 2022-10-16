import React from 'react'
import Navbar from '../../../Components/Navbar'
import "bootstrap/dist/css/bootstrap.min.css";
import productImage from "../Assests/supp.png";
import { Formik, Form } from 'formik';
import TextFields from './TextFields';
import * as Yup from 'yup';
import './add.css'

export default function AddSupplier() {
  const validate = Yup.object({
    supplier_id: Yup.string().required('Please Enter Supplier ID'),
    supplier_name: Yup.string().required('Please Enter Supplier Name'),
    supplier_address: Yup.string().required('Please Enter Supplier Address'),
    supplier_contact_number: Yup.number().positive('Not a Valid Phone Number').required('Please Enter Supplier Phone Number').typeError('Not a Valid Phone Number')//.max(,'Invalid Phone Number size')
  })
  return (
    <>
      <Navbar />
      <div className="container mt-3">
        <div className="row">
          <div className="col md-5">
            <Formik
              initialValues={{
                supplier_id: '',
                supplier_name: '',
                supplier_address: '',
                supplier_contact_number: ''
              }}
              validationSchema={validate}
            >
              {formik => (
                <div>
                  <h1 className="my-4 font-weight-bold-display-4">Add Supplier</h1>
                  <Form>
                    <TextFields label="Supplier ID" name="supplier_id" type="text" />
                    <TextFields label="Supplier Name" name="supplier_name" type="text" />
                    <TextFields label="Supplier Address" name="supplier_address" type="text" />
                    <TextFields label="Supplier Contact Number" name="supplier_contact_number" type="text" />
                    <button className="add">Add Supplier</button>
                    <button className="reset" type='reset'>Reset Fields</button>
                    {/* <div></div> */}
                  </Form>
                </div>
              )}
            </Formik>
          </div>
          <div className="col md-7 my-auto ">
            <img className="img-fluid w-100" src={productImage} alt='' />
          </div>
        </div>
      </div>


    </>
  )
}
