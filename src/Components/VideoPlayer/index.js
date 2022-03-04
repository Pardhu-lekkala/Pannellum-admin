import React, { Component } from "react";
import ReactPlayer from "react-player";
import './vd.css'

class VideoPlayer extends Component{
    constructor(props){
        super(props);
        this.state={
            diffX:0,
            diffY:0,
            dragging:false,
            styles:{}
        }
        this._dragStart=this._dragStart.bind(this);
        this._dragging=this._dragging.bind(this);
        this._dragEnd=this._dragEnd.bind(this);

    }

    _dragStart(e){
        this.setState({
            diffX: e.screenX-e.currentTarget.getBoundingClientRect().left,
            diffY: e.screenY-e.currentTarget.getBoundingClientRect().top,
            dragging:true
        })
    }

    _dragging(e){
        if(this.state.dragging){
            var left = e.screenX - this.state.diffX;
            var top = e.screenY - this.state.diffY;

            this.setState({
                styles:{
                    left:left,
                    top:top
                }
            });

        }
    }

    _dragEnd(){
        this.setState({
            dragging:false
        })
    }

    render(){
        return(
            <div onMouseDown={this._dragStart} onMouseMove={this._dragging} onMouseUp={this._dragEnd} style={this.state.styles} className="vd-main-cont">
            <ReactPlayer url='https://www.youtube.com/watch?v=JaMq4zMBc-A'
            width='500px'
            height='43%'
            className="vd-player"/>
        </div>
        )
    }
}
export default VideoPlayer;




{/*const VideoPlayer=()=>{
    return(
        <ReactPlayer url='https://www.youtube.com/watch?v=JaMq4zMBc-A'
        width='500px'
        height='40%'
        background="black"
        className="vd-player"/>
    )
}
export default VideoPlayer;*/}