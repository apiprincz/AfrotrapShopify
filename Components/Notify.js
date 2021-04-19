import { useContext, useRef } from "react";
import { DataContext } from "../store/GlobalState";
import Loading from "./Loading";
import Link from "next/link";
import Toast from "./Toast";
import { useEffect } from "react";
import { notify } from "../store/Actions";

function Notify() {
  const [state, dispatch] = useContext(DataContext);
  const { notify, cart } = state;

  return (
    <>
      {/* {notify.loading && <Loading></Loading>} */}
      {/* {notify.error && <Toast></Toast>} */}
      {notify.success && <Toast msg={notify.msg} type={notify.type} />}
      {notify.register && <Toast msg={notify.msg} />}
      {notify.fail && (
        <Toast
          msg={notify.msg}
          type={notify.type}
          show={notify.type}
          handleShow={() => handleShow()}
        />
      )}
    </>
  );
}

export default Notify;
