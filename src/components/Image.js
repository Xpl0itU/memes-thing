import React, {useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Modal} from 'react-bootstrap';

const showStates = {
  SHOW: "show",
  CLOSE: "close"
}

export default function Image(props) {
  const [show, setShow] = useState(showStates.CLOSE);

  return (
    <>
      <Modal show={show === showStates.SHOW} onHide={() => setShow(showStates.CLOSE)}>
        <Modal.Header closeButton/>
        <Modal.Body><img src={props.src} alt="" className="rounded-xl" height='500' width='500'/></Modal.Body>
      </Modal>

      <img src={props.src} alt="" className="rounded-xl" height='200' width='200' onClick={() => setShow(showStates.SHOW)}/>
    </>
  );
}