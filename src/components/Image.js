import { useState } from "react";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

const showStates = {
  SHOW: "show",
  CLOSE: "close"
}

export default function Image(props) {
  const [show, setShow] = useState(showStates.CLOSE);

  return (
    <>
      <Dialog
        open={show === showStates.SHOW}
        onClose={() => { setShow(showStates.CLOSE) }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <img src={props.src} alt="" style={{ maxHeight: "100%", maxWidth: "100%" }} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => { setShow(showStates.CLOSE) }}>Close</Button>
        </DialogActions>
      </Dialog>

      <img src={props.src} alt="" width='200' onClick={() => setShow(showStates.SHOW)} />
    </>
  );
}