import React, { useState } from "react";
import Navbar from '../../../Components/Navbar'
import "bootstrap/dist/css/bootstrap.min.css";
import { Formik, Form } from 'formik';
import TextFields from '../AddStock/TextFields';
import * as Yup from 'yup';
import './add.css'
import * as AiIcons from "react-icons/ai";

// import { addProduct } from './Addproduct.helper';
import { useEffect } from "react";
import axios from "axios";
export default function AddToStock() {

    //   const [product, setproduct] = useState([]);
    //   const fetch = () => {
    //     axios
    //       .get('http://localhost:5000/product')
    //       .then(res => {
    //         console.log(res)
    //         setproduct(res.data)
    //       })
    //       .catch(err => {
    //         console.log(err)
    //       })
    //   }
    //   useEffect(() => {
    //     fetch()
    //   }, [])

    const validate = Yup.object({
        productId: Yup.string().required('required'),
        warehouseID: Yup.string().required('required'),
        batchNo: Yup.string().required('required'),
        quantity: Yup.number().required('required'),
        buyingPrice: Yup.string().required('required'),
        buyingPrice: Yup.number().positive('Invalid Price').required('required').typeError('Invalid Input Type'),
        sellingPrice: Yup.number().positive('Invalid Price').required('required').typeError('Invalid Input Type'),
    })
    return (
        <>
            <Navbar />
            <div className="container mt-3" >
                <div className="row">
                    <div className="col md-5" >
                        <Formik
                            // onSubmit={(values) =>{
                            //   addProduct(values)
                            // }}
                            initialValues={{
                                productId: '',
                                warehouseID: '',
                                batchNo: '',
                                quantity: '',
                                buyingPrice: '',
                                sellingPrice: ''
                            }}
                            validationSchema={validate}
                        >
                            {formik => {
                                console.log(formik);
                                return (
                                    <div>
                                        <h1 className="my-4 font-weight-bold-display-4">Add to Stock</h1>
                                        <Form>
                                            <TextFields label="Product ID" name="productId" type="text" />
                                            <TextFields label="Select Warehouse" name="warehouseID" type="text" />
                                            <TextFields label="Select Batch No" name="batchNo" type="text" />
                                            <TextFields label="Quantity" name="quantity" type="text" />
                                            <TextFields label="Buying Price" name="buyingPrice" type="text" />
                                            <TextFields label="SellingPrice" name="sellingPrice" type="text" />
                                            <button className="add"
                                            //   onClick={() => {
                                            //     addProduct(formik.values)
                                            //       .then(() => {
                                            //         formik.resetForm()
                                            //         fetch()
                                            //         // setNotification('Success')
                                            //         window.alert('Product Added Sucessfully')
                                            //       })
                                            //       .catch((err) => {
                                            //         // setNotification('Error')
                                            //         window.alert('Product Added Unsucessfull')
                                            //       })
                                            //   }}
                                            >Add to Stock</button>
                                            <button className="reset" type='reset'>Reset</button>

                                            {/* {notification} */}
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
                                    <th scope="col"></th>
                                    <th scope="col"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* {
                  product.map(getp => (
                    <tr key={getp.id}>
                      <td>{getp.productId}</td>
                      <td>{getp.barcode}</td>
                      <td>{getp.productName}</td>
                      <td><AiIcons.AiTwotoneEdit /></td>
                      <td><AiIcons.AiFillDelete /></td>
                    </tr>
                  ))
                } */}

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>


        </>
    );
};
