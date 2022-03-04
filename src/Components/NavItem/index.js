import React from "react";
import "./index.css";
// import logo from "../../Assets/Images/logo.png";
import logo from "../../Assets/Images/largerLogo.png";
import arrow from "../../Assets/Images/Shape.png";
import expand from "../../Assets/Images/expand_more.png";
import initial from "../../Assets/Images/Initials.png";
import { useHistory } from "react-router";
import LogoutIcon from "@mui/icons-material/Logout";
import { Transform } from "@mui/icons-material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useLocation } from "react-router";

const NavBar = (props) => {
  const [displayViewProject, setDisplayViewProject] = React.useState(true);
  const [displayBackButton, setDisplayBackButton] = React.useState(true);
  const [openMenu, setOpenMenu] = React.useState(false);
  const backProp = props.backProp;
  console.log(backProp, "this is back prop in nav");

  const token = JSON.parse(localStorage.getItem("token"));
  const user = localStorage.getItem("user");
  console.log(user, "he is the user");
  console.log(token, "JWTTOKEN");
  const history = useHistory();
  function navigateToCreateProject() {
    history.push({
      pathname: "/createproject",

      token: token,
    });
  }

  // function navigateCreateNewPage() {
  //   history.push("/createproject");
  // }

  function navigateToHome() {
    history.push({
      pathname: "/home",
      state: {
        token: token,
      },
    });
  }
  function logout() {
    history.push({
      pathname: "/",
    });
  }

  function navigatetoBackPage() {
    if (backProp == true) {
      history.push("/createproject");
    }

    if (backProp == false) {
      history.push("/home");
    }
    if (backProp == undefined) {
      history.goBack();
    }
  }
  // console.log(useLocation().pathname,"this gives you the current location");
  React.useEffect(() => {
    console.log("Navbar userEfftect is called");
    if (props.displayViewProject != undefined)
      setDisplayViewProject(props.displayViewProject);
    else setDisplayViewProject(true);

    if (props.displayBackButton != undefined)
      setDisplayBackButton(props.displayBackButton);
    else setDisplayBackButton(true);
  }, [props]);

  return (
    <>
      <div className="mainContainer">
        <div className="imgcont">
          {displayBackButton ? (
            // <img
            //   src={arrow}
            //   className="img1"
            //   alt="logo"
            //   onClick={navigatetoBackPage}
            //   style={{ cursor: "pointer" }}
            // />
            <ArrowBackIcon
              onClick={navigatetoBackPage}
              style={{
                color: "white",
                width: "35px",
                padding: "20px 0",
                cursor: "pointer",
              }}
            />
          ) : null}
          {useLocation().pathname != "/home" ? (
            <img
              src={logo}
              className="img2"
              alt="logo"
              onClick={navigateToHome}
              style={{ cursor: "pointer" }}
            />
          ) : (
            <img src={logo} className="img2" alt="logo" />
          )}
        </div>
        <div style={{ zIndex: 100, marginTop: "5rem" }}></div>
        <div className="content-cont">
          {displayViewProject ? (
            <div onClick={navigateToHome} style={{ cursor: "pointer" }}>
              <h1 id="viewProject" className="head">
                View Projects
              </h1>
            </div>
          ) : null}
          <button className="btn" onClick={navigateToCreateProject}>
            Create a Project
          </button>
          <div className="cont2">
            <div
              style={{
                width: "60px",
                height: "35px",
                borderRadius: "50%",
                backgroundColor: "lightpink",
                border: "2px solid #DAA520",
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <h1
                style={{
                  color: "black",
                  fontFamily: "roboto",
                  fontWeight: "150",
                }}
              >
                {user[1].toUpperCase()}
              </h1>
            </div>
            {user !== "" || user !== undefined ? (
              <h1 className="head">{user.substring(1, user.length - 1)}</h1>
            ) : null}
            <img
              src={expand}
              className="img4"
              alt="logo"
              onClick={() => {
                if (openMenu) {
                  setOpenMenu(false);
                } else {
                  setOpenMenu(true);
                }
              }}
            />
          </div>
        </div>
      </div>
      {openMenu ? (
        <ul className="menu-options">
          <li
            className="menu-options-items"
            onClick={() => {
              localStorage.clear();
              sessionStorage.clear();
              logout();
            }}
          >
            <span className="menu-options-items-text">Logout </span>
            <LogoutIcon />
          </li>
        </ul>
      ) : (
        ""
      )}
    </>
  );
};
export default NavBar;
