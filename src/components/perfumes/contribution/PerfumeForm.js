import React, { useState, useEffect, useRef } from 'react';
import { Button } from 'primereact/button';
import { Panel } from 'primereact/panel';
import { useForm } from "react-hook-form";
import { PerfumeNameInput } from './PerfumeNameInput';
import { PerfumeYearInput } from './PerfumeYearInput';
import { PerfumeGenderDropdown } from './PerfumeGenderDropdown';
import { PerfumeTypeDropdown } from './PerfumeTypeDropdown';
import { PerfumeCompanyDropdown } from './PerfumeCompanyDropdown';
import { PerfumePerfumerDropdown } from './PerfumePerfumerDropdown';
import { PerfumeTopNotesMultiselect } from './PerfumeTopNotesMultiselect';
import { PerfumeMiddleNotesMultiselect } from './PerfumeMiddleNotesMultiselect';
import { PerfumeBaseNotesMultiselect } from './PerfumeBaseNotesMultiselect';
import { PerfumeBottleSizesMultiselect } from './PerfumeBottleSizesMultiselect';
import { PerfumeDescriptionEditor } from './PerfumeDescriptionEditor';
import { PerfumeImagesUploader } from './PerfumeImagesUploader';
import { GET_ALL_COMPANIES_URL, GET_ALL_PERFUMERS_URL, GET_ALL_NOTES_URL, SAVE_PERFUME_URL, TOP_NOTES, BASE_NOTES, MIDDLE_NOTES } from '../../../util/constants'
import axiosApiCall from '../../../util/axiosService'
import "./PerfumeForm.scss"


function PerfumeContributionForm(props) {
    const { formState: { errors }, handleSubmit, control } = useForm();

    const [selectedGenderCode, setSelectedGenderCode] = useState(null);
    const [selectedPerfumeTypeCode, setSelectedPerfumeTypeCode] = useState(null);
    const [selectedBottleSizesStr, setSelectedBottleSizesStr] = useState(null);
    const [selectedCompany, setSelectedCompany] = useState(null);
    const [selectedPerfumer, setSelectedPerfumer] = useState(null);
    const [selectedTopNotesIds, setSelectedTopNotesIds] = useState(null);
    const [selectedMiddleNotesIds, setSelectedMiddleNotesIds] = useState(null);
    const [selectedBaseNotesIds, setSelectedBaseNotesIds] = useState(null);
    const [companies, setCompanies] = useState([]);
    const [perfumers, setPerfumers] = useState([]);
    const [notes, setNotes] = useState([]);

    const fileuploader = useRef(null);

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
        const result = await axiosApiCall(GET_ALL_COMPANIES_URL, 'get', null, params);
        setCompanies(result);
    }

    const fetchPerfumers = async (params) => {
        const result = await axiosApiCall(GET_ALL_PERFUMERS_URL, 'get', null, params);
        setPerfumers(result);
    }

    const fetchNotes = async (params) => {
        const result = await axiosApiCall(GET_ALL_NOTES_URL, 'get', null, params);
        setNotes(result);
    }

    const onTopNotesChange = (e) => {
        let notesIdsArr = [];
        e.value.forEach(note => {
            notesIdsArr.push(note.noteId)
        });

        setSelectedTopNotesIds(notesIdsArr);
    }

    const onMiddleNotesChange = (e) => {
        let notesIdsArr = [];
        e.value.forEach(note => {
            notesIdsArr.push(note.noteId)
        });

        setSelectedMiddleNotesIds(notesIdsArr);
    }

    const onBaseNotesChange = (e) => {
        let notesIdsArr = [];
        e.value.forEach(note => {
            notesIdsArr.push(note.noteId)
        });

        setSelectedBaseNotesIds(notesIdsArr);
    }

    const onBottleSizeChange = (e) => {
        let selectedBottleSizesArr = [];
        e.value.forEach(bottleSize => {
            selectedBottleSizesArr.push(bottleSize.size)
        });

        setSelectedBottleSizesStr(selectedBottleSizesArr.toString());
    }


    const handlePerfumeSubmit = (data) => {
        console.log(data);

        const body = {
            title: data.name,
            launchYear: data.year,
            description: JSON.stringify(data.description.htmlValue),
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

        if (fileuploader.current.files) {
            fileuploader.current.files.forEach(file => {
                bodyFormData.append("image", file);
            })

        }
        console.log("body", body)
        const headers = { "Content-Type": "multipart/form-data" };

        savePerfume(bodyFormData, headers)
    }


    const savePerfume = async (data, headers) => {
        const result = await axiosApiCall(SAVE_PERFUME_URL, 'post', null, null, headers, data);
        console.log("the result of the request to save a perfume is:")
        console.log(result)
    }

    const maxYear = new Date().getFullYear();

    return (
        <div className="container flex-container">
            <Panel header="How to contribute" className="guidelines-panel">
                <div>
                    Here you can add the information of this specific perfume. The data you enter will be validated by admins or moderators.
                </div>
                <Button label="Contribution guidelines" className="guidelines-link" />

            </Panel>

            <Panel className="details-panel">
                <form className="add-perfume-form" onSubmit={handleSubmit(handlePerfumeSubmit)}>

                    <PerfumeNameInput control={control} errors={errors}></PerfumeNameInput>

                    <PerfumeYearInput control={control} errors={errors} maxYear={maxYear} ></PerfumeYearInput>

                    <PerfumeGenderDropdown control={control} errors={errors} setSelectedGenderCode={setSelectedGenderCode}></PerfumeGenderDropdown>

                    <PerfumeTypeDropdown control={control} errors={errors} setSelectedPerfumeTypeCode={setSelectedPerfumeTypeCode}></PerfumeTypeDropdown>

                    <PerfumeCompanyDropdown control={control} errors={errors} setSelectedCompany={setSelectedCompany} companies={companies}></PerfumeCompanyDropdown>

                    <PerfumePerfumerDropdown control={control} errors={errors} setSelectedPerfumer={setSelectedPerfumer} perfumers={perfumers}></PerfumePerfumerDropdown>

                    <PerfumeTopNotesMultiselect control={control} errors={errors} notes={notes} onTopNotesChange={onTopNotesChange}></PerfumeTopNotesMultiselect>

                    <PerfumeMiddleNotesMultiselect control={control} errors={errors} notes={notes} onMiddleNotesChange={onMiddleNotesChange}></PerfumeMiddleNotesMultiselect>

                    <PerfumeBaseNotesMultiselect control={control} errors={errors} notes={notes} onBaseNotesChange={onBaseNotesChange}></PerfumeBaseNotesMultiselect>

                    <PerfumeBottleSizesMultiselect control={control} errors={errors} onBottleSizeChange={onBottleSizeChange}></PerfumeBottleSizesMultiselect>

                    <PerfumeDescriptionEditor control={control} errors={errors}></PerfumeDescriptionEditor>

                    <PerfumeImagesUploader fileuploader={fileuploader}></PerfumeImagesUploader>

                    <div className="button-row">
                        <Button label="Submit" type="submit" className="p-button" />
                    </div>
                </form>
            </Panel>
        </div >
    );
}

export default PerfumeContributionForm;
