import React from 'react';
import { InputText } from 'primereact/inputtext';
import { Controller } from "react-hook-form";
import { classNames } from 'primereact/utils';

export function PerfumeYearInput(props) {
    const { errors } = props;

    return (<div className="p-inputgroup input-wrapper">
        <div className="p-field">
            <span className="p-float-label">
                <Controller name="year" control={props.control} defaultValue="" rules={{
                    required: 'Year is required.',
                    min: 1900,
                    max: props.maxYear
                }} render={({
                    field, fieldState
                }) => <InputText id={field.name} {...field} className={classNames({
                    'p-invalid': fieldState.invalid
                })} type="number" min={1900} max={props.maxYear} />} />
                <label htmlFor="year" className={classNames({
                    'p-error': errors.year
                })}>Year</label>
            </span>
        </div>
    </div>);
}
