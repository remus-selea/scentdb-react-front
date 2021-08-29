import React from 'react';
import { MultiSelect } from 'primereact/multiselect';
import { Controller } from "react-hook-form";
import { classNames } from 'primereact/utils';
import { createPanelFooterTemplate, getFormErrorMessage } from '../../util/formUtils'
import { middleNotesMultiselectEmptyMessage, filterPlaceholder } from '../../util/constants'

export function PerfumeMiddleNotesMultiselect(props) {
    const { errors, notes, control, setSelectedMiddleNotesIds } = props;

    const onMiddleNotesChange = (event) => {
        let notesIdsArr = [];
        event.value.forEach(note => {
            notesIdsArr.push(note.noteId)
        });

        setSelectedMiddleNotesIds(notesIdsArr);
    }

    return (
        <div className="p-inputgroup input-wrapper top-notes-multiselect">
            <div className="p-field">
                <span className="p-float-label">
                    <Controller name="middleNotes"
                        control={control}
                        rules={{ required: 'Middle Notes are required.' }}
                        render={({ field, fieldState }) =>
                            <MultiSelect
                                value={field.value}
                                options={notes}
                                onChange={e => {
                                    field.onChange(e.value);
                                    onMiddleNotesChange(e);
                                }}
                                optionLabel="name"
                                filter
                                display="chip"
                                className={classNames({ 'p-invalid': fieldState.invalid })}
                                filterPlaceholder={filterPlaceholder}
                                emptyMessage={middleNotesMultiselectEmptyMessage}
                                panelFooterTemplate={createPanelFooterTemplate(field.value, notes, middleNotesMultiselectEmptyMessage, "note")}
                                showSelectAll={false}
                            />}
                    />
                    <label htmlFor="middleNotes" className={classNames({ 'p-error': errors.middleNotes })}>Middle Notes*</label>
                </span>
                {getFormErrorMessage(errors, 'middleNotes')}
            </div>
        </div>
    );
}
