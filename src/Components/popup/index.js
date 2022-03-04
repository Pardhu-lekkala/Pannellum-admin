import React from "react";
import "./pop.css";
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
// import swal from 'sweetalert';
import axios from "axios";
import constants from "../../Pages/constants";
import Swal from "sweetalert2";

const BootstrapDialogs = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

function VideoUploadCard(props) {
  const history = useHistory();
  const { open, setOpen } = props;
  const [videoType, setVideoType] = React.useState("");
  const [videoURL, setVideoURL] = React.useState("-");
  const [vdAreaId, setVdAreaId] = React.useState(null);

  const [isEditmode, setEditMode] = React.useState(false);
  const [elementToBeEdited, setElementToBeEdited] = React.useState("");
  const [backgroundImageElement, setBackground] = React.useState(null);

  let pageId = props.pageId;
  let token = JSON.parse(localStorage.getItem("token"));
  console.log(props.isEditmode, "this is edit mode in popup");
  console.log(isEditmode, "this is state edit mode");
  console.log(elementToBeEdited, "thos is state element to be edited");

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  function navigateVideoArea() {
    if (videoType == "") {
      Swal.fire("OPPS", "Please select the video type", "warning");
      return false;
    }

    if (videoURL == "") {
      Swal.fire("OPPS", "Please enter the Video URL", "warning");
      return false;
    }

    console.log("now going to the next route" + pageId + videoType + videoURL);

    let stateVariable = {
      pageId: pageId,
      linkType: videoType,
      videoLink: videoURL,
      token: token,
      backgroundURL: backgroundImageElement?.url,
      backgroundWidth: backgroundImageElement?.width,
      backgroundHeight: backgroundImageElement?.height,
    };
    if (isEditmode) {
      stateVariable["id"] = elementToBeEdited.id;
      stateVariable["isEditmode"] = isEditmode;

      if (videoType == "")
        stateVariable["linkType"] = elementToBeEdited.videoType;
    }
    console.log(elementToBeEdited, "praveen edit");

    history.push({
      pathname: "/videoarea",
      state: stateVariable,
    });
  }

  React.useEffect(() => {
    console.log("Inside Video Popup");

    pageId = props.pageId;
    token = props.token;

    if (props.isEditmode != undefined) setEditMode(props.isEditmode);

    if (props.backgroundImage != null) setBackground(props.backgroundImage);

    if (props.elementToBeEdited != undefined) {
      setElementToBeEdited(props.elementToBeEdited);
      setVideoType(props.elementToBeEdited.videoType);
      setVideoURL(props.elementToBeEdited.videoURL);
    } else {
      setElementToBeEdited(null);
      setVideoType("Youtube");
      setVideoURL("");
    }
  }, [props]);

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
            height: 460,
            overflowX: "hidden",
            overflowY: "hidden",
          }}
        >
          <Typography gutterBottom>
            <Grid className="det-cont">
              <div>
                <div container>
                  <div item xs={12} className="tx-grid-cont">
                    <h1 className="vd-txs">Add Video Area</h1>
                  </div>
                  <div className="content-grid">
                    <div>
                      <h1 className="lk-tx">
                        Video Link Type
                        <span style={{ color: "red" }}>*</span>
                        <span
                          style={{
                            fontWeight: "300",
                            color: "#8391A7",
                            fontStyle: "normal",
                          }}
                        >
                          (Link type is mandatory)
                        </span>
                      </h1>
                    </div>

                    <div item xs={12} style={{ marginLeft: "15px" }}>
                      <FormControl>
                        <RadioGroup
                          style={{ marginTop: "15px" }}
                          name="videoType"
                          defaultValue={
                            isEditmode == false
                              ? "Youtube"
                              : elementToBeEdited.row.videoType
                          }
                          onChange={(e) => setVideoType(e.target.value)}
                        >
                          <FormControlLabel
                            value="Youtube"
                            control={<Radio />}
                            label="Youtube"
                            className="radio1"
                          />
                          <FormControlLabel
                            value="Vimeo"
                            control={<Radio />}
                            label="Vimeo"
                            className="radio2"
                          />
                        </RadioGroup>
                      </FormControl>
                    </div>

                    <div>
                      <h1 variant="h1" className="vd-lk-tx">
                        Add Video Link
                        <span style={{ color: "red" }}>*</span>
                        <span
                          style={{
                            fontWeight: "300",
                            color: "#8391A7",
                            fontStyle: "normal",
                          }}
                        >
                          (Video Link is mandatory)
                        </span>
                      </h1>
                      {console.log(isEditmode, "edit mode in container")}
                      {console.log(videoURL, "this is current video url")}
                      {isEditmode == true ? (
                        <input
                          type="text"
                          className="inp-lk"
                          value={
                            videoURL == "-" ||
                            (videoURL == undefined && isEditmode)
                              ? elementToBeEdited.row.videoURL
                              : videoURL
                          }
                          onChange={(e) => setVideoURL(e.target.value)}
                        />
                      ) : (
                        <input
                          type="text"
                          className="inp-lk"
                          value={videoURL}
                          onChange={(e) => setVideoURL(e.target.value)}
                        />
                      )}
                    </div>
                  </div>
                  <div className="cd-btn-cont">
                    <button
                      className="cd-btn-tx"
                      onClick={() => setOpen(false)}
                      onClose={handleClose}
                    >
                      Cancel
                    </button>

                    {vdAreaId == null ? (
                      <button
                        className="cd-btn-tx3"
                        onClick={() => {
                          navigateVideoArea();
                        }}
                      >
                        Confirm
                      </button>
                    ) : null}
                  </div>
                </div>
              </div>
            </Grid>
          </Typography>
        </DialogContent>
        <DialogActions></DialogActions>
      </BootstrapDialogs>
    </div>
  );
}

export default VideoUploadCard;
