import React from 'react';
import { Dropdown } from 'primereact/dropdown';
import { Controller } from "react-hook-form";
import { classNames } from 'primereact/utils';
import { filterPlaceholder } from '../../util/constants'
import { getFormErrorMessage } from '../../util/formUtils'

export function PerfumeCompanyDropdown(props) {
    const { errors } = props;

    return (
        <div className="p-inputgroup input-wrapper ">
            <div className="p-field">
                <span className="p-float-label">
                    <Controller name="company"
                        control={props.control}
                        rules={{ required: 'Company is required.' }}
                        render={({ field, fieldState }) =>
                            <Dropdown inputId={field.name}
                                value={field.value}
                                options={props.companies}
                                onChange={e => {
                                    field.onChange(e.value);
                                    props.setSelectedCompany(e.value);
                                }}
                                optionLabel="name"
                                filter
                                // showClear={field.value ? true : false}
                                filterBy="name"
                                className={classNames({ 'p-invalid': fieldState.invalid })}
                                filterPlaceholder={filterPlaceholder}
                                emptyMessage="No companies found"
                            />}
                    />
                    <label htmlFor="company" className={classNames({ 'p-error': errors.company })}>Company*</label>
                </span>

                {getFormErrorMessage(errors, 'company')}
            </div>
        </div>
    );
}
