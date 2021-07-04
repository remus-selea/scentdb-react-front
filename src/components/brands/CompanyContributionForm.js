import { Button } from 'primereact/button';
import React, { useState, useRef } from 'react';
import { InputText } from 'primereact/inputtext';
import { Panel } from 'primereact/panel';
import { Dropdown } from 'primereact/dropdown';
import { Editor } from 'primereact/editor';
import { SAVE_COMPANY_URL } from '../../util/constants';
import { FileUpload } from 'primereact/fileupload';

import axiosApiCall from '../../util/axiosService'

function CompanyContributionForm(props) {
    const [name, setName] = useState("");
    const [website, setWebsite] = useState("");
    const [selectedCompanyType, setSelectedComapnyType] = useState(null);

    const [description, setDescription] = useState('');
    const fileuploader = useRef(null);


    const companyTypes = [
        { companyType: 'Niche', code: 'NICHE' },
        { companyType: 'Designer', code: 'DESIGNER' },
    ];


    const onCompanyTypeChange = (e) => {
        setSelectedComapnyType(e.value);
    }

    const handleSubmit = (e) => {
        const body = {
            name: name,
            description: description,
            companyType: selectedCompanyType.code,
            website: website,
            perfumeIdList: [],
            perfumerIdList: []
        }

        let bodyFormData = new FormData();
        bodyFormData.append("company", JSON.stringify(body));
        bodyFormData.append("image", fileuploader.current.files[0]);

        const headers = { "Content-Type": "multipart/form-data" };

        saveCompany(bodyFormData, headers)
    }

    const saveCompany = async (data, headers) => {
        const result = await axiosApiCall(SAVE_COMPANY_URL, 'post', null, null, headers, data);
        console.log("the result of the request to save a company is:")
        console.log(result)
    }

    const emptyTemplate = () => {
        return (
            <div className="upload-empty-template">
                <i className="pi pi-image p-mt-3 p-p-5" style={{ 'fontSize': '5em', borderRadius: '50%', backgroundColor: 'var(--surface-b)', color: 'var(--surface-d)' }}></i>
                <span style={{ 'fontSize': '1.2em', color: 'var(--text-color-secondary)' }} className="mt-5">Add a company logo image</span>
            </div>
        )
    }

    const cancelOptions = {className: 'custom-cancel-btn' };


    return (
        <div className="container flex-container">
            <Panel header="How to contribute" className="guidelines-panel">
                <div>
                    Here you can add the information of this specific brand. The data you enter will be validated by admins or moderators.
                </div>
                <Button label="Contribution guidelines" className="guidelines-link" />

            </Panel>

            <Panel className="details-panel">
                <form className="add-perfume-form" onSubmit={(e) => handleSubmit(e)}>

                    <div className="p-inputgroup input-wrapper ">
                        <span className="p-float-label">
                            <InputText id="name" value={name} onChange={(e) => setName(e.target.value)} />
                            <label htmlFor="name">Name</label>
                        </span>

                    </div>

                    <div className="p-inputgroup input-wrapper">
                        <span className="p-float-label">
                            <Dropdown
                                value={selectedCompanyType}
                                options={companyTypes}
                                onChange={onCompanyTypeChange}
                                optionLabel="companyType"
                            />

                            <label htmlFor="companyType">Company type</label>
                        </span>
                    </div>

                    <div className="p-inputgroup input-wrapper ">
                        <span className="p-float-label">
                            <InputText id="website" value={website} onChange={(e) => setWebsite(e.target.value)} />
                            <label htmlFor="website">Website</label>
                        </span>
                    </div>

                    <Editor style={{ height: '320px' }} value={description} onTextChange={(e) => setDescription(e.htmlValue)} placeholder="Type your description here" />

                    <FileUpload mode="advanced"  accept="image/*" maxFileSize={1000000} emptyTemplate={emptyTemplate} ref={fileuploader} cancelOptions={cancelOptions}/>

                    <Button label="Submit" type="submit" value="Submit" className="p-button-outlined" />

                </form>
            </Panel>
        </div>
    );
}
export default CompanyContributionForm;
