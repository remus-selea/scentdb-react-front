import React from 'react';
import { InputText } from 'primereact/inputtext';
import { Controller } from "react-hook-form";
import { classNames } from 'primereact/utils';
import { getFormErrorMessage } from '../../util/formUtils'

export function NameInput(props) {
    const { errors, control } = props;

    return (<div className="p-inputgroup input-wrapper ">
        <div className="p-field">
            <span className="p-float-label">
                <Controller
                    name="name"
                    control={control}
                    rules={{
                        required: 'Name is required.',
                        maxLength: {
                            value: 255,
                            message: "Maximum length is 255"
                        }
                    }}
                    render={({ field, fieldState }) =>
                        <InputText id={field.name}{...field} autoFocus className={classNames({ 'p-invalid': fieldState.invalid })} />}
                />
                <label htmlFor="name" className={classNames({ 'p-error': errors.name })}>Name*</label>
            </span>
            
            {getFormErrorMessage(errors, 'name')}
        </div>
    </div>
    );
}
