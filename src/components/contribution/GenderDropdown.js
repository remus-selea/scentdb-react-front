import React from 'react';
import { Dropdown } from 'primereact/dropdown';
import { Controller } from "react-hook-form";
import { classNames } from 'primereact/utils';
import { getFormErrorMessage } from '../../util/formUtils'
import { genders } from '../../util/constants'

export function GenderDropdown(props) {
    const { errors, control, setSelectedGenderCode } = props;

    return (
        <div className="p-inputgroup input-wrapper ">
            <div className="p-field">
                <span className="p-float-label">
                    <Controller
                        name="gender"
                        control={control}
                        rules={{ required: 'Gender is required.' }}
                        render={({ field, fieldState }) =>
                            <Dropdown
                                id={field.name}
                                value={field.value}
                                onChange={event => {
                                    field.onChange(event.value);
                                    setSelectedGenderCode(event.value.code);
                                }}
                                options={genders}
                                optionLabel="gender"
                                placeholder="&#8205;"
                                className={classNames({ 'p-invalid': fieldState.invalid })} />}
                    />

                    <label htmlFor="gender" className={classNames({ 'p-error': errors.gender })}>Gender*</label>
                </span>
                {getFormErrorMessage(errors, 'gender')}
            </div>
        </div>
    );
}
