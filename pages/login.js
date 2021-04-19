import Head from "next/head";
import Link from "next/link";
import IndexLayout from "../Layouts/index";
import Styles from "../styles/Login.module.css";

import React, { useState, useContext } from "react";
import valid from "../util/valid";
import { notify, resetNotif } from "../store/Actions";
import { DataContext } from "../store/GlobalState";
import { postData } from "../util/fetchData";
import Cookie from "js-cookie";

const login = () => {
  const initialState = { email: "", password: "" };
  const [userData, setUserData] = useState(initialState);
  const { email, password } = userData;
  const [state, dispatch] = useContext(DataContext);

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

    const res = await postData("auth/login", userData);
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
      payload: { success: "true", type: "success", msg: `${res.msg}` },
    });
    setTimeout(function () {
      dispatch(resetNotif(notify));
    }, 3000);

    dispatch({
      type: "AUTH",
      payload: {
        token: res.access_token,
        user: res.user,
      },
    });
    Cookie.set("refreshtoken", res.refresh_token, {
      path: "api/auth/accessToken",
      expires: 7,
    });
    localStorage.setItem("firstLogin", true);
  };
  return (
    <IndexLayout>
      <div className="container col-lg-4 pb-5">
        <div className="p-4" style={{ border: "2px solid green" }}>
          <Head>
            <title>Sign in Page</title>
          </Head>
          <h1 className="pb-3">Login</h1>
          <form className={`${Styles.form}`}>
            <div className="mb-3 form-group">
              <label htmlFor="exampleInputEmail" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                id="exampleInputEmail"
                aria-describedby="emailHelp"
                name="email"
                value={email}
                onChange={handleChangeInput}
              ></input>
            </div>
            <div className="mb-3 form-group">
              <label htmlFor="exampleInputPassword" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="exampleInputPassword"
                name="password"
                value={password}
                onChange={handleChangeInput}
              ></input>
            </div>

            <button type="submit" className="btn btn-lg mb-2 btn-primary w-100">
              Login
            </button>
            <p>
              You don't have an account?{" "}
              <Link href="/register">
                <a style={{ color: "crimson" }}>Register</a>
              </Link>
            </p>
          </form>
        </div>
      </div>
    </IndexLayout>
  );
};

export default login;
