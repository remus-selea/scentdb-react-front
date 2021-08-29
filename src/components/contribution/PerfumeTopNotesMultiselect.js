import React from 'react';
import { MultiSelect } from 'primereact/multiselect';
import { Controller } from "react-hook-form";
import { classNames } from 'primereact/utils';
import { createPanelFooterTemplate, getFormErrorMessage } from '../../util/formUtils'
import { topNotesMultiselectEmptyMessage, filterPlaceholder } from '../../util/constants'

export function PerfumeTopNotesMultiselect(props) {
    const { errors, notes, control, setSelectedTopNotesIds } = props;

    const onTopNotesChange = (event) => {
        let notesIdsArr = [];
        event.value.forEach(note => {
            notesIdsArr.push(note.noteId)
        });

        setSelectedTopNotesIds(notesIdsArr);
    }

    return (
        <div className="p-inputgroup input-wrapper top-notes-multiselect">
            <div className="p-field">
                <span className="p-float-label">
                    <Controller name="topNotes" control={control}
                        rules={{ required: 'Top Notes are required.' }}
                        render={({ field, fieldState }) =>
                            <MultiSelect value={field.value}
                                options={notes}
                                onChange={event => {
                                    field.onChange(event.value);
                                    onTopNotesChange(event);
                                }}
                                optionLabel="name"
                                filter
                                display="chip"
                                className={classNames({ 'p-invalid': fieldState.invalid })}
                                emptyMessage={topNotesMultiselectEmptyMessage}
                                filterPlaceholder={filterPlaceholder}
                                panelFooterTemplate={createPanelFooterTemplate(field.value, notes, topNotesMultiselectEmptyMessage, "note")}
                                showSelectAll={false}
                            />}
                    />
                    <label htmlFor="topNotes" className={classNames({ 'p-error': errors.topNotes })}>Top Notes*</label>
                </span>
                {getFormErrorMessage(errors, 'topNotes')}
            </div>
        </div>
    );
}
