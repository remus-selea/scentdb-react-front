import { Checkbox } from 'primereact/checkbox';
import React from 'react';
import { PERFUME_TYPES } from '../../util/constants';
import { PerfumeTypeFilterContext } from '../../contexts/PerfumeTypeFilterContext'


function PerfumeTypeFilter(props) {
    const { perfumeTypes, setPerfumeTypes } = React.useContext(PerfumeTypeFilterContext)

    const onPerfumeTypeChange = (e) => {
        let checkedPerfumeTypes = [...perfumeTypes];
        if (e.checked)
            checkedPerfumeTypes.push(e.value);
        else
            checkedPerfumeTypes.splice(checkedPerfumeTypes.indexOf(e.value), 1);

        setPerfumeTypes(checkedPerfumeTypes);
    }

    return (
        <>
            <div className="checkbox-filter-group">
                <Checkbox inputId={"perfumeType" + Object.keys(PERFUME_TYPES)[0]} value={Object.keys(PERFUME_TYPES)[0]} onChange={onPerfumeTypeChange} checked={perfumeTypes.includes(Object.keys(PERFUME_TYPES)[0])}></Checkbox>
                <label htmlFor={"perfumeType" + Object.keys(PERFUME_TYPES)[0]} className="p-checkbox-label">{PERFUME_TYPES.EXTRAIT_DE_PARFUM}</label>
            </div>
            <div className="checkbox-filter-group">
                <Checkbox inputId={"perfumeType" + Object.keys(PERFUME_TYPES)[1]} value={Object.keys(PERFUME_TYPES)[1]} onChange={onPerfumeTypeChange} checked={perfumeTypes.includes(Object.keys(PERFUME_TYPES)[1])}></Checkbox>
                <label htmlFor={"perfumeType" + Object.keys(PERFUME_TYPES)[1]} className="p-checkbox-label">{PERFUME_TYPES.ESPIRIT_DE_PARFUM}</label>
            </div>
            <div className="checkbox-filter-group">
                <Checkbox inputId={"perfumeType" + Object.keys(PERFUME_TYPES)[2]} value={Object.keys(PERFUME_TYPES)[2]} onChange={onPerfumeTypeChange} checked={perfumeTypes.includes(Object.keys(PERFUME_TYPES)[2])}></Checkbox>
                <label htmlFor={"perfumeType" + Object.keys(PERFUME_TYPES)[2]} className="p-checkbox-label">{PERFUME_TYPES.EAU_DE_PARFUM}</label>
            </div>
            <div className="checkbox-filter-group">
                <Checkbox inputId={"perfumeType" + Object.keys(PERFUME_TYPES)[3]} value={Object.keys(PERFUME_TYPES)[3]} onChange={onPerfumeTypeChange} checked={perfumeTypes.includes(Object.keys(PERFUME_TYPES)[3])}></Checkbox>
                <label htmlFor={"perfumeType" + Object.keys(PERFUME_TYPES)[3]} className="p-checkbox-label">{PERFUME_TYPES.EAU_DE_TOILETTE}</label>
            </div>
            <div className="checkbox-filter-group">
                <Checkbox inputId={"perfumeType" + Object.keys(PERFUME_TYPES)[4]} value={Object.keys(PERFUME_TYPES)[4]} onChange={onPerfumeTypeChange} checked={perfumeTypes.includes(Object.keys(PERFUME_TYPES)[4])}></Checkbox>
                <label htmlFor={"perfumeType" + Object.keys(PERFUME_TYPES)[4]} className="p-checkbox-label">{PERFUME_TYPES.EAU_DE_COLOGNE}</label>
            </div>
            <div className="checkbox-filter-group">
                <Checkbox inputId={"perfumeType" + Object.keys(PERFUME_TYPES)[5]} value={Object.keys(PERFUME_TYPES)[5]} onChange={onPerfumeTypeChange} checked={perfumeTypes.includes(Object.keys(PERFUME_TYPES)[5])}></Checkbox>
                <label htmlFor={"perfumeType" + Object.keys(PERFUME_TYPES)[5]} className="p-checkbox-label">{PERFUME_TYPES.EAU_FRAICHE}</label>
            </div>
        </>
    );
}

export default PerfumeTypeFilter;
