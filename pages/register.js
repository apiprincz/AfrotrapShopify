import Head from "next/head";
import Link from "next/link";
import React, { useState, useContext } from "react";
import IndexLayout from "../Layouts/index";
import Styles from "../styles/Login.module.css";
import valid from "../util/valid";
import { notify, resetNotif } from "../store/Actions";
import { DataContext } from "../store/GlobalState";
import { postData } from "../util/fetchData";

const Register = () => {
  const initialState = { name: "", email: "", password: "", cf_password: "" };
  const [userData, setUserData] = useState(initialState);
  const { name, email, password, cf_password } = userData;
  const [state, dispatch] = useContext(DataContext);
  const { notify, auth } = state;

  const handleChangeInput = (e) => {
    // console.log(e.target);
    const { name, value } = e.target;
    console.log(e.target.value);
    setUserData({ ...userData, [name]: value });
    // console.log(userData);
    dispatch({
      type: "NOTIFY",
      payload: {},
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(userData);
    const errMsg = valid(name, email, password, cf_password);
    // console.log(errMsg);
    if (errMsg) {
      dispatch({
        type: "NOTIFY",
        payload: { fail: "true", type: "fail", msg: `${errMsg}` },
      });
      setTimeout(function () {
        dispatch(resetNotif(notify));
      }, 3000);
    } else {
      const res = await postData("auth/register", userData);
      console.log(res);
      if (res.err) {
        return setTimeout(function () {
          dispatch({
            type: "NOTIFY",
            payload: { fail: "true", type: "fail", msg: `${res.err}` },
          });
          setTimeout(function () {
            dispatch(resetNotif(notify));
          }, 3000);
        }, 0);
      }
      dispatch({
        type: "NOTIFY",
        payload: { success: "true", type: "success", msg: "Register success!" },
      });
      setTimeout(function () {
        dispatch(resetNotif(notify));
      }, 3000);
    }
  };

  return (
    <IndexLayout>
      <div className="container col-lg-4 pb-5">
        <div className="p-4" style={{ border: "2px solid green" }}>
          <Head>
            <title>Register Page</title>
          </Head>
          <h1 className="pb-3">Register</h1>
          <form className={`${Styles.form}`} onSubmit={handleSubmit}>
            <div className="mb-3 form-group">
              <label for="name" className="form-label">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={name}
                onChange={handleChangeInput}
              ></input>
            </div>
            <div className="mb-3 form-group">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                name="email"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                value={email}
                onChange={handleChangeInput}
              ></input>
            </div>
            <div className="mb-3 form-group">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="exampleInputPassword1"
                name="password"
                value={password}
                onChange={handleChangeInput}
              ></input>
            </div>
            <div className="mb-3 form-group">
              <label htmlFor="exampleInputPassword2" className="form-label">
                Confirm Password
              </label>
              <input
                type="password"
                className="form-control"
                id="exampleInputPassword2"
                name="cf_password"
                value={cf_password}
                onChange={handleChangeInput}
              ></input>
            </div>
            <button type="submit" className="btn mb-2 btn-primary w-100">
              Register
            </button>
            <p>
              Already have an account?{" "}
              <Link href="/login">
                <a style={{ color: "crimson" }}>Login Now</a>
              </Link>
            </p>
          </form>
        </div>
      </div>
    </IndexLayout>
  );
};

export default Register;
