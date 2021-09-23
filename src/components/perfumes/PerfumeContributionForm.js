import React, { useState, useEffect, useRef } from 'react';
import { Button } from 'primereact/button';
import { Panel } from 'primereact/panel';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Toast } from 'primereact/toast';

import { useForm } from "react-hook-form";
import { NameInput } from '../contribution/NameInput';
import { YearInput } from '../contribution/YearInput';
import { GenderDropdown } from '../contribution/GenderDropdown';
import { PerfumeTypeDropdown } from '../contribution/PerfumeTypeDropdown';
import { PerfumeCompanyDropdown } from '../contribution/PerfumeCompanyDropdown';
import { PerfumePerfumerDropdown } from '../contribution/PerfumePerfumerDropdown';
import { PerfumeTopNotesMultiselect } from '../contribution/PerfumeTopNotesMultiselect';
import { PerfumeMiddleNotesMultiselect } from '../contribution/PerfumeMiddleNotesMultiselect';
import { PerfumeBaseNotesMultiselect } from '../contribution/PerfumeBaseNotesMultiselect';
import { PerfumeBottleSizesMultiselect } from '../contribution/PerfumeBottleSizesMultiselect';
import { DescriptionEditor } from '../contribution/DescriptionEditor';
import { ImageCropper } from '../common/cropper/ImageCropper';
import { GET_ALL_COMPANIES_URL, GET_ALL_PERFUMERS_URL, GET_ALL_NOTES_URL, SAVE_PERFUME_URL, TOP_NOTES, BASE_NOTES, MIDDLE_NOTES } from '../../util/constants'
import axiosApiCall, { showErrorsInConsole } from '../../util/axiosService'

import "./PerfumeContributionForm.scss"

