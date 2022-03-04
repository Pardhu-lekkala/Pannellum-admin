import React, { useState } from "react";
import NavBar from "../NavItem";
import areaimage from "../../Assets/Images/vdarea.png";
import "./marker.css";
// import Button from "@mui/material/Button";

import VideoPlayer from "../VideoPlayer";
import DrawMarker from "../DrawMarker";
import axios from "axios";
import { useHistory } from "react-router";
import constants from "../../Pages/constants";
import Loader from "react-loader-spinner";
import { Pannellum } from "pannellum-react";
import { useMousePosition } from "../positions";
import { useEffect } from "react";
// import IconButton from "@material-ui/core/IconButton";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { useRef } from "react";

const AddMarker = (props) => {
  console.log("praveen");
  const position = useMousePosition();
  console.log(position.x, position.y, "these are x & y cord");

  const history = useHistory();
  const [hexOpen, setHexOpen] = React.useState(false);
  const TransVideo = props.location.state.TransVideo;
  const token = JSON.parse(localStorage.getItem("token"));
  const markerName = props.location.state.markerName;
  const markerLabel = props.location.state.markerLabel;
  const page = props.location.state.pageId;
  const destinationLink = props.location.state.destinationLink;
  const destinationType = props.location.state.destinationType;
  const VisibileLabel = props.location.state.VisibileLabel;
  const projectId = props.location.state.projectId;
  const markerId = props.location.state.markerId;
  const destinationPageId = props.location.state.destinationPage;
  console.log(destinationType, "this des type");
  console.log(destinationLink, "this is bckimg link");
  const isEditMode = props.location.state.isEditMode;
  const backgroundURL = props.location.state.backgroundURL;

  const backgroundWidth = props.location.state.backgroundWidth;
  const backgroundHeight = props.location.state.backgroundHeight;

  const [markUpdate, setMarkUpdate] = React.useState(false);
  const [click, setClick] = React.useState(false);

  const [x, setx] = useState(null);
  const [y, sety] = useState(null);
  const [yaw, setYaw] = React.useState(0);
  const [pitch, setPitch] = React.useState(0);
  console.log(pitch, yaw, "these are 360 coordinates");
  console.log(x, y, "state cors");
  const panImage = React.useRef(null);

  const prevX = useRef("");
  const prevY = useRef("");
  useEffect(() => {
    prevX.current = x;
    prevY.current = y;
  }, [x, y]);

  console.log(prevX.current, prevY.current, "prev cors");

  const [coordinates, setCoordinates] = React.useState({
    x1: 100,
    y1: 100,
    x2: 103,
    y2: 110,
  });

  React.useEffect(() => {
    console.log("Inside Video Popup");
  }, [props]);

  function navigatetoAddPage() {
    history.goBack();
  }

  function convertFromViewPortToImageCordinates(vwCoordinates) {
    const { x1, y1, x2, y2 } = vwCoordinates;
    const makrw1 = x1;
    const makrh1 = y1;
    const makrw2 = x2;
    const makrh2 = y2;

    let width = Math.max(
      document.documentElement.clientWidth,
      window.innerWidth || 0
    );
    let height = Math.max(
      document.documentElement.clientHeight,
      window.innerHeight || 0
    );

    let neww1 = (makrw1 / width) * backgroundWidth;
    let newh1 = (makrh1 / height) * backgroundHeight;
    let neww2 = (makrw2 / width) * backgroundWidth;
    let newh2 = (makrh2 / height) * backgroundHeight;

    setCoordinates({ x1: neww1, y1: newh1, x2: neww2, y2: newh2 });
  }

  function postMarker() {
    var formData = new FormData();
    let method = "POST";
    let url = constants.ipaddress + "/markers";

    if (isEditMode) {
      method = "PUT";
      url = url + "/" + markerId;
    }

    if (TransVideo != "") {
      if (typeof TransVideo == "object")
        formData.append("files.TransVideo", TransVideo);
    }

    // if (destinationType !== "VideoView") {
    //   formData.append(
    //     "markerPosition",
    //     "" + coordinates.x1 + "," + coordinates.y1
    //   );
    // }

    // if (destinationType === "VideoView") {
    //   formData.append("markerPosition", "" + pitch + "," + yaw);
    // }

    let dataParams = {
      markerName: markerName,
      page: page,
      markerLabel: markerLabel,
      destinationLink: destinationLink,
      destinationType: destinationType,
      VisibileLabel: VisibileLabel,
      markerPosition: "" + pitch + "," + yaw,
      // destinationType !== "VideoView"
      //   ? "" + coordinates.x1 + "," + coordinates.y1
    };

    if (destinationPageId != "") {
      dataParams["destinationPage"] = destinationPageId;
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
        navigatetoAddPage();
        console.log(response, "this is marker response");
      })
      .catch(function (response) {
        console.log(response);
      });
  }

  return (
    <>
      <div
        id="test"
        onClick={() => {
          setx(position.x);
          sety(position.y);
        }}
      >
        <Pannellum
          id="panellum"
          width="100%"
          height="100vh"
          ref={panImage}
          //image={destinationLink}
          image="https://demo.sirv.com/panoramas/chinatown.jpg"
          hotSpotDebug={true}
          //handleClick={(evt, name) => getValues()}
          //image="https://conference-project-db.s3.amazonaws.com/Lobby_JPEG_587036c164.jpg"
          yaw={180}
          hfov={110}
          maxHfov={170}
          minHfov={30}
          autoLoad
          autoRotate={2}
          getViewer={true}
          //preview="https://upload.wikimedia.org/wikipedia/commons/1/14/Background_brick_wall.jpg"
          orientationOnByDefault={false}
          mouseEventToCoords={true}
          //autoRotateInactivityDelay={1}
          compass
          draggable
          keyboardZoom
          mouseZoom
          showControls={false}
          showFullscreenCtrl={false}
          showZoomCtrl
          onMouseup={(event) => {
            console.log(
              panImage.current.getViewer().mouseEventToCoords(event),
              "coorevents"
            );
            setPitch(panImage.current.getViewer().mouseEventToCoords(event)[0]);
            setYaw(panImage.current.getViewer().mouseEventToCoords(event)[1]);
          }}
        />
        <button
          onClick={() => {
            history.goBack();
          }}
          style={{
            zIndex: 999,
            position: "fixed",
            top: 30,
            left: 30,
            width: 60,
          }}
        >
          <ArrowBackIcon />
        </button>
        <button
          style={{
            zIndex: 999,
            position: "fixed",
            top: click == false ? position.y : prevY.current,
            left: click == false ? position.x : prevX.current,
            width: 20,
            height: 20,
            borderRadius: 25,
            backgroundColor: "#5c0227",
            borderColor: "#f56720",
            borderStyle: "solid",
            borderWidth: "2px",
          }}
        ></button>
        <button
          style={{ zIndex: 999, position: "fixed", top: 0, right: 0 }}
          className="sv-btn"
          onClick={() => {
            postMarker();
            setClick(true);
          }}
        >
          {markUpdate === false && click == false ? (
            "Save"
          ) : (
            <Loader
              type="TailSpin"
              color="#00BFFF"
              height={20}
              width={20}
              visible={true}
            />
          )}
        </button>
        {/* https://pannellum.org/images/alma.jpg */}
        {/* <DrawMarker
            coordinates={coordinates}
            setCoordinates={convertFromViewPortToImageCordinates}
          /> */}
      </div>
      )
    </>
  );
};
export default AddMarker;
{
  /************************************Not Pannnellum******************************************************************** */
}

