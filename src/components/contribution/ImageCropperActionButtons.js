import React from 'react';
import { Button } from 'primereact/button';
import { MdCropFree } from "react-icons/md";
import getCroppedImg from '../../util/cropImage'

export function ImageCropperActionButtons(props) {
    const { curImgFile, setCurImgFile, totalSize, setTotalSize, imgFiles, setImgFiles, croppedAreaPixels } = props;

    const acceptImageCrop = async () => {
        const croppedImage = await getCroppedImg(
            curImgFile,
            croppedAreaPixels
        )

        let _totalSize = totalSize + croppedImage.size;
        setTotalSize(_totalSize);

        setImgFiles([...imgFiles, croppedImage]);
    }

    const cancelCropping = () => {
        setCurImgFile(null);
    }

    return (
        <React.Fragment>
            {curImgFile && (<div className="action-button-row">
                <Button
                    type="button"
                    label="Cancel"
                    icon='pi pi-fw pi-times'
                    className='custom-cancel-btn p-button-danger p-button-rounded p-button-outlined'
                    onClick={() => {
                        cancelCropping();
                    }}
                />
                <Button
                    type="button"
                    label="Accept"
                    icon={<MdCropFree />}
                    className='custom-accept-btn p-button-primary p-button-rounded p-button-outlined'
                    onClick={() => {
                        acceptImageCrop();
                    }}
                />
            </div>
            )}
        </React.Fragment>
    );
}
