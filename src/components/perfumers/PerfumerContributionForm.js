import { Button } from 'primereact/button';
import React, { useState, useEffect, useRef } from 'react';
import { Panel } from 'primereact/panel';
import { useForm } from "react-hook-form"
import { ProgressSpinner } from 'primereact/progressspinner';
import { Toast } from 'primereact/toast';

import { SAVE_PERFUMER_URL, GET_ALL_COMPANIES_URL } from '../../util/constants';
import { DescriptionEditor } from '../contribution/DescriptionEditor';
import { CompanyDropdown } from '../contribution/CompanyDropdown';
import axiosApiCall, {showErrorsInConsole} from '../../util/axiosService'
import { NameInput } from '../contribution/NameInput';
import { ImageCropper } from '../contribution/ImageCropper';

function PerfumerContributionForm(props) {
    const [selectedCompanyId, setSelectedCompanyId] = useState(null);
    const [companies, setCompanies] = useState([]);
    const [imgFiles, setImgFiles] = useState([]);
    const [curImgFile, setCurImgFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const toastRef = useRef(null);

    const { formState: { errors }, handleSubmit, control, reset, setError, clearErrors } = useForm({
        defaultValues: {
            name: "",
            company: "",
        }
    });

    useEffect(() => {
        const fetchData = async () => {
            const params = new URLSearchParams();
            await fetchCompanies(params);
        };
        fetchData();
    }, []);


    const fetchCompanies = async (params) => {
        const result = await axiosApiCall(GET_ALL_COMPANIES_URL, 'get', null, params);

        setCompanies(result);
    }

    const handlePerfumerSubmit = (event) => {
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
                    details: JSON.stringify(data.description?.htmlValue),
                    companyId: selectedCompanyId,
                    perfumeIdList: [],
                }
        
                let bodyFormData = new FormData();
                bodyFormData.append("perfumer", JSON.stringify(body));
        
                if (imgFiles.length !== 0) {
                    imgFiles.forEach(file => {
                        bodyFormData.append("image", file);
                    })
                }
        
                console.log("request body", body)
                const headers = { "Content-Type": "multipart/form-data" };
        
                savePerfumer(bodyFormData, headers)
            })(event)
        }
    }

    const savePerfumer = async (data, headers) => {
        try {
            setLoading(true);
            const result = await axiosApiCall(SAVE_PERFUMER_URL, 'post', null, null, headers, data);

            console.log("the result of the request to save a perfumer is: ", result)

            setCurImgFile(null);
            setImgFiles([]);
            reset();
        } catch (error) {
            showErrorsInConsole(error)
            toastRef.current.show({ severity: 'error', summary: 'Request failed', detail: 'The request to save the company has failed.', life: 3000 });
        }

        setLoading(false);
    }

    return (
        <div className="container flex-container">
            <Panel header="How to contribute" className="guidelines-panel">
                <div>
                    Here you can add the information of this specific perfumer. The data you enter will be validated by admins or moderators.
                </div>
                <Button label="Contribution guidelines" className="guidelines-link" />

            </Panel>

            <Panel className="details-panel">
                <form className="add-company-form" onSubmit={handlePerfumerSubmit}>
                    {loading && <div className="spinner-overlay">
                        <ProgressSpinner />
                    </div>
                    }

                    <NameInput control={control} errors={errors} />

                    <CompanyDropdown control={control} errors={errors} companies={companies} setSelectedCompanyId={setSelectedCompanyId} />

                    <DescriptionEditor control={control} errors={errors} />
                    
                    {errors.noImagesAdded && errors.noImagesAdded.types && (
                        <div className="p-error error-message">{errors.noImagesAdded.types.required}</div>
                    )}
                    
                    <ImageCropper curImgFile={curImgFile} setCurImgFile={setCurImgFile} imgFiles={imgFiles} setImgFiles={setImgFiles} emptyMessage={"No perfumer image selected."} />

                    <div className="button-row">
                        <Button label="Submit" type="submit" className="p-button" />
                    </div>

                </form>
            </Panel>

            <Toast ref={toastRef} position="bottom-left" />

        </div>
    );
}
export default PerfumerContributionForm;