// import React, { useState } from "react";
// import NavBar from "../NavItem";
// import areaimage from "../../Assets/Images/vdarea.png";
// import "./marker.css";
// // import Button from "@mui/material/Button"

// import VideoPlayer from "../VideoPlayer";
// import DrawMarker from "../DrawMarker";
// import axios from "axios";
// import { useHistory } from "react-router";
// import constants from "../../Pages/constants";
// import Loader from "react-loader-spinner";
// import { Pannellum } from "pannellum-react";

// // import IconButton from "@material-ui/core/IconButton";
// import ArrowBackIcon from "@material-ui/icons/ArrowBack";

// const AddMarker = (props) => {
//   console.log("praveen");

//   const history = useHistory();

//   const [hexOpen, setHexOpen] = React.useState(false);
//   const TransVideo = props.location.state.TransVideo;
//   const token = JSON.parse(localStorage.getItem("token"));
//   const markerName = props.location.state.markerName;
//   const markerLabel = props.location.state.markerLabel;
//   const page = props.location.state.pageId;
//   const destinationLink = props.location.state.destinationLink;
//   const destinationType = props.location.state.destinationType;
//   const VisibileLabel = props.location.state.VisibileLabel;
//   const projectId = props.location.state.projectId;
//   const markerId = props.location.state.markerId;
//   const destinationPageId = props.location.state.destinationPage;
//   console.log(destinationType, "this des type");
//   console.log(destinationLink, "this is bckimg link");
//   const isEditMode = props.location.state.isEditMode;
//   const backgroundURL = props.location.state.backgroundURL;
//   console.log(VisibileLabel, "switch");

//   const backgroundWidth = props.location.state.backgroundWidth;
//   const backgroundHeight = props.location.state.backgroundHeight;

