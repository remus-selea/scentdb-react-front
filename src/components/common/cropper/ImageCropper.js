import React, { useState, useCallback } from 'react';
import Cropper from 'react-easy-crop'
import { CroppedImagesList } from './CroppedImagesList';
import { ImageCropperChooser } from './ImageCropperChooser';
import { ImageCropperActionButtons } from './ImageCropperActionButtons';
import { ImageCropperControls } from './ImageCropperControls';

import './ImageCropper.scss'

const minZoom = 0.8
const maxZoom = 3;
const aspect = 1; // or 3/4

export function ImageCropper(props) {
    const { curImgFile, setCurImgFile, imgFiles, setImgFiles, emptyMessage } = props

    const [totalSize, setTotalSize] = useState(0);
    const [zoom, setZoom] = useState(1)
    const [crop, setCrop] = useState({ x: 0, y: 0 })
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)

    const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
        // console.log(croppedArea, "croppedAreaPixels:", croppedAreaPixels)
        setCroppedAreaPixels(croppedAreaPixels);
    }, [])

    const emptyTemplate = () => {
        return (
            <div className="upload-empty-template">
                <i className="pi pi-image" style={{ 'fontSize': '5em', borderRadius: '50%', backgroundColor: 'var(--surface-b)', color: 'var(--surface-d)' }}></i>
                <span style={{ 'fontSize': '1.2em', color: 'var(--text-color-secondary)' }} className="mt-5">{emptyMessage}</span>
            </div>
        )
    }

    return (
        <React.Fragment>
            <div className="input-wrapper">
                <ImageCropperChooser setCurImgFile={setCurImgFile} totalSize={totalSize}></ImageCropperChooser>

                <div className="crop-container">
                    {!curImgFile && (
                        emptyTemplate()
                    )}
                    {curImgFile && (
                        <Cropper
                            image={curImgFile?.base64Img}
                            minZoom={minZoom}
                            crop={crop}
                            zoom={zoom}
                            maxZoom={maxZoom}
                            aspect={aspect}
                            onCropChange={setCrop}
                            onCropComplete={onCropComplete}
                            onZoomChange={setZoom}
                            restrictPosition={false}
                            zoomSpeed={0.1}
                        />
                    )}
                </div>

                <ImageCropperControls zoom={zoom} setZoom={setZoom} minZoom={minZoom} maxZoom={maxZoom} curImgFile={curImgFile} > </ImageCropperControls>

                <ImageCropperActionButtons curImgFile={curImgFile} setCurImgFile={setCurImgFile} totalSize={totalSize} setTotalSize={setTotalSize} imgFiles={imgFiles} setImgFiles={setImgFiles} croppedAreaPixels={croppedAreaPixels}> </ImageCropperActionButtons>

                <CroppedImagesList curImgFile={curImgFile} imgFiles={imgFiles} setImgFiles={setImgFiles} emptyTemplate={emptyTemplate} ></CroppedImagesList>
            </div>

        </React.Fragment>
    );
}
