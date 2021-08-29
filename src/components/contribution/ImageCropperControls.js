import React from 'react';
import { Slider } from 'primereact/slider';

export function ImageCropperControls(props) {
    const { curImgFile, minZoom, maxZoom, zoom, setZoom } = props;

    const handleZoomSliderChange = (event) => {
        setZoom(event.value);
    }

    return (
        <React.Fragment>
            {curImgFile && (
                <Slider
                    value={zoom}
                    min={minZoom}
                    max={maxZoom}
                    step={0.01}
                    aria-labelledby="Zoom"
                    onChange={(e) => handleZoomSliderChange(e)}
                />
            )}
        </React.Fragment>
    );
}
