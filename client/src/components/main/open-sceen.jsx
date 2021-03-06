import React, { Component } from 'react';
import { url } from '../../config.json';

class OpenScreen extends Component {
    state = {  }
    
    render() { 
        return ( 
            <div id='open-creen' className="openScreen container-fluid px-0  d-none d-sm-block">

                <video className="bgVideo" autoPlay loop muted src={`${url}/videos/openSceen/SketchDrawing.mp4`}></video>

                <div className="container">
                    <div className="center">
                        <div className="headLine text-center pt-1">
                            <h1 className="display-1"><span className="font-weight-bold">ANU</span> ARCHITECTS</h1>
                            <h2 className="display-4">מתכנון לעיצוב</h2>
                        </div>
                    </div>
                </div>

            </div>
         );
    }
}
 
export default OpenScreen;