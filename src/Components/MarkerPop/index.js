import React from "react";
import './markpop.css';
import { Grid } from "@material-ui/core";
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { Typography } from "@mui/material";
import {RadioGroup,FormControl,FormControlLabel,Radio } from "@mui/material";
import { useState } from "react";
import { useHistory } from "react-router";

const BootstrapDialogs = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
      padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
      padding: theme.spacing(1),
    },
  }));
  
 function MarkerPopUp(props) {
      const history=useHistory();
      const {open,setOpen} =props;
      const [linkType,setLinkType]=React.useState("")
      const [videoLink,setVideoLink]=React.useState("")
      const [openPopUp,setOpenPopUp]=useState(true)
      let project=props.project;
      let projectId=props.projectId
      const token = JSON.parse(localStorage.getItem("token"));
      let markerName=props.markerName;
      let label=props.label;
      let desType=props.destType;
      let desLink=props.desLink;
      let xCoordinate=props.xCor;
      let yCoordinate=props.yCor;
      let TransVideo=props.transVideo;
      let bckImgUrl=props.bckImgUrl
      let vdImgUrl=props.vdImgUrl
      console.log(openPopUp)
      console.log(linkType)
      console.log(project,'popproject')
      console.log(token,'poptoken')
      console.log(videoLink)
      console.log(projectId,"popprojid")
      console.log(bckImgUrl,"BCKIMGURLPOP")
    const handleClickOpen = () => {
      setOpen(true);
    };
    const handleClose = () => {
      setOpen(false);
    };

    function navigatetoAddPage(){
      history.push({
        pathname:'/addpage',
        state:{
            project:project,
            projectId:projectId,
            token:token,
            markerName:markerName,
            label:label,
            destinationType:desType,
            destinationLink:desLink,
            xCoordinate:xCoordinate,
            yCoordinate:yCoordinate,
            transVideo:TransVideo,
            bckImgUrl:bckImgUrl,
            vdImgUrl:vdImgUrl

        }
    })  
    }
  
    return (
      <div>
        <BootstrapDialogs
          onClose={handleClose}
          aria-labelledby="customized-dialog-title"
          open={open}    
        >
          <DialogContent dividers style={{width:480,height:100,overflowX:'hidden',overflowY:"hidden"}}>
            <Typography gutterBottom>
            <div >
            <div container>
                <h1 className="pop-tx">Are you sure you want locate the marker here?</h1>
            </div>
            <div className="btn-pop-cont">
                <button className="btn-cn" onClick={()=>setOpen(false)} onClose={handleClose}>cancel</button>
                <button className="ad-btn" onClick={navigatetoAddPage}>Add</button>
            </div>
        </div>         
        </Typography>
          </DialogContent>
          <DialogActions>
          </DialogActions>
        </BootstrapDialogs>
      </div>
    );
  }
export default MarkerPopUp;