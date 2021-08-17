import React from 'react';
import { Dropdown } from 'primereact/dropdown';
import { Controller } from "react-hook-form";
import { classNames } from 'primereact/utils';

export function PerfumePerfumerDropdown(props) {
    const { errors } = props;

    return (<div className="p-inputgroup input-wrapper ">
        <span className="p-float-label">
            <Controller 
            name="perfumer" 
            control={props.control} 
            rules={{required: 'Perfumer is required.'}} 
            render={({field, fieldState}) =>
                <Dropdown inputId={field.name} 
                    value={field.value} 
                    options={props.perfumers} 
                    onChange={e => {
                        field.onChange(e.value);
                        props.setSelectedPerfumer(e.value);
                    }} 
                    optionLabel="name"
                    filter 
                    showClear 
                    filterBy="name" 
                    className={classNames({'p-invalid': fieldState.invalid})} 
                />}
            />
            <label htmlFor="perfumer" className={classNames({'p-error': errors.perfumer})}>Perfumer*</label>
        </span>
    </div>);
}
