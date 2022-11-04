import React, { useState } from "react";
import { Formik, Form } from "formik";
import { useEffect } from "react";
import axios from "axios";
import * as Yup from "yup";
import Navbar from "../../Components/Navbar";
import TextFields from "../../Components/Elements/InputField";
import SearchBar from "../../Components/Elements/SearchBar";
import {
  FaEdit,
  FaTrashAlt,
  FaUserPlus,
  FaHighlighter,
  FaClipboardCheck,
  FaChevronCircleLeft,
  FaFileDownload,
  FaFileCsv,
} from "react-icons/fa";
//import { addCustomer } from "./addCustomer";
import { addCustomer } from "./Actions/addCustomer";
import { updateCustomer } from "./Actions/updateCustomer";
import { editCustomer } from "./Actions/editCustomer";
import "./ManageCustomers.css";
import { serverUrl } from "../../Config";

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const ManageCustomers = () => {
  const [mngCustomers, setmngCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState(null);

  const fetch = () => {
    if (searchTerm) {
      axios
        .get(`http://localhost:5000/manage-customers?searchTerm=${searchTerm}`)
        .then((res) => {
          setmngCustomers(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      axios
        .get("http://localhost:5000/manage-customers")
        .then((res) => {
          setmngCustomers(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  useEffect(() => {
    fetch();
  }, []);

  const validate = Yup.object({
    customer_id: Yup.string(),
    name: Yup.string().required("Name is Required"),
    mobile: Yup.string()
      .required("Phone number is Required")
      .matches(phoneRegExp, "Phone number is not valid")
      .min(10, "Phone number must be at least 10 characters long")
      .max(14, "Phone number should not be more than 14 characters."),
    loyalty_points: Yup.number().nullable(),
    email: Yup.string().email().required("Email is Required"),
  });

  const uvalidate = Yup.object({
    ucustomer_id: Yup.string(),
    uname: Yup.string().required("Name is Required"),
    umobile: Yup.string()
      .required("Phone number is Required")
      .matches(phoneRegExp, "Phone number is not valid")
      .min(10, "Phone number must be at least 10 characters long")
      .max(14, "Phone number should not be more than 14 characters."),
    uloyalty_points: Yup.number().nullable(),
    uemail: Yup.string().email().required("Email is Required"),
  });

  return (
    <>
      <Navbar />
      <div className="container">
        <div className="row">
          <div className="md-12 lg-12">
            <Formik
              initialValues={{
                customer_id: "",
                name: "",
                mobile: "",
                loyalty_points: "",
                email: "",
              }}
              validationSchema={validate}
            >
              {(formik) => {
                return (
                  <div>
                    <div className="row d-flex align-items-center my-4">
                      <div className="col-md-5 col-lg-5">
                        <SearchBar
                          setSearchTerm={(searchTerm) =>
                            setSearchTerm(searchTerm)
                          }
                          search={fetch}
                          searchTerm={searchTerm}
                        />
                      </div>
                      <div className="col-md-7 col-lg-2 d-flex justify-content-end">
                        <a
                          // href="http://localhost:5000/manage-customers/sendEmail"
                          style={{ textDecoration: "none" }}
                        >
                          {" "}
                          <button
                            className="btn__standard__warning"
                            type="submit"
                            onClick={() => {
                              axios
                                .get(
                                  `http://localhost:5000/manage-customers/sendEmail`
                                )
                                .then((res) => {
                                  alert("Email sent successfully");
                                })
                                .catch((err) => {
                                  console.log(err);
                                });
                            }}
                          >
                            Dealz Promo
                          </button>
                        </a>
                      </div>
                      <div className="col-md-7 col-lg-3 d-flex ">
                        <a
                          href="http://localhost:5000/manage-customers/export-csv"
                          download="Document.pdf"
                          style={{ textDecoration: "none" }}
                        >
                          {" "}
                          <button
                            className="btn__standard__warning"
                            type="submit"
                          >
                            <FaFileCsv /> Download DB CSV
                          </button>
                        </a>
                      </div>
                      <div className="col-md-7 col-lg-2 d-flex justify-content-end">
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
                            {mngCustomers.map((getp) => (
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
                                  <button
                                    className="action__button"
                                    data-tblid={getp.customer_id}
                                    data-tblname={getp.name}
                                    data-tblmob={getp.mobile}
                                    data-tblpoints={getp.loyalty_points}
                                    data-tblemail={getp.email}
                                    onClick={(e) => {
                                      /*formik.resetForm()*/
                                      const tblid =
                                        e.currentTarget.getAttribute(
                                          "data-tblid"
                                        );
                                      const tblname =
                                        e.currentTarget.getAttribute(
                                          "data-tblname"
                                        );
                                      const tblmob =
                                        e.currentTarget.getAttribute(
                                          "data-tblmob"
                                        );
                                      const tblpoints =
                                        e.currentTarget.getAttribute(
                                          "data-tblpoints"
                                        );
                                      const tblemail =
                                        e.currentTarget.getAttribute(
                                          "data-tblemail"
                                        );
                                      editCustomer(
                                        tblid,
                                        tblname,
                                        tblmob,
                                        tblpoints,
                                        tblemail
                                      );
                                    }}
                                  >
                                    <FaEdit />
                                  </button>
                                </td>
                                <td className="icon__td">
                                  <button
                                    className="action__button action__button--red"
                                    data-cid={getp.customer_id}
                                    onClick={(e) => {
                                      const cid =
                                        e.currentTarget.getAttribute(
                                          "data-cid"
                                        );
                                      axios
                                        .put(
                                          `${serverUrl}/manage-customers/deactiveCustomer/` +
                                            cid
                                        )
                                        .then(() => {
                                          //formik.resetForm()
                                          window.alert(
                                            "Custpmer deactivate Sucessfully!"
                                          );
                                          fetch();
                                          //formik.resetForm()
                                        })
                                        .catch((err) => {
                                          window.alert(
                                            "Failed to deactivate the customer!"
                                          );
                                        });
                                    }}
                                  >
                                    <FaTrashAlt />
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    <div className="row container data__form--wrapper">
                      <div
                        id="cust-show"
                        className="col-md-12 col-lg-12 data__form px-0"
                      >
                        <Form>
                          <div className="row">
                            <div className="col-md-6 col-lg-4">
                              <div className="d-none">
                                <TextFields
                                  label="Customer ID"
                                  name="customer_id"
                                  type="text"
                                  readOnly={true}
                                />
                              </div>
                              <TextFields
                                label="Customer Name"
                                name="name"
                                type="text"
                              />
                              <TextFields
                                label="Customer Mobile"
                                maxLength="14"
                                name="mobile"
                                type="text"
                              />
                            </div>
                            <div className="col-md-6 col-lg-4">
                              <TextFields
                                label="Customer Email"
                                name="email"
                                type="text"
                              />
                              <TextFields
                                label="Loyalty Points"
                                name="loyalty_points"
                                type="text"
                              />
                            </div>
                            <div className="col-md-6 col-lg-4 d-flex data__button--wrapper">
                              <button
                                className="btn__standard"
                                type="button"
                                onClick={() => {
                                  addCustomer(formik.values)
                                    .then(() => {
                                      //formik.resetForm()
                                      window.alert(
                                        "Customer was added sucessfully!"
                                      );
                                      fetch();
                                    })
                                    .catch((err) => {
                                      window.alert(
                                        "Could not add the customer!"
                                      );
                                    });
                                }}
                              >
                                <FaUserPlus /> Add
                              </button>
                              <button className="btn__standard" type="reset">
                                <FaHighlighter />
                                Clear
                              </button>
                              {/* {notification} */}
                            </div>
                          </div>
                        </Form>
                      </div>
                    </div>
                  </div>
                );
              }}
            </Formik>
            <Formik
              initialValues={{
                customer_id: "",
                name: "",
                mobile: "",
                loyalty_points: "",
                email: "",
              }}
              validationSchema={uvalidate}
            >
              {(formik) => {
                return (
                  <div>
                    <div className="row container data__form--wrapper">
                      <div
                        id="cust-edit"
                        className="col-md-12 col-lg-12 data__form px-0 d-none"
                      >
                        <Form>
                          <div className="row">
                            <div className="col-md-6 col-lg-4">
                              <TextFields
                                label="Customer ID"
                                name="ucustomer_id"
                                type="text"
                                className="form-control pos__form--input input__readonly"
                                readOnly={true}
                              />
                              <TextFields
                                label="Customer Name"
                                name="uname"
                                type="text"
                              />
                              <TextFields
                                label="Customer Mobile"
                                name="umobile"
                                maxLength="14"
                                type="text"
                              />
                            </div>
                            <div className="col-md-6 col-lg-4">
                              <TextFields
                                label="Customer Email"
                                name="uemail"
                                type="text"
                              />
                              <TextFields
                                label="Loyalty Points"
                                name="uloyalty_points"
                                type="text"
                              />
                            </div>
                            <div className="col-md-6 col-lg-4 d-flex data__button--wrapper">
                              <button
                                className="btn__standard"
                                type="button"
                                onClick={() => {
                                  updateCustomer()
                                    .then(() => {
                                      //formik.resetForm()
                                      window.alert(
                                        "Customer details updated sucessfully!"
                                      );
                                      fetch();
                                    })
                                    .catch((err) => {
                                      window.alert(
                                        "Customer details update failed!"
                                      );
                                    });
                                }}
                              >
                                <FaClipboardCheck /> Submit Update
                              </button>
                              <button
                                className="btn__standard"
                                type="reset"
                                onClick={() => {
                                  document
                                    .getElementById("cust-show")
                                    .classList.remove("d-none");
                                  document
                                    .getElementById("cust-edit")
                                    .classList.add("d-none");
                                }}
                              >
                                <FaChevronCircleLeft />
                                Exit Update
                              </button>
                              {/* {notification} */}
                            </div>
                          </div>
                        </Form>
                      </div>
                    </div>
                  </div>
                );
              }}
            </Formik>
          </div>
        </div>
      </div>
    </>
  );
};

export default ManageCustomers;
