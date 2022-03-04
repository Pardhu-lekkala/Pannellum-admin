import React, { useState } from "react";
import NavBar from "../NavItem";
import areaimage from "../../Assets/Images/vdarea.png";
import "./video.css";
import VideoPlayer from "../VideoPlayer";
import DrawRectangle from "../DrawRectangle";
import axios from "axios";
import { useHistory } from "react-router";
import constants from "../../Pages/constants";
import Loader from "react-loader-spinner";

import IconButton from "@material-ui/core/IconButton";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

const AddVideoArea = (props) => {
  console.log("praveen");

  const history = useHistory();
  const pageId = props.location.state.pageId;
  console.log(pageId);

  const linkType = props.location.state.linkType;
  console.log("link type is going as " + linkType);

  const videoLink = props.location.state.videoLink;
  console.log(pageId);

  // console.log(token,"this is token from props")

  const token = JSON.parse(localStorage.getItem("token"));
  console.log(token, "this is token from local storage");

  const isEditmode = props.location.state.isEditmode;
  console.log(isEditmode, "editmode");

  const videoId = props.location.state.id;

  const backgroundURL = props.location.state.backgroundURL;
  const backgroundWidth = props.location.state.backgroundWidth;
  const backgroundHeight = props.location.state.backgroundHeight;

  const [markUpdate, setMarkUpdate] = React.useState(false);
  const [click, setClick] = React.useState(false);
  const [x, setx] = useState(null);
  const [y, sety] = useState(null);
  const rightCor = x + 20;
  const bottomCor = y + 20;

  const [coordinates, setCoordinates] = React.useState({
    x1: 100,
    y1: 100,
    x2: 200,
    y2: 200,
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

  function postVideoArea() {
    let method = "POST";
    let url = constants.ipaddress + "/video-areas";

    var formData = new FormData();
    var params = {
      page: pageId,
      videoType: linkType,
      videoURL: videoLink,
      position:
        "" +
        coordinates.x1 +
        "," +
        coordinates.y1 +
        "," +
        coordinates.x2 +
        "," +
        coordinates.y2,
    };
    formData.append("data", JSON.stringify(params));

    if (isEditmode) {
      method = "PUT";
      url = constants.ipaddress + "/video-areas/" + videoId;
    }

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
        console.log(response);
        navigatetoAddPage();
      })
      .catch(function (response) {
        console.log(response);
      });
  }

  function onMouseMove(e) {
    setx(e.screenX);
    sety(e.screenY);
  }
  console.log(x, y, "coordinates");

  return (
    <>
      <video
        poster={backgroundURL}
        style={{
          objectFit: "fill",
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        }}
        autoPlay
        muted
        loop
      ></video>
      {/* <NavBar /> */}
      <IconButton
        onClick={() => {
          history.goBack();
        }}
        style={{ color: "white" }}
      >
        <ArrowBackIcon />
      </IconButton>

      <button
        style={{ zIndex: 999, position: "fixed", top: 0, right: 0 }}
        className="sv-btn"
        onClick={() => {
          postVideoArea();
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

      <DrawRectangle
        coordinates={coordinates}
        setCoordinates={convertFromViewPortToImageCordinates}
      />
    </>
  );
};
export default AddVideoArea;
