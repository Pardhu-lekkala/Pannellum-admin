import axios from "axios";
import React, { useRef, useState } from "react";
import Loader from "react-loader-spinner";
import { useHistory, useLocation, useParams } from "react-router";
import { BrowserRouter as Router } from "react-router-dom";
import arrow2 from "../../Assets/Images/Add New.png";
import addimage from "../../Assets/Images/addimg.png";
import del from "../../Assets/Images/delete.png";
import edit from "../../Assets/Images/edit.png";
import edit3 from "../../Assets/Images/edit2.png";
import plus from "../../Assets/Images/plus.png";
import DeletePopUp from "../../Components/Delete Video Pop";
import EditMarkerPop from "../../Components/EditMarkerPop";
import EditVideoPop from "../../Components/EditVideoPop";
import NavBar from "../../Components/NavItem";
import VideoUploadCard from "../../Components/popup";
import MarkerCard from "../../Components/PopUp2";
import ProjectPopUp from "../../Components/ProjectPop";
import { DataGrid, GridColumns } from "@mui/x-data-grid";
import { createMuiTheme } from "@material-ui/core";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Button from '@mui/material/Button';
import UploadIcon from '@mui/icons-material/Upload';
import LoadingButton from '@mui/lab/LoadingButton';
import List from "@mui/material/List";
import loading from "../../Assets/gif/loading.gif";
import constants from "../constants";
import "./page.css";

