import axios from "axios";
import React, { useRef, useState, useEffect } from "react";
import Loader from "react-loader-spinner";
import { useHistory, useLocation, useParams } from "react-router";
import { BrowserRouter as Router } from "react-router-dom";
import arrow2 from "../../Assets/Images/Add New.png";
import addimage from "../../Assets/Images/addimg.png";
import del from "../../Assets/Images/delete.png";
import edit from "../../Assets/Images/edit.png";
import homeicon from "../../Assets/Images/home.png";
import edit3 from "../../Assets/Images/edit2.png";
import plus from "../../Assets/Images/plus.png";
import loading from "../../Assets/gif/loading.gif";
import NavBar from "../../Components/NavItem";
import VideoUploadCard from "../../Components/popup";
import HomeIcon from "@mui/icons-material/Home";
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
import Button from "@mui/material/Button";
import UploadIcon from "@mui/icons-material/Upload";
import LoadingButton from "@mui/lab/LoadingButton";
import List from "@mui/material/List";
import loadinggif from "../../Assets/gif/loading.gif";
import Swal from "sweetalert2";
import constants from "../constants";
import Chip from "@mui/material/Chip";
import "./page.css";
import { PartyModeSharp } from "@mui/icons-material";
import DeleteIcon from "@mui/icons-material/Delete";
import InfoIcon from "@mui/icons-material/Info";
import { styled } from "@mui/material/styles";
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

