import React from "react";
import { Component } from "react";
import { makeStyles } from "@material-ui/styles";
import { useHistory } from "react-router";
import { FormControl, Input, Grid } from "@material-ui/core";
import constants from "./constants";
import axios from "axios";
import Swal from "sweetalert2";
import Loader from "react-loader-spinner";
const useStyles = makeStyles((theme) => ({
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
    marginTop: "15px",
  },
  para: {
    fontFamily: "Proxima Nova",
    fontWeight: "600",
    color: "#ffffff",
    cursor: "pointer",
    padding: "10px",
    textDecorationLine: "underline",
  },
  input: {
    color: "#ffffff",
    width: "360px",
    height: "48px",
    borderRadius: "6px",
    backgroundColor: "transparent",
    borderColor: "#C0CCDA",
    borderWidth: "1px",
    borderStyle: "solid",
    boxSizing: "border-box",
    padding: "10px",
  },
  heading: {
    color: "#ffffff",
    height: "44px",
    width: "245px",
    fontFamily: "Proxima Nova",
    fontWeight: "700",
    fontStyle: "normal",
    fontSize: "32px",
    marginLeft: "5rem",
    lineHeight: "44px",
  },
  paragraph: {
    color: "#ffffff",
    height: "72px",
    width: "448px",
    fontFamily: "Proxima Nova",
    fontWeight: "400",
    fontStyle: "normal",
    fontSize: "16px",
    marginLeft: "5rem",
    lineHeight: "24px",
  },
  label: {
    fontFamily: "Proxima Nova",
    fontWeight: "600",
    fontSize: "16px",
    fontStyle: "normal",
    lineHeight: "20px",
    color: "#ffffff",
  },
}));
const ForgotPassword = () => {
  const classes = useStyles();
  const history = useHistory();
  const [email, setEmail] = React.useState("");
  const [loader, setLoader] = React.useState(false);
  console.log(email, "email");

  async function sendResetLink() {
    let userDetails = { email };
    console.log(userDetails);

    let result = await fetch(constants.ipaddress + "/auth/forgot-password", {
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

  // function sendResetLink() {
  //   var formData = new FormData();
  //   let method = "POST";
  //   let url = constants.ipaddress + "/auth/forgot-password";
  //   let dataParams = {
  //     email: email,
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
  function navigateToLogin() {
    history.push("/");
  }
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
      <Grid>
        <h1 className={classes.heading}>Forgot password</h1>
        <p className={classes.paragraph}>
          Forgot your password? No worries. Provide your login email address and
          we will send you a password reset link to your email address.
        </p>
      </Grid>

      <FormControl>
        <label htmlFor="email" className={classes.label}>
          Email address
        </label>
        <Input
          id="email"
          name="email"
          value={email}
          type="text"
          onChange={(e) => setEmail(e.target.value)}
          className={classes.input}
        />
      </FormControl>
      <Grid>
        <button
          className={classes.button}
          onClick={() => {
            sendResetLink();
            setLoader(true);
          }}
          //onClick={() => alert("Not implemented yet")}
        >
          {loader === false ? (
            "Send Reset link"
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
      </Grid>
      <div onClick={navigateToLogin}>
        <p className={classes.para}>Back to Signin</p>
      </div>
    </div>
  );
};
export default ForgotPassword;
