import { makeStyles } from "@material-ui/core/styles";
import React, { useState } from "react";
import { useTheme } from "@material-ui/core/styles";
import { useHistory } from "react-router";
import Spinner from "../Components/Spinner";
import Loader from "react-loader-spinner";
// import logo from "../Assets/Images/largerLogo.png";
import Logo from "../Assets/Images/largerLogo.png";
import constants from "./constants";
import Swal from "sweetalert2";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { Input, Grid } from "@material-ui/core";
import { CodeSharp, Padding } from "@mui/icons-material";

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

function ConfirmPassword() {
  const classes = useStyles();
  let history = useHistory();
  let location = useLocation();
  console.log(location.search, "location");
  let codes = location.search;
  let lengthCode = CodeSharp.length;
  let code = codes.substr(6);
  console.log(code, "access");

  const theme = useTheme();
  const [password, setNewPassword] = useState();
  const [passwordConfirmation, setConfirmPassword] = useState();
  const [islogin, setIslogin] = useState(false);
  const [click, setClick] = useState(false);
  const [loader, setLoader] = useState(false);
  const [errorMsg, SetErrMsg] = useState(false);
  //const [code, setCode] = useState("");
  // if (accessCode !== "" || accessCode !== undefined || accessCode !== null) {
  //   setCode(accessCode);
  // }

  console.log(password, passwordConfirmation, "passwords");
  console.log(islogin);
  console.log(loader, "loader");

  async function configPassword() {
    let userDetails = { code, password, passwordConfirmation };
    console.log(userDetails, "details");

    let result = await fetch(constants.ipaddress + "/auth/reset-password", {
      method: "POST",
      body: JSON.stringify(userDetails),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    result = await result.json();
    if (result !== undefined) {
      setLoader(false);
    }
    console.log(result, "response");
  }

  // function configPassword() {
  //   var formData = new FormData();
  //   let method = "POST";
  //   let url = constants.ipaddress + "/auth/reset-password";
  //   let dataParams = {
  //     email: password,
  //   };

  //   formData.append("data", JSON.stringify(dataParams));
  //   axios({
  //     method: method,
  //     url: url,
  //     data: formData,
  //     headers: {
  //       "Content-Type": "multipart/form-data",
  //       Authorization:
  //         "Bearer" +
  //         " " +
  //         "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjQ1NzY4ODQ3LCJleHAiOjE2NDgzNjA4NDd9.byWr809huFtLYk8Qo3iFiE4rmJYd2Hohe1h_Px5wcVQ",
  //     },
  //   })
  //     .then(function (response) {
  //       history.push("/setPassword");
  //       setLoader(false);
  //       console.log(response, "this is password response");
  //     })
  //     .catch(function (response) {
  //       setLoader(false);
  //       console.log(response, "this is error response");
  //     });
  // }

  const submitFunction = function (e) {
    e.preventDefault();
    setClick(true);
    if (password === passwordConfirmation) {
      configPassword();
    }
    if (password !== passwordConfirmation) {
      Swal.fire("OPPS", "Password did not match", "error");
      setLoader(false);
    }
    console.log("submit called");
  };
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
        <label htmlFor="password" className={classes.headings}>
          Enter New Password
        </label>
        <Input
          // style={{paddingLeft:"10px"}}
          type="password"
          className={classes.inpStyle}
          value={password}
          autocomplete="nope"
          onChange={(e) => setNewPassword(e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="password" className={classes.heading}>
          Confirm Password
        </label>
        <Input
          type="password"
          autocomplete="new-password"
          className={classes.inpStyle}
          value={passwordConfirmation}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>

      <Grid>
        <form onSubmit={submitFunction}>
          <button
            className={classes.button}
            //onClick={setClick(true)}
            onClick={() => {
              setLoader(true);
            }}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {loader === false ? (
              "Confirm"
            ) : (
              <Loader
                type="TailSpin"
                color="#00BFFF"
                height={30}
                width={30}
                visible={loader}
              />
            )}
          </button>
        </form>
      </Grid>
    </div>
  );
}
export default ConfirmPassword;

//https://stackoverflow.com/questions/63214924/how-to-return-a-page-by-id-with-react-routing
