import React from "react";

//import { connect } from "react-redux";

import useStyles from "../../useStylesPage";
import "./preview.css";
import useWindowDimensions from "../../useWindowDimensions";
import Fab from "@material-ui/core/Fab";
//import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";
import CloseIcon from "@material-ui/icons/Close";
import ChatBubbleIcon from "@material-ui/icons/ChatBubble";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useHistory } from "react-router";
import { useEffect } from "react";
import Button from "@mui/material/Button";
import { Pannellum } from "pannellum-react";

import { withStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

//import { BiArrowBack } from "react-icons/bi";
//import { BsChevronCompactDown } from "react-icons/bs";
//import { HiOutlineUser } from "react-icons/hi";

import ReactPlayer from "react-player";

function updatePointer2(makrw, makrh, imagew, imageh) {
  let width = Math.max(
    document.documentElement.clientWidth,
    window.innerWidth || 0
  );
  let height = Math.max(
    document.documentElement.clientHeight,
    window.innerHeight || 0
  );
  console.log(height, "height");

  const neww = (makrw / imagew) * width;
  const newh = (makrh / imageh) * height;
  let obj = { X: neww, Y: newh };
  console.log(newh, "222");

  const radiusw = (22 / imagew) * width;
  const radiush = (22 / imageh) * height;
  console.log(
    `${(obj.Y ^ 0) - radiush}px`,
    `${(obj.X ^ 0) - radiusw}px`,
    "res vals"
  );
  return {
    top: `${(obj.Y ^ 0) - radiush}px`,
    left: `${(obj.X ^ 0) - radiusw}px`,
  };
}

function getVimeoId(url) {
  // Look for a string with 'vimeo', then whatever, then a
  // forward slash and a group of digits.
  var match =
    /(https?:\/\/)?(www\.)?(player\.)?vimeo\.com\/([a-z]*\/)*([0-9]{6,11})[?]?.*/.exec(
      url
    );

  // If the match isn't null (i.e. it matched)
  if (match) {
    // The grouped/matched digits from the regex
    return match[match.length - 1];
  } else {
    return null;
  }
}

function PreviewPage(props, match) {
  // console.log(history);
  const history = useHistory();
  //const scrollRef = React.useRef(null);
  const [pages, setPages] = React.useState();
  const [project, setProject] = React.useState(null);
  const [currentpage, setCurrentPage] = React.useState(null);

  const [tooltipIsOpen, setTooltipIsOpen] = React.useState(true);
  const [LabelIsOpen, setLabelIsOpen] = React.useState(true);
  const [url, setUrl] = React.useState("");

  const isHover = false;

  const primaryColor = "";
  const secondaryColor = "";

  const classes = useStyles();

  function navigatetoAddPage() {
    history.goBack();
  }

  const NewTooltip = withStyles({
    tooltip: {
      color: project?.secondaryColor,
      backgroundColor: project?.primaryColor,
    },
    arrow: {
      color: project?.secondaryColor,
    },
  })(Tooltip);

  function updatePointer(makrw1, makrh1, makrw2, makrh2, imagew, imageh) {
    let width = Math.max(
      document.documentElement.clientWidth,
      window.innerWidth || 0
    );
    let height = Math.max(
      document.documentElement.clientHeight,
      window.innerHeight || 0
    );
    //let imagew = 1920;
    //let imageh = 1080;
    //console.log(imagew, imageh)
    // console.log(makrw1, makrh2);

    // console.log(width + " screen width " + height);

    // console.clear();
    // console.log(width, height);

    let neww1 = (makrw1 / imagew) * width;
    let newh1 = (makrh1 / imageh) * height;
    let neww2 = (makrw2 / imagew) * width;
    let newh2 = (makrh2 / imageh) * height;

    let obj = { X1: neww1, Y1: newh1, X2: neww2, Y2: newh2 };

    const coordinates = {
      Y1: `${(obj.Y1 ^ 0) - 12}px`,
      X1: `${(obj.X1 ^ 0) - 12}px`,
      Y2: `${(obj.Y2 ^ 0) - 12}px`,
      X2: `${(obj.X2 ^ 0) - 12}px`,
    };

    // console.log(coordinates);

    //<div class="marker1" style="position: absolute; top: 86px; left: 673px; width: 10px; height: 10px; background: rgb(255, 0, 0);"></div>

    return {
      ...coordinates,
      width: (obj.X2 ^ 0) - 12 - ((obj.X1 ^ 0) - 12),
      height: (obj.Y2 ^ 0) - 12 - ((obj.Y1 ^ 0) - 12),
      /* width: (obj.X2 ^ 0) - 12 - ((obj.X1 ^ 0) - 12),
      height: (obj.Y2 ^ 0) - 12 - ((obj.Y1 ^ 0) - 12), */
    };
  }

  const { height, width } = useWindowDimensions();

  // This ref is connected to the BG
  const BGRef = React.useRef();

  // The size of the BG // It will be updated later
  const [BGwidth, setBGWidth] = React.useState();
  const [BGheight, setBGHeight] = React.useState();

  // This function calculates width and height of the BG
  const getBGSize = () => {
    const newWidth = BGRef?.current?.clientWidth;
    setBGWidth(newWidth);

    const newHeight = BGRef?.current?.clientHeight;
    setBGHeight(newHeight);
    //console.log("CALCULATING NEW DIM.", { width: newWidth, height: newHeight });
  };

  // Get 'width' and 'height' after the initial render and every time the window height/width changes
  // React.useEffect(() => {
  //   getBGSize();
  // }, [height, width]);

  React.useEffect(() => {
    let project = props.location.state.project;
    let page_index = props.location.state.pageindex;

    console.log("Preview page use effect called" + page_index);
    setPages(project.pages);
    setProject(project);
    setCurrentPage(project.pages[page_index]);
    console.log(project.pages, "these are pages in use effect");
    getBGSize();
    console.log("height calculated");

    {
      /*if (match?.params?.pageId) {
      const p = pages?.find((e) => +e.id === +match.params.pageId);
      p ? setPage(p) : setPage(null);
    }*/
    }
  }, [props, height, width]);

  const [isChatOpen, setChatOpen] = React.useState(true);
  const [hideChatSpinner, setHideChatSpinner] = React.useState(false);

  function hotspotIcon(hotSpotDiv, args) {
    hotSpotDiv.classList.add("custom-tooltip");
    var span = document.createElement("span");
    span.innerHTML = args;
    hotSpotDiv.appendChild(span);
    span.style.width = span.scrollWidth - 20 + "px";
    span.style.marginLeft =
      -(span.scrollWidth - hotSpotDiv.offsetWidth) / 2 + "px";
    span.style.marginTop = -span.scrollHeight - 12 + "px";
  }

  if (project == null) {
    console.log("in the render null");
    return null;
  }
  return (
    <>
      <>
        {console.log("in the render")}
        <Pannellum
          id="panellum"
          width="100%"
          //ref={panImage}
          height="100vh"
          image="https://demo.sirv.com/panoramas/chinatown.jpg"
          //image="https://thumbs.dreamstime.com/z/minsk-belarus-december-full-degree-panorama-equirectangular-spherical-projection-shop-stylish-shoes-vr-content-138851430.jpg"
          hotSpotDebug={true}
          yaw={180}
          hfov={110}
          maxHfov={170}
          minHfov={30}
          autoLoad
          autoRotate={2}
          getViewer={true}
          orientationOnByDefault={false}
          mouseEventToCoords={true}
          compass
          draggable
          keyboardZoom
          mouseZoom
          showControls={false}
          showFullscreenCtrl={false}
          showZoomCtrl={false}
          // onMouseup={(event) => {
          //   setPitch(
          //     panImage.current.getViewer().mouseEventToCoords(event)[0]
          //   );
          //   setYaw(panImage.current.getViewer().mouseEventToCoords(event)[1]);
          // }}
        >
          {currentpage?.markers?.map((item, index) => {
            console.log("Going inside the map for markers rendering");

            return (
              <Pannellum.Hotspot
                type="custom"
                cssClass="custom-hotspot"
                tooltip={hotspotIcon}
                createTooltipFunc={hotspotIcon}
                createTooltipArgs={item.markerLabel}
                text={item.markerLabel}
                pitch={item.markerPosition.split(",")[0]}
                yaw={item.markerPosition.split(",")[1]}
                name="hs1"
                handleClick={(evt, name) => {
                  if (item.destinationType === "PDF") {
                    setUrl(item.destinationLink);
                    //setPdfOpen(true);
                    //pdfAlert(item.destinationLink);
                    //handleClickOpen(item.destinationLink);
                  } else if (item.destinationType === "VideoView") {
                    setUrl(item.destinationLink);
                    localStorage.setItem("videoUrl", item.destinationLink);
                    history.push({
                      pathname: "/roundme",
                    });
                  } else if (item.destinationType === "Link") {
                    window.open(item.destinationLink);
                  } else if (item.destinationType === "ImageView") {
                    //console.log(item.destinationType, "immmm");
                    setUrl(item.destinationLink);
                    //imagetAlert(item.destinationLink);
                  }
                  // else {
                  //   setLabelIsOpen(false);
                  //   setTooltipIsOpen(false);
                  //   item.TransVideo
                  //     ? setVideoNo({
                  //         no: 1,
                  //         src: item.TransVideo.url,
                  //         pageId: item.destinationPage,
                  //       })
                  //     : history.push(`/page/${item.destinationPage}`);
                  // }
                }}
                //URL="www.cumulations.com"
              ></Pannellum.Hotspot>
            );
          })}
        </Pannellum>
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
            cursor: "pointer",
          }}
        >
          <ArrowBackIcon />
        </button>
        {console.log(currentpage?.backgroundImage?.url, "urll")}
        <header className={classes.viewportHeader}>
          <Button
            variant="contained"
            style={{
              margin: "15px 0 0 15px",
              backgroundColor: "#efefef",
              color: "black",
              width: "100px",
              border: "2px solid #002e5a",
            }}
            onClick={navigatetoAddPage}
          >
            <ArrowBackIcon style={{ width: "20px", paddingRight: "5px" }} />
            back
          </Button>

          {currentpage.video_areas.map((item) => {
            const pointerObj = updatePointer(
              +item?.position?.split(",")[0],
              +item?.position?.split(",")[1],
              +item?.position?.split(",")[2],
              +item?.position?.split(",")[3],
              currentpage?.backgroundImage?.width,
              currentpage?.backgroundImage?.height
            );
            return (
              <>
                <ReactPlayer
                  //url={"https://vimeo.com/253989945"}
                  url={item.videoURL}
                  height={pointerObj.height}
                  width={pointerObj.width}
                  controls={true}
                  style={{
                    position: "fixed",
                    top: pointerObj.Y1,
                    left: pointerObj.X1,
                  }}
                />

                {item.videoType === "Vimeo" &&
                  item.videoURL.indexOf("event") > -1 && (
                    <>
                      <Fab
                        style={{
                          margin: 0,
                          top: "auto",
                          right: 20,
                          bottom: 20,
                          left: "auto",
                          position: "fixed",
                        }}
                        color="primary"
                        aria-label="add"
                        onClick={() => {
                          setChatOpen((toggle) => !toggle);
                        }}
                      >
                        <ChatBubbleIcon
                          style={{
                            display: hideChatSpinner ? "block" : "none",
                          }}
                        />
                        <CircularProgress
                          style={{
                            display: !hideChatSpinner ? "block" : "none",
                            //width: "16px",
                            //height: "16px",
                            //marginLeft: "20px",
                            color: project?.secondaryColor,
                          }}
                        />
                      </Fab>

                      {isChatOpen && (
                        <div
                          style={{
                            margin: 0,
                            top: "auto",
                            right: 20,
                            bottom: 80,
                            left: "auto",
                            position: "fixed",
                            //height: "450px",
                            //width: "300px",
                            height: "72%",
                            width: "25%",
                            border: "0px",
                            backgroundColor: "white",
                          }}
                        >
                          <IconButton
                            onClick={() => {
                              setChatOpen(false);
                            }}
                            style={{
                              //top: "auto",
                              right: 21,
                              bottom: "auto",
                              left: "auto",
                              position: "fixed",
                              marginTop: "10px",
                            }}
                          >
                            <CloseIcon />
                          </IconButton>
                          <CircularProgress
                            style={{
                              display: !hideChatSpinner ? "block" : "none",
                              margin: "50% auto",
                              //width: "16px",
                              //height: "16px",
                              //marginLeft: "20px",
                              color: project?.secondaryColor,
                            }}
                          />
                          <iframe
                            src={item.videoURL + "/chat"}
                            title="chat"
                            style={{
                              height: "100%",
                              width: "100%",
                              display: hideChatSpinner ? "block" : "none",
                            }}
                            onLoad={() => {
                              setHideChatSpinner(true);
                            }}
                          />
                        </div>
                      )}
                    </>
                  )}
              </>
            );
          })}
        </header>
      </>
    </>
  );
}

const mapStateToProps = (state) => ({ project: state.project });
// const mapStateToProps = (state) => ({ pages: state.project.pages, primaryColor:state.project.primaryColor, secondaryColor:state.project.secondaryColor });

const mapDispatchToProps = {};
export default PreviewPage;
