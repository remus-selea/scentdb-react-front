import { Tag } from 'primereact/tag';
import { Button } from 'primereact/button';
import React, { useState, useRef } from 'react';
import { formatBytes } from '../../util/cropImage'
import { confirmPopup } from 'primereact/confirmpopup';
import { Toast } from 'primereact/toast';

export function CroppedImagesList(props) {
    const { curImgFile, imgFiles, setImgFiles, emptyTemplate } = props;
    const [totalSize, setTotalSize] = useState(0);
    const toastRef = useRef(null);

    const confirmRemoval = (event, index) => {
        confirmPopup({
            target: event.currentTarget,
            message: 'Do you want to remove this crop?',
            icon: 'pi pi-info-circle',
            acceptClassName: 'p-button-danger',
            accept: () => acceptRemoval(index)
        });
    };

    const acceptRemoval = (index) => {
        console.log(index);
        deleteCroppedFile(index);
        toastRef.current.show({ severity: 'info', summary: 'Confirmed', detail: 'Crop has been removed.', life: 3000 });
    }

    const deleteCroppedFile = (index) => {
        let fileToDelete = imgFiles[index];
        let _totalSize = totalSize - fileToDelete.size;
        setTotalSize(_totalSize);

        const newFiles = [...imgFiles];
        newFiles.splice(index, 1);

        setImgFiles(newFiles)
    }


    const renderCroppedFiles = (files) => {

        if (curImgFile && files.length === 0) {
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

    return (
        <React.Fragment>
            {renderCroppedFiles(imgFiles)}

            <Toast ref={toastRef} position="bottom-left" />

        </React.Fragment>
    );

}
