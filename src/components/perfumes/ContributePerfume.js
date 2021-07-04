import { Button } from 'primereact/button';
import React, { useState, useEffect, useRef } from 'react';
import "./ContributePerfume.scss"
import { InputText } from 'primereact/inputtext';
import { Panel } from 'primereact/panel';
import { InputNumber } from 'primereact/inputnumber';
import { Dropdown } from 'primereact/dropdown';
import { MultiSelect } from 'primereact/multiselect';
import { Editor } from 'primereact/editor';
import { FileUpload } from 'primereact/fileupload';

import { PERFUME_TYPES, GET_ALL_COMPANIES_URL, GET_ALL_PERFUMERS_URL, GET_ALL_NOTES_URL, SAVE_PERFUME_URL, TOP_NOTES, BASE_NOTES, MIDDLE_NOTES } from '../../util/constants'
import axiosApiCall from '../../util/axiosService'


function ContributePerfume(props) {
    const [title, setTitle] = useState("");
    const [year, setYear] = useState(new Date().getFullYear());

    const [selectedGender, setSelectedGender] = useState(null);
    const [selectedGenderCode, setSelectedGenderCode] = useState(null);

    const [selectedPerfumeType, setSelectedPerfumeType] = useState(null);
    const [selectedPerfumeTypeCode, setSelectedPerfumeTypeCode] = useState(null);

    const [selectedBottleSizes, setSelectedBottleSizes] = useState(null);
    const [selectedBottleSizesStr, setSelectedBottleSizesStr] = useState(null);

    const [selectedCompany, setSelectedCompany] = useState(null);
    const [selectedPerfumer, setSelectedPerfumer] = useState(null);
    const [selectedTopNotes, setSelectedTopNotes] = useState(null);
    const [selectedTopNotesIds, setSelectedTopNotesIds] = useState(null);
    const [selectedMiddleNotes, setSelectedMiddleNotes] = useState(null);
    const [selectedMiddleNotesIds, setSelectedMiddleNotesIds] = useState(null);
    const [selectedBaseNotes, setSelectedBaseNotes] = useState(null);
    const [selectedBaseNotesIds, setSelectedBaseNotesIds] = useState(null);

    const [description, setDescription] = useState(null);
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


    const bottleSizes = [
        { size: '200ml', code: '200ml' },
        { size: '175ml', code: '175ml' },
        { size: '150ml', code: '150ml' },
        { size: '125ml', code: '125ml' },
        { size: '100ml', code: '100ml' },
        { size: '75ml', code: '75ml' },
        { size: '60ml', code: '60ml' },
        { size: '50ml', code: '50ml' },
        { size: '40ml', code: '40ml' },
        { size: '35ml', code: '35ml' },
        { size: '30ml', code: '30ml' },
        { size: '25ml', code: '25ml' },
        { size: '20ml', code: '20ml' },
        { size: '15ml', code: '15ml' },
        { size: '10ml', code: '10ml' },
        { size: '7.5ml', code: '7.5ml' },
        { size: '5ml', code: '5ml' },
        { size: '1.5ml', code: '1.5ml' },
        { size: '1ml', code: '1ml' },
    ];

    const genders = [
        { name: 'Male', code: 'MALE' },
        { name: 'Female', code: 'FEMALE' },
        { name: 'Unisex', code: 'UNISEX' },
    ];

    const perfumeTypes = [
        { perfumeType: PERFUME_TYPES.EXTRAIT_DE_PARFUM, code: Object.keys(PERFUME_TYPES)[0] },
        { perfumeType: PERFUME_TYPES.ESPIRIT_DE_PARFUM, code: Object.keys(PERFUME_TYPES)[1] },
        { perfumeType: PERFUME_TYPES.EAU_DE_PARFUM, code: Object.keys(PERFUME_TYPES)[2] },
        { perfumeType: PERFUME_TYPES.EAU_DE_TOILETTE, code: Object.keys(PERFUME_TYPES)[3] },
        { perfumeType: PERFUME_TYPES.EAU_DE_COLOGNE, code: Object.keys(PERFUME_TYPES)[4] },
        { perfumeType: PERFUME_TYPES.EAU_FRAICHE, code: Object.keys(PERFUME_TYPES)[5] },

    ];


    const onPerfumeTypeChange = (e) => {
        setSelectedPerfumeTypeCode(e.value.code);
        setSelectedPerfumeType(e.value);
    }

    const onGenderchange = (e) => {
        setSelectedGenderCode(e.value.code);
        setSelectedGender(e.value);
    }

    const selectedGenderTemplate = (option, props) => {
        if (option) {
            return (
                <div className="country-item country-item-value">
                    <div>{option.name}</div>
                </div>
            );
        }

        return (
            <span>
                {props.placeholder}
            </span>
        );
    }

    const genderOptionTemplate = (option) => {
        return (
            <div className="country-item">
                <div>{option.name}</div>
            </div>
        );
    }


    const onCompanyChange = (e) => {
        setSelectedCompany(e.value);
    }


    const onPerfumerChange = (e) => {
        setSelectedPerfumer(e.value);
    }

    const onTopNotesChange = (e) => {
        let notesIdsArr = [];
        e.value.forEach(note => {
            notesIdsArr.push(note.noteId)
        });

        setSelectedTopNotesIds(notesIdsArr);
        setSelectedTopNotes(e.value);
    }

    const onMiddleNotesChange = (e) => {
        let notesIdsArr = [];
        e.value.forEach(note => {
            notesIdsArr.push(note.noteId)
        });

        setSelectedMiddleNotesIds(notesIdsArr);
        setSelectedMiddleNotes(e.value);
    }

    const onBaseNotesChange = (e) => {
        let notesIdsArr = [];
        e.value.forEach(note => {
            notesIdsArr.push(note.noteId)
        });

        setSelectedBaseNotesIds(notesIdsArr);
        setSelectedBaseNotes(e.value);
    }

    const onBottleSizeChange = (e) => {
        let selectedBottleSizesArr = [];
        e.value.forEach(bottleSize => {
            selectedBottleSizesArr.push(bottleSize.size)
        });

        setSelectedBottleSizesStr(selectedBottleSizesArr.toString());
        setSelectedBottleSizes(e.value);
    }


    const handlePerfumeSubmit = (e) => {
        e.preventDefault()

        const body = {
            title: title,
            launchYear: year,
            description: description,
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

        fileuploader.current.files.forEach(file => {
            bodyFormData.append("image", file);
        })

        const headers = { "Content-Type": "multipart/form-data" };

        console.log("body", body)

        savePerfume(bodyFormData, headers)
    }


    const savePerfume = async (data, headers) => {
        const result = await axiosApiCall(SAVE_PERFUME_URL, 'post', null, null, headers, data);
        console.log("the result of the request to save a perfume is:")
        console.log(result)
    }

    const cancelOptions = { className: 'custom-cancel-btn' };

    const emptyTemplate = () => {
        return (
            <div className="upload-empty-template">
                <i className="pi pi-image p-mt-3 p-p-5" style={{ 'fontSize': '5em', borderRadius: '50%', backgroundColor: 'var(--surface-b)', color: 'var(--surface-d)' }}></i>
                <span style={{ 'fontSize': '1.2em', color: 'var(--text-color-secondary)' }} className="mt-5">Add images of the perfume</span>
            </div>
        )
    }
    return (
        <div className="container flex-container">
            <Panel header="How to contribute" className="guidelines-panel">
                <div>
                    Here you can add the information of this specific perfume. The data you enter will be validated by admins or moderators.
                </div>
                <Button label="Contribution guidelines" className="guidelines-link" />

            </Panel>

            <Panel className="details-panel">
                <form className="add-perfume-form" onSubmit={(e) => handlePerfumeSubmit(e)}>

                    <div className="p-inputgroup input-wrapper ">
                        <span className="p-float-label">
                            <InputText id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
                            <label htmlFor="title">Title</label>
                        </span>

                    </div>

                    <div className="p-inputgroup input-wrapper ">
                        <span className="p-float-label year-input-label">
                            <InputNumber id="year" value={year} onValueChange={(e) => setYear(e.value)} mode="decimal" useGrouping={false} min={1900} max={new Date().getFullYear()} />
                            <label htmlFor="year">Year</label>
                        </span>
                    </div>

                    <div className="p-inputgroup input-wrapper ">
                        <span className="p-float-label">
                            <Dropdown value={selectedGender}
                                options={genders}
                                onChange={onGenderchange}
                                optionLabel="name"
                                placeholder="&#8205;"
                                valueTemplate={selectedGenderTemplate}
                                itemTemplate={genderOptionTemplate} />

                            <label htmlFor="gender">Gender</label>
                        </span>
                    </div>

                    <div className="p-inputgroup input-wrapper">
                        <span className="p-float-label">
                            <Dropdown
                                value={selectedPerfumeType}
                                options={perfumeTypes}
                                onChange={onPerfumeTypeChange}
                                optionLabel="perfumeType"
                                placeholder="&#8205;"
                            />

                            <label htmlFor="perfumeType">Perfume type</label>
                        </span>
                    </div>

                    <div className="p-inputgroup input-wrapper ">
                        <Dropdown value={selectedCompany} options={companies} onChange={onCompanyChange} optionLabel="name" filter showClear filterBy="name" placeholder="Select a Company"
                        />
                    </div>

                    <div className="p-inputgroup input-wrapper ">
                        <Dropdown value={selectedPerfumer} options={perfumers} onChange={onPerfumerChange} optionLabel="name" filter showClear filterBy="name" placeholder="Select a Perfumer"
                        />
                    </div>

                    <div className="p-inputgroup input-wrapper top-notes-multiselect" >
                        <span className="p-float-label">
                            <MultiSelect value={selectedTopNotes} options={notes} onChange={onTopNotesChange} optionLabel="name"
                                filter
                                display="chip"
                            />
                            <label htmlFor="topNotes">Top Notes</label>
                        </span>
                    </div>

                    <div className="p-inputgroup input-wrapper top-notes-multiselect" >
                        <span className="p-float-label">
                            <MultiSelect value={selectedMiddleNotes} options={notes} onChange={onMiddleNotesChange} optionLabel="name"
                                filter
                                display="chip"
                            />
                            <label htmlFor="middleNotes">Middle Notes</label>
                        </span>
                    </div>

                    <div className="p-inputgroup input-wrapper top-notes-multiselect" >
                        <span className="p-float-label">
                            <MultiSelect value={selectedBaseNotes} options={notes} onChange={onBaseNotesChange} optionLabel="name"
                                filter
                                display="chip"
                            />
                            <label htmlFor="baseNotes">Base Notes</label>
                        </span>
                    </div>



                    <div className="p-inputgroup input-wrapper bottle-size-multiselect" >
                        <span className="p-float-label">
                            <MultiSelect value={selectedBottleSizes} options={bottleSizes} onChange={(e) => onBottleSizeChange(e)} optionLabel="size"
                                placeholder="&#8205;"
                                filter
                                display="chip"
                            />
                            <label htmlFor="bottleSizes">Bottle sizes</label>
                        </span>
                    </div>



                    <Editor style={{ height: '320px' }} value={description} onTextChange={(e) => setDescription(e.htmlValue)} placeholder="Type your description here" />

                    <FileUpload mode="advanced" accept="image/*" maxFileSize={1000000} emptyTemplate={emptyTemplate} ref={fileuploader} cancelOptions={cancelOptions} />

                    <Button label="Submit" type="submit" className="p-button-outlined" />
                </form>
            </Panel>
        </div>
    );
}

export default ContributePerfume;
