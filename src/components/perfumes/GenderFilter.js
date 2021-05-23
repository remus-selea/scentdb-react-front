import { Checkbox } from 'primereact/checkbox';
import React, { useState } from 'react';

function GenderFilter(props) {
    const [genders, setGenders] = useState([]);

    const onGenderChange = (e) => {
        let selectedGenders = [...genders];
        if (e.checked)
            selectedGenders.push(e.value);
        else
            selectedGenders.splice(selectedGenders.indexOf(e.value), 1);

        setGenders(selectedGenders);
    }

    return (
        <>
            <div className="gender-filter-group">
                <Checkbox inputId="cb1" value="Male" onChange={onGenderChange} checked={genders.includes('Male')}></Checkbox>
                <label htmlFor="cb1" className="p-checkbox-label">Male</label>
            </div>
            <div className="gender-filter-group">
                <Checkbox inputId="cb2" value="Female" onChange={onGenderChange} checked={genders.includes('Female')}></Checkbox>
                <label htmlFor="cb2" className="p-checkbox-label">Female</label>
            </div>
            <div className="gender-filter-group">
                <Checkbox inputId="cb3" value="Unisex" onChange={onGenderChange} checked={genders.includes('Unisex')}></Checkbox>
                <label htmlFor="cb3" className="p-checkbox-label">Unisex</label>
            </div>
        </>
    );
}

export default GenderFilter;
