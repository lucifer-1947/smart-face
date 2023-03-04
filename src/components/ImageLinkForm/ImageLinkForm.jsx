import React from "react";
import './ImageLinkForm.css'

const ImageLinkForm = () => {

    return (
        <div>
            <p>
                {"This smart face detects faces smartly in your pictures . Check it below"}
            </p>

            <div className="center">
                <div className=" form center pa4 br4 shadow-5">
                    <input className="f4 pa2 w-70 center br3" type="text" />
                    <button className="w-30 grow f4 link ph3 br3 pv2 dib white bg-red">Detect</button>
                </div>

            </div>

        </div>
        
    )

}

export default ImageLinkForm;