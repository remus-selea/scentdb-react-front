import { Checkbox } from 'primereact/checkbox';
import React from 'react';
import { GenderFilterContext } from '../../contexts/GenderFilterContext'
import { genders as genderOptions } from '../../util/constants';


function GenderFilter(props) {
    const { genders, setGenders } = React.useContext(GenderFilterContext)

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
                <Checkbox inputId="cb1" value={genderOptions[0].code} onChange={onGenderChange} checked={genders.includes(genderOptions[0].code)}></Checkbox>
                <label htmlFor="cb1" className="p-checkbox-label">Male</label>
            </div>
            <div className="checkbox-filter-group">
                <Checkbox inputId="cb2" value={genderOptions[1].code} onChange={onGenderChange} checked={genders.includes(genderOptions[1].code)}></Checkbox>
                <label htmlFor="cb2" className="p-checkbox-label">Female</label>
            </div>
            <div className="checkbox-filter-group">
                <Checkbox inputId="cb3" value={genderOptions[2].code} onChange={onGenderChange} checked={genders.includes(genderOptions[2].code)}></Checkbox>
                <label htmlFor="cb3" className="p-checkbox-label">Unisex</label>
            </div>
        </>
    );
}

export default GenderFilter;
