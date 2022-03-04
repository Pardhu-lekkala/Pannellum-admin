{/*<div>
                    <Router>
                    {pageLength>0?<div className="pg-cont" onClick={() => {clickToggleOne(true);pageNameRes();}}>
                    <Link to={"addpage/"+pages[0].id}><h1 className="pg-text2">{`${pages[0].pageName}-${pages[0].id}`}</h1></Link>
                    </div>:null}
                    </Router>
                    <Router>
                    {pageLength>1?<div className="pg-cont" onClick={() => {clickToggleTwo(true);pageNameRes();}}>
                    <Link to={"addpage/"+pages[1].id}><h1 className="pg-text2">{`${pages[1].pageName}-${pages[1].id}`}</h1></Link>
                    </div>:null}
                    </Router>
                    <Router>
                    {pageLength>2?<div className="pg-cont" onClick={() => {clickToggleThree(true);pageNameRes();}}>
                    <Link to={"addpage/"+pages[2].id}><h1 className="pg-text2">{`${pages[2].pageName}-${pages[2].id}`}</h1></Link>
                    </div>:null}
                    </Router>
                    <Router>
                    {pageLength>3?<div className="pg-cont" onClick={() => {clickToggleFour(true);pageNameRes();}}>
                    <Link to={"addpage/"+pages[3].id}><h1 className="pg-text2">{`${pages[3].pageName}-${pages[3].id}`}</h1></Link>
                    </div>:null}
                    </Router>
                    <Router>
                    {pageLength>4?<div className="pg-cont" onClick={() => {clickToggleFive(true);pageNameRes();}}>
                    <Link to={"addpage/"+pages[4].id}><h1 className="pg-text2">{`${pages[4].pageName}-${pages[4].id}`}</h1></Link>
                    </div>:null}
                    </Router>
</div>*/}





{/*<div>
                    {vdLength>=1?<div className="data-container">
                                <div style={{width:"570px"}}>
                                <p className="data1">{videoArea[0].videoURL}</p>
                                </div>
                                <div style={{width:"220px"}}>
                                    <button className="des-btn2">{videoArea[0].videoType}</button>    
                                </div>
                                <div className="coor-cont">
                                    <img src={loc} className="loc-img"/>
                                    <p className="data4">{videoArea[0].position}</p>
                                </div>
                                <div className="del-cont">
                                    <img src={edit} className="ed-img" onClick={()=>{seteditVideoAreaPopUp(true);setEditVideoId(videoArea[0].id)}}/>
                                    <img src={del} className="del-img" onClick={()=>{seteditVideoAreaPopUpd(true);setDeleteVideoId(videoArea[0].id)}}/>
                                </div>
                            </div>:null} 

                    {vdLength>=2?<div className="data-container">
                                <div style={{width:"570px"}}>
                                <p className="data1">{videoArea[1].videoURL}</p>
                                </div>
                                <div style={{width:"220px"}}>
                                    <button className="des-btn2">{videoArea[1].videoType}</button>    
                                </div>
                                <div className="coor-cont">
                                    <img src={loc} className="loc-img"/>
                                    <p className="data4">{videoArea[1].position}</p>
                                </div>
                                <div className="del-cont">
                                    <img src={edit} className="ed-img" onClick={()=>{seteditVideoAreaPopUp(true);setEditVideoId(videoArea[1].id)}}/>
                                    <img src={del} className="del-img" onClick={()=>{seteditVideoAreaPopUpd(true);setDeleteVideoId(videoArea[1].id)}}/>
                                </div>
                            </div>:null} 
                    
                    {vdLength>=3?<div className="data-container">
                                <div style={{width:"570px"}}>
                                <p className="data1">{videoArea[2].videoURL}</p>
                                </div>
                                <div style={{width:"220px"}}>
                                    <button className="des-btn2">{videoArea[2].videoType}</button>    
                                </div>
                                <div className="coor-cont">
                                    <img src={loc} className="loc-img"/>
                                    <p className="data4">{videoArea[2].position}</p>
                                </div>
                                <div className="del-cont">
                                    <img src={edit} className="ed-img" onClick={()=>{seteditVideoAreaPopUp(true);setEditVideoId(videoArea[2].id)}}/>
                                    <img src={del} className="del-img" onClick={()=>{seteditVideoAreaPopUpd(true);setDeleteVideoId(videoArea[2].id)}}/>
                                </div>
                            </div>:null} 

                    {vdLength>=4?<div className="data-container">
                                <div style={{width:"570px"}}>
                                <p className="data1">{videoArea[3].videoURL}</p>
                                </div>
                                <div style={{width:"220px"}}>
                                    <button className="des-btn2">{videoArea[3].videoType}</button>    
                                </div>
                                <div className="coor-cont">
                                    <img src={loc} className="loc-img"/>
                                    <p className="data4">{videoArea[3].position}</p>
                                </div>
                                <div className="del-cont">
                                    <img src={edit} className="ed-img" onClick={()=>{seteditVideoAreaPopUp(true);setEditVideoId(videoArea[3].id)}}/>
                                    <img src={del} className="del-img" onClick={()=>{seteditVideoAreaPopUpd(true);setDeleteVideoId(videoArea[3].id)}}/>
                                </div>
                            </div>:null} 

                    {vdLength>=5?<div className="data-container">
                                <div style={{width:"570px"}}>
                                <p className="data1">{videoArea[4].videoURL}</p>
                                </div>
                                <div style={{width:"220px"}}>
                                    <button className="des-btn2">{videoArea[4].videoType}</button>    
                                </div>
                                <div className="coor-cont">
                                    <img src={loc} className="loc-img"/>
                                    <p className="data4">{videoArea[4].position}</p>
                                </div>
                                <div className="del-cont">
                                    <img src={edit} className="ed-img" onClick={()=>{seteditVideoAreaPopUp(true);setEditVideoId(videoArea[4].id)}}/>
                                    <img src={del} className="del-img" onClick={()=>{seteditVideoAreaPopUpd(true);setDeleteVideoId(videoArea[4].id)}}/>
                                </div>
                            </div>:null} 
                            </div>*/}


