import Link from "next/link";
import React, { useRef, useEffect } from "react";
import { useRouter } from "next/router";
const Toast = ({ msg, handleShow, type, show }) => {
  const tRef = useRef();
  const router = useRouter();
  const bgColor = (type) => {
    switch (type) {
      case "success":
        return "bg-success";
        break;

      case "fail":
        return "bg-danger";
        break;

      default:
        break;
    }
  };
  //   useEffect(() => {
  //     $("#myToast").on("shown.bs.toast", function (e) {
  //       return console.log("true");
  //     });
  //   }, []);
  //   $("#myToast").on("shown.bs.toast", function (e) {
  //     console.log("true");
  //   });

  return (
    <div
      className={`toast show ${bgColor(type)} position-fixed `}
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
      data-autohide="false"
      id="myToast"
      style={{
        position: "absolute",
        color: "white",
        top: "100px",
        right: "20px",
        transition: "opacity 1.4s ease-in-out",
      }}
    >
      <div class="toast-body d-flex justify-content-between">
        <p>{msg}</p>
        {router.pathname === "/register" ? (
          ""
        ) : (
          <Link href="/cart">
            <a>View Cart</a>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Toast;
