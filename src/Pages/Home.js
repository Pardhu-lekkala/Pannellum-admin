import React from "react";
import NavBar from "../Components/NavItem";
import "./Home.css";
import folder from "../Assets/Images/EmptyState.png";
import { useHistory } from "react-router";
import axios from "axios";
import { useState, useEffect } from "react";
import constants from "./constants";
import { ListItem } from "@material-ui/core";
import { fontWeight } from "@mui/system";
import Loader from "react-loader-spinner";
// import { DataGrid } from "@mui/x-data-grid";
import del from "../Assets/Images/delete.png";
import Swal from "sweetalert2";
import TextField from "@mui/material/TextField";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import {
  DataGrid,
  GridToolbarColumnsButton,
  GridToolbarDensitySelector,
  GridToolbarFilterButton,
} from "@mui/x-data-grid";
import { useDemoData } from "@mui/x-data-grid-generator";
import ClearIcon from "@mui/icons-material/Clear";
import SearchIcon from "@mui/icons-material/Search";
import { CopyToClipboard } from "react-copy-to-clipboard";

function escapeRegExp(value) {
  return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}

function QuickSearchToolbar(props) {
  return (
    <Box
      sx={{
        p: 0.5,
        pb: 0,
        justifyContent: "space-between",
        display: "flex",
        alignItems: "flex-start",
        flexWrap: "wrap",
      }}
    >
      <div style={{ marginTop: "7px" }}>
        <GridToolbarFilterButton />
        <GridToolbarColumnsButton />
        <GridToolbarDensitySelector />
      </div>
      <TextField
        variant="standard"
        value={props.value}
        onChange={props.onChange}
        placeholder="Search…"
        InputProps={{
          startAdornment: <SearchIcon fontSize="small" />,
          endAdornment: (
            <IconButton
              title="Clear"
              aria-label="Clear"
              size="small"
              style={{ visibility: props.value ? "visible" : "hidden" }}
              onClick={props.clearSearch}
            >
              <ClearIcon fontSize="small" />
            </IconButton>
          ),
        }}
        sx={{
          width: {
            xs: 1,
            sm: "auto",
          },
          m: (theme) => theme.spacing(1, 0.5, 1.5),
          "& .MuiSvgIcon-root": {
            mr: 0.5,
          },
          "& .MuiInput-underline:before": {
            borderBottom: 1,
            borderColor: "divider",
          },
        }}
      />
    </Box>
  );
}

