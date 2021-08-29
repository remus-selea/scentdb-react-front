import React from 'react';
import { InputText } from 'primereact/inputtext';
import { Controller } from "react-hook-form";
import { classNames } from 'primereact/utils';
import { getFormErrorMessage } from '../../util/formUtils'

export function WebsiteInput(props) {
    const { errors, control } = props;

    return (<div className="p-inputgroup input-wrapper ">
        <div className="p-field">
            <span className="p-float-label">
                <Controller
                    name="website"
                    control={control}
                    rules={{
                        maxLength: {
                            value: 255,
                            message: "Maximum length is 255"
                        },
                        validate: isValidUrl
                    }}
                    render={({ field, fieldState }) =>
                        <InputText id={field.name} {...field} autoFocus className={classNames({ 'p-invalid': fieldState.invalid })} />}
                />
                <label htmlFor="website" className={classNames({ 'p-error': errors.website })}>Website</label>
            </span>

            {getFormErrorMessage(errors, 'website')}
        </div>
    </div>
    );
}

const isValidUrl = (string) => {
    let valid = false;

    try {
        if (string) {
            new URL(string);
        }
    
        valid = true;
    } catch (err) {
        valid = "URL is invalid.";
    }

    return valid;
};

