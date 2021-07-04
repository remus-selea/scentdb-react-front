import { Button } from 'primereact/button';
import React, { useState, useRef, useEffect } from 'react';
import { InputText } from 'primereact/inputtext';
import { Panel } from 'primereact/panel';
import { Editor } from 'primereact/editor';
import { SAVE_PERFUMER_URL, GET_ALL_COMPANIES_URL } from '../../util/constants';
import { FileUpload } from 'primereact/fileupload';
import { Dropdown } from 'primereact/dropdown';

import axiosApiCall from '../../util/axiosService'

function PerfumerContributionForm(props) {
    const [name, setName] = useState("");
    const [details, setDetails] = useState('');
    const [selectedCompany, setSelectedCompany] = useState(null);
    const [companies, setCompanies] = useState([]);

    const fileuploader = useRef(null);

    const fetchCompanies = async (params) => {
        const result = await axiosApiCall(GET_ALL_COMPANIES_URL, 'get', null, params);
        // console.log("the result of the call to get all companies is:")
        // console.log(result)

        setCompanies(result);
    }

    useEffect(() => {
        const fetchData = async () => {
            const params = new URLSearchParams();
            await fetchCompanies(params);
        };
        fetchData();
    }, []);

    const handlePerfumerSubmit = (e) => {
        const body = {
            name: name,
            details: details,
            companyId: selectedCompany.companyId,
            perfumeIdList: [],
        }

        let bodyFormData = new FormData();
        bodyFormData.append("perfumer", JSON.stringify(body));
        bodyFormData.append("image", fileuploader.current.files[0]);

        const headers = { "Content-Type": "multipart/form-data" };

        savePerfumer(bodyFormData, headers)
    }

    const savePerfumer = async (data, headers) => {
        const result = await axiosApiCall(SAVE_PERFUMER_URL, 'post', null, null, headers, data);
        console.log("the result of the request to save a perfumer is:")
        console.log(result)
    }

    const emptyTemplate = () => {
        return (
            <div className="upload-empty-template">
                <i className="pi pi-image p-mt-3 p-p-5" style={{ 'fontSize': '5em', borderRadius: '50%', backgroundColor: 'var(--surface-b)', color: 'var(--surface-d)' }}></i>
                <span style={{ 'fontSize': '1.2em', color: 'var(--text-color-secondary)' }} className="mt-5">Add an image of the perfumer</span>
            </div>
        )
    }

    const cancelOptions = { className: 'custom-cancel-btn' };

    const onCompanyChange = (e) => {
        console.log(e.value);
        setSelectedCompany(e.value);
    }

    const selectedCompanyTemplate = (option, props) => {
        if (option) {
            return (
                <div className="company-item company-item-value">
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


    return (
        <div className="container flex-container">
            <Panel header="How to contribute" className="guidelines-panel">
                <div>
                    Here you can add the information of this specific perfumer. The data you enter will be validated by admins or moderators.
                </div>
                <Button label="Contribution guidelines" className="guidelines-link" />

            </Panel>

            <Panel className="details-panel">
                <form className="add-company-form" onSubmit={(e) => handlePerfumerSubmit(e)}>

                    <div className="p-inputgroup input-wrapper ">
                        <span className="p-float-label">
                            <InputText id="name" value={name} onChange={(e) => setName(e.target.value)} />
                            <label htmlFor="name">Name</label>
                        </span>

                    </div>

                    <div className="p-inputgroup input-wrapper ">
                        <Dropdown value={selectedCompany} options={companies} onChange={onCompanyChange} optionLabel="name" filter showClear filterBy="name" placeholder="Select a Company"
                            valueTemplate={selectedCompanyTemplate} />
                    </div>


                    <Editor style={{ height: '320px' }} value={details} onTextChange={(e) => setDetails(e.htmlValue)} placeholder="Type details regarding the perfumer here" />

                    <FileUpload mode="advanced" accept="image/*" maxFileSize={1000000} emptyTemplate={emptyTemplate} ref={fileuploader} cancelOptions={cancelOptions} />

                    <Button label="Submit" type="submit" value="Submit" className="p-button-outlined" />

                </form>
            </Panel>
        </div>
    );
}
export default PerfumerContributionForm;
