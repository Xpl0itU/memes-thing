import React, {useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Modal} from 'react-bootstrap';

export default function Image(props) {
  const [show, setShow] = useState("close");

  return (
    <>
      <Modal show={show === "show_image"} onHide={() => setShow("close")}>
        <Modal.Header closeButton/>
        <Modal.Body><img src={props.src} alt="" className="rounded-xl" height='500' width='500'/></Modal.Body>
      </Modal>

      <img src={props.src} alt="" className="rounded-xl" height='200' width='200' onClick={() => setShow('show_image')}/>
    </>
  );
}