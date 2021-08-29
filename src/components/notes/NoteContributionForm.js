import { Button } from 'primereact/button';
import React, { useRef, useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Panel } from 'primereact/panel';
import { Editor } from 'primereact/editor';
import { FileUpload } from 'primereact/fileupload';
import axiosApiCall from '../../util/axiosService'
import { Toast } from 'primereact/toast';
import { Tooltip } from 'primereact/tooltip';
import { SAVE_NOTE_URL } from '../../util/constants';

function NoteContributionForm(props) {
    const [name, setName] = useState("");
    const [description, setDescription] = useState('');
    const toast = useRef(null);

    const fileuploader = useRef(null);

    const emptyTemplate = () => {
        return (
            <div className="upload-empty-template">
                <i className="pi pi-image p-mt-3 p-p-5" style={{ 'fontSize': '5em', borderRadius: '50%', backgroundColor: 'var(--surface-b)', color: 'var(--surface-d)' }}></i>
                <span style={{ 'fontSize': '1.2em', color: 'var(--text-color-secondary)' }} className="mt-5">Drag and drop a single note image here</span>
            </div>
        )
    }

    const onNoteFormSubmit = (event) => {
        console.log("description", description);
        console.log("title", name);
        console.log("fileuploader file: ", fileuploader.current.files[0]);

        const body = {
            name: name,
            description: description,
        }

        let bodyFormData = new FormData();
        bodyFormData.append("note", JSON.stringify(body));
        bodyFormData.append("image", fileuploader.current.files[0]);

        const headers = { "Content-Type": "multipart/form-data" };
        saveNote(bodyFormData, headers);
    }

    const saveNote = async (data, headers) => {
        const result = await axiosApiCall(SAVE_NOTE_URL, 'post', null, null, headers, data);
        console.log("the result of the request to save a note is:")
        console.log(result)
    }


    const cancelOptions = {className: 'custom-cancel-btn' };

    return (
        <div className="container flex-container">
            <Toast ref={toast}></Toast>
            <Tooltip target=".custom-upload-btn" content="Upload" position="bottom" />

            <Panel header="How to contribute" className="guidelines-panel">
                <div>
                    Here you can add the information of the notes. The data you enter will be validated by admins or moderators.
                </div>
                <Button label="Contribution guidelines" className="guidelines-link" />
            </Panel>

            <Panel className="details-panel">

                <form encType="multipart/form-data" className="add-perfume-form" onSubmit={e => onNoteFormSubmit(e)}>

                    <div className="p-inputgroup input-wrapper ">
                        <span className="p-float-label">
                            <InputText id="name" value={name} onChange={(e) => setName(e.target.value)} />
                            <label htmlFor="name">Name</label>
                        </span>

                    </div>

                    <Editor style={{ height: '320px' }} value={description} onTextChange={(e) => setDescription(e.htmlValue)} placeholder="Type your description here" />


                    <FileUpload mode="advanced"  accept="image/*" maxFileSize={1000000} emptyTemplate={emptyTemplate} ref={fileuploader} cancelOptions={cancelOptions}/>


                    <Button label="Save" type="submit" />
                </form>

            </Panel>

        </div >
    );
}

export default NoteContributionForm;
