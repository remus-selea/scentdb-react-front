import React from 'react';
import { Dropdown } from 'primereact/dropdown';
import { Controller } from "react-hook-form";
import { classNames } from 'primereact/utils';
import { getFormErrorMessage } from '../../util/formUtils'

export function CompanyDropdown(props) {
    const { errors, control, companies, setSelectedCompanyId } = props;

    return (
        <div className="p-inputgroup input-wrapper">
            <div className="p-field">
                <span className="p-float-label">
                    <Controller
                        name="company"
                        control={control}
                        rules={{ required: 'Company is required.' }}
                        render={({ field, fieldState }) =>
                            <Dropdown
                                value={field.value}
                                onChange={event => {
                                    field.onChange(event.value);
                                    setSelectedCompanyId(event.value.companyId);
                                }}
                                options={companies}
                                optionLabel="name"
                                placeholder="&#8205;"
                                className={classNames({ 'p-invalid': fieldState.invalid })}
                            />}

                    />
                    <label htmlFor="company" className={classNames({ 'p-error': errors.company })}>Company*</label>
                </span>
                {getFormErrorMessage(errors, 'company')}
            </div>
        </div>
    );
}
