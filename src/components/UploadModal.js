import React, {useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Modal, Button} from 'react-bootstrap';
import uploadtoInstagram from "../handlers/instagram_upload";

export default function UploadModal(props) {
  const [show, setShow] = useState("close");

  return (
    <>
      <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" onClick={() => setShow("confirm")}>
        Upload
      </button>

      <Modal show={show === "confirm"} onHide={() => setShow("close")}>
        <Modal.Header closeButton>
          <Modal.Title>Upload this image?</Modal.Title>
        </Modal.Header>
        <Modal.Body>Please confirm to continue</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow("close")}>
            Close
          </Button>
          <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" onClick={() => {uploadtoInstagram(props.token, props.image, props.caption, () => setShow("uploaded"));}}>
            Continue
          </button>
        </Modal.Footer>
      </Modal>

      <Modal show={show === "uploaded"} onHide={() => setShow("close")}>
        <Modal.Header closeButton>
          <Modal.Title>Uploaded successfully!</Modal.Title>
        </Modal.Header>
        <Modal.Body>The image has been successfully uploaded</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow("close")}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}