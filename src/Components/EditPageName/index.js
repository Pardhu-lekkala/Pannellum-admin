import React from "react";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import { Typography } from "@mui/material";
import { useState } from "react";
import { useHistory } from "react-router";
import Button from "@mui/material/Button";
import Swal from "sweetalert2";

const BootstrapDialogs = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

function PageNamePop(props) {
  const history = useHistory();
  const defaultPageValue = props.defaultPageValue;
  console.log(defaultPageValue, "page name in popup");
  const [projectName, setProjectName] = useState(defaultPageValue);
  const { visible, setVisible } = props;
  const projectId = props.projectId;
  const callbackFunction = props.callbackFunction;

  console.log(props.visible, "this is the popup");
  console.log(projectName, "this is pop page name value");

  const handleClose = () => {
    setVisible(false);
  };

  const handleCloses = () => {
    setVisible(false);
  };

  function validate() {
    if (projectName == "" || projectName == undefined) {
      Swal.fire("OPPS", "Please enter some value", "warning");
      return false;
    }
  }

  return (
    <div>
      <BootstrapDialogs
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={visible}
      >
        <DialogContent
          dividers
          style={{
            width: 480,
            height: 150,
            overflowX: "hidden",
            overflowY: "hidden",
          }}
        >
          <Typography gutterBottom>
            <div>
              <div style={{ width: "100%", height: "30px", marginTop: "7px" }}>
                <span className="pop-tx11">Enter Project Name</span>
              </div>
              <input
                type="text"
                onChange={(e) => setProjectName(e.target.value)}
                value={projectName}
                className="pg-inp-nm"
              />
              <div
                style={{
                  width: "96%",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "flex-end",
                  marginTop: "10px",
                }}
              >
                <Button
                  variant="outlined"
                  sx={{ marginRight: "10px" }}
                  color="error"
                  onClick={() => {
                    setVisible(false);
                  }}
                  onClose={handleClose}
                >
                  {" "}
                  Cancel
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => {
                    setVisible(false);
                    if (projectName == "") {
                      setProjectName(defaultPageValue);
                    } else {
                      callbackFunction("name", projectName);
                    }
                    validate();
                  }}
                  onClose={handleClose}
                >
                  Add
                </Button>
              </div>
            </div>
          </Typography>
        </DialogContent>
      </BootstrapDialogs>
    </div>
  );
}
export default PageNamePop;
