import React from "react";
import './sidebar.css'
import arrow2 from "../../../Assets/Images/Add New.png";
import edit from "../../../Assets/Images/edit.png";
import addimage from "../../../Assets/Images/addimg.png";
import ProjectDetails from "../../DetailsCard";
import { useState } from "react";

const SideBar=(props)=>{
    const [open, setOpen] = React.useState(false);
    return(
        <div className="side-main-cont">
            <div className="box-cont">
                <div className="conf-cont">
                    <div className="cont-pro-cont">
                    <img src={arrow2} alt="..." className="arr-img" onClick={()=>{setOpen(true)}}/>
                    <h1 className="project-name">{props.projectName}</h1>
                    <img src={edit} alt="..." className="edit-img"/>
                    </div>
                </div>
                <div className="login-pg-cont">
                <h1 className="login-text">Login Page</h1>
            </div>
            <ProjectDetails open={open} setOpen={setOpen} projectName={props.projectName} accessCode={props.accessCode}/>
            <div className="create-pg-cont">
                <img src={addimage} alt="..." className="addimg"/>
                <h1 className="create-text">Create a new project</h1>
            </div>
           
        </div>
    </div>
    )
}
export default SideBar;