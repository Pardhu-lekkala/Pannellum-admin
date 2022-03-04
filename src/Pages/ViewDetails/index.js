import React, { useRef } from "react";
import NavBar from "../../Components/NavItem";
import constants from "../constants";
import { useState } from "react";
import axios from "axios";
import Loader from "react-loader-spinner";
import edit from "../../Assets/Images/edit.png";
import "./prodetails.css";
import PageNamePop from "../../Components/EditPageName";
import HexDetails from "../../Components/HexDetails";
import EditIcon from "@mui/icons-material/Edit";
import loading from "../../Assets/gif/loading.gif";
import IosShareIcon from "@mui/icons-material/IosShare";
import EditAccessCode from "../../Components/editAccessCode";

import Chip from "@mui/material/Chip";

import LoadingButton from "@mui/lab/LoadingButton";
import { useHistory } from "react-router";
import { BrowserRouter as Router } from "react-router-dom";
import arrow2 from "../../Assets/Images/Add New.png";
import addimage from "../../Assets/Images/addimg.png";
import del from "../../Assets/Images/delete.png";
import edit3 from "../../Assets/Images/edit2.png";
import plus from "../../Assets/Images/plus.png";

import VideoUploadCard from "../../Components/popup";
import MarkerCard from "../../Components/PopUp2";
import ProjectPopUp from "../../Components/ProjectPop";
// import "./page.css";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import UploadIcon from "@mui/icons-material/Upload";
import Stack from "@mui/material/Stack";

import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Swal from "sweetalert2";
import InfoIcon from "@mui/icons-material/Info";
// import { styled } from "@mui/material/styles";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";

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

