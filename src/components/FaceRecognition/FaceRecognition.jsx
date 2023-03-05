import React from 'react'
import Boxes from '../Box/Boxes';
import './FaceRecognition.css'

const FaceRecognition = ({ imageurl, boundaries }) => {


    return (
        <div className='center ma'>
            <div className='absolute mt2'>
                <img id='input-image' src={imageurl} width="500px" height="auto" alt='' />
                <Boxes boundaries={boundaries} />
            </div>
        </div>
    )
}

export default FaceRecognition;