import React, { Component } from "react";
import { Grid } from "@material-ui/core";
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { Typography } from "@mui/material";
import { SketchPicker } from 'react-color';
import { useState } from "react";
import { useEffect } from "react";
import Button from "@mui/material/Button";
// import swal from 'sweetalert';
import Swal from "sweetalert2";


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
      padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
      padding: theme.spacing(1),
    },
  }));
  
  const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;
  
    return (
      <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
        {children}
        {onClose ? (
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        ) : null}
      </DialogTitle>
    );
  };
  
  BootstrapDialogTitle.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
  };

function HexDetails(props){
    const [displayColorPicker,setDisplayColoPicker]=useState(false);
    const [color,setColor]=useState({'r':241,'g':112,'b':19,'a':1});
    const defaultValue=props.defaultValue
    const [hex,setHex]=useState("");
    const { open, setOpen } = props;
    const projectId = props.projectId
    const callbackFunction = props.callbackFunction
    console.log("this is hex code",hex)
    const markerClick=props.colorField
    console.log(markerClick,"these are clicks in popup")


    const handleClose = () => {
        setDisplayColoPicker(false);
        setOpen(false)
      };

    const handleChange = (color) => {
        setColor(color.rgb)
        setHex(color.hex)
      };

    function validate(){
            if(hex == "" || hex == undefined) {
                Swal.fire("OPPS","Please select the video type","warning");
                return false;
              }
          
        }


    return(
        <div>
          <BootstrapDialog
            onClose={handleClose}
            aria-labelledby="customized-dialog-title"
            open={open}
          >
            <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
            Project Details
            </BootstrapDialogTitle>
            <DialogContent dividers style={{width:350,height:480,overflowX:'hidden'}}>
                <Typography gutterBottom>
              <Grid className="clr-pick">
              <Grid>
                    <div style={{marginLeft:"50px"}}>
                        <SketchPicker color={color} hex={hex} onChange={handleChange} />
                    </div>
                    <div style={{display:"flex",flexDirection:"row",justifyContent:"space-between"}}>
                        <Grid style={{marginLeft:"2rem",marginTop:"1rem"}}>
                        <h1 className='hex-text'>Hex:</h1>
                        </Grid>
                        <Grid className="hex-cont" style={{marginRight:"43px",marginTop:"2rem"}}>
                        {hex!==""?<Grid style={{ backgroundColor:hex,height:"32px",width:"26.83px",borderRadius:"4px",margin:"5px"}}>
                        </Grid>:null}
                        {hex==""?<Grid style={{ backgroundColor:defaultValue,height:"32px",width:"26.83px",borderRadius:"4px",margin:"5px"}}>
                        </Grid>:null}
                        {hex!==""?<h1 className='hex-clr'>{hex}</h1>:null}
                        {hex==""?<h1 className='hex-clr'>{defaultValue}</h1>:null}
                        </Grid>
                    </div>
                    <Button className="btn-up1" variant="outlined" style={{marginLeft:"240px",marginTop:"1rem", width:"77px", height:"32px"}} onClose={handleClose} onClick={() => { setOpen(false);validate(); callbackFunction(markerClick, hex) }}>ADD</Button>
                    </Grid>
              </Grid>
          </Typography>
            </DialogContent>
            <DialogActions>    
              
            </DialogActions>
          </BootstrapDialog>
        </div>
    )
}
export default HexDetails;


  
 {/*class ColortDetails extends Component{
 state = {
    displayColorPicker: false,
    color: {
      r: '241',
      g: '112',
      b: '19',
      a: '1',
    },
    hex:"",
    open:false
  };
//`${this.props.open==true ? true : false}`

componentDidUpdate(prevProps) {
  if(prevProps.open !== this.props.open) {
    this.setState({open: this.props.open});
  }
}

navigatedetailspage = () => {
  const { history } = this.props;
  console.log(history,"this is history")
  history.push('/projectdetailsdata',
  {token:this.props.token,projectId:this.props.projectId,hex:this.state.hex}
  );
  console.log("YOU GET ROUTED")
  console.log(this.props.token,"TOKEN IN DETAILS PAGE")
  console.log(this.props.projectId,"PROJECT ID IN DETAILS PAGE")
  console.log(this.state.hex,"THIS IS HEX CODE")
 }

handleClickOpen = () => {
    this.setState({ open: true })
};

handleClick = () => {
    this.setState({ displayColorPicker: !this.state.displayColorPicker })
  };

  handleClose = () => {
    this.setState({ displayColorPicker: false })
    this.setState({open:false})
    this.props.setOpen(false)
  };

  handleChange = (color) => {
    this.setState({ color: color.rgb })
    this.setState({hex:color.hex})
  };


  render(){
    const { history } = this.props;
    console.log("this.state",this.state.open)
    console.log("this.props",this.props.open)
    console.log("this is hex color",this.state.hex)
    return (
        
      );
 }
}


export default ColortDetails;*/}