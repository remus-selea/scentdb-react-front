import React from 'react';
import { Dropdown } from 'primereact/dropdown';
import { Controller } from "react-hook-form";
import { classNames } from 'primereact/utils';
import { PERFUME_TYPES } from '../../../util/constants'

export function PerfumeTypeDropdown(props) {
    const { errors } = props;

    const perfumeTypes = [
        { perfumeType: PERFUME_TYPES.EXTRAIT_DE_PARFUM, code: Object.keys(PERFUME_TYPES)[0] },
        { perfumeType: PERFUME_TYPES.ESPIRIT_DE_PARFUM, code: Object.keys(PERFUME_TYPES)[1] },
        { perfumeType: PERFUME_TYPES.EAU_DE_PARFUM, code: Object.keys(PERFUME_TYPES)[2] },
        { perfumeType: PERFUME_TYPES.EAU_DE_TOILETTE, code: Object.keys(PERFUME_TYPES)[3] },
        { perfumeType: PERFUME_TYPES.EAU_DE_COLOGNE, code: Object.keys(PERFUME_TYPES)[4] },
        { perfumeType: PERFUME_TYPES.EAU_FRAICHE, code: Object.keys(PERFUME_TYPES)[5] },

    ];


    return (<div className="p-inputgroup input-wrapper">
        <span className="p-float-label">
            <Controller name="perfumeType" 
            control={props.control} 
            rules={{required: 'Perfume Type is required.'}} 
            render={({field, fieldState}) => 
                <Dropdown value={field.value} 
                    onChange={e => {
                        field.onChange(e.value);
                        props.setSelectedPerfumeTypeCode(e.value.code);
                    }} 
                    options={perfumeTypes} 
                    optionLabel="perfumeType" 
                    placeholder="&#8205;" 
                    className={classNames({'p-invalid': fieldState.invalid})} 
                />}
            />
            <label htmlFor="perfumeType" className={classNames({'p-error': errors.perfumeType})}>Perfume type*</label>
        </span>
    </div>);
}
