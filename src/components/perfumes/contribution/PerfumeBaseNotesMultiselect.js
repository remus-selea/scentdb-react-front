import React from 'react';
import { MultiSelect } from 'primereact/multiselect';
import { Controller } from "react-hook-form";
import { classNames } from 'primereact/utils';

export function PerfumeBaseNotesMultiselect(props) {
    const { errors } = props;

    const panelFooterTemplate = (selectedNotes) => {
        const selectedItems = selectedNotes;
        const length = selectedItems ? selectedItems.length : 0;

        if (props.notes.length == 0) {
            return (
                <div className="multiselect-footer">
                    <ul className="multiselect-items">
                        <li className="multiselect-empty-message">No base notes found</li>
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
            <Controller name="baseNotes"
                control={props.control}
                rules={{ required: 'Base Notes are required.' }}
                render={({ field, fieldState }) =>
                    <MultiSelect
                        value={field.value}
                        options={props.notes}
                        onChange={e => {
                            field.onChange(e.value);
                            props.onBaseNotesChange(e);
                        }}
                        optionLabel="name"
                        filter
                        display="chip"
                        className={classNames({ 'p-invalid': fieldState.invalid })}
                        filterPlaceholder="Type to filter results"
                        emptyMessage="No base notes found"
                        panelFooterTemplate={panelFooterTemplate(field.value)}
                    />}
            />
            <label htmlFor="baseNotes" className={classNames({ 'p-error': errors.baseNotes })}>Base Notes*</label>
        </span>
    </div>);
}