const AddPage = (props) => {
  const [firstTimeLoader, setFirstTimeLoader] = useState(true);
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [homePageLoader, setHomePageLoader] = useState(false);
  // const [isNewPageCreated, setIsNewPageCreated] = useState(false);
  const history = useHistory();
  const backgroundImageFileRef = useRef();
  const pageIconRef = useRef();
  const backgroundVideoFileRef = useRef();
  const [fileTypeBeingUploaded, setFileTypeBeingUploaded] = React.useState("");
  // const [newPage, setNewPage] = useState(props.location.state.isNewPageCreated);
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
  const [tokens, setToken] = React.useState("");
  const [pages, setPages] = React.useState("");
  const [click, setClick] = React.useState("");
  // const [fontChange, setFontChange] =React.useState(false);
  const [shouldDelete, setShouldDelete] = useState(false);

  const [editPagePopUpActive, setEditPagePopUpActive] = React.useState(false);
  const [editPageId, setEditPageId] = React.useState(null);
  console.log(editPageId, "this is page id outside");
  const [editMarkerId, setEditMarkerId] = React.useState(null);
  const [editVideoId, stEditVideoId] = React.useState(null);

  // useEffect(() => {
  //   if (props.location.state.isNewPageCreated) {
  //     setCurrentPageIndex(pages.length - 1);
  //     // setNewPage(false);
  //   }
  // }, [props.location.state.isNewPageCreated, pages]);

  let token = JSON.parse(localStorage.getItem("token"));
  const user = props.location.state.user;

  let localIndexString = "local-index";
  let url = props.location.state.bckImgUrl;
  let vdUrl = props.location.state.vdImgUrl;
  let currentPageId = props.location.state.pageId;
  const [currentPagesId, setCurrentPageId] = React.useState(currentPageId);

  function CreatePage() {
    console.log(editPageId, "this is page id inside the swal");
    //console.log(currentPageName, "this is page name inside the swal");
    Swal.fire({
      title: "Enter Page Name",
      input: "text",
      inputAttributes: {
        autocapitalize: "off",
      },
      showCancelButton: true,
      confirmButtonText: "Confirm",
      showLoaderOnConfirm: true,
      //allowOutsideClick: () => !Swal.isLoading(),
      preConfirm: (result) => {
        if (result == undefined || result == "") {
          Swal.fire("OPPS", "Enter a valid Page name", "warning");
        } else {
          return new Promise(function (resolve, reject) {
            var formData = new FormData();
            formData.append(
              "data",
              JSON.stringify({
                project: projectId,
                pageName: result,
              })
            );

            axios({
              method: "post",
              url: constants.ipaddress + "/pages",
              data: formData,
              headers: {
                "Content-Type": "multipart/form-data",
                Authorization: "Bearer" + " " + token,
              },
            })
              .then(function (response) {
                // setResponse(response);
                // setOpen(false, true);
                resolve();
                Swal.fire(
                  "Done",
                  "Your Page Created Successfully",
                  "success"
                ).then((result) => {
                  console.log(response, "editresponse");
                  if (result.isConfirmed) {
                    localStorage.setItem(
                      localIndexString,
                      mainproject.pages.length
                    );
                    window.location.reload(response.pageName, response.data.id);
                  }
                  console.log(result);
                });
              })
              .catch(function (response) {
                console.log(response);
                reject();
                Swal.fire("OOPS!", "Something went wrong", "error").then(
                  (result) => {
                    if (result.isConfirmed) {
                      window.location.reload();
                    }
                    console.log(result);
                  }
                );
              });
          });
        }
      },
    });
  }

  /******************************************EDIT PAGE SWEET ALERT************************************************************** */

  function editPage(editPageId, currentPageName) {
    console.log(editPageId, "this is page id inside the swal");
    console.log(currentPageName, "this is page name inside the swal");
    Swal.fire({
      title: "Enter Page Name",
      input: "text",
      inputValue: currentPageName,
      inputAttributes: {
        autocapitalize: "off",
      },
      showCancelButton: true,
      confirmButtonText: "Confirm",
      showLoaderOnConfirm: true,
      preConfirm: (result) => {
        console.log(result, "this is result in preconf");
        if (result == undefined || result == "") {
          Swal.fire("OPPS", "Enter a valid Page name", "warning");
        } else {
          return new Promise(function (resolve, reject) {
            let urlpath =
              constants.ipaddress + "/" + "pages" + "/" + editPageId;
            console.log("path is" + urlpath);
            var formData = new FormData();
            formData.append(
              "data",
              JSON.stringify({
                pageName: result,
              })
            );

            axios({
              method: "PUT",
              url: urlpath,
              data: formData,
              headers: {
                "Content-Type": "multipart/form-data",
                Authorization: "Bearer" + " " + token,
              },
            })
              .then(function (response) {
                // setResponse(response);
                // setOpen(false, true);
                resolve();
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
                reject();
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
  }

  /****************************************************************************************************************** */

  const clickToggle = () => {
    click ? setClick(false) : setClick(true);
  };
  console.log(pages[pages.length - 1], "this is the last page");

  /* Function to solve viewport not scrolling after deleting an item*/
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  function navigateCreate() {
    console.log(mainproject.pages.length, "console from add page");

    history.push({
      pathname: "/newpage",
      state: {
        projectId: projectId,
        project: projectName,
        user: user,
        pagesLength: mainproject.pages.length,
      },
    });
  }

  function deleteElement(path, idToBeDeleted) {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showLoaderOnConfirm: true,
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Delete it!",
      preConfirm: (login) => {
        return new Promise(function (resolve, reject) {
          let urlpath = constants.ipaddress + "/" + path + "/" + idToBeDeleted;
          console.log("path " + urlpath);

          axios({
            method: "DELETE",
            url: urlpath,
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: "Bearer" + " " + token,
            },
          })
            .then(function (response) {
              //              toastr.success('Succes');
              resolve();
              Swal.fire("Deleted!", "Deletion was successful.", "success").then(
                (result) => {
                  if (result.isConfirmed) {
                    window.location.reload();
                  }
                  console.log(result);
                }
              );
            })
            .catch(function (error) {
              //            toastr.error('Error ');
              console.log(error);
              reject();
              Swal.fire(
                "Oh! Deletion Failed!",
                "Deletion was not successful.",
                "error"
              ).then((result) => {
                if (result.isConfirmed) {
                  window.location.reload();
                }
                console.log(result);
              });
            });
        });
      },
      allowOutsideClick: () => !Swal.isLoading(),
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

  function navigateToPreivewPage() {
    history.push({
      pathname: "/preview",
      state: {
        pageindex: currentPageIndex,
        project: mainproject,
      },
    });
  }

  function navigateProjectDetails() {
    history.push({
      pathname: "/projectdetailsdata",
      state: {
        projectId: projectId,
        user: user,
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

  // function setCurrentPageAsHomePage() {
  //   setHomePageLoader(true);
  //   console.log(
  //     "" + projectId + ": hompage" + pages[currentPageIndex].id,
  //     "Updating the Homepage of the project"
  //   );
  //   var formData = new FormData();
  //   formData.append(
  //     "data",
  //     JSON.stringify({
  //       homepage: pages[currentPageIndex].id,
  //     })
  //   );
  //   updateProjectWithFormDate(formData);
  // }
  function setCurrentPageAsHomePage() {
    Swal.fire({
      title: "Are You Sure To Set It As Home Page",
      text: "You won't be able to revert this!",
      icon: "question",

      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
      showLoaderOnConfirm: true,

      preConfirm: (login) => {
        return new Promise(function (resolve, reject) {
          let urlpath = constants.ipaddress + "/projects/" + projectId;
          console.log("path " + urlpath);
          var formData = new FormData();
          formData.append(
            "data",
            JSON.stringify({
              homepage: pages[currentPageIndex].id,
            })
          );

          axios({
            method: "PUT",
            url: urlpath,
            data: formData,
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: "Bearer" + " " + token,
            },
          })
            .then(function (response) {
              //              toastr.success('Succes');
              resolve();
              Swal.fire("Great", "Your home page set.", "success").then(
                (result) => {
                  if (result.isConfirmed) {
                    window.location.reload();
                  }
                  console.log(result);
                }
              );
              console.log(response, "resonse in axios");
            })
            .catch(function (error) {
              //            toastr.error('Error ');
              console.log(error);
              reject();
              Swal.fire(
                "Oh! setting home page Failed!",
                "setting home page was not successful.",
                "error"
              ).then((result) => {
                if (result.isConfirmed) {
                  window.location.reload();
                }
                console.log(result);
              });
            });
        });
      },
      allowOutsideClick: () => !Swal.isLoading(),
    });
  }

  function updateProjectWithFormDate(formData) {
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
        console.log(response, "updatedresponse");
        console.log(response.data.id);
        setHomePageLoader(false);
        refreshPage();
      })
      .catch(function (response) {
        console.log(response);
        setFileTypeBeingUploaded("");
        setHomePageLoader(false);
      });
  }
  const refreshPage = () => {
    setToken(token);
    let baseURL;
    if (projectId == undefined)
      baseURL =
        constants.ipaddress + "/projects/" + props.location.state.projectId;
    else
      baseURL = constants.ipaddress + "/projects/" + JSON.stringify(projectId);

    let indexFromLocalStorage = localStorage.getItem(localIndexString);
    console.log(indexFromLocalStorage, "console index from local");

    axios.get(baseURL).then((response) => {
      let sortPagesData = response.data.pages.sort(function (a, b) {
        return a.id - b.id;
      });
      console.log(sortPagesData, "this is refresh data after sorting");
      console.log(response.data);
      setMainProject(response.data);
      console.log(response.data.id);

      if (
        indexFromLocalStorage == undefined ||
        indexFromLocalStorage === "undefined" ||
        response.data.pages.length <= indexFromLocalStorage
      ) {
        localStorage.getItem(localIndexString, 0);
        setCurrentPageIndex(0);
        console.log(indexFromLocalStorage, "setting the page index to 0");
      } else {
        setCurrentPageIndex(indexFromLocalStorage);
        console.log(indexFromLocalStorage, "setting the page index to ");
      }
      // setPages(response.data.pages);
      setPages(sortPagesData);
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

  // if (isNewPageCreated) {
  //   navigateCreate();
  // }

  // useEffect(() => {
  //   if (shouldDelete) {
  //     deleteElement();
  //   }
  //   setShouldDelete(false);
  // }, [shouldDelete]);

  /****************************************************VIDEO AREA COLUMNS************************************************************ */

  const VideoColumns = [
    {
      headerName: "Video URL",
      headerClassName: "header-styles",
      field: "videoURL",
      flex: 1,
      color: "blue",
      renderCell: (params) => (
        <a href={params.value} target="_blank">
          {params.value}
        </a>
      ),
      //valueGetter: (params) => {
      //console.log(pages[currentPageIndex].video_areas,"these are params")
      //return params.videoURL;
      //},
    },
    {
      headerName: "Video Type",
      headerClassName: "header-styles",
      field: "videoType",
      flex: 0.3,
      renderCell: (params) => (
        <Chip
          sx={{ height: "30px", marginLeft: "10px" }}
          label={params.value}
          color={params.value == "Youtube" ? "error" : "info"}
        />
      ),

      //   valueGetter: (params) => {
      //     return params.videoType;
      //   },
    },
    {
      headerName: "Position",
      headerClassName: "header-styles",
      field: "position",
      flex: 0.5,
      renderCell: (params) => {
        let s = params.row.position;
        s = s.split(",");

        return (
          Math.floor(Number(s[0])) +
          "," +
          Math.floor(Number(s[1])) +
          "," +
          Math.floor(Number(s[2])) +
          "," +
          Math.floor(Number(s[3]))
        );
      },
      //   valueGetter: (params) => {
      //     return params.position;
      //   },
    },
    {
      headerName: "Edit",
      headerClassName: "header-styles",
      field: "edit",
      flex: 0.2,
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
      flex: 0.2,
      renderCell: (params) => (
        <div>
          <img
            src={del}
            onClick={() => {
              // setDeleteVideoPopupActive(true);
              // setIdToBeDeleted(params.id);
              // setPath("video-areas");
              deleteElement("video-areas", params.id);
              setShouldDelete(true);
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
      flex: 0.6,
      //valueGetter: (params) => {
      //console.log(pages[currentPageIndex].video_areas,"these are params")
      //return params.videoURL;
      //},
    },
    {
      headerName: "Marker Label",
      headerClassName: "header-styles",
      field: "markerLabel",
      flex: 0.4,

      //valueGetter: (params) => {
      //console.log(pages[currentPageIndex].video_areas,"these are params")
      //return params.videoURL;
      //},
    },
    {
      headerName: "Label",
      headerClassName: "header-styles",
      field: "VisibileLabel",
      flex: 0.2,
      renderCell: (params) => (
        <Chip
          sx={{ height: "30px" }}
          label={params.value.toString() == "true" ? "Label-on" : "Label-off"}
          color={params.value.toString() == "true" ? "success" : "error"}
        />
      ),
      //   valueGetter: (params) => {
      //     return params.videoType;
      //   },
    },
    {
      headerName: "Destination Type",
      headerClassName: "header-styles",
      field: "destinationType",
      flex: 0.5,
      renderCell: (params) => (
        <Chip
          sx={{ height: "30px", marginLeft: "10px" }}
          label={
            params.value == "VideoView"
              ? "360° Image"
              : params.value == "ImageView"
              ? "Image"
              : params.value
          }
          color={
            params.value == "Link"
              ? "primary"
              : params.value == "Page"
              ? "secondary"
              : params.value == "VideoView"
              ? "error"
              : params.value == "PDF"
              ? "warning"
              : "success"
          }
        />
      ),
      //   valueGetter: (params) => {
      //     return params.position;
      //   },
    },
    {
      headerName: "Marker Position",
      headerClassName: "header-styles",
      field: "markerPosition",
      flex: 0.5,
      renderCell: (params) => {
        let s = params.row.markerPosition;
        if (s != null) {
          s = s.split(",");
          return Math.floor(Number(s[0])) + "," + Math.floor(Number(s[1]));
        } else return "";
      },
      //   valueGetter: (params) => {
      //     return params.position;
      //   },
    },
    {
      headerName: "Edit",
      headerClassName: "header-styles",
      field: "edit",
      flex: 0.2,
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
      flex: 0.2,
      renderCell: (params) => (
        <div>
          <img
            src={del}
            onClick={() => {
              // setIdToBeDeleted(params.id);
              // setPath("markers");
              deleteElement("markers", params.id);
              setShouldDelete(true);
            }}
          />
        </div>
      ),
    },
  ];

  function checkBackgroundUrl() {
    if (
      pages == undefined ||
      currentPageIndex == undefined ||
      pages[currentPageIndex] == undefined
    ) {
      Swal.fire("OOPS", "Please select a page from the side menu", "warning");
      return false;
    }

    if (
      pages[currentPageIndex].backgroundImage == null ||
      pages[currentPageIndex].backgroundImage == undefined
    ) {
      Swal.fire("OOPS", "Please upload the background image", "warning");
      return false;
    }

    if (
      pages[currentPageIndex].pageIcon == null ||
      pages[currentPageIndex].pageIcon == undefined
    ) {
      Swal.fire("OOPS", "Please upload the Page Icon", "warning");
      return false;
    } else {
      return true;
    }
  }

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
        <div className="main-div">
          <div>
            <NavBar token={tokens} />
          </div>

          <div className="container">
            <div className="sidemenu">
              <div className="sidemenu-item first-row">
                {projectId !== undefined ? (
                  // <h1> {projectName + " - " + `${projectId}`}</h1>
                  <h1>{toCamelCase(projectName) + "-" + `${projectId}`}</h1>
                ) : null}

                <div onClick={navigateProjectDetails}>
                  <img
                    src={edit}
                    alt="..."
                    style={{ cursor: "pointer", marginLeft: "2vw" }}
                  />
                </div>
              </div>

              <hr style={{ width: "90%", margin: "0 auto" }} />

              {pages.length > 0 ? (
                <div className="sidemenu-item">
                  {pages.map((e, index) => {
                    return (
                      <Router>
                        <ul
                          className=" page-list"
                          onClick={() => {
                            // setFontChange(true);
                            clickToggle(true);
                            setCurrentPageId(e.id);
                            setCurrentPageIndex(index);
                            console.log(index, "index of list item");
                            localStorage.setItem(localIndexString, index);
                          }}
                        >
                          {index == currentPageIndex ? (
                            <li className="page-list-items selected-list-item">
                              <div
                                style={{
                                  height: "24px",
                                  display: "flex",
                                  flexDirection: "row",
                                }}
                              >
                                {Number(e.id) === mainproject.homepage ? (
                                  <HomeIcon style={{ color: "white" }} />
                                ) : (
                                  <div
                                    style={{ width: "24px", height: "24px" }}
                                  ></div>
                                )}
                                <span className="side-menu-item-text">{`${toCamelCase(
                                  e.pageName
                                )} -${e.id}`}</span>
                              </div>
                              <DeleteIcon
                                style={{ color: "white", cursor: "pointer" }}
                                // style={{fontWeight:"normal"}}
                                onClick={() => {
                                  // setIdToBeDeleted(e.id);
                                  // setPath("pages");
                                  deleteElement("pages", e.id);
                                  setShouldDelete(true);
                                }}
                              />
                              {/* <img
                                style={{ cursor: "pointer" }}
                                src={del}
                                onClick={() => {
                                  setDeletePagePopUpActive(true);
                                  setDeletePageId(e.id);
                                }}
                              /> */}
                            </li>
                          ) : (
                            <li className="page-list-items">
                              <div
                                style={{
                                  height: "24px",
                                  display: "flex",
                                  flexDirection: "row",
                                }}
                              >
                                {/* <img
                                  style={{ cursor: "pointer" }}
                                  src={ */}
                                {Number(e.id) === mainproject.homepage ? (
                                  <HomeIcon />
                                ) : (
                                  <div
                                    style={{ width: "24px", height: "24px" }}
                                  ></div>
                                )}

                                <span
                                  style={{ padding: "3px 0 0 10px" }}
                                >{`${toCamelCase(e.pageName)} -${e.id}`}</span>
                              </div>
                              <DeleteIcon
                                style={{ cursor: "pointer" }}
                                onClick={() => {
                                  // setIdToBeDeleted(e.id);
                                  // setPath("pages");
                                  deleteElement("pages", e.id);
                                  setShouldDelete(true);
                                }}
                              />
                            </li>
                          )}
                        </ul>
                      </Router>
                    );
                  })}
                </div>
              ) : null}

              <hr style={{ width: "90%", margin: "0 auto" }} />

              <div
                className="sidemenu-item"
                onClick={() => {
                  CreatePage(editPageId, mainproject.pages.length);
                }}
              >
                <div className="btn-add new-page-btn">
                  <span>Create a new Page</span>
                  <img src={addimage} alt="..." />
                </div>
              </div>
            </div>

            {pages.length > 0 ? (
              <div className="side-container">
                <div className="side-container-item">
                  <div className="page-name-main-section">
                    <div className="first-row">
                      <label style={{ color: "#FE7300" }}>
                        {" "}
                        {pages[currentPageIndex] &&
                        pages[currentPageIndex].pageName
                          ? "Page Name: " +
                            toCamelCase(pages[currentPageIndex].pageName)
                          : "Page Name: NA"}
                        <img
                          src={edit}
                          alt="..."
                          style={{ cursor: "pointer", marginLeft: "1vw" }}
                          onClick={() => {
                            editPage(
                              pages[currentPageIndex].id,
                              pages[currentPageIndex].pageName
                            );
                            // setEditPagePopUpActive(true);
                          }}
                        />
                      </label>

                      <div className="first-row">
                        <button
                          className="btn-add"
                          onClick={() => {
                            if (checkBackgroundUrl() == true) {
                              navigateToPreivewPage();
                            }
                          }}
                        >
                          <span>
                            <img src={edit3} alt="..." className="play-img2" />
                          </span>
                          Preview
                        </button>
                        <button
                          className="btn-add"
                          onClick={() => {
                            if (checkBackgroundUrl() == true) {
                              setCurrentPageAsHomePage();
                            }
                          }}
                        >
                          <span>
                            <img
                              style={{ width: "20px", height: "20px" }}
                              src={homePageLoader ? loadinggif : edit3}
                              alt="..."
                              className="play-img2"
                            />
                          </span>
                          Set As Home Page
                        </button>
                      </div>
                    </div>

                    <div className="page-name-main-section-item">
                      <div>
                        <List
                          sx={{
                            width: "90%",
                            bgcolor: "background.paper",
                            display: "flex",
                            margin: "auto",
                            flexWrap: "wrap",
                          }}
                        >
                          <ListItem
                            alignItems="flex-start"
                            sx={{
                              backgroundColor: "#DFEBEE",
                              paddingTop: 0,
                              boxShadow: "1px 1px #888888",
                              border: "1px solid grey",
                              borderRadius: "3%",
                              width: "27%",
                              minWidth: 200,
                            }}
                          >
                            <ListItemAvatar>
                              {pages[currentPageIndex]?.backgroundImage !=
                              undefined ? (
                                fileTypeBeingUploaded == "backgroundImage" ? (
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
                                  <a
                                    href={
                                      pages[currentPageIndex]?.backgroundImage
                                        .url
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
                                        pages[currentPageIndex]?.backgroundImage
                                          .url
                                      }
                                    />
                                  </a>
                                )
                              ) : (
                                <label style={{ color: "#FE7300" }}></label>
                              )}
                            </ListItemAvatar>
                            <ListItemText
                              primary={
                                <div>
                                  <div
                                    style={{
                                      fontFamily: "Proxima Nova",
                                      fontWeight: "bold",
                                      color: "#3C4858",
                                      margin: "2px 0",
                                      fontSize: "15px",
                                    }}
                                  >
                                    Background Image
                                    <span style={{ color: "red" }}>*</span>
                                  </div>
                                </div>
                              }
                              secondary={
                                <React.Fragment>
                                  {fileTypeBeingUploaded ==
                                  "backgroundImage" ? (
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
                                          backgroundColor: "#EFEFEF",
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
                                        title="PNG,JPG,GIF Formats are supported, Maximum upload size is 20 MB, Dimensions- 1920x1080"
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
                                    </>
                                  )}
                                  <input
                                    onChange={(e) =>
                                      handleFileUploadInPage(
                                        e,
                                        "backgroundImage"
                                      )
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
                              backgroundColor: "#DFEBEE",
                              paddingTop: 0,
                              boxShadow: "1px 1px #888888",
                              border: "1px solid grey",
                              borderRadius: "3%",
                              width: "27%",
                              minWidth: 200,
                            }}
                          >
                            <ListItemAvatar>
                              {pages[currentPageIndex]?.pageIcon !=
                              undefined ? (
                                fileTypeBeingUploaded == "pageIcon" ? (
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
                                )
                              ) : (
                                <label style={{ color: "#FE7300" }}></label>
                              )}
                            </ListItemAvatar>
                            <ListItemText
                              primary={
                                <div>
                                  <div
                                    style={{
                                      fontFamily: "Proxima Nova",
                                      fontWeight: "bold",
                                      color: "#3C4858",
                                      marginTop: "2px",
                                      fontSize: "15px",
                                    }}
                                  >
                                    Page Icon
                                    <span style={{ color: "red" }}>*</span>
                                  </div>
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
                                    <>
                                      <Button
                                        sx={{
                                          backgroundColor: "#EFEFEF",
                                          width: 100,
                                          fontFamily: "Proxima Nova",
                                          color: "black",
                                          marginTop: "4px",
                                        }}
                                        variant="outlined"
                                        startIcon={<UploadIcon />}
                                        className="btn-up1"
                                        onClick={() =>
                                          pageIconRef.current.click()
                                        }
                                      >
                                        Upload
                                      </Button>
                                      <NewTooltip
                                        placement="bottom"
                                        arrow
                                        title="PNG,JPG,GIF Formats are supported, Maximum upload size is 20 MB, Dimensions- 50x50"
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
                                    </>
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
                              backgroundColor: "#DFEBEE",
                              paddingTop: 0,
                              boxShadow: "1px 1px #888888",
                              border: "1px solid grey",
                              borderRadius: "3%",
                              width: "27%",
                              minWidth: 200,
                            }}
                          >
                            <ListItemAvatar>
                              {pages[currentPageIndex]?.backgroundVideo !=
                              undefined ? (
                                fileTypeBeingUploaded == "backgroundVideo" ? (
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
                                  <a
                                    href={
                                      pages[currentPageIndex]?.backgroundVideo
                                        .url
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
                                        pages[currentPageIndex]?.backgroundVideo
                                          .url
                                      }
                                    />
                                  </a>
                                )
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
                                    fontSize: "15px",
                                  }}
                                >
                                  Background Video
                                </div>
                              }
                              secondary={
                                <React.Fragment>
                                  {fileTypeBeingUploaded ==
                                  "backgroundVideo" ? (
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
                                          backgroundColor: "#EFEFEF",
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
                                        title="MP4,FLV Formats are supported, Maximum upload size is 20 MB, Dimensions- 1920x1080 "
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
                                    </>
                                  )}
                                  <input
                                    onChange={(e) =>
                                      handleFileUploadInPage(
                                        e,
                                        "backgroundVideo"
                                      )
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
                </div>

                {/**********************************************VIDEO AREA CONTAINER**************************************************************/}
                <div className="side-container-item">
                  <div className="data-grid-section">
                    <div class="first-row">
                      <h1 style={{ color: "#FE7300" }}>Video Area</h1>

                      <button
                        className="btn-add"
                        onClick={() => {
                          if (checkBackgroundUrl() == false) {
                            setvideoAreaPopupOpen(false);
                          } else {
                            setvideoAreaPopupOpen(true);
                          }
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

                    <DataGrid
                      sx={{
                        height: "300px",
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

                {/****************************************************MARKER CONTAINER*****************************************************/}
                <div className="side-container-item">
                  <div className="data-grid-section">
                    <div class="first-row">
                      <h1 style={{ color: "#FE7300" }}>Marker Area</h1>

                      <button
                        className="btn-add"
                        onClick={() => {
                          if (checkBackgroundUrl() == false) {
                            setmarkerPopupOpen(false);
                          } else {
                            setmarkerPopupOpen(true);
                          }
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
                  </div>

                  <DataGrid
                    sx={{
                      height: "300px",
                      "& .MuiDataGrid-cell:hover": {
                        color: "primary.main",
                      },
                      ".MuiDataGrid-cell": {
                        paddingLeft: "15px",
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
            ) : (
              <div style={{ position: "fixed", top: "50%", left: "50%" }}>
                {" "}
                No Pages available, please create one from side menu.{" "}
              </div>
            )}
          </div>

          {pages[currentPageIndex] ? (
            <VideoUploadCard
              open={videoAreaPopupOpen}
              vdImgUrl={vdImgUrl}
              bckImgUrl={bckImgUrl}
              setOpen={setvideoAreaPopupOpen}
              pageId={pages[currentPageIndex]?.id}
              backgroundImage={
                pages[currentPageIndex] &&
                pages[currentPageIndex].backgroundImage
                  ? pages[currentPageIndex].backgroundImage
                  : null
              }
              project={projectName}
              projectId={projectId}
              isEditmode={mode}
              elementToBeEdited={elementToBeEdited}
            />
          ) : null}

          {pages[currentPageIndex] ? (
            <MarkerCard
              markerPopupOpen={markerPopupOpen}
              bckImgUrl={bckImgUrl}
              vdImgUrl={vdImgUrl}
              pageId={pages[currentPageIndex].id}
              pageName={pages[currentPageIndex].pageName}
              setmarkerPopupOpen={setmarkerPopupOpen}
              project={projectName}
              projectId={projectId}
              backgroundImage={
                pages[currentPageIndex] &&
                pages[currentPageIndex].backgroundImage
                  ? pages[currentPageIndex].backgroundImage
                  : null
              }
              isEditmode={mode}
              elementToBeEdited={elementToBeEdited}
            />
          ) : null}

          {/* <EditVideoPop open={editVideoAreaPopUp} token={token} vdImgUrl={vdImgUrl} setOpen={seteditVideoAreaPopUp} pageId={currentPagesId} editVideoId={editVideoId} pageName={pages[currentPageIndex] && pages[currentPageIndex].pageName ? pages[currentPageIndex].pageName : null} project={project} projectId={projectId} /> */}

          <ProjectPopUp
            open={opened}
            setOpen={setOpened}
            project={projectName}
            projectId={projectId}
          />
        </div>
      </>
    );
  }
};
export default AddPage;
