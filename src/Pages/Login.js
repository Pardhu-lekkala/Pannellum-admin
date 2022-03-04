import { makeStyles } from "@material-ui/core/styles";
import React, { useState } from "react";
import { useTheme } from "@material-ui/core/styles";
import { useHistory } from "react-router";
import Spinner from "../Components/Spinner";
import Loader from "react-loader-spinner";
// import logo from "../Assets/Images/largerLogo.png";
import Logo from "../Assets/Images/largerLogo.png";
import axios from "axios";
import constants from "./constants";

import { Input, Grid } from "@material-ui/core";
import { Padding } from "@mui/icons-material";

const useStyles = makeStyles((theme) => ({
  inpStyle: {
    color: "#ffffff",
    width: "360px",
    height: "48px",
    borderRadius: "6px",
    backgroundColor: "transparent",
    borderColor: "#C0CCDA",
    borderWidth: "1px",
    borderStyle: "solid",
    boxSizing: "border-box",
    marginBottom: "15px",
    padding: "10px",
  },
  button: {
    fontFamily: "Proxima Nova",
    fontWeight: "600",
    color: "#ffffff",
    height: "44px",
    width: "360px",
    left: "540px",
    top: "630px",
    backgroundColor: "#FE7300",
    borderRadius: "6px",
    borderWidth: "0px",
    cursor: "pointer",
    fontSize: "20px",
    padding: "3px",
  },
  para: {
    fontFamily: "Proxima Nova",
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: "16px",
    lineHeight: "20px",
    textDecorationLine: "underline",
    color: "#FFFFFF",
    cursor: "pointer",

    padding: "10px",
  },
  headings: {
    fontFamily: "Proxima Nova",
    fontWeight: "600",
    fontSize: "16px",
    fontStyle: "normal",
    lineHeight: "20px",
    color: "#ffffff",
    display: "flex",
    padding: "3px",
    alignSelf: "flex-start",
  },
  heading: {
    fontFamily: "Proxima Nova",
    fontWeight: "600",
    fontSize: "16px",
    fontStyle: "normal",
    lineHeight: "20px",
    color: "#ffffff",
    display: "flex",
    alignSelf: "flex-start",
    marginTop: "10px",
    padding: "3px",
  },
  invtxt: {
    fontFamily: "Proxima Nova",
    fontWeight: "600",
    fontSize: "16px",
    fontStyle: "normal",
    lineHeight: "20px",
    color: "#FE7300",
    maginTop: "10px",
    padding: "10px",
  },
}));

function Login() {
  const classes = useStyles();
  let history = useHistory();

  function navigateToForPass() {
    history.push("/forgotpassword");
  }
  function navigateRegister() {
    history.push("/signUp");
  }

  const theme = useTheme();
  const [identifier, setIdentifier] = useState();
  const [password, setPassword] = useState();
  const [islogin, setIslogin] = useState(false);
  const [jwt, setJwt] = useState("");
  const [click, setClick] = useState(false);
  const [loader, setLoader] = useState(false);
  const [errorMsg, SetErrMsg] = useState("");

  async function loginfunction() {
    let userDetails = { identifier, password };
    console.log(userDetails);
    setClick(true);
    setLoader(true);
    // resetting the error message when API is being fired
    SetErrMsg("");

    if (
      userDetails.identifier == undefined ||
      String(identifier)
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        ) == null
    ) {
      setLoader(false);
      SetErrMsg("Inavlid Email! Please enter the valid email");
      return false;
    }

    let result = await fetch(constants.ipaddress + "/auth/local", {
      method: "POST",
      body: JSON.stringify(userDetails),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    {
      /*let result=await axios.post('https://api-meta.eskoops.com/auth/local', {
        identifier: 'test@cumulations.com',
        password: 'test@123'
      })
      .then(function (response) {
        console.log(response,"responselogin");
      })
      .catch(function (error) {
        console.log(error);
      });*/
    }

    result = await result.json();
    if (result.jwt !== undefined) {
      setJwt(result.jwt);
      localStorage.setItem("user", JSON.stringify(result.user.username));
      localStorage.setItem("token", JSON.stringify(result.jwt));
      console.log(result);
      setIslogin(true);
      setLoader(false);
      console.log(loader);
      history.push({
        pathname: "/home",
        state: {
          token: result.jwt,
        },
      });
      return true;
    } else {
      setLoader(false);
      SetErrMsg("*Invalid Username or Password");
    }
    localStorage.setItem("login", JSON.stringify(result));
    localStorage.setItem("token", JSON.stringify(result.jwt));
  }

  const submitFunction = function (e) {
    e.preventDefault();
    loginfunction();
  };

  console.log(islogin);
  return (
    <div
      style={{
        backgroundColor: "#0A3C6B",
        height: "100vh",
        marginTop: "0px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div style={{ marginBottom: "25px", marginRight: "35px" }}>
        <img src={Logo} style={{ width: "150px" }} />
      </div>
      <div>
        <label htmlFor="email" className={classes.headings}>
          Email address
        </label>
        <Input
          // style={{paddingLeft:"10px"}}
          type="text"
          className={classes.inpStyle}
          value={identifier}
          autocomplete="nope"
          onChange={(e) => setIdentifier(e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="password" className={classes.heading}>
          Password
        </label>
        <Input
          type="password"
          autocomplete="new-password"
          className={classes.inpStyle}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <Grid>
        <form onSubmit={submitFunction}>
          <button
            className={classes.button}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {loader == false ? <p>Login</p> : null}
            <Loader
              type="TailSpin"
              color="#00BFFF"
              height={30}
              width={30}
              visible={loader}
            />
          </button>
        </form>
        {jwt == "" && click == true ? (
          <p className={classes.invtxt}>{errorMsg}</p>
        ) : null}
        <div
          style={{ display: "flex", flexFlow: "row", justifyContent: "center" }}
        >
          <h1 className={classes.para} onClick={navigateRegister}>
            Create an Account
          </h1>
          <h1 className={classes.para} onClick={navigateToForPass}>
            Forgot Password?
          </h1>
        </div>
      </Grid>
      <footer>
        <span
          style={{
            color: "white",
            fontFamily: "Proxima Nova",
            bottom: "3%",
            left: "3%",
            position: "fixed",
          }}
        >
          Version: {constants.version}
        </span>
      </footer>
    </div>
  );
}
export default Login;

//https://stackoverflow.com/questions/63214924/how-to-return-a-page-by-id-with-react-routing
