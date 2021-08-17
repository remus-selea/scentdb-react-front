import React from 'react';
import { MultiSelect } from 'primereact/multiselect';
import { Controller } from "react-hook-form";
import { classNames } from 'primereact/utils';

export function PerfumeBaseNotesMultiselect(props) {
    const { errors } = props;

    return (<div className="p-inputgroup input-wrapper top-notes-multiselect">
        <span className="p-float-label">
            <Controller name="baseNotes" 
            control={props.control} 
            rules={{required: 'Base Notes are required.'}} 
            render={({field, fieldState}) => 
                <MultiSelect value={field.value} 
                options={props.notes} 
                onChange={e => {
                    field.onChange(e.value);
                    props.onBaseNotesChange(e);
                }} 
                optionLabel="name" 
                filter display="chip" 
                className={classNames({'p-invalid': fieldState.invalid})} 
                />}
             />
            <label htmlFor="baseNotes" className={classNames({'p-error': errors.baseNotes})}>Base Notes*</label>
        </span>
    </div>);
}
