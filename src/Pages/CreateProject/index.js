import React from "react";
import { useState } from "react";
import NavBar from "../../Components/NavItem";
import "./project.css";
import { useHistory } from "react-router";
import Swal from "sweetalert2";

const CreateProject = (props) => {
  //console.log(props.location.token[0], "kkkkk")

  const [project, setProject] = useState("");
  const [accessCode, setAccessCode] = useState(
    "Id-" + Math.floor(100000 + Math.random() * 900000)
  );
  const history = useHistory();
  function navigateToCustom() {
    if (project == undefined || project.trim().length == 0) {
      Swal.fire("ERROR", "Enter a valide project name", "error");
      return false;
    }
    if (accessCode == undefined || accessCode.trim().length == 0) {
      Swal.fire("ERROR", "Enter a valid access code", "error");
      return false;
    }

    history.push({
      pathname: "/customlogin",
      state: {
        project: project,
        accessCode: accessCode,
      },
    });
  }
  return (
    <div>
      <div>
        <NavBar backProp={false} />
      </div>
      <div className="cont-container">
        <h1 className="head-style">Create New Project</h1>
        <p className="para-style">Project Name</p>
        <input
          className="inp-style"
          type="text"
          value={project}
          onChange={(e) => setProject(e.target.value)}
        />

        <p className="para-style">Access Code</p>
        <input
          className="inp-style"
          type="text"
          value={accessCode}
          onChange={(e) => setAccessCode(e.target.value)}
        />

        <button
          className={`${project !== "" ? "btn-style2" : "btn-style"}`}
          onClick={navigateToCustom}
        >
          Create
        </button>
      </div>
    </div>
  );
};
export default CreateProject;
