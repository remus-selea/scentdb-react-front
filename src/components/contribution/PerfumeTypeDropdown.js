import React from 'react';
import { Dropdown } from 'primereact/dropdown';
import { Controller } from "react-hook-form";
import { classNames } from 'primereact/utils';
import { getFormErrorMessage } from '../../util/formUtils'
import { perfumeTypes } from '../../util/constants'

export function PerfumeTypeDropdown(props) {
    const { errors, control, setSelectedPerfumeTypeCode } = props;

    return (
        <div className="p-inputgroup input-wrapper">
            <div className="p-field">
                <span className="p-float-label">
                    <Controller
                        name="perfumeType"
                        control={control}
                        rules={{ required: 'Perfume Type is required.' }}
                        render={({ field, fieldState }) =>
                            <Dropdown
                                value={field.value}
                                onChange={event => {
                                    field.onChange(event.value);
                                    setSelectedPerfumeTypeCode(event.value.code);
                                }}
                                options={perfumeTypes}
                                optionLabel="perfumeType"
                                placeholder="&#8205;"
                                className={classNames({ 'p-invalid': fieldState.invalid })}
                            />}
                    />
                    <label htmlFor="perfumeType" className={classNames({ 'p-error': errors.perfumeType })}>Perfume type*</label>
                </span>
                {getFormErrorMessage(errors, 'perfumeType')}
            </div>
        </div>
    );
}
