import React, { useRef } from "react";
import NavBar from "../../Components/NavItem";
import SideBar from "../../Components/NavItem/SideBar";
import "./index.css";
import edit from "../../Assets/Images/Vector.png";
import edit2 from "../../Assets/Images/edit2.png";
import { useHistory } from "react-router";
import ProjectPopUp from "../../Components/ProjectPop";
import { useState } from "react";
import Swal from "sweetalert2";
import constants from "../constants";
import axios from "axios";

const CreateNewPage = (props) => {
  console.log(props.location.state.projectId, "mainproid");
  const project = props.location.state.project;
  const accessCode = props.location.state.accessCode;
  const token = JSON.parse(localStorage.getItem("token"));
  const projectId = props.location.state.projectId;
  const isNewPageCreated = props.location.state.isNewPageCreated;
  const pagesLength = props.location.state.pagesLength;

  const [open, setmarkerPopupOpen] = useState(false);
  console.log(token, "tokenjwt");
  console.log(pagesLength, "console from create new page");
  let localIndexString = "local-index";

  const history = useHistory();

  function navigateAddPage(pageName, pageId) {
    history.push({
      pathname: "/addpage",
      state: {
        project: project,
        accessCode: accessCode,
        projectId: projectId,
        pageName: pageName,
        pageId: pageId,
        isNewPageCreated: isNewPageCreated,
      },
    });
  }

  /**************************************************SWEET ALERT FOR CREATE PAGE**************************************************************************** */
  function CreatePage(editPageId, currentPageName) {
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
                Swal.fire(
                  "Done",
                  "Your Page Created Successfully",
                  "success"
                ).then((result) => {
                  console.log(response, "editresponse");
                  if (result.isConfirmed) {
                    localStorage.setItem(localIndexString, pagesLength);
                    navigateAddPage(response.pageName, response.data.id);
                  }
                  console.log(result);
                });
              })
              .catch(function (response) {
                console.log(response);
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
    // .then((result) => {
    //   if (result.isConfirmed) {
    //     if (result.value == undefined || result.value.length == 0) {
    //       console.log("eeee");
    //       Swal.fire("OPPS", "Enter a valid Page name", "warning");
    //       return false;
    //     }
    //     console.log(result.value, "this is result");
    //     let urlpath = constants.ipaddress + "/" + "pages" + "/" + editPageId;
    //     console.log("path is" + urlpath);
    //     var formData = new FormData();
    //     formData.append(
    //       "data",
    //       JSON.stringify({
    //         project: projectId,
    //         pageName: result.value,
    //       })
    //     );

    //     axios({
    //       method: "post",
    //       url: constants.ipaddress + "/pages",
    //       data: formData,
    //       headers: {
    //         "Content-Type": "multipart/form-data",
    //         Authorization: "Bearer" + " " + token,
    //       },
    //     })
    //       .then(function (response) {
    //         // setResponse(response);
    //         // setOpen(false, true);
    //         Swal.fire("Done", "Your Page Created Successfully", "success").then(
    //           (result) => {
    //             console.log(response, "editresponse");
    //             if (result.isConfirmed) {
    //               localStorage.setItem(localIndexString, pagesLength);
    //               navigateAddPage(response.pageName, response.data.id);
    //             }
    //             console.log(result);
    //           }
    //         );
    //       })
    //       .catch(function (response) {
    //         console.log(response);
    //         Swal.fire("OOPS!", "Something went wrong", "error").then(
    //           (result) => {
    //             if (result.isConfirmed) {
    //               window.location.reload();
    //             }
    //             console.log(result);
    //           }
    //         );
    //       });
    //   }
    // });
  }

  /*************************************************************************************************************************** */

  return (
    <>
      <div className="cstm-main-cont">
        <div>
          <NavBar backProp={true} />
        </div>

        <div className="new-main-cont">
          <div className="head-new-cont">
            <h1 className="new-head">
              Lets start by adding Pages to your Project "{project} "{" "}
            </h1>
          </div>
          <button className="new-btn" onClick={() => CreatePage()}>
            Create Newpage
          </button>
        </div>
      </div>
      {/* <ProjectPopUp
        open={open}
        setOpen={setmarkerPopupOpen}
        project={project}
        accessCode={accessCode}
        projectId={projectId}
        isNewPageCreated={isNewPageCreated}
        pagesLength={pagesLength}

      /> */}
    </>
  );
};
export default CreateNewPage;
