import React from 'react';
import { InputText } from 'primereact/inputtext';
import { Controller } from "react-hook-form";
import { classNames } from 'primereact/utils';

export function PerfumeNameInput(props) {
    const { errors } = props;

    return (<div className="p-inputgroup input-wrapper ">
        <span className="p-float-label">
            <Controller
                name="name"
                control={props.control}
                rules={{ required: 'Name is required.' }}
                defaultValue="" render={({ field, fieldState }) => <InputText
                    id={field.name}
                    {...field}
                    autoFocus
                    className={classNames({ 'p-invalid': fieldState.invalid })} />} />
            <label htmlFor="name" className={classNames({ 'p-error': errors.name })}>Name*</label>
        </span>
    </div>);
}
