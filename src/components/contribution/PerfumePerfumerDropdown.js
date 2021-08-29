import React from 'react';
import { Dropdown } from 'primereact/dropdown';
import { Controller } from "react-hook-form";
import { classNames } from 'primereact/utils';
import { getFormErrorMessage } from '../../util/formUtils'
import { filterPlaceholder } from '../../util/constants'

export function PerfumePerfumerDropdown(props) {
    const { errors, control, perfumers, setSelectedPerfumer } = props;

    return (
        <div className="p-inputgroup input-wrapper ">
            <div className="p-field">
                <span className="p-float-label">
                    <Controller
                        name="perfumer"
                        control={control}
                        rules={{ required: 'Perfumer is required.' }}
                        render={({ field, fieldState }) =>
                            <Dropdown inputId={field.name}
                                value={field.value}
                                options={perfumers}
                                onChange={e => {
                                    field.onChange(e.value);
                                    setSelectedPerfumer(e.value);
                                }}
                                optionLabel="name"
                                filter
                                // showClear={field.value ? true : false}
                                filterBy="name"
                                className={classNames({ 'p-invalid': fieldState.invalid })}
                                filterPlaceholder={filterPlaceholder}
                                emptyMessage="No perfumers found"
                            />}
                    />
                    <label htmlFor="perfumer" className={classNames({ 'p-error': errors.perfumer })}>Perfumer*</label>
                </span>

                {getFormErrorMessage(errors, 'perfumer')}
            </div>
        </div>
    );
}
