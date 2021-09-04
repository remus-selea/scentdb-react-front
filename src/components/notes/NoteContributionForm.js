import React, { useState } from 'react';
import { Panel } from 'primereact/panel';
import { Button } from 'primereact/button';
import { useForm } from "react-hook-form";
import { ProgressSpinner } from 'primereact/progressspinner';

import { DescriptionEditor } from '../contribution/DescriptionEditor';
import { ImageCropper } from '../contribution/ImageCropper';
import { NameInput } from '../contribution/NameInput';
import { SAVE_NOTE_URL } from '../../util/constants';
import axiosApiCall from '../../util/axiosService'

function NoteContributionForm(props) {
    const [imgFiles, setImgFiles] = useState([]);
    const [curImgFile, setCurImgFile] = useState(null);
    const [loading, setLoading] = useState(false);

    const { formState: { errors }, handleSubmit, control, reset } = useForm({
        defaultValues: {
            name: "",
        }
    });

    const onNoteFormSubmit = (data) => {
        console.log(data);

        const body = {
            name: data.name,
            description: JSON.stringify(data.description?.htmlValue),
        }

        let bodyFormData = new FormData();
        bodyFormData.append("note", JSON.stringify(body));

        if (imgFiles.length !== 0) {
            imgFiles.forEach(file => {
                bodyFormData.append("image", file);
            })
        }

        console.log("request body", body)
        const headers = { "Content-Type": "multipart/form-data" };

        saveNote(bodyFormData, headers);
    }

    const saveNote = async (data, headers) => {
        setLoading(true);
        const result = await axiosApiCall(SAVE_NOTE_URL, 'post', null, null, headers, data);
        setLoading(false);
        console.log("the result of the request to save a note is: ", result)

        setCurImgFile(null);
        setImgFiles([]);
        reset();
    }

    return (
        <div className="container flex-container">
            <Panel header="How to contribute" className="guidelines-panel">
                <div>
                    Here you can add the information of the notes. The data you enter will be validated by admins or moderators.
                </div>
                <Button label="Contribution guidelines" className="guidelines-link" />
            </Panel>

            <Panel className="details-panel">
                <form className="add-perfume-form" onSubmit={handleSubmit(onNoteFormSubmit)}>
                    {loading && <div className="spinner-overlay">
                        <ProgressSpinner />
                    </div>
                    }

                    <NameInput control={control} errors={errors} />

                    <DescriptionEditor control={control} errors={errors} />

                    <ImageCropper curImgFile={curImgFile} setCurImgFile={setCurImgFile} imgFiles={imgFiles} setImgFiles={setImgFiles} emptyMessage={"No note image selected."} />

                    <div className="button-row">
                        <Button label="Submit" type="submit" className="p-button" />
                    </div>

                </form>
            </Panel>
        </div >
    );
}

export default NoteContributionForm;
