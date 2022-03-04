import React from "react";
import './markdata.css'
import { useState} from "react";
import { useEffect } from 'react';
import del from '../../Assets/Images/delete.png';
import loc from '../../Assets/Images/location.png';
import edit from '../../Assets/Images/edit.png';
{/*1. Add the Save button for Video area and save that by Firing the API 
2. Add the Save button for Marker area and save that by Firing the API 
Praveena Kumara1:27 PM

3. Remove two buttons in the project creation page and replace it by only one button in blue color.
That ble button should have text called Create and after successfull creation you can navigate directly to the next screen*/}
const MarkData=(props)=>{
    const [desType,setDesType]=React.useState("")
    const [label,setLabel]=React.useState("")
    let typeDes=props.destinationType;
    let lenDes=desType.length
    console.log(typeDes,"sssss")
    console.log(desType)

    

    {/*useEffect(() => {
        setLabel(props.label)
        if (typeDes[lenDes] == "L"){
            setDesType("Link")
        }else{
            setDesType("Page")
        }
      }, []);*/}
    
    return(
        <>
        <div className="data-container">
            <p className="data1">{props.markerName}</p>
            {props.xCoordinate !== undefined?<div style={{width:"220px"}}>
                <button className="labelOn">{props.label}</button>
            </div>:null}
            {props.xCoordinate !== undefined?<div style={{width:"240px",marginLeft:"15px"}}>
                <button className="des-btn">Link</button>    
            <p className="data3">{props.destinationLink}</p>
            </div>:null}
            {props.xCoordinate !== undefined?<div className="coor-cont">
                <img src={loc} className="loc-img"/>
                <p className="data4">{`${props.xCoordinate},${props.yCoordinate}`}</p>
            </div>:null}
            {props.xCoordinate !==undefined?<div className="del-cont">
                <img src={edit} className="ed-img"/>
                <img src={del} className="del-img"/>
            </div>:null}
        </div>
        </>
    )
}
export default MarkData;