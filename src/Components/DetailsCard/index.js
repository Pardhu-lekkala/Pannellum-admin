import React from "react";
import './details.css';
import { Grid } from "@material-ui/core";
import ClearIcon from '@mui/icons-material/Clear';
import SketchExample from "../ColorPicker";
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { Typography } from "@mui/material";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
      padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
      padding: theme.spacing(1),
    },
  }));
  
  const BootstrapDialogTitle = (props) => {
    const { children, onClose, ...other } = props;
  
    return (
      <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
        {children}
        {onClose ? (
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        ) : null}
      </DialogTitle>
    );
  };
  
  BootstrapDialogTitle.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
  };
  
 function ProjectDetails(props) {
 const {open,setOpen} =props;
  
    const handleClickOpen = () => {
      setOpen(true);
    };
    const handleClose = () => {
      setOpen(false);
    };
  
    return (
      <div>
        <BootstrapDialog
          onClose={handleClose}
          aria-labelledby="customized-dialog-title"
          open={open}
        >
          <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
          Project Details
          </BootstrapDialogTitle>
          <DialogContent dividers style={{width:400,height:560,overflowX:'hidden'}}>
              <Typography gutterBottom>
            <Grid className="det-cont">
                <h1 className="nm-head">Project Name:<span style={{color:"#FF8800",marginLeft:"5px"}}>{props.projectName}</span></h1>
                <h1 className="nm-head">Access Code:<span style={{color:"#FF8800",marginLeft:"5px"}}>{props.accessCode}</span></h1>
                <h1 className="nm-head">Number of Pages in the Project:</h1>
                <h1 className="nm-head">Select Marker Color</h1>
            </Grid>
            <Grid className="clr-pick">
                <SketchExample />
            </Grid>
        </Typography>
          </DialogContent>
          <DialogActions>
            
          </DialogActions>
        </BootstrapDialog>
      </div>
    );
  }


export default ProjectDetails;