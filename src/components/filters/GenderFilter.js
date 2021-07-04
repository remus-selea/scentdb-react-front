import { Checkbox } from 'primereact/checkbox';
import React, { useState } from 'react';
import { GenderFilterContext } from '../../contexts/GenderFilterContext'


function GenderFilter(props) {
    const { genders, setGenders, reset } = React.useContext(GenderFilterContext)

    const onGenderChange = (e) => {
        let checkedGenders = [...genders];
        if (e.checked)
            checkedGenders.push(e.value);
        else
            checkedGenders.splice(checkedGenders.indexOf(e.value), 1);

        setGenders(checkedGenders);
    }

    return (
        <>
            <div className="checkbox-filter-group">
                <Checkbox inputId="cb1" value="MEN" onChange={onGenderChange} checked={genders.includes('MEN')}></Checkbox>
                <label htmlFor="cb1" className="p-checkbox-label">Male</label>
            </div>
            <div className="checkbox-filter-group">
                <Checkbox inputId="cb2" value="WOMEN" onChange={onGenderChange} checked={genders.includes('WOMEN')}></Checkbox>
                <label htmlFor="cb2" className="p-checkbox-label">Female</label>
            </div>
            <div className="checkbox-filter-group">
                <Checkbox inputId="cb3" value="UNISEX" onChange={onGenderChange} checked={genders.includes('UNISEX')}></Checkbox>
                <label htmlFor="cb3" className="p-checkbox-label">Unisex</label>
            </div>
        </>
    );
}

export default GenderFilter;