//   const [markUpdate, setMarkUpdate] = React.useState(false);
//   const [click, setClick] = React.useState(false);
//   const [x, setx] = useState(null);
//   const [y, sety] = useState(null);
//   const [yaw, setYaw] = React.useState(0);
//   const [pitch, setPitch] = React.useState(0);
//   console.log(pitch, yaw, "these are 360 coordinates");
//   const panImage = React.useRef(null);
//   const rightCor = x + 20;
//   const bottomCor = y + 20;

//   const [coordinates, setCoordinates] = React.useState({
//     x1: 100,
//     y1: 100,
//     x2: 103,
//     y2: 110,
//   });

//   React.useEffect(() => {
//     console.log("Inside Video Popup");
//   }, [props]);

//   function navigatetoAddPage() {
//     history.goBack();
//   }

//   function convertFromViewPortToImageCordinates(vwCoordinates) {
//     const { x1, y1, x2, y2 } = vwCoordinates;
//     const makrw1 = x1;
//     const makrh1 = y1;
//     const makrw2 = x2;
//     const makrh2 = y2;

//     let width = Math.max(
//       document.documentElement.clientWidth,
//       window.innerWidth || 0
//     );
//     let height = Math.max(
//       document.documentElement.clientHeight,
//       window.innerHeight || 0
//     );

//     let neww1 = (makrw1 / width) * backgroundWidth;
//     let newh1 = (makrh1 / height) * backgroundHeight;
//     let neww2 = (makrw2 / width) * backgroundWidth;
//     let newh2 = (makrh2 / height) * backgroundHeight;

//     setCoordinates({ x1: neww1, y1: newh1, x2: neww2, y2: newh2 });
//   }

//   function postMarker() {
//     var formData = new FormData();
//     let method = "POST";
//     let url = constants.ipaddress + "/markers";

//     if (isEditMode) {
//       method = "PUT";
//       url = url + "/" + markerId;
//     }

//     if (TransVideo != "") {
//       if (typeof TransVideo == "object")
//         formData.append("files.TransVideo", TransVideo);
//     }

//     // if (destinationType !== "VideoView") {
//     //   formData.append(
//     //     "markerPosition",
//     //     "" + coordinates.x1 + "," + coordinates.y1
//     //   );
//     // }

//     // if (destinationType === "VideoView") {
//     //   formData.append("markerPosition", "" + pitch + "," + yaw);
//     // }

//     let dataParams = {
//       markerName: markerName,
//       page: page,
//       markerLabel: markerLabel,
//       destinationLink: destinationLink,
//       destinationType: destinationType,
//       VisibileLabel: VisibileLabel,
//       markerPosition: "" + coordinates.x1 + "," + coordinates.y1,
//     };

//     if (destinationPageId != "") {
//       dataParams["destinationPage"] = destinationPageId;
//     }

//     formData.append("data", JSON.stringify(dataParams));
//     axios({
//       method: method,
//       url: url,
//       data: formData,
//       headers: {
//         "Content-Type": "multipart/form-data",
//         Authorization: "Bearer" + " " + token,
//       },
//     })
//       .then(function (response) {
//         navigatetoAddPage();
//         console.log(response, "this is marker response");
//       })
//       .catch(function (response) {
//         console.log(response);
//       });
//   }
//   function onMouseMove(e) {
//     setx(e.screenX);
//     sety(e.screenY);
//   }
//   console.log(x, y, "coordinates");

//   return (
//     <>
//       <div>
//         <video
//           poster={backgroundURL}
//           style={{
//             objectFit: "fill",
//             position: "fixed",
//             top: 0,
//             left: 0,
//             width: "100%",
//             height: "100%",
//           }}
//           autoPlay
//           muted
//           loop
//         ></video>
//         {/* <NavBar /> */}
//         <button
//           onClick={() => {
//             history.goBack();
//           }}
//           style={{
//             zIndex: 999,
//             position: "fixed",
//             top: 30,
//             left: 30,
//             width: 60,
//           }}
//         >
//           <ArrowBackIcon />
//         </button>

//         <button
//           style={{ zIndex: 999, position: "fixed", top: 0, right: 0 }}
//           className="sv-btn"
//           onClick={() => {
//             postMarker();
//             setClick(true);
//           }}
//         >
//           {markUpdate === false && click == false ? (
//             "Save"
//           ) : (
//             <Loader
//               type="TailSpin"
//               color="#00BFFF"
//               height={20}
//               width={20}
//               visible={true}
//             />
//           )}
//         </button>
//         <DrawMarker
//           coordinates={coordinates}
//           setCoordinates={convertFromViewPortToImageCordinates}
//         />
//       </div>
//       )
//     </>
//   );
// };
// export default AddMarker;
