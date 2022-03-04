import React, { useEffect } from "react";
import "./pop2.css";
import { Grid } from "@material-ui/core";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import { Typography } from "@mui/material";
import { useRef, useState } from "react";
import { Switch } from "@mui/material";
import swap from "../../Assets/Images/swap.png";
import { useHistory } from "react-router";
import axios from "axios";
import constants from "../../Pages/constants";
// import swal from 'sweetalert';
import Swal from "sweetalert2";
import Loader from "react-loader-spinner";
import { TryOutlined } from "@mui/icons-material";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import InfoIcon from "@mui/icons-material/Info";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root2": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root2": {
    padding: theme.spacing(1),
  },
}));

const NewTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "#002E5A",
    color: "#FFF",
    boxShadow: theme.shadows[1],
    fontSize: 11,
    maxWidth: 200,
  },
  [`& .${tooltipClasses.arrow}`]: {
    color: "#002E5A",
  },
}));

function MarkerCard(props) {
  const history = useHistory();
  const fileMarkerVideoRef = useRef();
  const fileMarkerImageRef = useRef();

  const [isPopUpVisble, setPopUpVisible] = React.useState("false");

  const [markerVideo, setMarkerVideo] = React.useState("");
  const [click, setClick] = React.useState(false);
  const [fileUploded, setFileUploaded] = React.useState("");
  const [markerImage, setMarkerImage] = React.useState("");
  const [videoMarkerName, setMarkerVideoName] = React.useState("");
  const [imageMarkerName, setMarkerImageName] = React.useState("");
  const [fileMarkerImageType, setFileMarkerImageType] = React.useState("");
  const [fileMarkerImageSize, setFileMarkerImageSize] = React.useState(15);
  const [fileMarkerVideoType, setFileMarkerVideoType] = React.useState("");
  const [fileMarkerVideoSize, setFileMarkerVideoSize] = React.useState(15);
  const [markerInpName, setMarkerInpName] = React.useState("");
  const [markerLabel, setMarkerLabel] = React.useState("");
  const [destinationType, setDestinationType] = React.useState("Web Link");
  const [destinationId, setDestinationId] = React.useState("");
  const [destinationImage, setDestinationImage] = React.useState("");
  const [destinationVideo, setDestionationVideo] = React.useState("");
  const [markerVideoLink, setMarkerVideoLink] = React.useState("");
  const [labelSwitch, setLabelSwitch] = React.useState(false);
  const [markerId, setMarkerId] = React.useState(null);
  const [loadClick, setLoadClick] = React.useState(false);

  const [background, setBackground] = React.useState(null);
  const [bckImgWidth, setBackgroundImageWidth] = React.useState(null);
  const [bckImgHeight, setBackgroundImageHeight] = React.useState(null);

  const setmarkerPopupOpen = props.setmarkerPopupOpen;
  const id = props.pageId;
  const token = JSON.parse(localStorage.getItem("token"));
  const project = props.project;
  const projectId = props.projectId;
  const bckImgUrl = props.backgroundImage?.url;
  console.log(bckImgUrl, "back img url");
  console.log(markerImage, "markerImage file");
  console.log(fileUploded, "file uploded");

  if (markerImage !== "" && click == true) {
    uploadFile();
  }

  if (destinationType === "360° Image") {
    setDestinationType("VideoView");
  }

  if (destinationType === "Image") {
    setDestinationType("ImageView");
  }

  const vdImgUrl = props.vdImgUrl;
  console.log(projectId, "proidcard");
  console.log(id, "pageid");
  console.log(markerVideo, "transvd");
  console.log(markerInpName, "markernm");
  console.log(destinationType, "this is dstype");
  console.log(markerVideoLink, "vdlink");
  console.log(labelSwitch, "labelsw");
  console.log(project, "projectscene");
  console.log(token, "tokenscene");
  console.log(destinationId, "desid");
  console.log(bckImgUrl, "bckIMGURL");
  const switchToggle = () => {
    labelSwitch ? setLabelSwitch(false) : setLabelSwitch(true);
  };
  const handleClickOpen = () => {
    setmarkerPopupOpen(true);
  };
  const handleClose = () => {
    setmarkerPopupOpen(false);
  };

  {
    /*function postMarker() {
    var formData = new FormData();
  formData.append('data', JSON.stringify({
    'page': id
  }))
    axios({
      method: "post",
      url: constants.ipaddress + "/markers",
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
        "Authorization": "Bearer" + " " + token,
      },
    })
      .then(function (response) {
        console.log(response.data.id, "markerId")
        setMarkerId(response.data.id)
      })
      .catch(function (response) {
        console.log(response);
      });
  }*/
  }

  React.useEffect(() => {
    console.log("Inside Maker useeffect");
    console.log("Marker popup use effect");
    setPopUpVisible(props.markerPopupOpen);
    //console.log(props.isEditmode,"this is edit mode in popup2")
    //console.log(props.elementToBeEdited.row.markerName,"this is the element to be edited in popup2")
    console.log("background URL" + props.backgroundImage?.url);

    if (props.backgroundImage != null) {
      setBackground(props.backgroundImage.url);
      setBackgroundImageWidth(props.backgroundImage.width);
      setBackgroundImageHeight(props.backgroundImage.height);
    }

    if (props.isEditmode) {
      setMarkerId(props.elementToBeEdited.row.id);
      setMarkerInpName(props.elementToBeEdited.row.markerName);
      setMarkerLabel(props.elementToBeEdited.row.markerLabel);
      setDestinationType(props.elementToBeEdited.row.destinationType);
      setMarkerVideoLink(props.elementToBeEdited.row.destinationLink);
      setLabelSwitch(props.elementToBeEdited.row.VisibileLabel);
      setDestinationId(props.elementToBeEdited.row.destinationPage);
      if (props.elementToBeEdited.row.TransVideo != null)
        setMarkerVideo(props.elementToBeEdited.row.TransVideo.id);
    } else {
      setMarkerId(null);
      setMarkerInpName("");
      setDestinationType("Link");
      setDestinationId("");
      setMarkerLabel("");
      setMarkerVideoLink("");
      setLabelSwitch(false);
      setDestinationId("");
    }
  }, [props]);

  /************************************************upload file************************************************************************ */
  function uploadFile() {
    var formData = new FormData();
    let method = "POST";
    let url = constants.ipaddress + "/upload";
    console.log(markerImage, "mark img");
    if (markerImage !== "") {
      formData.append("files", markerImage);
    }

    console.log(formData, "formdata");
    axios({
      method: method,
      url: url,
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer" + " " + token,
      },
    })
      .then(function (response) {
        console.log(response.data[0].url, "this is file url");
        setClick(false);
        setMarkerVideoLink(response.data[0].url);
        console.log(response, "this is response");
      })
      .catch(function (response) {
        console.log(response);
      });
  }

  /************************************************EDITING THE MARKER********************************************************************** */

  function postMarker() {
    var formData = new FormData();
    let method = "PUT";
    let url = constants.ipaddress + "/markers/" + markerId;

    if (markerVideo != "") {
      if (typeof markerVideo == "object")
        formData.append("files.TransVideo", markerVideo);
    }

    let dataParams = {
      markerName: markerInpName,
      page: id,
      markerLabel: markerLabel,
      destinationLink: markerVideoLink,
      destinationType: destinationType,
      VisibileLabel: labelSwitch,
    };

    if (destinationId != "") {
      dataParams["destinationPage"] = destinationId;
    }

    formData.append("data", JSON.stringify(dataParams));
    axios({
      method: method,
      url: url,
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer" + " " + token,
      },
    })
      .then(function (response) {
        window.location.reload();
        console.log(response);
      })
      .catch(function (response) {
        console.log(response);
      });
  }

  /***************************************************************************************************************************** */

  function navigateMarker() {
    console.log(destinationId, "destination id ");
    console.log(destinationType, "destination type ");

    if (markerInpName == "") {
      Swal.fire("OPPS", "Please select the marker name", "warning");
      return false;
    }
    if (destinationType == "") {
      Swal.fire("OPPS", "Please select the destination type", "warning");
      return false;
    }

    if (markerLabel == "") {
      Swal.fire("OPPS", "Please select the marker label", "warning");
      return false;
    }

    if (
      destinationType === "Page" &&
      (destinationId == null || destinationId == "")
    ) {
      Swal.fire(
        "OPPS",
        "Please provide the the destination page ID",
        "warning"
      );
      return false;
    }

    if (
      destinationType === "ImageView" &&
      click == false &&
      (markerVideoLink == null || markerVideoLink == "")
    ) {
      Swal.fire("OPPS", "Please upload image file", "warning");
      return false;
    }

    if (
      destinationType === "ImageView" &&
      click == true &&
      (markerVideoLink == null || markerVideoLink == "")
    ) {
      Swal.fire("OPPS", "Please wait!!Image is uploading", "warning");
      return false;
    }

    if (
      destinationType === "VideoView" &&
      (markerVideoLink == null || markerVideoLink == "")
    ) {
      Swal.fire("OPPS", "Please provide the the video URL", "warning");
      return false;
    }

    if (
      destinationType === "PDF" &&
      click == false &&
      (markerVideoLink == null || markerVideoLink == "")
    ) {
      Swal.fire("OPPS", "Please upload pdf file", "warning");
      return false;
    }

    if (
      destinationType === "PDF" &&
      click == true &&
      (markerVideoLink == null || markerVideoLink == "")
    ) {
      Swal.fire("OPPS", "Please wait!! PDF is uploading.", "warning");
      return false;
    }

    if (
      destinationType === "Link" &&
      (markerVideoLink == null || markerVideoLink == "")
    ) {
      Swal.fire("OPPS", "Please provide the external web link", "warning");
      return false;
    }

    if (
      markerInpName !== "" &&
      destinationType !== ""
      //markerVideoLink !== ""
    ) {
      history.push({
        pathname: "/markerlocation",
        state: {
          pageId: id,
          token: token,
          markerName: markerInpName,
          markerLabel: markerLabel,
          destinationType: destinationType,
          destinationLink: markerVideoLink,
          VisibileLabel: labelSwitch,
          TransVideo: markerVideo,
          projectId: projectId,
          destinationPage: destinationId,
          bckImgUrl: bckImgUrl,
          isEditMode: props.isEditmode,
          markerId: markerId,
          backgroundURL: background,
          backgroundWidth: bckImgWidth,
          backgroundHeight: bckImgHeight,
        },
      });
    }
  }
  const handleMarkerVideoChange = (e) => {
    let markerVideofiles = e.target.files;
    setMarkerVideoName(markerVideofiles[0].name);
    setMarkerVideo(e.target.files[0]);
    console.log("data file", markerVideofiles[0].type);
    let fileMarkerVideoLen = markerVideofiles[0].size / 1048576;
    console.log(fileMarkerVideoLen);
    setFileMarkerVideoSize(fileMarkerVideoLen);
    setFileMarkerVideoType(markerVideofiles[0].type);
    let reads = new FileReader();
    reads.readAsDataURL(markerVideofiles[0]);
    reads.onload = (e) => {
      console.log("img data", e.target.result);
      //setMarkerVideo(e.target.result);
    };
  };

  const handleMarkerImageChange = (e) => {
    let markerImagefiles = e.target.files;
    setMarkerImageName(markerImagefiles[0].name);
    setMarkerImage(e.target.files[0]);
    setClick(true);
    console.log("data file", markerImagefiles[0].type);
    let fileMarkerImageLen = markerImagefiles[0].size / 1048576;
    console.log(fileMarkerImageLen);
    setFileMarkerImageSize(fileMarkerImageLen);
    setFileMarkerImageType(markerImagefiles[0].type);
    let reads = new FileReader();
    reads.readAsDataURL(markerImagefiles[0]);
    reads.onload = (e) => {
      console.log("img up url", e.target.result);
      // uploadFile(markerImage);
      //setMarkerVideo(e.target.result);
      //setFileUploaded(e.target.result);
    };
  };

  return (
    <div>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title2"
        open={isPopUpVisble}
      >
        <DialogContent
          dividers
          style={{ width: 480, height: 600, overflowX: "hidden" }}
        >
          <Typography gutterBottom>
            <Grid className="det-cont">
              <div>
                <div container>
                  <div item xs={12} className="tx-grid-cont">
                    <h1 className="vd-txs">Add Marker</h1>
                  </div>
                  <div className="content-grid">
                    <div>
                      <h1 className="mk-nm">
                        Marker Name
                        <span style={{ color: "red" }}>*</span>
                        <span
                          style={{
                            fontWeight: "300",
                            color: "#8391A7",
                            fontStyle: "normal",
                          }}
                        >
                          (Marker Name is mandatory)
                        </span>
                      </h1>
                      <input
                        type="text"
                        className="mk-inp"
                        value={markerInpName}
                        onChange={(e) => setMarkerInpName(e.target.value)}
                      />
                    </div>
                    <div>
                      <h1 className="mk-nm">
                        Add Marker Label
                        <span style={{ color: "red" }}>*</span>
                        <span
                          style={{
                            fontWeight: "300",
                            color: "#8391A7",
                            fontStyle: "normal",
                          }}
                        >
                          (Marker Label is mandatory)
                        </span>
                      </h1>
                      <input
                        type="text"
                        className="mk-inp"
                        value={markerLabel}
                        onChange={(e) => setMarkerLabel(e.target.value)}
                      />
                    </div>
                    <div>
                      <h1 className="mk-nm">
                        Add Destination Type
                        <span style={{ color: "red" }}>*</span>
                        <span
                          style={{
                            fontWeight: "300",
                            color: "#8391A7",
                            fontStyle: "normal",
                          }}
                        >
                          (Destination Type is mandatory)
                        </span>
                      </h1>
                      <div>
                        <select
                          value={
                            destinationType == "VideoView"
                              ? "360° Image"
                              : destinationType == "ImageView"
                              ? "Image"
                              : destinationType
                          }
                          onChange={(e) => setDestinationType(e.target.value)}
                          className="mk-drop"
                        >
                          <option className="mk-op">Link</option>
                          <option className="mk-op">Page</option>
                          <option className="mk-op">PDF</option>
                          <option className="mk-op">Image</option>
                          <option className="mk-op">360° Image</option>
                        </select>
                      </div>
                      {destinationType == "Page" ? (
                        <div>
                          <h1 className="mk-nm">
                            Destination Page Id
                            <span style={{ color: "red" }}>*</span>
                            <span
                              style={{
                                fontWeight: "300",
                                color: "#8391A7",
                                fontStyle: "normal",
                              }}
                            >
                              (Get the Page id from Side Menu)
                            </span>
                          </h1>
                          <input
                            type="text"
                            className="mk-inp"
                            value={destinationId}
                            onChange={(e) => setDestinationId(e.target.value)}
                          />
                        </div>
                      ) : null}
                    </div>

                    {destinationType === "VideoView" ||
                    destinationType === "Link" ? (
                      <div>
                        <div>
                          <h1 className="mk-nm">
                            {destinationType === "Link" ? "Add Link" : null}
                            {/* {destinationType === "PDF" ? "Add PDF Link" : null}
                            {destinationType === "ImageView"
                              ? "Add Image Link"
                              : null} */}
                            {destinationType === "VideoView"
                              ? "Add round me Link"
                              : null}
                            <span style={{ color: "red" }}>*</span>
                            <span
                              style={{
                                fontWeight: "300",
                                color: "#8391A7",
                                fontStyle: "normal",
                              }}
                            >
                              (Link is mandatory)
                            </span>
                          </h1>
                          <input
                            type="text"
                            className="mk-inp"
                            value={markerVideoLink}
                            onChange={(e) => setMarkerVideoLink(e.target.value)}
                          />
                        </div>
                      </div>
                    ) : null}
                    {/************************************Image upload********************************************** */}
                    {destinationType === "ImageView" ||
                    destinationType === "PDF" ? (
                      <div style={{ marginTop: "10px", marginBottom: "3px" }}>
                        <label className="mk-nm">
                          {destinationType === "PDF"
                            ? "Upload PDF"
                            : "Upload Image"}
                        </label>
                        <span style={{ color: "red" }}>*</span>{" "}
                        <span
                          style={{
                            fontWeight: "300",
                            color: "#8391A7",

                            fontSize: "14px",
                          }}
                        >
                          (File is mandatory)
                        </span>
                        <br />
                        <button
                          className="mk-up-btn"
                          style={{ marginTop: "5px" }}
                          //onClick={() => fileMarkerImageRef.current.click()}
                          onClick={() => {
                            fileMarkerImageRef.current.click();
                          }}
                        >
                          {click == false && markerVideoLink == ""
                            ? "upload"
                            : null}
                          {click == true ? (
                            <Loader
                              type="TailSpin"
                              color="#00BFFF"
                              height={20}
                              width={30}
                            />
                          ) : null}
                          {click == false && markerVideoLink !== ""
                            ? "Upload"
                            : null}
                        </button>
                        <NewTooltip
                          placement="right"
                          arrow
                          title="PNG,JPG Formats are supported, Maximum upload size is 20 MB."
                        >
                          <IconButton>
                            <InfoIcon
                              style={{
                                color: "#002E5A",
                                fontSize: "20px",
                              }}
                            />
                          </IconButton>
                        </NewTooltip>
                        <input
                          onChange={(e) => handleMarkerImageChange(e)}
                          multiple={false}
                          ref={fileMarkerImageRef}
                          type="file"
                          accept="image/*"
                          hidden
                        />
                        {imageMarkerName !== "" &&
                          fileMarkerImageSize < 20 &&
                          click == false && (
                            <div
                              className="uploaded"
                              style={{ backgroundColor: "#a4cc6c" }}
                            >
                              <p className="upload-text">
                                {imageMarkerName} Successfully Uploaded (
                                {fileMarkerImageSize.toFixed(2)} MB)
                              </p>
                              <img src={swap} alt="..." className="swap-img" />
                            </div>
                          )}
                      </div>
                    ) : null}
                    {/**************************************************************************************************** */}

                    {destinationType === "VideoView" ||
                    destinationType === "Page" ? (
                      <div style={{ marginTop: "15px" }}>
                        <h1 className="mk-nm">Upload Transition Video</h1>
                        <button
                          className="mk-up-btn"
                          onClick={() => fileMarkerVideoRef.current.click()}
                        >
                          UPLOAD
                        </button>
                        <input
                          onChange={(e) => handleMarkerVideoChange(e)}
                          multiple={false}
                          ref={fileMarkerVideoRef}
                          type="file"
                          accept="video/*"
                          hidden
                        />
                        {videoMarkerName !== "" &&
                          (fileMarkerVideoType == "video/mp4" ||
                            fileMarkerVideoType == "video/flv") &&
                          fileMarkerVideoSize < 20 && (
                            <div className="uploaded">
                              <p className="upload-text">
                                {videoMarkerName} uploaded{" "}
                                {fileMarkerVideoSize.toFixed(2)} MB
                              </p>
                              <img src={swap} alt="..." className="swap-img" />
                            </div>
                          )}
                        {videoMarkerName == "" ? (
                          <p className="mk-pr">MP4,FLV....</p>
                        ) : null}
                      </div>
                    ) : null}

                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <h1 className="mk-nm">Persistent Label</h1>
                      <Switch
                        value={labelSwitch}
                        style={{ color: "#002E5A" }}
                        onClick={switchToggle}
                      />
                    </div>
                  </div>
                  <div className="cd-btn-cont">
                    <button
                      className="cd-btn-tx"
                      onClick={() => setmarkerPopupOpen(false)}
                      onClose={handleClose}
                    >
                      Cancel
                    </button>

                    {
                      <div>
                        <button
                          className="cd-btn-tx3"
                          onClick={() => {
                            if (props.isEditmode) {
                              postMarker();
                              setLoadClick(true);
                            } else {
                              navigateMarker();
                            }
                          }}
                        >
                          {loadClick == false ? (
                            "Confirm"
                          ) : (
                            <Loader
                              type="TailSpin"
                              color="#00BFFF"
                              height={30}
                              width={30}
                            />
                          )}
                        </button>
                      </div>
                    }
                    {props.elementToBeEdited ? (
                      <button
                        className="cd-btn-tx3"
                        style={{ width: "auto" }}
                        onClick={() => navigateMarker()}
                      >
                        <span style={{ padding: "0 5px", marginRight: "5px" }}>
                          Edit Position
                        </span>
                      </button>
                    ) : null}
                  </div>
                </div>
              </div>
            </Grid>
          </Typography>
        </DialogContent>
        <DialogActions></DialogActions>
      </BootstrapDialog>
    </div>
  );
}

export default MarkerCard;
