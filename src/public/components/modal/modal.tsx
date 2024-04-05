import * as React from 'react';
import Button from '@mui/material/Button';
import { BootstrapDialog } from './style';

import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';

interface ModalProps {
  open: boolean,
  handleClose: () => void,
  title: string,
  content: string | React.ReactElement,
  firstButtonText: string,
  handleFirstButton: () => void,
  secondButtonText: string,
  handleSecondButton: () => void
}

export const Modal: React.FC<ModalProps> = (props) => {
  const {
    open,
    handleClose,
    title,
    content,
    firstButtonText,
    handleFirstButton,
    secondButtonText,
    handleSecondButton
  } = props;

  return (
    <React.Fragment>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          {title}
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <Typography gutterBottom>
            {content}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleFirstButton}>
            {firstButtonText}
          </Button>
          <Button autoFocus onClick={handleSecondButton}>
            {secondButtonText}
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </React.Fragment>
  );
}
