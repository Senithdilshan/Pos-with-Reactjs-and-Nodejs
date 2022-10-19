import React, { useState } from "react";
import Navbar from '../../../Components/Navbar'
import "bootstrap/dist/css/bootstrap.min.css";
import { Formik, Form, Field } from 'formik';
import TextFields from '../AddStock/TextFields';
import * as Yup from 'yup';
import './add.css'
import { Select, TextInput } from "@mantine/core";
import { addStock } from './Addtostock.helper';
import { useEffect } from "react";
import axios from "axios";


export default function AddToStock() {

  //-----------------------------------------------fetch batch No----------------------------------
  const [batches, setBatches] = useState([]);
  const fetchBatch = (pId) => {
    axios
      .get(`http://localhost:5000/batches/byid/${pId}`)

      .then(res => {
        setBatches(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }

  //-----------------------------------------------fetch price----------------------------------
  const [price, setprices] = useState([]);
  const fetchPrice = (bNo, formik) => {
    axios
      .get("http://localhost:5000/batches/batchno/" + bNo)
      .then((res) => {

        setprices(res.data)
        formik.setFieldValue('buyingPrice', res.data.buyingPrice)
        formik.setFieldValue('sellingPrice', res.data.sellingPrice)

      })
      .catch((err) => console.log(err))
  }
  //------------------------------------------fetch product-----------------------------

  const [product, setproduct] = useState([]);
  const fetch = () => {
    axios
      .get('http://localhost:5000/product')
      .then(res => {
        // console.log(res)
        setproduct(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }
  useEffect(() => {
    fetch()
  }, [])

  //---------------------------------------------------------Warehouse-------------------------
  const [warehouse, setwarehouse] = useState([]);
  const fetchWarehouse = () => {
    axios
      .get('http://localhost:5000/warehouse')
      .then(res => {
        // console.log(res)
        setwarehouse(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }
  useEffect(() => {
    fetchWarehouse()
  }, [])
  //-------------------------------------------------------------------------------------------
  const validate = Yup.object({
    productId: Yup.string().required('required'),
    warehouseID: Yup.string().required('required'),
    batchNo: Yup.string().required('required'),
    quantity: Yup.number().positive('Invalid Quantity').required('required').typeError('Invalid Input Type'),
    buyingPrice: Yup.number().positive('Invalid Price').required('required').typeError('Invalid Input Type'),
    sellingPrice: Yup.number().positive('Invalid Price').required('required').typeError('Invalid Input Type'),
  })

  // const isValid = validate.isValid(res.body)
  // const validatedData = validate.validate(res.body)

  console.log(price);
  return (
    <>
      <Navbar />
      <div className="container mt-3" >
        <div className="row">
          <div className="col md-5" >
            <Formik
              initialValues={{
                productId: '',
                warehouseID: '',
                batchNo: '',
                quantity: '',
                buyingPrice: '',
                sellingPrice: '',

              }}
              validationSchema={validate}
            >
              {formik => {
                console.log(formik.values);
                return (
                  <div>
                    <h1 className="my-4 font-weight-bold-display-4">Add to Stock</h1>
                    <Form>
                      <Field name="productId">
                        {({
                          field,// { name, value, onChange, onBlur }
                          form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                          meta,
                        }) => (

                          <TextInput
                            label="Product ID"
                            withAsterisk

                            error={meta.touched && meta.error && meta.error}
                            {...field}
                            onChange={(e) => {
                              field.onChange(e)

                              fetchBatch(e.target.value)
                            }} />
                        )}
                      </Field>
{/* ----------------------------------------------------------------------------------------------------------- */}
                      <Field name="warehouseID">
                        {({
                          field,// { name, value, onChange, onBlur }
                          form: { touched, errors, }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                          meta,
                        }) => {
                          console.log(errors);
                          return (
                            <Select
                              error={errors['warehouseID']}
                              required
                              onChange={(v) => {

                                formik.setFieldValue('warehouseID', v)
                              }}
                              label="warehouseID"
                              placeholder="Select a Warehouse"
                              data={warehouse.map(gwh => (
                                { value: gwh.warehouseID, label: gwh.warehouseID }
                              ))}
                            />
                          )
                        }}
                      </Field>
{/* ----------------------------------------------------------------------------------------------------------- */}
                      <Field name="batchNo">
                        {({
                          field,// { name, value, onChange, onBlur }
                          form: { touched, errors, }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                          meta,
                        }) => (

                          <Select
                          error={errors['batchNo']}
                            onChange={(v) => {
                              // console.log(v);
                              formik.setFieldValue('batchNo', v)
                              fetchPrice(v, formik)
                            }}
                            label="Batch"
                            placeholder="Pick one"
                            data={batches.map(gb => (
                              { value: gb.batchNo, label: gb.batchNo }
                            ))}
                          />
                        )}
                      </Field>
                      <TextFields label="Quantity" name="quantity" type="text" />
                      <TextFields label="Buying Price" name="buyingPrice" type="text" />
                      <TextFields label="SellingPrice" name="sellingPrice" type="text" />
                      <button className="add"
                        onClick={() => {
                          addStock(formik.values)
                            .then(() => {
                              formik.resetForm()
                              fetch()
                              window.alert('Product Added Sucessfully')
                            })
                            .catch((err) => {
                              window.alert('Product Added Unsucessfull')
                            })
                        }}
                      >Add to Stock</button>
                      <button className="reset" type='reset'>Reset</button>
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
                  <th scope="col">Product ID</th>
                  <th scope="col">Barcode</th>
                  <th scope="col">Product Name</th>
                </tr>
              </thead>
              <tbody>
                {
                  product.map(getp => (
                    <tr key={getp.id}>
                      <td>{getp.productId}</td>
                      <td>{getp.barcode}</td>
                      <td>{getp.productName}</td>
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