function PerfumeContributionForm() {
    const [selectedGenderCode, setSelectedGenderCode] = useState(null);
    const [selectedPerfumeTypeCode, setSelectedPerfumeTypeCode] = useState(null);
    const [selectedBottleSizesStr, setSelectedBottleSizesStr] = useState(null);
    const [selectedCompany, setSelectedCompany] = useState(null);
    const [selectedPerfumer, setSelectedPerfumer] = useState(null);
    const [selectedTopNotesIds, setSelectedTopNotesIds] = useState(null);
    const [selectedMiddleNotesIds, setSelectedMiddleNotesIds] = useState(null);
    const [selectedBaseNotesIds, setSelectedBaseNotesIds] = useState(null);

    const [companies, setCompanies] = useState([]);
    const [perfumers, setPerfumers] = useState(undefined);
    const [notes, setNotes] = useState([]);
    const [imgFiles, setImgFiles] = useState([]);
    const [curImgFile, setCurImgFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const toastRef = useRef(null);

    useEffect(() => {
        const fetchData = async () => {
            const params = new URLSearchParams();
            await fetchCompanies(params);
            await fetchPerfumers(params);
            await fetchNotes(params);
        };
        fetchData();
    }, []);

    const fetchCompanies = async (params) => {
        let apiUrl = GET_ALL_COMPANIES_URL;
        if (process.env.REACT_APP_USE_MOCK_API === 'true') {
          apiUrl = "/mocks/brands/get-all-brands.json";
          console.log("Using mock data")
        }
        const result = await axiosApiCall(apiUrl, 'get', null, params);
        if (result) {
            setCompanies(result);
        }
    }

    const fetchPerfumers = async (params) => {
        let apiUrl = GET_ALL_PERFUMERS_URL;
        if (process.env.REACT_APP_USE_MOCK_API === 'true') {
          apiUrl = "/mocks/perfumers/get-all-perfumers.json";
          console.log("Using mock data")
        }
        const result = await axiosApiCall(apiUrl, 'get', null, params);
        if (result) {
            setPerfumers(result);
        }
    }

    const fetchNotes = async (params) => {
        let apiUrl = GET_ALL_NOTES_URL;
        if (process.env.REACT_APP_USE_MOCK_API === 'true') {
          apiUrl = "/mocks/notes/get-all-notes.json";
          console.log("Using mock data")
        }
        const result = await axiosApiCall(apiUrl, 'get', null, params);
        if (result) {
            setNotes(result);
        }
    }

    const { formState: { errors }, handleSubmit, control, setError, clearErrors, reset } = useForm({
        defaultValues: {
            baseNotes: "",
            bottleSizes: "",
            company: "",
            gender: "",
            middleNotes: "",
            name: "",
            perfumer: "",
            topNotes: "",
            perfumeType: "",
            year: ""
        }
    });

    const handlePerfumeSubmit = (event) => {
        event.preventDefault();
        if (imgFiles.length === 0) {
            setError("noImagesAdded", {
                types: {
                    required: "At least 1 image is required.",
                }
            });

        } else {

            handleSubmit((data) => {
                const body = {
                    title: data.name,
                    launchYear: data.year,
                    description: data.description?.htmlValue,
                    gender: selectedGenderCode,
                    perfumeType: selectedPerfumeTypeCode,
                    bottleSizes: selectedBottleSizesStr,
                    perfumerId: selectedPerfumer.perfumerId,
                    companyId: selectedCompany.companyId,
                    perfumeNotes: [
                        {
                            notes: selectedBaseNotesIds,
                            type: BASE_NOTES
                        },
                        {
                            notes: selectedMiddleNotesIds,
                            type: MIDDLE_NOTES
                        },
                        {
                            notes: selectedTopNotesIds,
                            type: TOP_NOTES
                        }
                    ]
                }

                let bodyFormData = new FormData();
                bodyFormData.append("perfume", JSON.stringify(body));

                if (imgFiles.length !== 0) {
                    imgFiles.forEach(file => {
                        bodyFormData.append("image", file);
                    })

                }

                console.log("request body", body)
                const headers = { "Content-Type": "multipart/form-data" };

                savePerfume(bodyFormData, headers);
            })(event)

        }

    }

    const savePerfume = async (data, headers) => {
        try {
            setLoading(true);
            const result = await axiosApiCall(SAVE_PERFUME_URL, 'post', null, null, headers, data);
            console.log("the result of the request to save a perfume is:", result)

            // reset form
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
                    Here you can add the information of this specific perfume. The data you enter will be validated by administrators.
                </div>
                <Button label="Contribution guidelines" className="guidelines-link" />
            </Panel>

            <Panel className="details-panel">
                <form className="add-perfume-form" onSubmit={handlePerfumeSubmit}>
                    {loading && <div className="spinner-overlay">
                        <ProgressSpinner />
                    </div>
                    }

                    <NameInput control={control} errors={errors}></NameInput>

                    <YearInput control={control} errors={errors} ></YearInput>

                    <GenderDropdown control={control} errors={errors} setSelectedGenderCode={setSelectedGenderCode}></GenderDropdown>

                    <PerfumeTypeDropdown control={control} errors={errors} setSelectedPerfumeTypeCode={setSelectedPerfumeTypeCode}></PerfumeTypeDropdown>

                    <PerfumeCompanyDropdown control={control} errors={errors} companies={companies} setSelectedCompany={setSelectedCompany}></PerfumeCompanyDropdown>

                    <PerfumePerfumerDropdown control={control} errors={errors} perfumers={perfumers} setSelectedPerfumer={setSelectedPerfumer}></PerfumePerfumerDropdown>

                    <PerfumeTopNotesMultiselect control={control} errors={errors} notes={notes} setSelectedTopNotesIds={setSelectedTopNotesIds}></PerfumeTopNotesMultiselect>

                    <PerfumeMiddleNotesMultiselect control={control} errors={errors} notes={notes} setSelectedMiddleNotesIds={setSelectedMiddleNotesIds}></PerfumeMiddleNotesMultiselect>

                    <PerfumeBaseNotesMultiselect control={control} errors={errors} notes={notes} setSelectedBaseNotesIds={setSelectedBaseNotesIds}></PerfumeBaseNotesMultiselect>

                    <PerfumeBottleSizesMultiselect control={control} errors={errors} setSelectedBottleSizesStr={setSelectedBottleSizesStr}></PerfumeBottleSizesMultiselect>

                    <DescriptionEditor control={control} errors={errors}></DescriptionEditor>

                    {errors.noImagesAdded && errors.noImagesAdded.types && (
                        <div className="p-error error-message">{errors.noImagesAdded.types.required}</div>
                    )}

                    <ImageCropper curImgFile={curImgFile} setCurImgFile={setCurImgFile} imgFiles={imgFiles} setImgFiles={setImgFiles} emptyMessage={"No perfume image selected."} />

                    <div className="button-row">
                        <Button label="Submit" type="submit" className="p-button" />
                    </div>
                </form>
            </Panel>

            <Toast ref={toastRef} position="bottom-left" />

        </div >
    );
}

export default PerfumeContributionForm;
