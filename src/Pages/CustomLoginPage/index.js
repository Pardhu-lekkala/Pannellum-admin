import React, { useRef } from "react";
import NavBar from "../../Components/NavItem";
import SideBar from "../../Components/NavItem/SideBar";
import UploadIcon from "@mui/icons-material/Upload";
import "./custom.css";
import play from "../../Assets/Images/Frame.png";
import { useState } from "react";
import swap from "../../Assets/Images/swap.png";
import report from "../../Assets/Images/report_problem.png";
import { useHistory } from "react-router";
import axios from "axios";
import Loader from "react-loader-spinner";
import edit2 from "../../Assets/Images/edit2.png";
import IconButton from "@mui/material/IconButton";
import InfoIcon from "@mui/icons-material/Info";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Swal from "sweetalert2";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import constants from "../constants";

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
const CustomLogin = (props) => {
  const history = useHistory();
  const fileInputRef = useRef();
  const fileVideoRef = useRef();
  const fileTransitionRef = useRef();
  //const fileType=["jpg","png","gif"]
  const [backgroundImage, setImage] = React.useState();
  const [imgName, setImgName] = React.useState("");
  const [fileType, setFileType] = React.useState("");
  const [fileSize, setFileSize] = React.useState(15);
  const [backgroundVideo, setVideo] = React.useState("");
  const [videoName, setVideoName] = React.useState("");
  const [fileVideoType, setFileVideoType] = React.useState("");
  const [fileVideoSize, setFileVideoSize] = React.useState(15);
  const [transVideo, setTransition] = React.useState("");
  const [transitionName, setTransitionName] = React.useState("");
  const [fileTransitionType, setFileTransitionType] = React.useState("");
  const [fileTransitionSize, setFileTransitionSize] = React.useState(15);
  const [id, setId] = React.useState();
  const [loader, setLoader] = React.useState(false);
  {
    /*******************************************API PROJECT DETAILS***************************************************/
  }
  //let files={backgroundImage,backgroundVideo,transVideo}
  //console.log(files.backgroundImage,"bcccccccc")

  console.log(backgroundImage, "cccccccc");
  console.log(id);
  let token = JSON.parse(localStorage.getItem("token"));
  let name = props.location.state.project;
  let accesscode = props.location.state.accessCode;
  //let id=Math.random();
  let markerColor = "red";
  let Description = "NA";
  let primaryColor = "#ffffff";
  let secondaryColor = "#ddddd";

  var formData = new FormData();
  formData.append("files.backgroundImage", backgroundImage);
  formData.append("files.backgroundVideo", backgroundVideo);
  formData.append("files.transVideo", transVideo);
  formData.append(
    "data",
    JSON.stringify({
      name: name,
      markerColor: markerColor,
      primaryColor: primaryColor,
      secondaryColor: secondaryColor,
      Description: "This is Description",
      accesscode: accesscode,
      //'files.backgroundImage':backgroundImage
    })
  );
  //&& videoName !== "" && transitionName !== ""
  console.log(name, token, accesscode);
  console.log(imgName, "image name");
  console.log(videoName, "Video name");
  console.log(transitionName, "transition name");
  function navigateNewPage(projectid) {
    if (imgName == "") {
      Swal.fire("OOPS", "Please upload background image", "warning");
      return false;
    }

    if (videoName == "") {
      Swal.fire("OOPS", "Please upload background Video", "warning");
      return false;
    }

    if (transitionName == "") {
      Swal.fire("OOPS", "Please upload transition Video", "warning");
      return false;
    }

    if (imgName !== "" && projectid !== undefined) {
      history.push({
        pathname: "/newpage",
        state: {
          project: props.location.state ? props.location.state.project : null,
          accessCode: props.location.state
            ? props.location.state.accessCode
            : null,
          token: props.location.state.token,
          image: backgroundImage,
          projectId: projectid,
        },
      });
    }
  }

  async function postProject() {
    setLoader(true);
    console.log("called");
    axios({
      method: "post",
      url: constants.ipaddress + "/projects",
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer" + " " + token,
      },
    })
      .then(function (response) {
        console.log(response);
        console.log(response.data.id);
        setId(response.data.id);
        navigateNewPage(response.data.id);
      })
      .catch(function (response) {
        console.log(response);
      });
  }

  {
    /*async function postProject(){
        let data={
            name,
            markerColor,
            Description,
            primaryColor,
            secondaryColor,
            //"backgroundImage":files.backgroundImage
        }
        navigateNewPage()
        let result=await fetch('https://api-meta.eskoops.com/projects',{
           method:"POST",
           body:JSON.stringify(data,files.backgroundImage),
           headers:{
               "Content-Type":"application/json",
               "Authorization":"Bearer"+" "+token,
           }
        })
        result=await result.json()
        console.log(result,"projectdetails")
        localStorage.setItem('login',JSON.stringify(result))
    }*/
  }

  const handleChange = (e) => {
    let files = e.target.files;
    setImgName(files[0].name);
    setImage(e.target.files[0]);
    console.log("data file", files[0]);
    let fileLen = files[0].size / 1048576;
    setFileSize(fileLen);
    setFileType(files[0].type);
    let reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = (e) => {
      console.log("img data", e.target.result);
      //setImage(e.target.result)
      //setImage(files[0])
    };
  };
  const handleVideoChange = (e) => {
    let videofiles = e.target.files;
    setVideoName(videofiles[0].name);
    setVideo(e.target.files[0]);
    console.log("data file", videofiles[0].type);
    let fileVideoLen = videofiles[0].size / 1048576;
    console.log(fileVideoLen);
    setFileVideoSize(fileVideoLen);
    setFileVideoType(videofiles[0].type);
    let read = new FileReader();
    read.readAsDataURL(videofiles[0]);
    read.onload = (e) => {
      console.log("img data", e.target.result);
      //setVideo(e.target.result)
    };
  };

  const handleTransitionChange = (e) => {
    let transitionfiles = e.target.files;
    setTransitionName(transitionfiles[0].name);
    setTransition(e.target.files[0]);
    console.log("data file", transitionfiles[0].type);
    let fileTransitionLen = transitionfiles[0].size / 1048576;
    setFileTransitionSize(fileTransitionLen);
    setFileTransitionType(transitionfiles[0].type);
    let readTrans = new FileReader();
    readTrans.readAsDataURL(transitionfiles[0]);
    readTrans.onload = (e) => {
      console.log("img data", e.target.result);
      //setTransition(e.target.result)
    };
  };
  return (
    <div className="cstm-main-cont">
      <div>
        <NavBar />
      </div>
      <div className="cstm-content-cont">
        <div>
          {/* <SideBar projectName={props.location.state ? props.location.state.project:null}
            accessCode={props.location.state ? props.location.state.accessCode : null}
            /> */}
        </div>
        <div className="upload-cont" style={{ textAlign: "center" }}>
          <h1 className="cstm-head">Setup Login Page</h1>
          {/*************************************************IMAGE UPLOAD*********************************************************/}
          <div className="upload-cont-1">
            <label htmlFor="Btn1" className="img-para">
              Upload Background Image<span style={{ color: "red" }}>*</span>
              <span
                style={{
                  fontWeight: "300",
                  color: "#8391A7",
                  fontStyle: "normal",
                }}
              >
                (Image is mandatory)
              </span>
            </label>{" "}
            <br />
            <Button
              variant="outlined"
              sx={{
                width: "50%",
                height: "30px",
                textAlign: "center",
                color: "#002E5A",

                fontFamily: "Proxima Nova",
                backgroundColor: "#EFEFEF",
              }}
              id="Btn1"
              className="upload-btn"
              startIcon={<UploadIcon />}
              onClick={() => fileInputRef.current.click()}
            >
              Upload
            </Button>
            <input
              onChange={(e) => handleChange(e)}
              multiple={false}
              ref={fileInputRef}
              type="file"
              accept="image/*"
              hidden
            />
            <NewTooltip
              placement="right"
              arrow
              title="PNG,JPG,GIF Formats are supported, Maximum upload size is 20 MB"
            >
              <IconButton>
                <InfoIcon style={{ color: "#002E5A" }} />
              </IconButton>
            </NewTooltip>
            {imgName !== "" &&
              (fileType == "image/png" ||
                fileType == "image/jpeg" ||
                fileType == "image/gif") &&
              fileSize < 20 && (
                <div className="uploaded">
                  <p className="upload-text">
                    {imgName} uploaded {fileSize.toFixed(2)} MB
                  </p>
                  <img src={swap} alt="..." className="swap-img" />
                </div>
              )}
            {/* *********************CONDITION FOR FILE FORMATE******************************************/}
            {fileType !== "image/jpg" ||
              fileType !== "image/png" ||
              (fileType !== "image/gif" && (
                <div className="uploaded-2">
                  <img
                    src={report}
                    alt="..."
                    className="swap-img"
                    style={{ marginRight: "10px" }}
                  />
                  <p className="upload-text">
                    File format not supported.Please upload png,jpg,gif
                  </p>
                </div>
              ))}
            {/************************************START CONDITION******************************************/}
          </div>
          {/************************************SIZE CONDITION**************************************/}
          {fileSize > 20 && (
            <div className="uploaded-2">
              <img
                src={report}
                alt="..."
                className="swap-img"
                style={{ marginRight: "10px" }}
              />
              <p className="upload-text">Maximum upload size is 20 MB</p>
            </div>
          )}
          {/*************************************************VIDEO UPLOAD*********************************************************/}
          <div className="upload-cont-1" style={{ marginTop: "15px" }}>
            <label htmlFor="Btn2" className="img-para">
              Upload Background Video<span style={{ color: "red" }}>*</span>
              <span
                style={{
                  fontWeight: "300",
                  color: "#8391A7",
                  fontStyle: "normal",
                }}
              >
                (video is mandatory)
              </span>
            </label>{" "}
            <br />
            <Button
              variant="outlined"
              sx={{
                width: "50%",
                height: "30px",
                textAlign: "center",
                color: "#002E5A",

                fontFamily: "Proxima Nova",
                backgroundColor: "#EFEFEF",
              }}
              id="Btn2"
              className="upload-btn"
              startIcon={<UploadIcon />}
              onClick={() => fileVideoRef.current.click()}
            >
              Upload
            </Button>
            <NewTooltip
              placement="right"
              arrow
              title="MP4,FLV Formats are supported, Maximum upload size is 20 MB "
            >
              <IconButton>
                <InfoIcon style={{ color: "#002E5A" }} />
              </IconButton>
            </NewTooltip>
            <input
              onChange={(e) => handleVideoChange(e)}
              multiple={false}
              ref={fileVideoRef}
              type="file"
              accept="video/*"
              hidden
            />
            {videoName !== "" &&
              (fileVideoType == "video/mp4" || fileVideoType == "video/flv") &&
              fileVideoSize < 20 && (
                <div className="uploaded">
                  <p className="upload-text">
                    {videoName} uploaded {fileVideoSize.toFixed(2)} MB
                  </p>
                  <img src={swap} alt="..." className="swap-img" />
                </div>
              )}
            {/* *********************CONDITION FOR FILE FORMATE******************************************/}
            {fileVideoType !== "video/mp4" &&
            fileVideoType !== "video/flv" &&
            videoName !== "" ? (
              <div className="uploaded-2">
                <img
                  src={report}
                  alt="..."
                  className="swap-img"
                  style={{ marginRight: "10px" }}
                />
                <p className="upload-text">
                  File format not supported.Please upload mp4,flv
                </p>
              </div>
            ) : null}
          </div>
          {/************************************SIZE CONDITION**************************************/}
          {fileVideoSize > 20 && (
            <div className="uploaded-2">
              <img
                src={report}
                alt="..."
                className="swap-img"
                style={{ marginRight: "10px" }}
              />
              <p className="upload-text">Maximum upload size is 20 MB</p>
            </div>
          )}

          {/*********************************************TRANSITION VIDEO UPLOAD************************************************************** */}
          <div className="upload-cont-1" style={{ marginTop: "15px" }}>
            <label htmlFor="Btn" className="img-para">
              Upload Transition Video<span style={{ color: "red" }}>*</span>
              <span
                style={{
                  fontWeight: "300",
                  color: "#8391A7",
                  fontStyle: "normal",
                }}
              >
                (Transition Video is mandatory)
              </span>
            </label>{" "}
            <br />
            <Button
              variant="outlined"
              sx={{
                width: "50%",
                height: "30px",
                textAlign: "center",
                color: "#002E5A",
                fontFamily: "Proxima Nova",
                fontWeight: 500,
                backgroundColor: "#EFEFEF",
              }}
              id="Btn"
              className="upload-btn"
              startIcon={<UploadIcon />}
              onClick={() => fileTransitionRef.current.click()}
            >
              Upload
            </Button>
            <NewTooltip
              placement="right"
              arrow
              title="MP4,FLV Formats are supported, Maximum upload size is 20 MB"
            >
              <IconButton>
                <InfoIcon style={{ color: "#002E5A" }} />
              </IconButton>
            </NewTooltip>
            <input
              onChange={(e) => handleTransitionChange(e)}
              multiple={false}
              ref={fileTransitionRef}
              type="file"
              accept="video/*"
              hidden
            />
            {transitionName !== "" &&
              (fileTransitionType == "video/mp4" ||
                fileTransitionType == "video/flv") &&
              fileTransitionSize < 20 && (
                <div className="uploaded">
                  <p className="upload-text">
                    {transitionName} uploaded {fileTransitionSize.toFixed(2)} MB
                  </p>
                  <img src={swap} alt="..." className="swap-img" />
                </div>
              )}
            {/* *********************CONDITION FOR FILE FORMATE******************************************/}
            {fileTransitionType !== "video/mp4" &&
            fileTransitionType !== "video/flv" &&
            transitionName !== "" ? (
              <div className="uploaded-2">
                <img
                  src={report}
                  alt="..."
                  className="swap-img"
                  style={{ marginRight: "10px" }}
                />
                <p className="upload-text">
                  File format not supported.Please upload mp4,flv
                </p>
              </div>
            ) : null}
          </div>
          {/************************************SIZE CONDITION**************************************/}
          {fileTransitionSize > 20 && (
            <div className="uploaded-2">
              <img
                src={report}
                alt="..."
                className="swap-img"
                style={{ marginRight: "10px" }}
              />
              <p className="upload-text">Maximum upload size is 20 MB</p>
            </div>
          )}
          {id == undefined &&
          imgName !== "" &&
          videoName !== "" &&
          transitionName !== "" ? (
            <div>
              <button
                className="pr-btn"
                onClick={() => {
                  if (
                    imgName !== "" &&
                    videoName !== "" &&
                    transitionName !== ""
                  ) {
                    postProject();
                  }
                }}
              >
                {id == undefined && loader == false ? "Create" : null}
                {id == undefined &&
                loader == true &&
                imgName !== "" &&
                videoName !== "" &&
                transitionName !== "" ? (
                  <Loader
                    type="TailSpin"
                    color="#00BFFF"
                    height={30}
                    width={30}
                  />
                ) : null}
                {id !== undefined && loader == true
                  ? "Updated Successfully"
                  : null}
              </button>
            </div>
          ) : (
            <div>
              <button
                className="pr-btn"
                onClick={() => {
                  navigateNewPage();
                }}
              >
                Create
              </button>
            </div>
          )}
        </div>
        {/* <div className="btn-cont2">
                    <button className="prev-btn"><span><img src={edit2} alt="..." className="play-img2" /></span>Preview</button>

                </div> */}
      </div>
    </div>
  );
};
export default CustomLogin;
