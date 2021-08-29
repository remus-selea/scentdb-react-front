import React from 'react';
import { MultiSelect } from 'primereact/multiselect';
import { Controller } from "react-hook-form";
import { classNames } from 'primereact/utils';
import { createPanelFooterTemplate, getFormErrorMessage } from '../../util/formUtils'
import { baseNotesMultiselectEmptyMessage, filterPlaceholder } from '../../util/constants'

export function PerfumeBaseNotesMultiselect(props) {
    const { errors, notes, control, setSelectedBaseNotesIds } = props;

    const onBaseNotesChange = (event) => {
        let notesIdsArr = [];
        event.value.forEach(note => {
            notesIdsArr.push(note.noteId)
        });

        setSelectedBaseNotesIds(notesIdsArr);
    }

    return (
        <div className="p-inputgroup input-wrapper top-notes-multiselect">
            <div className="p-field">
                <span className="p-float-label">
                    <Controller name="baseNotes"
                        control={control}
                        rules={{ required: 'Base Notes are required.' }}
                        render={({ field, fieldState }) =>
                            <MultiSelect
                                value={field.value}
                                options={notes}
                                onChange={e => {
                                    field.onChange(e.value);
                                    onBaseNotesChange(e);
                                }}
                                optionLabel="name"
                                filter
                                display="chip"
                                className={classNames({ 'p-invalid': fieldState.invalid })}
                                filterPlaceholder={filterPlaceholder}
                                emptyMessage={baseNotesMultiselectEmptyMessage}
                                panelFooterTemplate={createPanelFooterTemplate(field.value, notes, baseNotesMultiselectEmptyMessage, "note")}
                                showSelectAll={false}
                            />}
                    />
                    <label htmlFor="baseNotes" className={classNames({ 'p-error': errors.baseNotes })}>Base Notes*</label>
                </span>
                {getFormErrorMessage(errors, 'baseNotes')}
            </div>
        </div>
    );
}
