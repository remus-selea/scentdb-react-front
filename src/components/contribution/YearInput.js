import React from 'react';
import { InputText } from 'primereact/inputtext';
import { Controller } from "react-hook-form";
import { classNames } from 'primereact/utils';
import { getFormErrorMessage } from '../../util/formUtils'
import { maxYear } from '../../util/constants'

export function YearInput(props) {
    const { errors, control } = props;

    return (
        <div className="p-inputgroup input-wrapper">
            <div className="p-field">
                <span className="p-float-label">
                    <Controller
                        name="year"
                        control={control}
                        defaultValue=""
                        rules={{
                            required: 'Year is required.',
                            max: {
                                value: maxYear,
                                message: "Maximum year is " + maxYear
                            },
                            min: {
                                value: 1900,
                                message: "Minimum year is " + 1900
                            }

                        }}
                        render={({ field, fieldState }) =>
                            <InputText
                                id={field.name}
                                {...field}
                                className={classNames({ 'p-invalid': fieldState.invalid })}
                                type="number"

                            />}
                    />
                    <label htmlFor="year" className={classNames({ 'p-error': errors.year })}>Year*</label>
                </span>
                {getFormErrorMessage(errors, 'year')}
            </div>
        </div>
    );
}