const ProjectDetailsData = (props) => {
  const [open, setOpen] = React.useState(false);
  const [isEditPagePopOpen, setNameOpen] = React.useState(false);

  const [markerClick, setMarkerClick] = useState(false);
  const [defaultValue, setDefaultValue] = useState(false);
  const [tokens, setToken] = React.useState("");
  const [id, setId] = React.useState("");
  const [fileTypeBeingUploaded, setFileTypeBeingUploaded] = React.useState("");
  const [fileDataUploded, setFileDataUploaded] = React.useState("");
  const backgroundImageFileRef = useRef();
  const backgroundVideoFileRef = useRef();
  const backgroundTransFileRef = useRef();
  const projectId = props.location.state.projectId;
  const token = JSON.parse(localStorage.getItem("token"));
  const user = props.location.state.user;
  const projectName = props.location.state.projectName;
  const hex = props.location.state.hex;
  console.log(hex, "this is hex color in detail page");
  console.log(token, "this is token in detail page");
  console.log(projectName, "this is the details pagename");
  console.log(markerClick, "these are clicks");
  const [firstTimeLoader, setFirstTimeLoader] = useState(false);
  const [data, setData] = useState("");
  const [accessCode, setAccessCode] = useState(data.accesscode);
  const [isAccessOpen, setAccessOpen] = React.useState(false);
  const [error, setError] = React.useState(false);
  console.log(data.accesscode, "this is accesscode");
  console.log(data.name, "name of page");
  const [defaultPageValue, setDefaultPageValue] = useState(data.name);
  console.log(defaultPageValue, "this is default value in view details");
  console.log("THIS IS PROJECTID", projectId);
  console.log("DAILOG BOX IS", open);
  console.log(error, "this is error in details");
  const baseURL = constants.ipaddress + `/projects/${projectId}`;
  console.log(data, "data this");

  React.useEffect(() => {
    axios.get(baseURL).then((response) => {
      setData(response.data);
      setFirstTimeLoader(true);
      //setBckImage(response.data.backgroundImage.name);
      //setBckVideo(response.data.backgroundVideo.name);
      //setTransVideo(response.data.transVideo.name);
      //`url(${bckImgUrl})`
      //`${data.backgroundImage.formats.small.url}`
      console.log(response.data);
    });
  }, []);

  function deployProject(projectId, accessCode) {
    // console.log(projectId, "projectid");
    // console.log(accessCode, "code");

    if (accessCode == "" || accessCode == undefined) {
      Swal.fire(
        "Access Code is missing",
        "Please add Access code for the project first",
        "warning"
      );
      return false;
    }

    /* validate for existence of the access code */
    let url = constants.ipaddress + "/deploy";
    let formData = new FormData();
    formData.append("id", projectId);
    formData.append("name", accessCode);

    let alertTitile = "Are you sure you want to Deploy?";
    let confirmButtonText = "Deploy";
    makeAPIRequestWithSwal(alertTitile, confirmButtonText, url, formData);
  }

  function makeAPIRequestWithSwal(titleText, confirmButtonText, url, formdata) {
    Swal.fire({
      title: titleText,
      // input: 'text',
      // inputAttributes: {
      //   autocapitalize: 'off'
      // },
      showCancelButton: true,
      confirmButtonText: confirmButtonText,
      showLoaderOnConfirm: true,
      preConfirm: (login) => {
        return new Promise(function (resolve, reject) {
          axios({
            method: "POST",
            url: url,
            data: formdata,
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: "Bearer" + " " + token,
            },
          })
            .then(function (response) {
              //              toastr.success('Succes');
              resolve();
            })
            .catch(function (error) {
              //            toastr.error('Error ');
              console.log(error);
              reject();
            });
        });
      },
      allowOutsideClick: () => !Swal.isLoading(),
    })
      .then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: "Deployment Success",
          });
        }
      })
      .catch(function (error) {
        //            toastr.error('Error ');
        Swal.fire({
          title: "Deployment Failed",
        });
      });
  }

  function toCamelCase(str) {
    return str
      .split(" ")
      .map(function (word, index) {
        // If it is the first word make sure to lowercase all the chars.
        if (index == 0) {
          return word[0].toUpperCase() + word.slice(1).toLowerCase() + " ";
        }
        // If it is not the first word only upper case the first char and lowercase the rest.
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase() + " ";
      })
      .join("");
  }

  /*********************************************UPDATING ACCESS CODE AND PROJECT USING SWEET ALERT******************************************* */

  function UpdatePageNameAndAccesCode(title, fieldType, defaultValue) {
    console.log(fieldType, "this is field inside the swal");
    console.log(defaultValue, "this is default value inside swal");
    Swal.fire({
      title: title,
      input: "text",
      inputValue: defaultValue,
      inputAttributes: {
        autocapitalize: "off",
      },
      showCancelButton: true,
      confirmButtonText: "Confirm",
      showLoaderOnConfirm: true,
      //allowOutsideClick: () => !Swal.isLoading(),
      preConfirm: (result) => {
        if (result == undefined || result.length == 0 || result == "") {
          Swal.fire("OPPS", "Enter a valid input", "warning");
        } else {
          return new Promise(function (resolve, reject) {
            var newFormData = new FormData();
            if (fieldType == "name") {
              newFormData.append(
                "data",
                JSON.stringify({
                  name: result,
                })
              );
            }

            if (fieldType == "accesscode") {
              newFormData.append(
                "data",
                JSON.stringify({
                  accesscode: result,
                })
              );
            }
            axios({
              method: "PUT",
              url: constants.ipaddress + "/projects/" + projectId,
              data: newFormData,
              headers: {
                "Content-Type": "multipart/form-data",
                Authorization: "Bearer" + " " + token,
              },
            })
              .then(function (response) {
                // setResponse(response);
                // setOpen(false, true);
                console.log(response, "editresponse");
                Swal.fire("Done", "Your edit is successful", "success").then(
                  (result) => {
                    if (result.isConfirmed) {
                      window.location.reload();
                    }
                    console.log(result);
                  }
                );
              })
              .catch(function (response) {
                console.log(response);
                Swal.fire(
                  "Oh! Edit Failed!",
                  "Edit was not successful.",
                  "error"
                ).then((result) => {
                  if (result.isConfirmed) {
                    window.location.reload();
                  }
                  console.log(result);
                });
              });
          });
        }
      },
    });
    // .then((result) => {
    //   if (result.isConfirmed) {
    //     if (
    //       result.value == undefined ||
    //       result.value.length == 0 ||
    //       result.value == ""
    //     ) {
    //       console.log("eeee");
    //       Swal.fire("OPPS", "Enter a valid input", "warning");
    //       return false;
    //     }
    //     console.log(result.value, "this is result");
    //     var newFormData = new FormData();
    //     if (fieldType == "name") {
    //       newFormData.append(
    //         "data",
    //         JSON.stringify({
    //           name: result.value,
    //         })
    //       );
    //     }

    //     if (fieldType == "accesscode") {
    //       newFormData.append(
    //         "data",
    //         JSON.stringify({
    //           accesscode: result.value,
    //         })
    //       );
    //     }
    //     axios({
    //       method: "PUT",
    //       url: constants.ipaddress + "/projects/" + projectId,
    //       data: newFormData,
    //       headers: {
    //         "Content-Type": "multipart/form-data",
    //         Authorization: "Bearer" + " " + token,
    //       },
    //     })
    //       .then(function (response) {
    //         // setResponse(response);
    //         // setOpen(false, true);
    //         console.log(response, "editresponse");
    //         Swal.fire("Done", "Your edit is successful", "success").then(
    //           (result) => {
    //             if (result.isConfirmed) {
    //               window.location.reload();
    //             }
    //             console.log(result);
    //           }
    //         );
    //       })
    //       .catch(function (response) {
    //         console.log(response);
    //         Swal.fire(
    //           "Oh! Edit Failed!",
    //           "Edit was not successful.",
    //           "error"
    //         ).then((result) => {
    //           if (result.isConfirmed) {
    //             window.location.reload();
    //           }
    //           console.log(result);
    //         });
    //       });
    //   }
    // });
  }

  /******************************************************************************************************************************* */

  function updateProjectWithFields(fieldType, value) {
    console.log("fieldType - value" + fieldType + "-" + value);

    setFileDataUploaded(fieldType);
    var newFormData = new FormData();

    // if (fieldType == "name") {
    //   newFormData.append(
    //     "data",
    //     JSON.stringify({
    //       name: value,
    //     })
    //   );
    // }

    // if (fieldType == "accesscode") {
    //   newFormData.append(
    //     "data",
    //     JSON.stringify({
    //       accesscode: value,
    //     })
    //   );
    // }

    if (fieldType == "markerColor") {
      newFormData.append(
        "data",
        JSON.stringify({
          markerColor: value,
        })
      );
    }

    if (fieldType == "primaryColor") {
      newFormData.append(
        "data",
        JSON.stringify({
          primaryColor: value,
        })
      );
    }

    if (fieldType == "secondaryColor") {
      newFormData.append(
        "data",
        JSON.stringify({
          secondaryColor: value,
        })
      );
    }

    console.log(constants.ipaddress + "/projects/" + projectId);
    axios({
      method: "PUT",
      url: constants.ipaddress + "/projects/" + projectId,
      data: newFormData,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer" + " " + token,
      },
    })
      .then(function (response) {
        setData(response.data);

        console.log(response, "updatedresponse");
        console.log(response.data.id);
        setFileDataUploaded("");
      })
      .catch(function (response) {
        console.log(response);
        setError(true);
        Swal.fire(
          "OPPS",
          "Access Code already exists.Please enter new!!",
          "warning"
        );
        setFileDataUploaded("");
      });
  }

  function updatePageWithFormData(formData) {
    formData.append(
      "data",
      JSON.stringify({
        project: projectId,
      })
    );
    console.log(constants.ipaddress + "/projects/" + projectId);
    axios({
      method: "PUT",
      url: constants.ipaddress + "/projects/" + projectId,
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer" + " " + token,
      },
    })
      .then(function (response) {
        setData(response.data);
        console.log(response, "updatedresponse");
        console.log(response.data.id);
        setFileTypeBeingUploaded("");
        setMarkerClick("");
      })
      .catch(function (response) {
        console.log(response);
        setFileTypeBeingUploaded("");
      });
  }

  const handleFileUploadInPage = (e, type) => {
    setFileTypeBeingUploaded(type);
    var formData = new FormData();
    if (type == "backgroundImage") {
      console.log("Attaching media of type" + e.target.files[0].name);

      formData.append("files.backgroundImage", e.target.files[0]);
    }
    if (type == "backgroundVideo") {
      console.log("Attaching media of type" + e.target.files[0].name);

      formData.append("files.backgroundVideo", e.target.files[0]);
    }
    if (type == "transVideo") {
      console.log("Attaching media of type" + e.target.files[0].name);

      formData.append("files.transVideo", e.target.files[0]);
    }

    console.log("Calling the post API ");

    updatePageWithFormData(formData);
  };

  if (firstTimeLoader == false) {
    return (
      <div style={{ position: "fixed", top: "50%", left: "50%" }}>
        <Loader type="TailSpin" color="#00BFFF" height={60} width={60} />
      </div>
    );
  } else {
    return (
      <>
        <div>
          <NavBar />
        </div>

        <div className="upload-cont3">
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <h1 className="details-head">Project Details</h1>
            <Button
              onClick={() => {
                deployProject(projectId, data.accesscode);
              }}
              sx={{
                width: 100,
                height: 50,
                backgroundColor: "#DFEBEE",
                marginTop: "4px",
                fontFamily: "Proxima Nova",
                color: "black",
                borderRadius: "7px",
              }}
              variant="contained"
              startIcon={<IosShareIcon />}
            >
              Deploy
            </Button>
          </div>
          <div className="content-add-cont">
            <List
              sx={{
                width: "100%",
                bgcolor: "background.paper",
                display: "flex",
                justifyContent: "left",
              }}
            >
              <ListItem
                alignItems="flex-start"
                sx={{
                  paddingTop: 0,
                  boxShadow: "1px 1px #888888",
                  border: "1px solid grey",
                  borderRadius: "3%",
                  maxWidth: "323px",
                }}
              >
                <ListItemText
                  primary={
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <div
                        style={{
                          fontFamily: "Proxima Nova",
                          fontWeight: "bold",
                          color: "#3C4858",
                        }}
                      >
                        Project Name{" "}
                      </div>
                      <EditIcon
                        style={{
                          fontSize: "20px",
                          cursor: "pointer",
                          margin: "2px 4px ",
                        }}
                        onClick={() => {
                          UpdatePageNameAndAccesCode(
                            "Enter Project Name",
                            "name",
                            data.name
                          );
                          // setNameOpen(true);
                          // setDefaultPageValue(data.name);
                        }}
                      />
                    </div>
                  }
                  secondary={
                    <React.Fragment>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "left",
                        }}
                      >
                        <h1 class="data-nm">{toCamelCase(data.name)}</h1>
                      </div>
                    </React.Fragment>
                  }
                />
              </ListItem>
              <Divider variant="inset" component="li" />
              <ListItem
                alignItems="flex-start"
                sx={{
                  paddingTop: 0,
                  boxShadow: "1px 1px #888888",
                  border: "1px solid grey",
                  borderRadius: "3%",
                  maxWidth: "323px",
                }}
              >
                <ListItemText
                  primary={
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <div
                        style={{
                          fontFamily: "Proxima Nova",
                          fontWeight: "bold",
                          color: "#3C4858",
                        }}
                      >
                        Accesscode{" "}
                      </div>
                      <EditIcon
                        style={{
                          fontSize: "20px",
                          cursor: "pointer",
                          margin: "2px 4px ",
                        }}
                        onClick={() => {
                          UpdatePageNameAndAccesCode(
                            "Enter Access Code",
                            "accesscode",
                            data.accesscode
                          );
                          // setAccessOpen(true);
                          // setAccessCode(data.accesscode);
                        }}
                      />
                    </div>
                  }
                  secondary={
                    <React.Fragment>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "left",
                        }}
                      >
                        <h1 class="data-nm">
                          {data.accesscode ? data.accesscode : "NA"}
                        </h1>
                      </div>
                    </React.Fragment>
                  }
                />
              </ListItem>
            </List>
          </div>

          <div className="content-add-cont">
            <List
              sx={{
                width: "100%",
                bgcolor: "background.paper",
                display: "flex",
              }}
            >
              <ListItem
                alignItems="flex-start"
                sx={{
                  paddingTop: 0,
                  boxShadow: "1px 1px #888888",
                  border: "1px solid grey",
                  borderRadius: "3%",
                }}
              >
                <ListItemAvatar>
                  <div
                    style={{
                      width: "50px",
                      height: "50px",
                      borderRadius: "50%",
                      backgroundColor: data.markerColor,
                      border: "2px solid #DAA520",
                    }}
                  ></div>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <div
                        style={{
                          fontFamily: "Proxima Nova",
                          fontWeight: "bold",
                          color: "#3C4858",
                        }}
                      >
                        Marker Colour
                      </div>
                      <EditIcon
                        style={{
                          fontSize: "20px",
                          cursor: "pointer",
                          margin: "2px 4px ",
                        }}
                        onClick={() => {
                          setOpen(true);
                          setMarkerClick("markerColor");
                          setDefaultValue(data.markerColor);
                        }}
                      />
                    </div>
                  }
                  secondary={
                    <React.Fragment>
                      <div style={{ display: "flex", flexDirection: "row" }}>
                        <h1 class="data-nm" style={{ paddingTop: "5px" }}>
                          {data.markerColor}
                        </h1>
                        {/* <EditIcon style={{fontSize:"20px" , cursor:"pointer", margin:"2px 4px "}} onClick={() => { setOpen(true); setMarkerClick("markerColor"); setDefaultValue(data.markerColor) }} /> */}
                        <NewTooltip
                          placement="right"
                          arrow
                          title="This is the colour of the markers "
                        >
                          <IconButton>
                            <InfoIcon
                              style={{ color: "#002E5A", fontSize: "20px" }}
                            />
                          </IconButton>
                        </NewTooltip>
                      </div>
                    </React.Fragment>
                  }
                />
              </ListItem>
              <Divider variant="inset" component="li" />
              <ListItem
                alignItems="flex-start"
                sx={{
                  paddingTop: 0,
                  boxShadow: "1px 1px #888888",
                  border: "1px solid grey",
                  borderRadius: "3%",
                }}
              >
                <ListItemAvatar>
                  <div
                    style={{
                      width: "50px",
                      height: "50px",
                      borderRadius: "50%",
                      backgroundColor: data.primaryColor,
                      border: "2px solid #DAA520",
                    }}
                  ></div>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <div
                        style={{
                          fontFamily: "Proxima Nova",
                          fontWeight: "bold",
                          color: "#3C4858",
                        }}
                      >
                        Primary Colour
                      </div>
                      <EditIcon
                        style={{
                          fontSize: "20px",
                          cursor: "pointer",
                          margin: "2px 4px ",
                        }}
                        onClick={() => {
                          setOpen(true);
                          setMarkerClick("primaryColor");
                          setDefaultValue(data.primaryColor);
                        }}
                      />
                    </div>
                  }
                  secondary={
                    <React.Fragment>
                      <div style={{ display: "flex", flexDirection: "row" }}>
                        <h1 class="data-nm" style={{ paddingTop: "5px" }}>
                          {data.primaryColor}
                        </h1>
                        {/* <EditIcon style={{fontSize:"20px" , cursor:"pointer", margin:"2px 4px "}} onClick={() => { setOpen(true); setMarkerClick("primaryColor"); setDefaultValue(data.primaryColor) }} /> */}
                        <NewTooltip
                          placement="right"
                          arrow
                          title="Primary colour is used as background colour "
                        >
                          <IconButton>
                            <InfoIcon
                              style={{ color: "#002E5A", fontSize: "20px" }}
                            />
                          </IconButton>
                        </NewTooltip>
                      </div>
                    </React.Fragment>
                  }
                />
              </ListItem>
              <Divider variant="inset" component="li" />
              <ListItem
                alignItems="flex-start"
                sx={{
                  paddingTop: 0,
                  boxShadow: "1px 1px #888888",
                  border: "1px solid grey",
                  borderRadius: "3%",
                }}
              >
                <ListItemAvatar>
                  <div
                    style={{
                      width: "50px",
                      height: "50px",
                      borderRadius: "50%",
                      backgroundColor: data.secondaryColor,
                      border: "2px solid #DAA520",
                    }}
                  ></div>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <div
                        style={{
                          fontFamily: "Proxima Nova",
                          fontWeight: "bold",
                          color: "#3C4858",
                        }}
                      >
                        Secondary Colour
                      </div>
                      <EditIcon
                        style={{
                          fontSize: "20px",
                          cursor: "pointer",
                          margin: "2px 4px ",
                        }}
                        onClick={() => {
                          setOpen(true);
                          setMarkerClick("secondaryColor");
                          setDefaultValue(data.secondaryColor);
                        }}
                      />
                    </div>
                  }
                  secondary={
                    <React.Fragment>
                      <div style={{ display: "flex", flexDirection: "row" }}>
                        <h1 style={{ paddingTop: "5px" }} class="data-nm">
                          {data.secondaryColor}
                        </h1>
                        <NewTooltip
                          placement="right"
                          arrow
                          title="Secondary colours are used as the text colour"
                        >
                          <IconButton>
                            <InfoIcon
                              style={{ color: "#002E5A", fontSize: "20px" }}
                            />
                          </IconButton>
                        </NewTooltip>
                        {/* <EditIcon style={{fontSize:"20px" , cursor:"pointer", margin:"2px 4px "}} onClick={() => { setOpen(true); setMarkerClick("secondaryColor"); setDefaultValue(data.secondaryColor) }} /> */}
                      </div>
                    </React.Fragment>
                  }
                />
              </ListItem>
            </List>
          </div>

          <div className="content-add-cont">
            <List
              sx={{
                width: "100%",
                bgcolor: "background.paper",
                display: "flex",
              }}
            >
              <ListItem
                alignItems="flex-start"
                sx={{
                  paddingTop: 0,
                  boxShadow: "1px 1px #888888",
                  border: "1px solid grey",
                  borderRadius: "3%",
                }}
              >
                <ListItemAvatar>
                  {fileTypeBeingUploaded == "backgroundImage" ? (
                    <img
                      style={{
                        width: "55px",
                        height: "55px",
                        marginRight: "15px",
                        borderRadius: "50%",
                      }}
                      alt="No display image"
                      src={loading}
                    />
                  ) : (
                    <a href={data.backgroundImage.url} target="_blank">
                      <Avatar
                        style={{
                          width: "50px",
                          height: "50px",
                          marginRight: "15px",
                        }}
                        alt="No display image"
                        src={data.backgroundImage.url}
                      />
                    </a>
                  )}
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <div
                      style={{
                        fontFamily: "Proxima Nova",
                        fontWeight: "bold",
                        color: "#3C4858",
                        margin: "2px 0",
                      }}
                    >
                      Background Image
                    </div>
                  }
                  secondary={
                    <React.Fragment>
                      {fileTypeBeingUploaded == "backgroundImage" ? (
                        <LoadingButton
                          loading
                          loadingPosition="start"
                          startIcon={<UploadIcon />}
                          variant="outlined"
                          sx={{
                            fontFamily: "Proxima Nova",
                            fontWeight: "bold",
                          }}
                        >
                          Uploading
                        </LoadingButton>
                      ) : (
                        <>
                          <Button
                            sx={{
                              width: 100,
                              marginTop: "4px",
                              fontFamily: "Proxima Nova",
                              color: "black",
                            }}
                            variant="outlined"
                            startIcon={<UploadIcon />}
                            className="btn-up1"
                            onClick={() =>
                              backgroundImageFileRef.current.click()
                            }
                          >
                            Upload
                          </Button>
                          <NewTooltip
                            placement="bottom"
                            arrow
                            title="PNG,JPG,GIF Formats are supported, Maximum upload size is 20 MB "
                          >
                            <IconButton>
                              <InfoIcon
                                style={{ color: "#002E5A", fontSize: "20px" }}
                              />
                            </IconButton>
                          </NewTooltip>
                        </>
                      )}
                      <input
                        onChange={(e) =>
                          handleFileUploadInPage(e, "backgroundImage")
                        }
                        multiple={false}
                        ref={backgroundImageFileRef}
                        type="file"
                        accept="image/*"
                        hidden
                      />
                    </React.Fragment>
                  }
                />
              </ListItem>
              <Divider variant="inset" component="li" />
              <ListItem
                alignItems="flex-start"
                sx={{
                  paddingTop: 0,
                  boxShadow: "1px 1px #888888",
                  border: "1px solid grey",
                  borderRadius: "3%",
                }}
              >
                <ListItemAvatar>
                  {fileTypeBeingUploaded == "transVideo" ? (
                    <img
                      style={{
                        width: "55px",
                        height: "55px",
                        marginRight: "15px",
                        borderRadius: "50%",
                      }}
                      alt="No display image"
                      src={loading}
                    />
                  ) : (
                    <a href={data.transVideo?.url} target="_blank">
                      <video
                        style={{
                          width: "50px",
                          height: "50px",
                          marginRight: "15px",
                        }}
                        alt="NO image Available"
                        src={data.transVideo?.url}
                      />
                    </a>
                  )}
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <div
                      style={{
                        fontFamily: "Proxima Nova",
                        fontWeight: "bold",
                        color: "#3C4858",
                        margin: "2px 0",
                      }}
                    >
                      Transition Video
                    </div>
                  }
                  secondary={
                    <React.Fragment>
                      {fileTypeBeingUploaded == "transVideo" ? (
                        <LoadingButton
                          loading
                          loadingPosition="start"
                          startIcon={<UploadIcon />}
                          variant="outlined"
                          sx={{
                            fontFamily: "Proxima Nova",
                            fontWeight: "bold",
                          }}
                        >
                          Uploading
                        </LoadingButton>
                      ) : (
                        <>
                          <Button
                            sx={{
                              width: 100,
                              fontFamily: "Proxima Nova",
                              color: "black",
                              marginTop: "4px",
                            }}
                            variant="outlined"
                            startIcon={<UploadIcon />}
                            className="btn-up1"
                            onClick={() =>
                              backgroundTransFileRef.current.click()
                            }
                          >
                            Upload
                          </Button>
                          <NewTooltip
                            placement="bottom"
                            arrow
                            title="MP4,FLV Formats are supported, Maximum upload size is 20 MB "
                          >
                            <IconButton>
                              <InfoIcon
                                style={{ color: "#002E5A", fontSize: "20px" }}
                              />
                            </IconButton>
                          </NewTooltip>
                        </>
                      )}
                      <input
                        onChange={(e) =>
                          handleFileUploadInPage(e, "transVideo")
                        }
                        multiple={false}
                        ref={backgroundTransFileRef}
                        type="file"
                        accept="video/*"
                        hidden
                      />
                    </React.Fragment>
                  }
                />
              </ListItem>
              <Divider variant="inset" component="li" />
              <ListItem
                alignItems="flex-start"
                sx={{
                  paddingTop: 0,
                  boxShadow: "1px 1px #888888",
                  border: "1px solid grey",
                  borderRadius: "3%",
                }}
              >
                <ListItemAvatar>
                  {fileTypeBeingUploaded == "backgroundVideo" ? (
                    <img
                      style={{
                        width: "55px",
                        height: "55px",
                        marginRight: "15px",
                        borderRadius: "50%",
                      }}
                      alt="No display image"
                      src={loading}
                    />
                  ) : (
                    <a href={data.backgroundVideo?.url} target="_blank">
                      <video
                        style={{
                          width: "50px",
                          height: "50px",
                          borderRadius: "50%",
                          marginRight: "15px",
                        }}
                        alt="NO image available"
                        src={data.backgroundVideo?.url}
                      />
                    </a>
                  )}
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <div
                      style={{
                        fontFamily: "Proxima Nova",
                        fontWeight: "bold",
                        color: "#3C4858",
                        margin: "2px 0",
                      }}
                    >
                      Background Video
                    </div>
                  }
                  secondary={
                    <React.Fragment>
                      {fileTypeBeingUploaded == "backgroundVideo" ? (
                        <LoadingButton
                          loading
                          loadingPosition="start"
                          startIcon={<UploadIcon />}
                          variant="outlined"
                          sx={{
                            fontFamily: "Proxima Nova",
                            fontWeight: "bold",
                          }}
                        >
                          Uploading
                        </LoadingButton>
                      ) : (
                        <>
                          <Button
                            sx={{
                              width: 100,
                              fontFamily: "Proxima Nova",
                              color: "black",
                              marginTop: "4px",
                            }}
                            variant="outlined"
                            startIcon={<UploadIcon />}
                            className="btn-up1"
                            onClick={() =>
                              backgroundVideoFileRef.current.click()
                            }
                          >
                            Upload
                          </Button>
                          <NewTooltip
                            placement="bottom"
                            arrow
                            title="MP4,FLV Formats are supported, Maximum upload size is 20 MB "
                          >
                            <IconButton>
                              <InfoIcon
                                style={{ color: "#002E5A", fontSize: "20px" }}
                              />
                            </IconButton>
                          </NewTooltip>
                        </>
                      )}
                      <input
                        onChange={(e) =>
                          handleFileUploadInPage(e, "backgroundVideo")
                        }
                        multiple={false}
                        ref={backgroundVideoFileRef}
                        type="file"
                        accept="video/*"
                        hidden
                      />
                    </React.Fragment>
                  }
                />
              </ListItem>
            </List>

            {/* <div className="content-header-cont " style={{textAlign:"center"}} >

                            <div>
                                <h1 className="pro-nm">Background Video</h1>
                                <div >
                                    <a href={data.backgroundVideo.url} target="_blank" >
                                        <video
                                            src={data.backgroundVideo.url}
                                            style={{ width: "110px", height: "110px" }}
                                        />
                                    </a>
                                </div>
                                <div>
                                    {fileTypeBeingUploaded == "backgroundVideo" ?
                                        <button className="" >Uploading</button> :
                                        <button className="btn-up1" onClick={() => backgroundVideoFileRef.current.click()}>Upload</button>
                                    }
                                    <input onChange={(e) => handleFileUploadInPage(e, "backgroundVideo")} multiple={false} ref={backgroundVideoFileRef} type='file' accept="video/*" hidden />
                                </div>
                            </div>

                        </div>
                        <div className="content-header-cont " style={{textAlign:"center"}} >

                            <div >
                                <h1 className="pro-nm">Transition Video</h1>
                                <div>
                                    <a href={data.transVideo.url} target="_blank" >
                                        <video
                                            src={data.transVideo.url}
                                            style={{ width: "110px", height: "110px" }}
                                        />
                                    </a>
                                </div>
                                <div>
                                    {fileTypeBeingUploaded == "transVideo" ?
                                        <button className="" >Uploading</button> :
                                        <button className="btn-up1" onClick={() => backgroundTransFileRef.current.click()}>Upload</button>
                                    }
                                    <input onChange={(e) => handleFileUploadInPage(e, "transVideo")} multiple={false} ref={backgroundTransFileRef} type='file' accept="video/*" hidden />
                                </div>
                            </div>



                        </div>
                        <div className="content-header-cont " style={{textAlign:"center"}} >
                            <div>
                                <h1 className="pro-nm">Background Image</h1>
                            </div>
                            <div style={{ height: "110px", width: "110px", margin:"auto", display:"flex", alignItems:"center" }}>
                                <a href={data.backgroundImage.url} target="_blank" >
                                    <img src={data.backgroundImage.url} style={{ padding: "4px", width:"80%" }} />
                                </a>
                            </div>
                            <div >
                                {fileTypeBeingUploaded == "backgroundImage" ?
                                    <button className="" >Uploading</button> :
                                    <button className="btn-up1" onClick={() => backgroundImageFileRef.current.click()}>Upload</button>
                                }
                            </div>
                            <input onChange={(e) => handleFileUploadInPage(e, "backgroundImage")} multiple={false} ref={backgroundImageFileRef} type='file' accept="image/*" hidden />

                        </div> */}
          </div>
        </div>

        <HexDetails
          open={open}
          setOpen={setOpen}
          projectId={projectId}
          token={token}
          callbackFunction={updateProjectWithFields}
          colorField={markerClick}
          defaultValue={defaultValue}
        />
        {/* <PageNamePop
          visible={isEditPagePopOpen}
          projectId={projectId}
          setVisible={setNameOpen}
          callbackFunction={updateProjectWithFields}
          token={token}
          defaultPageValue={data.name}
        /> */}
        {/* <EditAccessCode
          visible={isAccessOpen}
          projectId={projectId}
          setVisible={setAccessOpen}
          callbackFunction={updateProjectWithFields}
          token={token}
          defaultaccessValue={data.accesscode}
        /> */}
      </>
    );
  }
};
export default ProjectDetailsData;
