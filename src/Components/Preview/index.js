import React from "react";

//import { connect } from "react-redux";

import useStyles from "../../useStylesPage";
import "./preview.css";
import useWindowDimensions from "../../useWindowDimensions";
import Fab from "@material-ui/core/Fab";
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import ChatBubbleIcon from "@material-ui/icons/ChatBubble";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useHistory } from "react-router";
import { useEffect } from "react";

//import { BiArrowBack } from "react-icons/bi";
//import { BsChevronCompactDown } from "react-icons/bs";
//import { HiOutlineUser } from "react-icons/hi";

import ReactPlayer from "react-player";

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

  const primaryColor = "";
  const secondaryColor = "";

  const classes = useStyles();
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

    const neww1 = (makrw1 / imagew) * width;
    const newh1 = (makrh1 / imageh) * height;
    const neww2 = (makrw2 / imagew) * width;
    const newh2 = (makrh2 / imageh) * height;
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

  if (project == null) {
    console.log("in the render null");
    return null;
  }
  return (
    <>
      <>
        {console.log("in the rendering logic of preview")}

        <video
          poster={currentpage?.backgroundImage?.url}
          className={classes.pageBG}
          ref={BGRef}
        ></video>

        <header className={classes.viewportHeader}>
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
                    position: "relative",
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
                            color: project.secondaryColor,
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
                              color: project.secondaryColor,
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
