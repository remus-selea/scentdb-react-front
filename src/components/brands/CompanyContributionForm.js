import React, { useState, useRef } from 'react';
import { Panel } from 'primereact/panel';
import { Button } from 'primereact/button';
import { useForm } from "react-hook-form";
import { ProgressSpinner } from 'primereact/progressspinner';
import { Toast } from 'primereact/toast';

import { NameInput } from '../contribution/NameInput';
import { CompanyTypeDropdown } from '../contribution/CompanyTypeDropdown';
import { WebsiteInput } from '../contribution/WebsiteInput';
import { DescriptionEditor } from '../contribution/DescriptionEditor';
import { ImageCropper } from '../contribution/ImageCropper';
import { SAVE_COMPANY_URL } from '../../util/constants';
import axiosApiCall, { showErrorsInConsole } from '../../util/axiosService'

function CompanyContributionForm(props) {
    const [selectedCompanyTypeCode, setSelectedCompanyTypeCode] = useState(null);
    const [imgFiles, setImgFiles] = useState([]);
    const [curImgFile, setCurImgFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const toastRef = useRef(null);

    const { formState: { errors }, handleSubmit, control, setError, clearErrors, reset } = useForm({
        defaultValues: {
            name: "",
            companyType: "",
            website: ""
        }
    });

    const handleCompanySubmit = (event) => {
        event.preventDefault();

        if (imgFiles.length === 0) {
            setError("noImagesAdded", {
                types: {
                    required: "At least 1 image is required.",
                }
            });

        } else {
            clearErrors("noImagesAdded");

            handleSubmit((data) => {
                const body = {
                    name: data.name,
                    description: JSON.stringify(data.description?.htmlValue),
                    companyType: selectedCompanyTypeCode,
                    website: data.website,
                    perfumeIdList: [],
                    perfumerIdList: []
                }

                let bodyFormData = new FormData();
                bodyFormData.append("company", JSON.stringify(body));

                imgFiles.forEach(file => {
                    bodyFormData.append("image", file);
                })

                console.log("company submit request body", body)
                const headers = { "Content-Type": "multipart/form-data" };

                saveCompany(bodyFormData, headers)
            })(event)

        }

    }

    const saveCompany = async (data, headers) => {
        try {
            setLoading(true);
            const result = await axiosApiCall(SAVE_COMPANY_URL, 'post', null, null, headers, data);
            console.log("the result of the request to save a company is: ", result)

            setCurImgFile(null);
            setImgFiles([]);
            reset();

        } catch (error) {
            showErrorsInConsole(error);
            toastRef.current.show({ severity: 'error', summary: 'Request failed', detail: 'The request to save the company has failed.', life: 3000 });
        }

        setLoading(false);
    }

    return (
        <div className="container flex-container">
            <Panel header="How to contribute" className="guidelines-panel">
                <div>
                    Here you can add the information of this specific brand. The data you enter will be validated by admins or moderators.
                </div>
                <Button label="Contribution guidelines" className="guidelines-link" />
            </Panel>

            <Panel className="details-panel">
                <form className="add-perfume-form" onSubmit={handleCompanySubmit}>
                    {loading && <div className="spinner-overlay">
                        <ProgressSpinner />
                    </div>
                    }

                    <NameInput control={control} errors={errors} />

                    <CompanyTypeDropdown control={control} errors={errors} setSelectedCompanyTypeCode={setSelectedCompanyTypeCode} />

                    <WebsiteInput control={control} errors={errors} />

                    <DescriptionEditor control={control} errors={errors} />

                    {errors.noImagesAdded && errors.noImagesAdded.types && (
                        <div className="p-error error-message">{errors.noImagesAdded.types.required}</div>
                    )}

                    <ImageCropper curImgFile={curImgFile} setCurImgFile={setCurImgFile} imgFiles={imgFiles} setImgFiles={setImgFiles} emptyMessage={"No company image selected."} />

                    <div className="button-row">
                        <Button label="Submit" type="submit" className="p-button" />
                    </div>

                </form>
            </Panel>

            <Toast ref={toastRef} position="bottom-left" />

        </div>
    );
}

export default CompanyContributionForm;