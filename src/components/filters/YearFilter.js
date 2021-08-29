import { Slider } from 'primereact/slider';
import React from 'react';
import { InputNumber } from 'primereact/inputnumber';
import { YearFilterContext } from '../../contexts/YearFilterContext'
import { minYear, maxYear } from '../../util/constants'

import "./YearFilter.scss"


function YearFilter(props) {
    const { yearRangeValues, setYearRangeValues } = React.useContext(YearFilterContext)

    const handleRangeValueChange = (event) => {
        setYearRangeValues(event.value);
    }

    const handleStarYearChange = (event) => {
        const rangeValueArray = [event.value, yearRangeValues[1]];

        setYearRangeValues(rangeValueArray);
    }


    const handleEndYearChange = (event) => {
        const rangeValueArray = [yearRangeValues[0], event.value];

        setYearRangeValues(rangeValueArray);
    }

    return (
        <>
            <div className="year-filter-wrapper">
                <div className="year-slider">
                    <Slider value={yearRangeValues} onChange={(e) => handleRangeValueChange(e)} range min={minYear} max={maxYear} />
                </div>

                <div className="year-controls">
                    <div className="year-row">
                        <label htmlFor="startYear">Start Year</label>
                        <InputNumber inputId="startYear" showButtons inputClassName="year-filter-input" value={yearRangeValues[0]} onValueChange={(e) => handleStarYearChange(e)} mode="decimal" useGrouping={false} min={minYear} max={maxYear} />
                    </div>

                    <div className="year-row">
                        <label htmlFor="endYear">End Year</label>
                        <InputNumber inputId="endYear" showButtons inputClassName="year-filter-input" value={new Date().getFullYear()} onValueChange={(e) => handleEndYearChange(e)} mode="decimal" useGrouping={false} min={minYear} max={maxYear} />
                    </div>
                </div>
            </div>

        </>
    );
}

export default YearFilter;
