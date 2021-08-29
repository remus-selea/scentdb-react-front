import React from 'react';
import { Dropdown } from 'primereact/dropdown';
import { Controller } from "react-hook-form";
import { classNames } from 'primereact/utils';
import { getFormErrorMessage } from '../../util/formUtils'
import { companyTypes} from '../../util/constants'

export function CompanyTypeDropdown(props) {
    const { errors, control, setSelectedCompanyTypeCode } = props;

    return (
        <div className="p-inputgroup input-wrapper">
            <div className="p-field">
                <span className="p-float-label">
                    <Controller
                        name="companyType"
                        control={control}
                        rules={{ required: 'Company Type is required.' }}
                        render={({ field, fieldState }) =>
                            <Dropdown
                                value={field.value}
                                onChange={event => {
                                    field.onChange(event.value);
                                    setSelectedCompanyTypeCode(event.value.code);
                                }}
                                options={companyTypes}
                                optionLabel="companyType"
                                placeholder="&#8205;"
                                className={classNames({ 'p-invalid': fieldState.invalid })}
                            />}
                    />
                    <label htmlFor="companyType" className={classNames({ 'p-error': errors.companyType })}>Company type*</label>
                </span>
                {getFormErrorMessage(errors, 'companyType')}
            </div>
        </div>
    );
}
