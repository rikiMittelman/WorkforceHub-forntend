import * as React from 'react';
import Button from '@mui/material/Button';
import { BootstrapDialog } from './style';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import { SvgIconProps } from '@mui/material/SvgIcon';

interface ModalProps {
  open: boolean,
  handleClose: () => void,
  title: string,
  content: string | React.ReactElement,
  firstButtonText: string,
  handleFirstButton: () => void,
  secondButtonText?: string,
  handleSecondButton?: (arg: any) => void
  addIcon?: React.ReactElement<SvgIconProps>,
  editIcon?: React.ReactElement<SvgIconProps>,
  addRoleIcon?: React.ReactElement<SvgIconProps>,
  isNewEmployee?: boolean,
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
    handleSecondButton,
    addIcon,
    addRoleIcon,
    editIcon,
    isNewEmployee,
  } = props;

  const renderIcon = () => {
    return isNewEmployee ? addIcon : editIcon;
  };

  return (
    <React.Fragment>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2, display: 'flex', alignItems: 'center' }} id="customized-dialog-title">
        {renderIcon()}
          {title}
          
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleFirstButton}
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
