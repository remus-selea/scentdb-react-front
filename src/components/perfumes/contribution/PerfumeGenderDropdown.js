import React from 'react';
import { Dropdown } from 'primereact/dropdown';
import { Controller } from "react-hook-form";
import { classNames } from 'primereact/utils';

export function PerfumeGenderDropdown(props) {
    const { errors } = props;

    
    const genders = [
        { name: 'Male', code: 'MALE' },
        { name: 'Female', code: 'FEMALE' },
        { name: 'Unisex', code: 'UNISEX' },
    ];

    const genderOptionTemplate = (option) => {
        return (
            <div className="country-item">
                <div>{option.name}</div>
            </div>
        );
    }

    const selectedGenderTemplate = (option, props) => {
        if (option) {
            return (
                <div className="country-item country-item-value">
                    <div>{option.name}</div>
                </div>
            );
        }

        return (
            <span>
                {props.placeholder}
            </span>
        );
    }

    return (<div className="p-inputgroup input-wrapper ">
        <span className="p-float-label">
            <Controller 
                name="gender" 
                control={props.control} 
                rules={{required: 'Gender is required.'}} 
                render={({field, fieldState}) => 
                <Dropdown id={field.name} 
                    value={field.value} 
                    onChange={e =>  {
                        field.onChange(e.value); 
                        props.setSelectedGenderCode(e.value.code);
                    }} 
                options={genders} 
                optionLabel="gender"
                placeholder="&#8205;" 
                valueTemplate={selectedGenderTemplate} 
                itemTemplate={genderOptionTemplate} 
                className={classNames({'p-invalid': fieldState.invalid })} />} 
            />

            <label htmlFor="gender" className={classNames({'p-error': errors.gender})}>Gender*</label>
        </span>
    </div>);
}
