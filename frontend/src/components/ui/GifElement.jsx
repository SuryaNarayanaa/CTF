import React from 'react';

const GifElement = ({ position, path }) => {
    return (
        <div className={`gif-element ${position}`}>
            <img src={path} alt="Decorative" />
        </div>
    );
};

export default GifElement;