QuickSearchToolbar.propTypes = {
  clearSearch: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

const Home = (props) => {
  console.log(props);
  const [shouldDelete, setShouldDelete] = useState(false);
  const [response, setResponse] = React.useState(null);
  const [firstTimeLoader, setFirstTimeLoader] = useState(false);
  const token = JSON.parse(localStorage.getItem("token"));
  const [deleteProjectActive, setDeleteProjectPopupActive] =
    React.useState(false);
  const [delProjectId, setDelProjectId] = React.useState(false);
  const [pageSize, setPageSize] = React.useState(5);

  const history = useHistory();
  console.log(token, "token era");

  if (token === undefined || token === "" || token === null) {
    history.push("/");
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

  function deleteProject() {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      showLoaderOnConfirm: true,
      //  showLoaderOnConfirm: true,
      preConfirm: (login) => {
        return new Promise(function (resolve, reject) {
          let urlpath =
            constants.ipaddress + "/" + "projects" + "/" + delProjectId;
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
              Swal.fire(
                "Deleted!",
                "Your file has been deleted.",
                "success"
              ).then((result) => {
                if (result.isConfirmed) {
                  window.location.reload();
                }
                console.log(result);
              });
            })
            .catch(function (error) {
              //            toastr.error('Error ');
              console.log(error);
              reject();
              Swal.fire("Oops", "Some error occurred", "error");
            });
        });
      },
      allowOutsideClick: () => !Swal.isLoading(),
    });
  }

  useEffect(() => {
    if (shouldDelete) {
      deleteProject();
    }
    setShouldDelete(false);
  }, [shouldDelete]);

  function navigateToCreateProject() {
    history.push({
      pathname: "/createproject",
      state: {
        token: token,
      },
    });
  }

  function naviagetToProjectDetails(projectName, id) {
    console.log("clicked on the image");
    console.log(token[0]);
    console.log(id);
    history.push({
      pathname: "/addpage",
      state: {
        accessCode: token[0],
        token: token[0],
        project: projectName,
        projectId: id,
      },
    });
  }

  const { data } = useDemoData({
    dataSet: "Commodity",
    rowLength: 100,
    maxColumns: 6,
  });

  const [projectList, setProjectList] = useState([]);
  const [searchText, setSearchText] = React.useState("");
  console.log(searchText, "this is the result");
  const [rows, setRows] = React.useState(projectList);

  const requestSearch = (searchValue) => {
    setSearchText(searchValue);
    const searchRegex = new RegExp(escapeRegExp(searchValue), "i");
    const filteredRows = projectList.filter((row) => {
      return Object.keys(row).some((field) => {
        return searchRegex.test(row[field]);
      });
    });
    setRows(filteredRows);
  };

  React.useEffect(() => {
    setRows(projectList);
  }, [projectList]);

  useEffect(() => {
    // fetch(constants.ipaddress + "/projects?_limit=8&_sort=published_at:ASC")
    fetch(constants.ipaddress + "/projects")
      .then((response) => response.json())
      .then((data) => {
        setProjectList(data);
        setFirstTimeLoader(true);
      });
  }, []);

  console.log(projectList, "PROJECT DATA");
  // console.clear();
  const columns = [
    {
      headerName: "Project Name",
      renderCell: (params) => (
        <div
          onClick={() => {
            naviagetToProjectDetails(params.value, params.id);
          }}
          style={{ width: "100%", cursor: "pointer" }}
        >
          <span className="header-styles-head">
            {toCamelCase(params.value)}
          </span>
        </div>
      ),
      field: "name",
      flex: 0.7,
      headerClassName: "header-styles-home",
    },

    {
      headerName: "No of pages",
      headerClassName: "header-styles-home",
      field: "pages",
      flex: 0.3,
      valueGetter: (params) => {
        return params.value.length;
      },
    },
    {
      headerName: "Login Screen",
      headerClassName: "header-styles-home",
      field: "photo",
      flex: 0.3,
      valueGetter: (params) => {
        console.log(params, "error params");
        if (params.getValue(params.id, "backgroundImage").url !== null) {
          return params.getValue(params.id, "backgroundImage").url;
        }
      },
      renderCell: (params) => (
        <img
          class="datagrid-img"
          src={params.value}
          style={{ width: 50, height: 50, borderRadius: "50%" }}
        />
      ),
    },
    {
      headerName: "Link",
      headerClassName: "header-styles-home",
      field: "accesscode",
      flex: 0.6,
      renderCell: (params) => (
        <div>
          {console.log(params.value, "11111111")}
          <CopyToClipboard text={`https://meta.eskoops.com/${params.value}`}>
            <Button
              variant="contained"
              onClick={() => {
                Swal.fire(
                  "Copied Development URL",
                  `https://meta.eskoops.com/${params.value}`,
                  "success"
                );
                // Swal.fire(
                //   `https://meta.eskoops.com/${params.value} is the copied development url`
                // );
              }}
              sx={{
                width: "40%",
                fontSize: "12px",
                marginRight: "10px",
                backgroundColor: "#dfebee",
                color: "black",
                border: "1px solid grey",
              }}
            >
              Development url
            </Button>
          </CopyToClipboard>
          <CopyToClipboard
            text={`https://meta.eskoops.com/static/${params.value}`}
          >
            <Button
              variant="contained"
              onClick={() => {
                Swal.fire({
                  icon: "warning",
                  html:
                    "<h1>Make Sure That Project Is Deployed!!</br>Copied Deployment URL..</h1>" +
                    `https://meta.eskoops.com/static/${params.value}`,
                  showCloseButton: true,
                  showCancelButton: true,
                  focusConfirm: false,
                  confirmButtonText: "Yes",
                  cancelButtonText: "Cancel",
                });
                // Swal.fire(
                //   "Make Sure That Project Is Deployed!!Copied Deployment URL..",
                //   `https://meta.eskoops.com/status/${params.value}`,
                //   "warning"
                // );
                // Swal.fire(
                //   `https://meta.eskoops.com/status/${params.value} is the copied deployment url`
                // );
              }}
              sx={{
                width: "38%",
                fontSize: "12px",
                backgroundColor: "#dfebee",
                color: "black",
                border: "1px solid grey",
              }}
            >
              Deployment url
            </Button>
          </CopyToClipboard>
        </div>
        // <div>
        //   <span className="header-styles-head">
        //     {params.value !== null
        //       ? `https://meta.eskoops.com/${params.value}`
        //       : `NA`}
        //   </span>
        // </div>
        // <div>
        //   <h1 className="header-styles-head">{`http://localhost:3000/home/${params.value}`}</h1>
        //   </div>
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
            style={{ cursor: "pointer" }}
            src={del}
            onClick={() => {
              // setDeleteProjectPopupActive(true);
              setDelProjectId(params.id);
              console.log(delProjectId, "before the delete function");
              // deleteProject();
              setShouldDelete(true);
            }}
          />
        </div>
      ),
    },
  ];

  if (firstTimeLoader == false) {
    return (
      <div style={{ position: "fixed", top: "50%", left: "50%" }}>
        <Loader type="TailSpin" color="#00BFFF" height={60} width={60} />
      </div>
    );
  }

  if (firstTimeLoader == true && projectList.length == 0) {
    return (
      <div class="page">
        <div></div>
        <div className="main-cont1">
          <h1 className="head1">No projects are available</h1>
          <img src={folder} className="img1" />
          <p className="para1">Start creating a new project</p>
          <div onClick={navigateToCreateProject}>
            <button className="btn1">Create a new project</button>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div class="page">
        <div>
          <NavBar
            token={token}
            displayViewProject={false}
            displayBackButton={false}
          />
        </div>
        <div
          style={{
            width: "50vw",
            marginLeft: "16vw",
            // display: "flex",
            // flexDirection: "row",
            // justifyContent: "center",
          }}
        >
          <h1 className="vd-tx2">Select project from the list</h1>
        </div>
        <div
          style={{
            height: "75vh",
            width: "70vw",
            marginLeft: "auto",
            marginRight: "auto",
            // overflowX: "visible",
          }}
        >
          <DataGrid
            sx={{
              "& .MuiDataGrid-cell:hover": {
                color: "primary.main",
                overflow: "visible",
                width: "100%",
              },
              // "&scrollbar-hidden::-webkit-scrollbar": {
              //   display: "none",
              // },
            }}
            components={{ Toolbar: QuickSearchToolbar }}
            rows={rows}
            columns={columns}
            // style={{ cursor: "pointer" }}
            // autoPageSize={true}
            pageSize={25}
            rowHeight={65}
            // rowsPerPageOptions={[5,10,15,30,45]}
            // paging={true}
            // make initial page size
            // emptyRowsWhenPaging= {false}
            pageSize={pageSize}
            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            rowsPerPageOptions={[5, 10, 15, 20, 25]}
            pagination
            disableSelectionOnClick={true}
            componentsProps={{
              toolbar: {
                value: searchText,
                onChange: (event) => requestSearch(event.target.value),
                clearSearch: () => requestSearch(""),
              },
            }}

            // onCellClick={}
            // onCellClick={(params) => {
            //   naviagetToProjectDetails(params.value, params.id);
            // }}
          />
        </div>
      </div>
    );
  }
  // else {
  //   return (
  //     <div class="page" >
  //       <div>
  //         <NavBar token={token} />
  //       </div>

  //       <div class="flex-container">
  //         {projectList.map((item, index) => {
  //           return (
  //             <div class="flex-items" >
  //               <h1 class="text">
  //                 Conference {index + 1}
  //               </h1>
  //               <div style={{ textAlign: "center" }} onClick={() => { naviagetToProjectDetails(index) }}>
  //                 <img style={{ width: 275, height: 250, }} src={item.backgroundImage.url} alt={item.backgroundImage.alternativeText}>
  //                   {/* <img style={{width:275, height:250,}} src="" alt=""> */}
  //                 </img>
  //               </div>
  //               <div class="text">
  //                 <div style={{ color: "#33587b", fontWeight: "600", marginBottom: "5px" }}>Access Code: <span style={{ color: '#002e5a', fontWeight: "bold" }}>{item.accesscode}</span></div>
  //                 <div style={{ color: "#33587b", fontWeight: "600", marginBottom: "5px" }}>Number of Pages in the Project: <span style={{ color: '#002e5a', fontWeight: "bold" }}>{item.pages.length}</span></div>
  //                 <div style={{ color: "#33587b", fontWeight: "600", marginBottom: "5px" }}>Marker Color: <span style={{ color: '#002e5a', fontWeight: "bold" }}>{item.markerColor}</span></div>
  //               </div>
  //             </div>
  //           )
  //         })}
  //       </div>
  //     </div>

  //   )

  // }
};
export default Home;
