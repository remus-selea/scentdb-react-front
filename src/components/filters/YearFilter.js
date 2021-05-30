import { Slider } from 'primereact/slider';
import React, { useState } from 'react';
import { InputNumber } from 'primereact/inputnumber';
import "./YearFilter.scss"


function YearFilter(props) {
    const [rangeValues, setRangeValues] = useState([1920, 2021]);

    const handleRangeValueChange = (event) => {

        setRangeValues(event.value);
    }

    const handleStarYearChange = (event) => {
        console.log("start year change", event.value)

        console.log("rangevalues", rangeValues)
        const rangeValueArray = [event.value, rangeValues[1]];

        setRangeValues(rangeValueArray);
    }


    const handleEndYearChange = (event) => {
        console.log("start year change", event.value)

        console.log("rangevalues", rangeValues)
        const rangeValueArray = [rangeValues[0], event.value];

        setRangeValues(rangeValueArray);
    }

    return (
        <>
            <div className="year-filter-wrapper">
                <Slider value={rangeValues} onChange={(e) => handleRangeValueChange(e)} range min={1920} max={2021} />

                <div className="year-controls">
                    <div className="year-row">
                        <label htmlFor="startYear">Start Year</label>
                        <InputNumber inputId="startYear" showButtons inputClassName="year-filter-input" value={rangeValues[0]} onValueChange={(e) => handleStarYearChange(e)} mode="decimal" useGrouping={false} min={1920} max={2021} />
                    </div>

                    <div className="year-row">
                        <label htmlFor="endYear">End Year</label>
                        <InputNumber inputId="endYear" showButtons inputClassName="year-filter-input" value={rangeValues[1]} onValueChange={(e) => handleEndYearChange(e)} mode="decimal" useGrouping={false} min={1920} max={2021} />
                    </div>
                </div>
            </div>

        </>
    );
}

export default YearFilter;
