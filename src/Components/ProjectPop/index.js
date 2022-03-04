import React from "react";
import { Grid } from "@material-ui/core";
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { Typography } from "@mui/material";
import { RadioGroup, FormControl, FormControlLabel, Radio } from "@mui/material";
import { useState } from "react";
import { useHistory } from "react-router";
import './pops.css';
import axios from "axios";
import Loader from 'react-loader-spinner';
import constants from "../../Pages/constants";
import Swal from 'sweetalert2';

let localIndexString = "local-index";


const BootstrapDialogs = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));


function ProjectPopUp(props) {

  const history = useHistory();
  const { open, setOpen, opened, setOpened } = props;


  const [pageName, setPagename] = useState("")
  const [pageId, setPageId] = useState("")
  const pagesLength = props.pagesLength

  const [click, setClick] = React.useState(false)
  const isNewPageCreated = props.isNewPageCreated;
  const project = props.project;
  const accessCode = props.accessCode;
  const token = JSON.parse(localStorage.getItem('token'));
  console.log(token, "saiitoken")

  const projectId = props.projectId;
  console.log(projectId, "proid")
  console.log(pageName, "pgname")

  console.log(pagesLength, "console from create new page");


  const handleClickOpen = () => {
    setOpen(true);
    setOpened(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleCloses = () => {
    setOpened(false);
  };

  function postPage() {

    if (pageName == undefined || pageName.length == 0) {
      console.log("eeee")
      Swal.fire("OPPS", "Enter a valid Page name", "warning");
      console.log(click)
      setClick(false);
      return false;
    }


    var formData = new FormData();
    console.log(pageId, "pgidddd")
    formData.append('data', JSON.stringify({
      'project': projectId,
      'pageName': pageName
    }))


    axios({
      method: "post",
      url: constants.ipaddress + "/pages",
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
        "Authorization": "Bearer" + " " + token,
      },
    })
      .then(function (response) {
        console.log(response, "pageres")
        console.log(response.data.id, "pgID");
        console.log(pagesLength, "Page Name is length");


        localStorage.setItem(localIndexString, pagesLength);

        navigateAddPage(pageName, response.data.id)
      })
      .catch(function (response) {
        console.log(response);
      });
  }

  function navigateAddPage(pageName, pageId) {
    history.push({
      pathname: '/addpage',
      state: {
        project: project,
        accessCode: accessCode,
        projectId: projectId,
        pageName: pageName,
        pageId: pageId,
        isNewPageCreated: isNewPageCreated,
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
        <DialogContent dividers style={{ width: 400, height: 180, overflowX: 'hidden', overflowY: "hidden" }}>
          <Typography gutterBottom>
            <div >
              <div container>
                <h1 style={{ marginTop: "20px" }} className="pop-tx11">Enter Page Name</h1>
              </div>
              <input type="text" onChange={(e) => setPagename(e.target.value)} value={pageName} className="pg-inp-nm" />
              <div className="btn-pop-cont2">
                <button className="btn-cn" onClick={() => { setOpen(false) }} onClose={handleClose}> Cancel</button>
                {pageId == "" && click == false ? <button className="ad-btn2" onClick={() => { postPage(); }}>Create</button> : <Loader type="TailSpin"
                  color="#00BFFF"
                  height={30}
                  width={30}
                />
                }
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
export default ProjectPopUp;