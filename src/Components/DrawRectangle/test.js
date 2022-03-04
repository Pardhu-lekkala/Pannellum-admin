import React, { Component, useRef } from 'react';
import location from "../../Assets/Images/loc.png";
import audit from "../../Assets/Images/ad1.jpg";
import color from "../../Assets/Images/mark2.png";
import grid from "../../Assets/Images/mark1.png";
import NavBar from "../NavItem";
import './marker.css';
import { useState } from 'react';
import MarkerPopUp from '../MarkerPop';
import axios from "axios";
import SketchExample from '../ColorPicker';
import MarkData from '../MarkData';
import { useEffect } from 'react';
import constants from '../../Pages/constants';
import { useHistory } from 'react-router';
//import MarkerData from '../MarkerData';
//const AnyReactComponent = ({ text }) => <div>{text}</div>;
const AddMarker = (props) => {
    const history = useHistory()
    const [cursor, setCursor] = useState('crosshair');
    const [open, setOpen] = useState(false);
    const [x, setx] = useState("");
    const [y, sety] = useState("");
    const [prevX, setPrevX] = useState(0);
    const [prevY, setPrevY] = useState(0);
    const [hexOpen, setHexOpen] = React.useState(false)
    const TransVideo = props.location.state.TransVideo
    const token = JSON.parse(localStorage.getItem('token'))
    const markerName = props.location.state.markerName
    const page = props.location.state.pageId
    const destinationLink = props.location.state.destinationLink
    const destinationType = props.location.state.destinationType
    const VisibileLabel = props.location.state.VisibileLabel
    const projectId = props.location.state.projectId
    const markerId = props.location.state.markerId
    const destinationPageId = props.location.state.destinationPage

    const isEditMode = props.location.state.isEditMode
    const backgroundURL = props.location.state.backgroundURL

    console.log(projectId, "markproid")
    console.log(markerId, "markerIdput")

    //const markerPosition=(x,y)
    console.log(TransVideo, 'trans video')
    console.log(token, "this is validate token")
    console.log(markerName, "markername")
    console.log(page, 'this is page id')
    console.log(destinationLink, 'deslink')
    console.log(destinationType, 'destype')
    console.log(VisibileLabel, 'vslabel')
    console.log(destinationPageId, "despgid")


    {/*function Counter() {
      const prevCorX = usePrevious(prevX)
      const prevCorY=usePrevious(prevY)
      console.log(prevCorX,"prevxcor")
      console.log(prevCorY,"prevYcor")
    }
  Counter();*/}
    const switchHexToggle = () => {
        hexOpen ? setHexOpen(false) : setHexOpen(true)
    }

    function navigatetoAddPage() {
        history.goBack()
    }

    function postMarker() {

        var formData = new FormData();
        let method = "POST"
        let url = constants.ipaddress + "/markers"

        if (isEditMode) {
            method = "PUT"
            url = url + "/" + markerId
        }


        if (TransVideo != "") {


            if (typeof (TransVideo) == 'object')
                formData.append('files.TransVideo', TransVideo)

        }


        let dataParams = {
            'markerName': markerName,
            'page': page,
            'destinationLink': destinationLink,
            'destinationType': destinationType,
            "VisibileLabel": VisibileLabel,
            "markerPosition": `${prevX},${prevY}`
        }

        if (destinationPageId != "") {
            dataParams['destinationPage'] = destinationPageId
        }

        formData.append('data', JSON.stringify(dataParams))
        axios({
            method: method,
            url: url,
            data: formData,
            headers: {
                "Content-Type": "multipart/form-data",
                "Authorization": "Bearer" + " " + token,
            },
        })
            .then(function (response) {
                navigatetoAddPage()
                console.log(response)
            })
            .catch(function (response) {
                console.log(response);
            });
    }
    function onMouseMove(e) {
        setx(e.screenX)
        sety(e.screenY)
    }
    console.log(x, y, "coordinates")
    return (
        <>
            <div>

                <div style={{ backgroundImage: `url(${backgroundURL})` }} className="mark-img" onMouseUpCapture={onMouseMove} onClick={() => { hexOpen ? setOpen(false) : setOpen(true); setPrevX(x); setPrevY(y) }}>
                    <div style={{ width: "100%", display: "flex", flexDirection: "row", justifyContent: "flex-end" }} onClick={() => { setx(prevX); sety(prevY); }}>
                        <button style={{ height: "30px", width: "70px", margin: "15px" }} onClick={postMarker}>Save</button>
                    </div>
                    <div>
                        <img src={location} style={{ position: "absolute", top: `${y}px`, left: `${x}px`, height: "40px", width: "60px" }} />
                    </div>
                    <div style={{ width: "100%", height: "150px", display: "flex", flexDirection: "row", justifyContent: "flex-end" }}>
                        {hexOpen ? <div style={{ marginRight: "1px", marginTop: "5.5rem", height: "380px", width: "220px", backgroundColor: "white" }} onClick={() => { setx(47); sety(183) }}>
                            <SketchExample />
                        </div> : null}
                        <div style={{ height: "110px", width: "40px", backgroundColor: "white", display: "flex", flexDirection: "column", alignSelf: "flex-end", marginTop: "20px" }}>
                            <img src={grid} />
                            <hr style={{ color: "black", width: "100%", fontWeight: "bold" }} />
                            <img src={color} value={hexOpen} onClick={() => { switchHexToggle(); setx(47); sety(183) }} />
                        </div>
                    </div>
                </div>
                {/*<div>
              <button onClick={postMarker}>click</button>
            </div>*/}
            </div>
        </>
    )
}
export default AddMarker;


