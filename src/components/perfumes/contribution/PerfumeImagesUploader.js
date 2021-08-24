import React, { useState, useCallback, useRef } from 'react';
import { ProgressBar } from 'primereact/progressbar';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { Tag } from 'primereact/tag';
import { classNames } from 'primereact/utils';
import { Ripple } from 'primereact/ripple';
import Cropper from 'react-easy-crop'
import getCroppedImg, { formatBytes } from '../../../util/cropImage'
import { confirmPopup } from 'primereact/confirmpopup';
import { MdCropFree } from "react-icons/md";
import { Slider } from 'primereact/slider';

import './PerfumeImagesUploader.scss'

export function PerfumeImagesUploader(props) {
    const imgFiles = props.imgFiles;
    const setImgFiles = props.setImgFiles;

    const [focused, setFocused] = useState(false);
    const fileInputRef = useRef(null);
    const [totalSize, setTotalSize] = useState(0);
    const [imgFile, setImgFile] = useState();
    const cancelOptions = { icon: 'pi pi-fw pi-times', className: 'custom-cancel-btn p-button-danger p-button-rounded p-button-outlined' };
    const chooseOptions = { icon: 'pi pi-fw pi-images', className: 'custom-choose-btn p-button-rounded p-button-outlined' };
    const acceptOptions = { icon: <MdCropFree />, className: 'custom-accept-btn p-button-success p-button-rounded p-button-outlined' };
    const value = totalSize / 100000;

    const onSelectFile = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            const reader = new FileReader();
            reader.fileName = e.target.files[0].name;
            reader.readAsDataURL(e.target.files[0]);

            reader.addEventListener('load', () => setImgFile(() => {
                const imgFile = {
                    base64Img: reader.result,
                    fileName: e.target.files[0].name
                }
                return imgFile;
            })

            );

        }
    };

    const emptyTemplate = (message) => {
        return (
            <div className="upload-empty-template">
                <i className="pi pi-image p-mt-3 p-p-5" style={{ 'fontSize': '5em', borderRadius: '50%', backgroundColor: 'var(--surface-b)', color: 'var(--surface-d)' }}></i>
                <span style={{ 'fontSize': '1.2em', color: 'var(--text-color-secondary)' }} className="mt-5">{message}</span>
            </div>
        )
    }

    const renderChooseButton = () => {
        const { className, style, icon, iconOnly } = chooseOptions;
        const chooseClassName = classNames('p-button p-fileupload-choose p-component', {
            'p-focus': focused,
            'p-button-icon-only': iconOnly
        }, className);
        const chooseIconClassName = classNames('p-button-icon p-button-icon-left p-clickable', {
            'pi pi-fw pi-plus': !icon
        }, icon);

        const label = <span className="p-button-label p-clickable">Choose local file</span>;
        return (
            <span className={chooseClassName} style={style} onClick={choose} onFocus={onFocus} onBlur={onBlur} tabIndex={0}>
                <input
                    ref={fileInputRef}
                    type="file"
                    onChange={onSelectFile}
                    multiple={false}
                    accept="image/*" />
                <span className={chooseIconClassName}></span>
                {label}
                <Ripple />
            </span>
        );
    }

    const choose = () => {
        fileInputRef.current.click();
    }

    const onFocus = () => {
        setFocused(true);
    }

    const onBlur = () => {
        setFocused(false);
    }

    const renderCroppedFiles = (files) => {

        if (imgFile && files.length == 0) {
            return (emptyTemplate("Images ready for upload will be displayed here."));
        }

        return (files?.map((file, index) => {
            return (
                <div className="cropped-files-container" key={index}>
                    <div className="cropped-file-details">
                        <img alt={file.name} role="presentation" src={URL.createObjectURL(file)} className="image-preview" />
                        <div className="cropped-file-name-date">
                            <div className="cropped-filename">{file.name}</div>
                            <small>{new Date().toLocaleDateString()}</small>
                        </div>
                    </div>
                    <Tag value={formatBytes(file.size)} severity="primary" className="cropped-file-size" />
                    <Button type="button" icon="pi pi-times" className="p-button-outlined p-button-rounded p-button-danger" onClick={(event) => confirmRemoval(event, index)} />
                </div>
            )
        })

        )
    }

    const deleteCroppedFile = (index) => {
        let fileToDelete = imgFiles[index];
        let _totalSize = totalSize - fileToDelete.size;
        setTotalSize(_totalSize);


        const newFiles = [...imgFiles];
        newFiles.splice(index, 1);

        setImgFiles(newFiles)
    }

    const minZoom = 0.8

    const [zoom, setZoom] = useState(1)
    const [crop, setCrop] = useState({ x: 0, y: 0 })
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)
    const toast = useRef(null);

    const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
        // console.log(croppedArea, "croppedAreaPixels:", croppedAreaPixels)
        setCroppedAreaPixels(croppedAreaPixels);
    }, [])

    const acceptImageCrop = async () => {
        const croppedImage = await getCroppedImg(
            imgFile,
            croppedAreaPixels
        )

        let _totalSize = totalSize + croppedImage.size;
        setTotalSize(_totalSize);

        setImgFiles([...imgFiles, croppedImage]);
    }


    const acceptRemoval = (index) => {
        console.log(index);
        deleteCroppedFile(index);
        toast.current.show({ severity: 'info', summary: 'Confirmed', detail: 'Crop has been removed.', life: 3000 });
    }

    const confirmRemoval = (event, index) => {
        confirmPopup({
            target: event.currentTarget,
            message: 'Do you want to remove this crop?',
            icon: 'pi pi-info-circle',
            acceptClassName: 'p-button-danger',
            accept: () => acceptRemoval(index)
        });

    };

    const cancelCropping = () => {
        setImgFile(null);
    }

    const handleZoomSliderChange = (event) => {
        setZoom(event.value);
    }


    return (
        <React.Fragment>

            <div className="input-wrapper">

                <div className="p-fileupload-buttonbar">
                    {renderChooseButton()}
                    <ProgressBar value={value} displayValueTemplate={() => `${formatBytes(totalSize)} / 10MB`} ></ProgressBar>
                </div>

                <div className="crop-container">
                    {!imgFile && (
                        emptyTemplate("No perfume images selected.")
                    )}
                    {imgFile && (
                        <Cropper
                            image={imgFile?.base64Img}
                            minZoom={minZoom}
                            crop={crop}
                            zoom={zoom}
                            maxZoom={3}
                            aspect={3 / 4}
                            onCropChange={setCrop}
                            onCropComplete={onCropComplete}
                            onZoomChange={setZoom}
                            restrictPosition={false}
                            zoomSpeed={0.1}
                        />

                    )}
                </div>

                {imgFile && (
                    <Slider
                        value={zoom}
                        min={minZoom}
                        max={3}
                        step={0.01}
                        aria-labelledby="Zoom"
                        onChange={(e) => handleZoomSliderChange(e)}
                    />
                )}

                {imgFile && (<div className="action-button-row">
                    <Button type="button" label="Cancel" icon={cancelOptions.icon || 'pi pi-times'} style={cancelOptions.style} className={cancelOptions.className}
                        onClick={() => {
                            cancelCropping();
                        }}
                    />
                    <Button type="button" label="Accept" icon={acceptOptions.icon} style={acceptOptions.style} className={acceptOptions.className}
                        onClick={() => {
                            acceptImageCrop();
                        }}
                    />
                </div>
                )}

                {renderCroppedFiles(imgFiles)}
            </div>

            <Toast ref={toast} position="bottom-left" />
        </React.Fragment>

    );
}