const AddPage = (props) => {
  const [firstTimeLoader, setFirstTimeLoader] = useState(true);
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const history = useHistory();
  const backgroundImageFileRef = useRef();
  const pageIconRef = useRef();
  const backgroundVideoFileRef = useRef();
  const [fileTypeBeingUploaded, setFileTypeBeingUploaded] = React.useState("");
  const [vdImgUrl, setVdImgUrl] = React.useState("");
  const [bckImgUrl, setBckImgUrl] = React.useState("");
  const [markerPopupOpen, setmarkerPopupOpen] = useState(false);
  const [opened, setOpened] = useState(false);
  const [videoAreaPopupOpen, setvideoAreaPopupOpen] = useState(false);
  const [elementToBeEdited, setElementToBeEdited] = useState(false);
  const [mode, setEditMode] = useState(false);
  console.log(mode, "this is edit mode in add page");

  const [projectName, setProjectName] = React.useState("");
  const [mainproject, setMainProject] = React.useState("");
  const [projectId, setProjectId] = React.useState();

  const [token, setToken] = React.useState("");
  const [pages, setPages] = React.useState("");
  const [click, setClick] = React.useState("");

  const [deleteMarkerPopUpActive, setDeleteMarkerPopUpActive] =
    React.useState(false);
  const [deleteMarkerId, setDeleteMarkerId] = React.useState(null);

  const [deleteVideoActive, setDeleteVideoPopupActive] = React.useState(false);
  const [deleteVideoId, setDeleteVideoId] = React.useState(null);
  const [editMarkerId, setEditMarkerId] = React.useState(null);
  const [editVideoId, setEditVideoId] = React.useState(null);

  let tokens = JSON.parse(localStorage.getItem('token'));

  let url = props.location.state.bckImgUrl;
  let vdUrl = props.location.state.vdImgUrl;
  let currentPageId = props.location.state.pageId;
  const [currentPagesId, setCurrentPageId] = React.useState(currentPageId);

  const clickToggle = () => {
    click ? setClick(false) : setClick(true);
  };

  /* Function to solve viewport not scrolling after deleting an item*/
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  function navigateCreate() {
    history.push({
      pathname: "/newpage",
      state: {
        projectId: projectId,
        project: projectName,
        token: tokens,
      },
    });
  }

  function navigateToPreivewPage() {
    history.push({
      pathname: "/preview",
      state: {
        pageindex: currentPageIndex,
        project: mainproject,
        token: tokens,
      },
    });
  }

  function navigateProjectDetails() {
    history.push({
      pathname: "/projectdetailsdata",
      state: {
        projectId: projectId,
        token: tokens,
      },
    });
  }

  function updatePageWithFormData(formData) {
    formData.append(
      "data",
      JSON.stringify({
        project: projectId,
        pageName: pages[currentPageIndex].pageName,
      })
    );
    console.log(constants.ipaddress + "/pages/" + pages[currentPageIndex].id);
    axios({
      method: "PUT",
      url: constants.ipaddress + "/pages/" + pages[currentPageIndex].id,
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer" + " " + token,
      },
    })
      .then(function (response) {
        console.log(response, "updatedresponse");
        console.log(response.data.id);
        setFileTypeBeingUploaded("");
        refreshPage();
      })
      .catch(function (response) {
        console.log(response);
        setFileTypeBeingUploaded("");
      });
  }

  const refreshPage = () => {

    setToken(tokens);
    let baseURL;
    if (projectId == undefined)
      baseURL =
        constants.ipaddress + "/projects/" + props.location.state.projectId;
    else
      baseURL = constants.ipaddress + "/projects/" + JSON.stringify(projectId);

    console.log("Project ID is" + JSON.stringify(projectId));

    axios.get(baseURL).then((response) => {
      console.log(response.data);
      setMainProject(response.data);
      console.log(response.data.id);
      setPages(response.data.pages);
      setProjectName(response.data.name);
      setProjectId(response.data.id);
      setBckImgUrl(url);
      setVdImgUrl(vdUrl);
      setFirstTimeLoader(false);
      setEditMode(false);

    });
  };
  React.useEffect(refreshPage, []);

  //const [videoList,setVideoList]=useState([pages[currentPageIndex]]);
  //console.log(videoList,"video list in add page")

  /****************************************************VIDEO AREA COLUMNS************************************************************ */

  const VideoColumns = [
    {
      headerName: "Video URL",
      headerClassName: "header-styles",
      field: "videoURL",
      flex: 1,
      color: "blue",
      //valueGetter: (params) => {
      //console.log(pages[currentPageIndex].video_areas,"these are params")
      //return params.videoURL;
      //},
    },
    {
      headerName: "Video Type",
      headerClassName: "header-styles",
      field: "videoType",
      flex: 1,

      //   valueGetter: (params) => {
      //     return params.videoType;
      //   },
    },
    {
      headerName: "Position",
      headerClassName: "header-styles",
      field: "position",
      flex: 1,
      renderCell: (params) => {
        let s = params.row.position;
        s = s.split(",")

        return Math.floor(Number(s[0])) + "," + Math.floor(Number(s[1])) + "," + Math.floor(Number(s[2])) + "," + Math.floor(Number(s[3]));
      }
      //   valueGetter: (params) => {
      //     return params.position;
      //   },
    },
    {
      headerName: "Edit",
      headerClassName: "header-styles",
      field: "edit",
      flex: 0.7,
      renderCell: (params) => (
        <div>
          {console.log(
            params,
            "these are rendered params for video in add page"
          )}
          <img
            src={edit}
            onClick={() => {
              setvideoAreaPopupOpen(true);
              setEditMode(true);
              setElementToBeEdited(params);
            }}
          />
        </div>
      ),
    },
    {
      headerName: "Delete",
      headerClassName: "header-styles",
      field: "delete",
      flex: 0.7,
      renderCell: (params) => (
        <div>
          <img
            src={del}
            onClick={() => {
              setDeleteVideoPopupActive(true);
              setDeleteVideoId(params.id);
            }}
          />
        </div>
      ),
    },
  ];

  /********************************************************MARKER AREA COLUMNS********************************************************* */
  const markerColumns = [
    {
      headerName: "Name",
      headerClassName: "header-styles",
      field: "markerName",
      flex: 1,
      //valueGetter: (params) => {
      //console.log(pages[currentPageIndex].video_areas,"these are params")
      //return params.videoURL;
      //},
    },
    {
      headerName: "Label",
      headerClassName: "header-styles",
      field: "VisibileLabel",
      flex: 1,

      //   valueGetter: (params) => {
      //     return params.videoType;
      //   },
    },
    {
      headerName: "Destination Type",
      headerClassName: "header-styles",
      field: "destinationType",
      flex: 1,
      //   valueGetter: (params) => {
      //     return params.position;
      //   },
    },
    {
      headerName: "Marker Position",
      headerClassName: "header-styles",
      field: "markerPosition",
      flex: 1,
      renderCell: (params) => {
        let s = params.row.markerPosition;
        s = s.split(",")

        return Math.floor(Number(s[0])) + "," + Math.floor(Number(s[1]));

      }
      //   valueGetter: (params) => {
      //     return params.position;
      //   },
    },
    {
      headerName: "Edit",
      headerClassName: "header-styles",
      field: "edit",
      flex: 0.7,
      renderCell: (params) => (
        <div>
          {console.log(
            params,
            "these are rendered params for markers in add page"
          )}
          <img
            src={edit}
            onClick={() => {
              setmarkerPopupOpen(true);
              setEditMarkerId(params.id);
              setEditMode(true);
              setElementToBeEdited(params);
            }}
          />
        </div>
      ),
    },
    {
      headerName: "Delete",
      headerClassName: "header-styles",
      field: "delete",
      flex: 0.7,
      renderCell: (params) => (
        <div>
          <img
            src={del}
            onClick={() => {
              setDeleteMarkerPopUpActive(true);
              setDeleteMarkerId(params.id);
            }}
          />
        </div>
      ),
    },
  ];

  const myTheme = createMuiTheme({
    overrides: {
      MuiTableRow: {
        head: {
          backgroundColor: "lightgray",
          "& > th ": {
            color: "black",
            fontWeight: "bold",
          },
        },
      },
    },
  });

  const handleFileUploadInPage = (e, type) => {
    let iconfiles = e.target.files;
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
    if (type == "pageIcon") {
      console.log("Attaching media of type" + e.target.files[0].name);

      formData.append("files.pageIcon", e.target.files[0]);
    }

    console.log("Calling the post API ");

    updatePageWithFormData(formData);
  };

  if (firstTimeLoader) {
    return (
      <div style={{ position: "fixed", top: "50%", left: "50%" }}>
        <Loader type="TailSpin" color="#00BFFF" height={60} width={60} />
      </div>
    );
  } else {
    return (
      <>
        <div className="cstm-main-cont2">
          <div>
            <NavBar token={tokens} />
          </div>
          <div className="cstm-content-cont2">
              <div className="side-main-cont2">
                <div className="box-cont">
                  <div className="conf-cont">
                    <div className="cont-pro-cont">
                      <div style={{ display: "flex", flexDirection: "row" }}>
                        <h1
                          className="project-name"
                          style={{ marginTop: "22px" }}
                        >
                          {projectName}
                        </h1>
                        {projectId !== undefined ? (
                          <h1 className="id-text">{`${projectId}`}</h1>
                        ) : null}
                        <div
                          onClick={navigateProjectDetails}
                          style={{ marginTop: "22px" }}
                        >
                          <img
                            src={edit}
                            alt="..."
                            className="edit-img"
                            style={{ cursor: "pointer", marginLeft:"2vw" }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {pages.length > 0 ? (
                    <div className="cont22">
                      {pages.map((e, index) => {
                        return (
                          <Router>
                            <div
                              className="pg-cont"
                              onClick={() => {
                                clickToggle(true);
                                setCurrentPageId(e.id);
                                setCurrentPageIndex(index);
                              }}
                            >
                              {index == currentPageIndex ? (
                                <div className="pg-cont2">
                                  <h1
                                    className="pg-text2"
                                    style={{ color: "#FE7300" }}
                                  >{`${e.pageName} -${e.id}`}</h1>
                                </div>
                              ) : (
                                <div className="pg-cont2">
                                  <h1 className="pg-text2">{`${e.pageName} -${e.id}`}</h1>
                                </div>
                              )}
                            </div>
                          </Router>
                        );
                      })}
                    </div>
                  ) : null}

                  <div className="create-pg-cont" onClick={navigateCreate}>
                    <img src={addimage} alt="..." className="addimg" />
                    <h1 className="create-text">Create a new Page</h1>
                  </div>
                </div>
              </div>
            {pages.length > 0 ? (
              <div className="half">
                <div className="prev-btn-cont">
                  <button
                    className="prev-btn2"
                    onClick={() => {
                      navigateToPreivewPage();
                    }}
                  >
                    <span>
                      <img src={edit3} alt="..." className="play-img2" />
                    </span>
                    Preview
                  </button>
                </div>
                <div className="upload-cont2">
                  <div className="up1">
                    <div className="pg1">
                      <label htmlFor="inp2" className="pg-nm">
                        Page Name{" "}
                      </label>
                      <br />
                      <label style={{ color: "#FE7300" }}>
                        {" "}
                        {pages[currentPageIndex] &&
                          pages[currentPageIndex].pageName
                          ? pages[currentPageIndex].pageName
                          : null}
                      </label>
                      <br /> <br />
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
                            {pages[currentPageIndex].backgroundImage !=
                              undefined ? (
                              fileTypeBeingUploaded == "backgroundImage" ?
                                <img
                                  style={{ width: "55px", height: "55px", marginRight: "15px", borderRadius: "50%" }}
                                  alt="No display image"
                                  src={loading}
                                /> :
                                <a
                                  href={
                                    pages[currentPageIndex].backgroundImage.url
                                  }
                                  target="_blank"
                                >
                                  <Avatar
                                    style={{
                                      width: "50px",
                                      height: "50px",
                                      marginRight: "15px",
                                    }}
                                    alt="No display image"
                                    src={
                                      pages[currentPageIndex].backgroundImage.url
                                    }
                                  />
                                </a>
                            ) : (
                              <label style={{ color: "#FE7300" }}></label>
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
                                      backgroundImageFileRef.current.click()
                                    }
                                  >
                                    Upload
                                  </Button>
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
                            {pages[currentPageIndex].pageIcon != undefined ? (
                              fileTypeBeingUploaded == "pageIcon" ?
                                <img
                                  style={{ width: "55px", height: "55px", marginRight: "15px", borderRadius: "50%" }}
                                  alt="No display image"
                                  src={loading}
                                /> :
                                <a
                                  href={pages[currentPageIndex].pageIcon.url}
                                  target="_blank"
                                >
                                  <Avatar
                                    style={{
                                      width: "50px",
                                      height: "50px",
                                      marginRight: "15px",
                                    }}
                                    alt="NO image Available"
                                    src={pages[currentPageIndex].pageIcon.url}
                                  />
                                </a>
                            ) : (
                              <label style={{ color: "#FE7300" }}></label>
                            )}
                          </ListItemAvatar>
                          <ListItemText
                            primary={
                              <div
                                style={{
                                  fontFamily: "Proxima Nova",
                                  fontWeight: "bold",
                                  color: "#3C4858",
                                  marginTop: "2px",
                                }}
                              >
                                Page Icon
                              </div>
                            }
                            secondary={
                              <React.Fragment>
                                {fileTypeBeingUploaded == "pageIcon" ? (
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
                                    onClick={() => pageIconRef.current.click()}
                                  >
                                    Upload
                                  </Button>
                                )}
                                <input
                                  onChange={(e) =>
                                    handleFileUploadInPage(e, "pageIcon")
                                  }
                                  multiple={false}
                                  ref={pageIconRef}
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
                            {pages[currentPageIndex].backgroundVideo !=
                              undefined ? (
                              fileTypeBeingUploaded == "backgroundVideo" ?
                                <img
                                  style={{ width: "55px", height: "55px", marginRight: "15px", borderRadius: "50%" }}
                                  alt="No display image"
                                  src={loading}
                                /> :
                                <a
                                  href={
                                    pages[currentPageIndex].backgroundVideo.url
                                  }
                                  target="_blank"
                                >
                                  <video
                                    style={{
                                      width: "50px",
                                      height: "50px",
                                      borderRadius: "50%",
                                      marginRight: "15px",
                                    }}
                                    alt="NO image available"
                                    src={
                                      pages[currentPageIndex].backgroundVideo.url
                                    }
                                  />
                                </a>
                            ) : (
                              <label style={{ color: "#FE7300" }}></label>
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
                    </div>
                  </div>
                </div>


                {/**********************************************VIDEO AREA CONTAINER**************************************************************/}
                <div className="upload-cont2" style={{ marginTop: "30px", height: "400px" }}>
                  <div style={{}} className="lst-main-cont">
                    <div
                      style={{
                        // marginLeft: "15rem",
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        width: "73vw"
                      }}
                    >
                      <div style={{ width: "400px" }}>
                        <h1 className="vd-tx" style={{ color: "#FE7300" }}>
                          List Of Video Area
                    </h1>
                      </div>
                      <div>
                        <button
                          className="btn-add"
                          onClick={() => {
                            setvideoAreaPopupOpen(true);
                            setEditMode(false);
                            setElementToBeEdited();
                          }}
                        >
                          Add New Video
                      <span>
                            <img src={plus} className="plus-img" />
                          </span>
                        </button>
                      </div>
                    </div>
                    <DataGrid
                      sx={{
                        
                        width:"92%",
                        height: "80%",
                        "& .MuiDataGrid-cell:hover": {
                          color: "primary.main",
                        },
                      }}
                      rows={pages[currentPageIndex]?.video_areas}
                      columns={VideoColumns}
                      style={{ cursor: "pointer" }}
                      autoPageSize={true}
                      // pageSize={4}
                      rowHeight={40}
                    // onCellClick={}
                    />
                  </div>
                </div>

                {/*<div className="upload-cont3">
                                    <div className="tx-btn-cont">
                                        <h1 className="vd-tx" style={{ color: "#FE7300" }}> Setup Video Area</h1>
                                        <button className="btn-add" onClick={() => { setvideoAreaPopupOpen(true); setEditMode(false); setElementToBeEdited() }}>Add New Video<span><img src={plus} className="plus-img" /></span></button>
                                    </div>
                                    <div className="content-add-contss">
                                        <div className="content-add-cont">
                                            <div className="content-header-cont" > Video URL</div>
                                            <div className="content-header-cont" > Video Type</div>
                                            <div className="content-header-cont" > Position</div>
                                            <div className="content-header-cont" > Edit</div>

                                        </div>
                                    </div>

                                    {pages[currentPageIndex].video_areas != undefined && pages[currentPageIndex].video_areas.length > 0 ? <div>
                                        {pages[currentPageIndex].video_areas.map((e, index) => {
                                            return (
                                                <div className="content-add-cont">
                                                    <div className="content-header-cont"><a href={e.videoURL} target="_blank">{e.videoURL} </a></div>
                                                    <div className="content-header-cont">{e.videoType}</div>
                                                    <div className="content-header-cont">{e.position}</div>
                                                    <div className="content-header-cont">
                                                        <img src={edit} onClick={() => { setvideoAreaPopupOpen(true); setEditMode(true); setElementToBeEdited(e) }} />
                                                        <img src={del} onClick={() => { setDeleteVideoPopupActive(true); setDeleteVideoId(e.id) }} />
                                                    </div>

                                                </div>

                                            );
                                        })}
                                    </div> : null}

                                    </div>*/}

                {/****************************************************MARKER CONTAINER*****************************************************/}
                <div className="upload-cont2" style={{ marginTop: "30px", height: "400px" }}>
                  <div style={{}}>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        width: "73vw"
                      }}
                    >
                      <div style={{ width: "400px" }}>
                        <h1 className="vd-tx" style={{ color: "#FE7300" }}>
                          List Of Marker Area
                    </h1>
                      </div>
                      <button
                        className="btn-add"
                        onClick={() => {
                          setmarkerPopupOpen(true);
                          setEditMode(false);
                          setEditMarkerId(null);
                          setElementToBeEdited(null);
                        }}
                      >
                        Add New Marker
                      <span>
                          <img src={plus} className="plus-img" />
                        </span>
                      </button>
                    </div>
                    <DataGrid
                      sx={{
                        width:"92%",
                        height: "80%",
                        "& .MuiDataGrid-cell:hover": {
                          color: "primary.main",
                        },
                      }}
                      rows={pages[currentPageIndex]?.markers}
                      columns={markerColumns}
                      style={{ cursor: "pointer" }}
                      autoPageSize={true}
                      // pageSize={4}
                      rowHeight={40}
                    // onCellClick={}
                    />
                  </div>
                </div>

                {/*<div className="upload-cont3">
                                    <div className="tx-btn-cont">
                                        <h1 className="vd-tx" style={{ color: "#FE7300" }}>Markers</h1>
                                        <button className="btn-add" onClick={() => { setmarkerPopupOpen(true); setEditMode(false); setEditMarkerId(null); setElementToBeEdited(null) }}>Add New Marker<span><img src={plus} className="plus-img" /></span></button>
                                    </div>
                                    <div className="content-add-contss">
                                        <div className="content-add-cont">
                                            <div className="content-header-cont" > Name</div>
                                            <div className="content-header-cont" > Label</div>
                                            <div className="content-header-cont" >  Destination Type</div>
                                            <div className="content-header-cont" > Location </div>
                                            <div className="content-header-cont" > Edit</div>


                                        </div>
                                        {pages[currentPageIndex].markers != undefined && pages[currentPageIndex].markers.length > 0 ? <div>
                                            {pages[currentPageIndex].markers.map((e) => {
                                                return (
                                                    <div className="content-add-cont">
                                                        <div className="content-header-cont"> {e.markerName}</div>
                                                        <div className="content-header-cont"> {e.VisibileLabel ? "On" : "Off"}</div>
                                                        <div className="content-header-cont"> {e.destinationType}</div>
                                                        <div className="content-header-cont"> {e.markerPosition}</div>
                                                        <div className="content-header-cont">


                                                            <img src={edit} onClick={() => { setmarkerPopupOpen(true); setEditMarkerId(e.id); setEditMode(true); setElementToBeEdited(e) }} />

                                                            <img src={del} onClick={() => { setDeleteMarkerPopUpActive(true); setDeleteMarkerId(e.id) }} />
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div> : null}
                                    </div>
                                        </div>*/}
              </div>
            ) : (
              <div style={{ position: "fixed", top: "50%", left: "50%" }}>
                {" "}
                No Pages available, please create one from side menu.{" "}
              </div>
            )}
          </div>

          <VideoUploadCard
            open={videoAreaPopupOpen}
            vdImgUrl={vdImgUrl}
            bckImgUrl={bckImgUrl}
            token={token}
            setOpen={setvideoAreaPopupOpen}
            pageId={pages[currentPageIndex].id}
            backgroundImage={
              pages[currentPageIndex] && pages[currentPageIndex].backgroundImage
                ? pages[currentPageIndex].backgroundImage
                : null
            }
            project={projectName}
            projectId={projectId}
            isEditmode={mode}
            elementToBeEdited={elementToBeEdited}
          />

          <MarkerCard
            markerPopupOpen={markerPopupOpen}
            bckImgUrl={bckImgUrl}
            vdImgUrl={vdImgUrl}
            pageId={pages[currentPageIndex].id}
            pageName={pages[currentPageIndex].pageName}
            token={token}
            setmarkerPopupOpen={setmarkerPopupOpen}
            project={projectName}
            projectId={projectId}
            backgroundImage={
              pages[currentPageIndex] && pages[currentPageIndex].backgroundImage
                ? pages[currentPageIndex].backgroundImage
                : null
            }
            isEditmode={mode}
            elementToBeEdited={elementToBeEdited}
          />
          {/* <DeletePop open={videoAreaPopupOpen} setOpen={setvideoAreaPopupOpen} token={token} pageId={currentPagesId} pageName=pageName={pages[currentPageIndex]  && pages[currentPageIndex].pageName ? pages[currentPageIndex].pageName : null}project={project} projectId={ids} deleteId={deleteMarkerId} />
           */}
          <DeletePopUp
            open={deleteVideoActive}
            setOpen={(flag, isrefresh) => {
              setDeleteVideoPopupActive(flag);
              if (isrefresh) refreshPage();
            }}
            token={token}
            deleteVideoId={deleteVideoId}
            path="video-areas"
          />

          <DeletePopUp
            open={deleteMarkerPopUpActive}
            setOpen={(flag, isrefresh) => {
              setDeleteMarkerPopUpActive(flag);
              if (isrefresh) refreshPage();
            }}
            token={token}
            deleteVideoId={deleteMarkerId}
            path="markers"
          />
          {/* <EditMarkerPop markerPopupOpen={editMarkerPopUpOpen} bckImgUrl={bckImgUrl} pageId={currentPagesId} editMarkId={editMarkerId} token={token} setmarkerPopupOpen={seteditMarkerPopUpOpen} project={project} projectId={projectId} />
                    <EditVideoPop open={editVideoAreaPopUp} token={token} vdImgUrl={vdImgUrl} setOpen={seteditVideoAreaPopUp} pageId={currentPagesId} editVideoId={editVideoId} pageName={pages[currentPageIndex] && pages[currentPageIndex].pageName ? pages[currentPageIndex].pageName : null} project={project} projectId={projectId} />
                    */}
          <ProjectPopUp
            open={opened}
            setOpen={setOpened}
            project={projectName}
            projectId={projectId}
            token={token}
          />
        </div>
      </>
    );
  }
};
export default AddPage;
