import React, { useState, useRef } from 'react';
import { ProgressBar } from 'primereact/progressbar';
import { classNames } from 'primereact/utils';
import { formatBytes } from '../../util/imageCropUtils'

export function ImageCropperChooser(props) {
    const { setCurImgFile, totalSize } = props
    const fileInputRef = useRef(null);
    const [focused, setFocused] = useState(false);
    const size = totalSize / 100000;

    const chooseClassName = classNames('p-button p-fileupload-choose p-component', {
        'p-focus': focused,
    }, 'custom-choose-btn p-button-rounded p-button-outlined');

    const onSelectFile = (event) => {
        if (event.target.files && event.target.files.length > 0) {
            const reader = new FileReader();
            reader.fileName = event.target.files[0].name;
            reader.readAsDataURL(event.target.files[0]);

            reader.addEventListener('load', () => {
                setCurImgFile(() => {
                    const imgFile = {
                        base64Img: reader.result,
                        fileName: event.target.files[0].name
                    }
                    return imgFile;
                })
                event.target.value = '';
            });
        }

    };

    const choose = () => {
        fileInputRef.current.click();
    }

    const onFocus = () => {
        setFocused(true);
    }

    const onBlur = () => {
        setFocused(false);
    }

    return (
        <div className="p-fileupload-buttonbar">
            <span className={chooseClassName} onClick={choose} onFocus={onFocus} onBlur={onBlur} tabIndex={0}>
                <input
                    ref={fileInputRef}
                    type="file"
                    onChange={onSelectFile}
                    multiple={false}
                    accept="image/*" />
                <span className="p-button-icon p-button-icon-left p-clickable pi pi-fw pi-images"></span>
                <span className="p-button-label p-clickable">Choose local file</span>
            </span>
            <ProgressBar value={size} displayValueTemplate={() => `${formatBytes(totalSize)} / 10MB`} ></ProgressBar>
        </div>
    );

}
