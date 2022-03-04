import { makeStyles, } from '@material-ui/core/styles';
import React, { useState } from 'react';
import { useTheme } from '@material-ui/core/styles';
import { useHistory } from 'react-router';
import constants from './constants';
import Loader from 'react-loader-spinner';
import Swal from 'sweetalert2';



import {
  Input,
  Grid,
} from "@material-ui/core";

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
    padding: "10px"

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
    cursor: "pointer"
  },
  para: {
    fontFamily: "Proxima Nova",
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: "16px",
    lineHeight: "20px",
    textDecorationLine: "underline",
    color: "#FFFFFF",
    cursor: "pointer"
  },
  headings: {
    fontFamily: "Proxima Nova",
    fontWeight: "600",
    fontSize: "16px",
    fontStyle: "normal",
    lineHeight: "20px",
    color: "#ffffff",
    display: "flex",
    alignSelf: "flex-start",
    padding: "0 0 10px 0"

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
    padding: "0 0 10px 0"
  }

}));

function SignUp(props) {
  const history = useHistory();
  const classes = useStyles();
  const theme = useTheme();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [email, setEmail] = useState();
  const [jwt1, setJwt1] = useState("");
  const [loader, setLoader] = useState(false);


  async function signUp() {

    if (jwt1 != "") {
      Swal.fire("OOPS","Account Created Already. Kinldy go to Login Page","warning")
      setLoader(true)
      return

    }

    setLoader(true)
    setJwt1("")
    let userDetails = { email, username, password }


    if (userDetails.email == undefined || String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      ) == null) {
      Swal.fire("ERROR","Inavlid Email! Please enter the valid email", "error")
      setLoader(false)
      setJwt1("")


      return false;
    }

    if (username == undefined || username == "") {
      Swal.fire("ERROR","Inavlid Username! Please enter the valid username","error")
      setLoader(false)
      setJwt1("")


      return false
    }

    if (password == undefined || password == "") {
      Swal.fire("ERROR","Inavlid password! Please enter the valid password","error")
      setLoader(false)
      setJwt1("")


      return false
    }


    console.log(userDetails)

    let result = await fetch(constants.ipaddress + '/auth/local/register', {
      method: "POST",
      body: JSON.stringify(userDetails),
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      }
    })
    result = await result.json()
    if (result.jwt == undefined) {
      Swal.fire("ERROR",result.data[0].messages[0].message,"error")
      setLoader(false)
      setJwt1("")

      return
    }
    // console.log(result, "pardhu")
    setJwt1(result)
    Swal.fire("SUCCESS","Account Created Successfully. Kinldy go to Login Page","success")

    localStorage.setItem('user-info', JSON.stringify(result))
  }

  function navigateLogin() {
    history.goBack()
  }
  return (
    <div style={{ backgroundColor: "#0A3C6B", height: "100vh", marginTop: "0px", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
      <div>
        <label
          htmlFor="username"
          className={classes.headings}
        >Username</label>
        <Input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className={classes.inpStyle}
        />
      </div>

      <div>
        <label
          htmlFor="email"
          style={{ padding: "0 0 10px 0" }}

          className={classes.headings}

        >Email address</label>
        <Input
          type="text"
          className={classes.inpStyle}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="password"
          className={classes.heading}
        >Password</label>
        <Input
          type="password"
          className={classes.inpStyle}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Grid style={{ display: "flex", flexDirection: "row", justifyContent: "flex-end" }}>
        </Grid>
      </div>

      <Grid>
        <button
          className={classes.button}
          onClick={signUp}
        >

          <Loader type="TailSpin"
            color="#00BFFF"
            height={30}
            width={30}
            visible={loader && jwt1 == ""}
          />
          {loader == false ? <div>
            {jwt1 == "" ? "Create an Account" : "Account Created Successfully"}
          </div> :
            <div>
              {jwt1 != "" ? "Account Created Successfully" : null}

            </div>}


        </button>
      </Grid>
      <div onClick={navigateLogin} style={{ display: "flex", flexDirection: "row", justifyContent: "flex-end" }}>
        <h1 className={classes.para}>Back to Login</h1>
      </div>
    </div>
  );
};
export default SignUp;
