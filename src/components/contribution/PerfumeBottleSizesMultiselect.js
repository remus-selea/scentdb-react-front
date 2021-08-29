import React from 'react';
import { MultiSelect } from 'primereact/multiselect';
import { Controller } from "react-hook-form";
import { classNames } from 'primereact/utils';
import { createPanelFooterTemplate, getFormErrorMessage } from '../../util/formUtils'
import { bottleSizesMultiselectEmptyMessage, filterPlaceholder, bottleSizes } from '../../util/constants'

export function PerfumeBottleSizesMultiselect(props) {
    const { errors, control, setSelectedBottleSizesStr } = props;
  
    const onBottleSizeChange = (event) => {
        let selectedBottleSizesArr = [];
        event.value.forEach(bottleSize => {
            selectedBottleSizesArr.push(bottleSize.size)
        });

        setSelectedBottleSizesStr(selectedBottleSizesArr.toString());
    }

    return (
        <div className="p-inputgroup input-wrapper bottle-size-multiselect">
            <div className="p-field">
                <span className="p-float-label">
                    <Controller name="bottleSizes" control={control}
                        rules={{ required: 'Select at least one bottle size.' }}
                        render={({ field, fieldState }) =>
                            <MultiSelect
                                value={field.value}
                                options={bottleSizes}
                                onChange={e => {
                                    field.onChange(e.value);
                                    onBottleSizeChange(e);
                                }}
                                optionLabel="size"
                                placeholder="&#8205;"
                                filter
                                display="chip"
                                className={classNames({ 'p-invalid': fieldState.invalid })}
                                filterPlaceholder={filterPlaceholder}
                                panelFooterTemplate={createPanelFooterTemplate(field.value, bottleSizes, bottleSizesMultiselectEmptyMessage, "bottle")}
                                showSelectAll={false}
                            />}
                    />
                    <label htmlFor="bottleSizes" className={classNames({ 'p-error': errors.bottleSizes })}>Bottle sizes*</label>
                </span>
                {getFormErrorMessage(errors, 'bottleSizes')}
            </div>
        </div>
    );
}
