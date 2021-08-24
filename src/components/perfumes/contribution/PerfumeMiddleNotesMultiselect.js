import React from 'react';
import { MultiSelect } from 'primereact/multiselect';
import { Controller } from "react-hook-form";
import { classNames } from 'primereact/utils';

export function PerfumeMiddleNotesMultiselect(props) {
    const { errors } = props;

    const panelFooterTemplate = (selectedNotes) => {
        const selectedItems = selectedNotes;
        const length = selectedItems ? selectedItems.length : 0;

        if (props.notes.length == 0) {
            return (
                <div className="multiselect-footer">
                    <ul className="multiselect-items">
                        <li className="multiselect-empty-message">No middle notes found</li>
                    </ul>
                </div>
            );
        } else {
            return (
                <div className="multiselect-footer">
                    <b>{length}</b> note{length != 1 ? 's' : ''} selected.
                </div>
            );
        }
    }

    return (<div className="p-inputgroup input-wrapper top-notes-multiselect">
        <span className="p-float-label">
            <Controller name="middleNotes" 
            control={props.control} 
            rules={{required: 'Middle Notes are required.'}} 
            render={({field, fieldState}) => 
                <MultiSelect 
                    value={field.value} 
                    options={props.notes} 
                    onChange={e => {
                        field.onChange(e.value);
                        props.onMiddleNotesChange(e);
                    }} 
                    optionLabel="name" 
                    filter 
                    display="chip" 
                    className={classNames({'p-invalid': fieldState.invalid})}
                    filterPlaceholder="Type to filter results"
                    emptyMessage="No middle notes found" 
                    panelFooterTemplate={panelFooterTemplate(field.value)}
                />} 
            />
            <label htmlFor="middleNotes" className={classNames({'p-error': errors.middleNotes})}>Middle Notes*</label>
        </span>
    </div>);
}
