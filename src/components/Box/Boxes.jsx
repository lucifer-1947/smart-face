import React from 'react';
import Box from './Box';

const Boxes = ({ boundaries }) => {

    return (
        <>
            {boundaries.length}?
            {
                boundaries.map((boundary) => <Box key={boundaries.id} box={boundary} />)

            }:<></>
        </>
    )
}

export default Boxes;

