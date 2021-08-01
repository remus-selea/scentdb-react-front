import React from 'react';
import { MultiSelect } from 'primereact/multiselect';
import { Controller } from "react-hook-form";
import { classNames } from 'primereact/utils';

export function PerfumeBottleSizesMultiselect(props) {
    const { errors } = props;

    const bottleSizes = [
        { size: '200ml', code: '200ml' },
        { size: '175ml', code: '175ml' },
        { size: '150ml', code: '150ml' },
        { size: '125ml', code: '125ml' },
        { size: '100ml', code: '100ml' },
        { size: '75ml', code: '75ml' },
        { size: '60ml', code: '60ml' },
        { size: '50ml', code: '50ml' },
        { size: '40ml', code: '40ml' },
        { size: '35ml', code: '35ml' },
        { size: '30ml', code: '30ml' },
        { size: '25ml', code: '25ml' },
        { size: '20ml', code: '20ml' },
        { size: '15ml', code: '15ml' },
        { size: '10ml', code: '10ml' },
        { size: '7.5ml', code: '7.5ml' },
        { size: '5ml', code: '5ml' },
        { size: '1.5ml', code: '1.5ml' },
        { size: '1ml', code: '1ml' },
    ];


    return (<div className="p-inputgroup input-wrapper bottle-size-multiselect">
        <span className="p-float-label">
            <Controller name="bottleSizes" control={props.control} rules={{
                required: 'Bottle Size is required.'
            }} render={({
                field, fieldState
            }) =>
                <MultiSelect
                    value={field.value}
                    options={bottleSizes}
                    onChange={e => {
                        field.onChange(e.value);
                        props.onBottleSizeChange(e);
                    }}
                    optionLabel="size"
                    placeholder="&#8205;"
                    filter display="chip"
                    className={classNames({ 'p-invalid': fieldState.invalid })}
                />}
            />

            <label htmlFor="bottleSizes" className={classNames({ 'p-error': errors.bottleSizes })}>Bottle sizes</label>
        </span>
    </div>);
}
