import { useState } from "preact/hooks";
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import uploadtoInstagram from "../handlers/instagram_upload";

const showStates = {
  CONFIRM: "confirm",
  UPLOADING: "uploading",
  ERROR: "error",
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
    handleClose();
    setOpen(showStates.UPLOADING);
    uploadtoInstagram(props.token, props.pageID, props.image, props.caption, () => setOpen(showStates.UPLOADED), () => setOpen(showStates.ERROR));
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

      <Snackbar open={open === showStates.UPLOADING} anchorOrigin={{ vertical: 'top', horizontal: 'right' }} onClose={handleClose}>
        <Alert severity="info">Uploading image, please wait...</Alert>
      </Snackbar>

      <Snackbar open={open === showStates.UPLOADED} autoHideDuration={6000} anchorOrigin={{ vertical: 'top', horizontal: 'right' }} onClose={handleClose}>
        <Alert severity="success">The image has been uploaded successfully!</Alert>
      </Snackbar>

      <Snackbar open={open === showStates.ERROR} autoHideDuration={6000} anchorOrigin={{ vertical: 'top', horizontal: 'right' }} onClose={handleClose}>
        <Alert severity="error">An error has occurred while uploading the image</Alert>
      </Snackbar>
    </div>
  );
}
