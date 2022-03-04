import React from "react";
import { Grid } from "@material-ui/core";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import { Typography } from "@mui/material";
import {
  RadioGroup,
  FormControl,
  FormControlLabel,
  Radio,
} from "@mui/material";
import { useState } from "react";
import { useHistory } from "react-router";
import axios from "axios";
import constants from "../../Pages/constants";
import Loader from "react-loader-spinner";

const BootstrapDialogs = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

function DeletePop(props) {
  const history = useHistory();
  const { open, setOpen, opened, setOpened } = props;
  const [pageName, setPagename] = React.useState("");
  const [pageId, setPageId] = React.useState("");
  const [click, setClick] = React.useState(false);
  const [response, setResponse] = React.useState(null);
  const deleteId = props.deleteId;
  const project = props.project;
  const accessCode = props.accessCode;
  const token = JSON.parse(localStorage.getItem("token"));
  const projectId = props.projectId;
  var formData = new FormData();
  console.log(deleteId, "deleteid");
  console.log(response, "delres");

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

  function deleteMarker() {
    axios({
      method: "DELETE",
      url: constants.ipaddress + `/markers/${deleteId}`,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer" + " " + token,
      },
    })
      .then(function (response) {
        setResponse(response);
        console.log(response, "deleteresponse");
      })
      .catch(function (response) {
        console.log(response);
      });
  }

  function navigateAddPage() {
    history.push({
      pathname: "/addpage",
      state: {
        project: project,
        accessCode: accessCode,
        token: token,
        projectId: projectId,
        pageName: pageName,
        pageId: pageId,
      },
    });
  }
  return (
    <div>
      <BootstrapDialogs
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogContent
          dividers
          style={{
            width: 480,
            height: 100,
            overflowX: "hidden",
            overflowY: "hidden",
          }}
        >
          <Typography gutterBottom>
            <div>
              <div container>
                <h1 className="pop-tx11">Are you sure want to delete?</h1>
              </div>
              <div className="btn-pop-cont">
                <button
                  className="btn-cn"
                  onClick={() => {
                    setOpen(false);
                  }}
                  onClose={handleClose}
                >
                  No
                </button>
                {response == null ? (
                  <button
                    className="ad-btn"
                    onClick={() => {
                      navigateAddPage();
                      deleteMarker();
                      setClick(true);
                    }}
                  >
                    Confirm
                  </button>
                ) : null}
                {response !== null ? (
                  <button
                    className="ad-btn"
                    onClick={() => {
                      navigateAddPage();
                      setOpen(false);
                    }}
                  >
                    Continue
                  </button>
                ) : null}
              </div>
            </div>
          </Typography>
        </DialogContent>
        <DialogActions></DialogActions>
      </BootstrapDialogs>
    </div>
  );
}
export default DeletePop;