{/*<div className="data-container">
                                <p className="data1">{markers[0].markerName}</p>
                                <div style={{width:"220px"}}>
                                    <button className="labelOn">{`${markers[0].VisibileLabel?"LABEL-ON":"LABEL-OFF"}`}</button>
                                </div>
                                <div style={{width:"240px",marginLeft:"15px"}}>
                                    <button className="des-btn">Link</button>    
                                <p className="data3">{markers[0].destinationLink}</p>
                                </div>
                                <div className="coor-cont">
                                    <img src={loc} className="loc-img"/>
                                    <p className="data4">{markers[0].markerPosition}</p>
                                </div>
                                <div className="del-cont">
                                    <img src={edit} className="ed-img" onClick={()=>{seteditMarkerPopUpOpen(true);setEditMarkerId(markers[0].id)}}/>
                                    <img src={del} className="del-img" onClick={()=>{setvideoAreaPopupOpen(true);setDeleteMarkerId(markers[0].id)}}/>
                                </div>
                            </div>*/}

{/*<MarkData 
                        markerName={markerName} 
                        transVideo={markVideo}
                        label={labelSwitch} 
                        destinationType={destinationType}
                        destinationLink={destinationLink}
                        xCoordinate={xCoordinate}
                        yCoordinate={yCoordinate}
                        pageLen={pageLength}
                    />*/}
{/*<div>
                    {markerLength>=1?<div className="data-container">
                                <p className="data1">{markers[0].markerName}</p>
                                <div style={{width:"220px"}}>
                                    <button className="labelOn">{`${markers[0].VisibileLabel?"LABEL-ON":"LABEL-OFF"}`}</button>
                                </div>
                                <div style={{width:"240px",marginLeft:"15px"}}>
                                    <button className="des-btn">Link</button>    
                                <p className="data3">{markers[0].destinationLink}</p>
                                </div>
                                <div className="coor-cont">
                                    <img src={loc} className="loc-img"/>
                                    <p className="data4">{markers[0].markerPosition}</p>
                                </div>
                                <div className="del-cont">
                                    <img src={edit} className="ed-img" onClick={()=>{seteditMarkerPopUpOpen(true);setEditMarkerId(markers[0].id)}}/>
                                    <img src={del} className="del-img" onClick={()=>{setvideoAreaPopupOpen(true);setDeleteMarkerId(markers[0].id)}}/>
                                </div>
                            </div>:null}
                    
                            {markerLength>=2?<div className="data-container">
                                <p className="data1">{markers[1].markerName}</p>
                                <div style={{width:"220px"}}>
                                    <button className="labelOn">{`${markers[1].VisibileLabel?"LABEL-ON":"LABEL-OFF"}`}</button>
                                </div>
                                <div style={{width:"240px",marginLeft:"15px"}}>
                                    <button className="des-btn">Link</button>    
                                <p className="data3">{markers[1].destinationLink}</p>
                                </div>
                                <div className="coor-cont">
                                    <img src={loc} className="loc-img"/>
                                    <p className="data4">{markers[1].markerPosition}</p>
                                </div>
                                <div className="del-cont">
                                    <img src={edit} className="ed-img" onClick={()=>{seteditMarkerPopUpOpen(true);setEditMarkerId(markers[1].id)}}/>
                                    <img src={del} className="del-img" onClick={()=>{setvideoAreaPopupOpen(true);setDeleteMarkerId(markers[1].id)}}/>
                                </div>
                            </div>:null}

                            {markerLength>=3?<div className="data-container">
                                <p className="data1">{markers[2].markerName}</p>
                                <div style={{width:"220px"}}>
                                    <button className="labelOn">{`${markers[2].VisibileLabel?"LABEL-ON":"LABEL-OFF"}`}</button>
                                </div>
                                <div style={{width:"240px",marginLeft:"15px"}}>
                                    <button className="des-btn">Link</button>    
                                <p className="data3">{markers[2].destinationLink}</p>
                                </div>
                                <div className="coor-cont">
                                    <img src={loc} className="loc-img"/>
                                    <p className="data4">{markers[2].markerPosition}</p>
                                </div>
                                <div className="del-cont">
                                    <img src={edit} className="ed-img" onClick={()=>{seteditMarkerPopUpOpen(true);setEditMarkerId(markers[2].id)}}/>
                                    <img src={del} className="del-img" onClick={()=>{setvideoAreaPopupOpen(true);setDeleteMarkerId(markers[2].id)}}/>
                                </div>
                            </div>:null}

                            {markerLength>=4?<div className="data-container">
                                <p className="data1">{markers[3].markerName}</p>
                                <div style={{width:"220px"}}>
                                    <button className="labelOn">{`${markers[3].VisibileLabel?"LABEL-ON":"LABEL-OFF"}`}</button>
                                </div>
                                <div style={{width:"240px",marginLeft:"15px"}}>
                                    <button className="des-btn">Link</button>    
                                <p className="data3">{markers[3].destinationLink}</p>
                                </div>
                                <div className="coor-cont">
                                    <img src={loc} className="loc-img"/>
                                    <p className="data4">{markers[3].markerPosition}</p>
                                </div>
                                <div className="del-cont">
                                    <img src={edit} className="ed-img" onClick={()=>{seteditMarkerPopUpOpen(true);setEditMarkerId(markers[3].id)}}/>
                                    <img src={del} className="del-img" onClick={()=>{setvideoAreaPopupOpen(true);setDeleteMarkerId(markers[3].id)}}/>
                                </div>
                            </div>:null}

                            {markerLength>=5?<div className="data-container">
                                <p className="data1">{markers[4].markerName}</p>
                                <div style={{width:"220px"}}>
                                    <button className="labelOn">{`${markers[4].VisibileLabel?"LABEL-ON":"LABEL-OFF"}`}</button>
                                </div>
                                <div style={{width:"240px",marginLeft:"15px"}}>
                                    <button className="des-btn">Link</button>    
                                <p className="data3">{markers[4].destinationLink}</p>
                                </div>
                                <div className="coor-cont">
                                    <img src={loc} className="loc-img"/>
                                    <p className="data4">{markers[4].markerPosition}</p>
                                </div>
                                <div className="del-cont">
                                    <img src={edit} className="ed-img" onClick={()=>{seteditMarkerPopUpOpen(true);setEditMarkerId(markers[4].id)}}/>
                                    <img src={del} className="del-img" onClick={()=>{setvideoAreaPopupOpen(true);setDeleteMarkerId(markers[4].id)}}/>
                                </div>
                         </div>:null}
                   </div>*/}



