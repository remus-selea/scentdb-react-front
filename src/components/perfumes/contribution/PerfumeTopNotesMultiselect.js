import React from 'react';
import { MultiSelect } from 'primereact/multiselect';
import { Controller } from "react-hook-form";
import { classNames } from 'primereact/utils';

export function PerfumeTopNotesMultiselect(props) {
    const { errors } = props;

    return (<div className="p-inputgroup input-wrapper top-notes-multiselect">
        <span className="p-float-label">
            <Controller name="topNotes" control={props.control} 
            rules={{required: 'Top Notes are required.'}} 
            render={({field, fieldState}) => 
                <MultiSelect value={field.value} 
                    options={props.notes} 
                    onChange={e => {
                        field.onChange(e.value);
                        props.onTopNotesChange(e);
                    }} 
                    optionLabel="name" 
                    filter 
                    display="chip" 
                    className={classNames({'p-invalid': fieldState.invalid})} 
                />} 
            />
            <label htmlFor="topNotes" className={classNames({'p-error': errors.topNotes})}>Top Notes*</label>
        </span>
    </div>);
}
