import React, { Component } from "react";
import "./rectangle.css";
import ResizableRect from "react-resizable-rotatable-draggable";

class DrawMarker extends Component {
  constructor() {
    super();
    this.state = {
      width: 10,
      height: 10,
      top: 100,
      left: 100,
      rotateAngle: 0,
    };
  }
  handleResize = (style, isShiftKey, type) => {
    let { top, left, width, height } = style;
    top = Math.round(top);
    left = Math.round(left);
    width = Math.round(width);
    height = Math.round(height);
    this.setState({
      top,
      left,
      width,
      height,
    });

    console.log("resize", {
      x1: left,
      y1: top,
      x2: left + width,
      y2: top + height,
    });
    this.props.setCoordinates({
      x1: left,
      y1: top,
      x2: left + width,
      y2: top + height,
    });
  };

  handleRotate = (rotateAngle) => {
    this.setState({
      rotateAngle,
    });
  };

  handleDrag = (deltaX, deltaY) => {
    this.setState({
      left: this.state.left + deltaX,
      top: this.state.top + deltaY,
    });
    console.log("drag", {
      x1: this.state.left + deltaX,
      y1: this.state.top + deltaY,
      x2: this.state.left + deltaX + this.state.width,
      y2: this.state.top + deltaY + this.state.height,
    });
    this.props.setCoordinates({
      x1: this.state.left + deltaX,
      y1: this.state.top + deltaY,
      x2: this.state.left + deltaX + this.state.width,
      y2: this.state.top + deltaY + this.state.height,
    });
  };

  render() {
    const { width, top, left, height, rotateAngle } = this.state;
    return (
      <>
        <div
          style={
            true
              ? {
                  position: "absolute",
                  left: left + 1,
                  top: top + 1,
                  width: width,
                  height: height,
                  background: "black",
                  borderRadius: "50%",
                }
              : {
                  position: "absolute",
                  left: left,
                  top: top,
                  width: width + 1,
                  height: height + 1,
                  background: "black",
                  //borderRadius: "50%",
                }
          }
        ></div>
        <ResizableRect
          left={left}
          top={top}
          width={width}
          height={height}
          rotateAngle={rotateAngle}
          className="test"
          //zoomable="n, w, s, e, nw, ne, se, sw"
          //  onResize={this.handleResize}
          onDrag={this.handleDrag}
        />
      </>
    );
  }
}
export default DrawMarker;
