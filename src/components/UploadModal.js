import { useState } from "react";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import uploadtoInstagram from "../handlers/instagram_upload";

const showStates = {
  CONFIRM: "confirm",
  UPLOADED: "uploaded",
  CLOSE: "close"
}

export default function UploadModal(props) {
  const [open, setOpen] = useState(showStates.CLOSE);

  const handleClickOpen = () => {
    setOpen(showStates.CONFIRM);
  };

  const handleClose = () => {
    setOpen(showStates.CLOSE);
  };

  const handleConfirm = () => {
    uploadtoInstagram(props.token, props.pageID, props.image, props.caption, () => setOpen(showStates.UPLOADED));
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Upload
      </Button>
      <Dialog
        open={open === showStates.CONFIRM}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Upload this image?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          Please confirm to continue
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleConfirm} autoFocus>
            Continue
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={open === showStates.UPLOADED}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Uploaded successfully!"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          The image has been successfully uploaded
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}