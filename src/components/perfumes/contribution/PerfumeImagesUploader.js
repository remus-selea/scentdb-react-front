import React from 'react';
import { FileUpload } from 'primereact/fileupload';

export function PerfumeImagesUploader(props) {

    const cancelOptions = { className: 'custom-cancel-btn' };

    const emptyTemplate = () => {
        return (
            <div className="upload-empty-template">
                <i className="pi pi-image p-mt-3 p-p-5" style={{ 'fontSize': '5em', borderRadius: '50%', backgroundColor: 'var(--surface-b)', color: 'var(--surface-d)' }}></i>
                <span style={{ 'fontSize': '1.2em', color: 'var(--text-color-secondary)' }} className="mt-5">Add images of the perfume</span>
            </div>
        )
    }

    return (<div className="p-inputgroup input-wrapper">
        <FileUpload className="fille-upload" mode="advanced" accept="image/*" maxFileSize={1000000} emptyTemplate={emptyTemplate} ref={props.fileuploader} cancelOptions={cancelOptions} />
    </div>);
}
