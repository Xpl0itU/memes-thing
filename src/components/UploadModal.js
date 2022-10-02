import React, {useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Modal, Button} from 'react-bootstrap';
import uploadtoInstagram from "../handlers/instagram_upload";

export default function UploadModal(props) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" onClick={handleShow}>
        Upload
      </button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Upload this image?</Modal.Title>
        </Modal.Header>
        <Modal.Body>Please confirm to continue</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" onClick={() => {uploadtoInstagram(props.token, props.image, props.caption); handleClose()}}>
            Continue
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}