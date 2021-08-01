import React from 'react';
import { MultiSelect } from 'primereact/multiselect';
import { Controller } from "react-hook-form";
import { classNames } from 'primereact/utils';

export function PerfumeMiddleNotesMultiselect(props) {
    const { errors } = props;

    return (<div className="p-inputgroup input-wrapper top-notes-multiselect">
        <span className="p-float-label">
            <Controller name="middleNotes" control={props.control} rules={{
                required: 'Middle Notes are required.'
            }} render={({
                field, fieldState
            }) => <MultiSelect value={field.value} options={props.notes} onChange={e => {
                field.onChange(e.value);
                props.onMiddleNotesChange(e);
            }} optionLabel="name" filter display="chip" className={classNames({
                'p-invalid': fieldState.invalid
            })} />} />
            <label htmlFor="middleNotes" className={classNames({
                'p-error': errors.middleNotes
            })}>Middle Notes</label>
        </span>
    </div>);
}
