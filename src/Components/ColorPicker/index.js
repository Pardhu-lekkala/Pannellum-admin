'use strict'

import React from 'react'
import reactCSS from 'reactcss'
import { SketchPicker } from 'react-color'
import { Grid } from '@mui/material';
import './color.css'

class SketchExample extends React.Component {
  state = {
    displayColorPicker: false,
    color: {
      r: '241',
      g: '112',
      b: '19',
      a: '1',
    },
    hex:""
  };

  handleClick = () => {
    this.setState({ displayColorPicker: !this.state.displayColorPicker })
  };

  handleClose = () => {
    this.setState({ displayColorPicker: false })
  };

  handleChange = (color) => {
    this.setState({ color: color.rgb })
    this.setState({hex:color.hex})
  };

  render() {

    return (
      <Grid>
      <div>
          <SketchPicker color={ this.state.color } hex={this.state.hex} onChange={ this.handleChange } />
      </div>
      <div style={{display:"flex",flexDirection:"row",justifyContent:"space-between"}}>
        <Grid>
        <h1 className='hex-text'>Hex:</h1>
        </Grid>
        <Grid className="hex-cont">
          <Grid style={{backgroundColor:this.state.hex,height:"32px",width:"26.83px",borderRadius:"4px",margin:"5px"}}>
          </Grid>
          <h1 className='hex-clr'>{this.state.hex}</h1>
        </Grid>
      </div>
      </Grid>
    )
  }
}

export default SketchExample