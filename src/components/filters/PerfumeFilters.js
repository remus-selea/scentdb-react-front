import { Panel } from 'primereact/panel';
import React, { useState } from 'react';
import { Button } from 'primereact/button';
import GenderFilter from './GenderFilter';
import BrandFilter from './BrandFilter';
import YearFilter from './YearFilter';
import PerfumeTypeFilter from './PerfumeTypeFilter';
import { BrandFilterContext } from '../../contexts/BrandFilterContext'
import { YearFilterContext } from '../../contexts/YearFilterContext'
import { PerfumeTypeFilterContext } from '../../contexts/PerfumeTypeFilterContext'
import { GenderFilterContext } from '../../contexts/GenderFilterContext'

import "./PerfumeFilters.scss"

function PerfumeFilters(props) {
    const [genderPanelCollapsed, setGenderPanelCollapsed] = useState(false);
    const [brandPanelCollapsed, setBrandPanelCollapsed] = useState(false);
    const [typePanelCollapsed, setTypePanelCollapsed] = useState(false);
    const [yearPanelCollapsed, setYearPanelCollapsed] = useState(false);

    const [brandFilterInputValue, setBrandFilterInputValue] = useState([]);
    const { resetSelectedBrands } = React.useContext(BrandFilterContext);
    const { resetYearRangeValues } = React.useContext(YearFilterContext);
    const { resetGenders } = React.useContext(GenderFilterContext);
    const { resetPerfumeTypes } = React.useContext(PerfumeTypeFilterContext);

    const doReset = () => {
        resetSelectedBrands()
        resetYearRangeValues()
        resetGenders()
        resetPerfumeTypes()
        setBrandFilterInputValue('');
    }

    let showClearFilters = (!brandPanelCollapsed || !genderPanelCollapsed || !typePanelCollapsed || !yearPanelCollapsed);

    const clearFiltersBtn = (
        <Button type="button" label="Clear" className="p-button-outlined" icon="pi pi-filter-slash" onClick={doReset} />
    );

    return (
        <>
            <Panel header="Gender" toggleable collapsed={genderPanelCollapsed} onToggle={(event) => setGenderPanelCollapsed(event.value)}>
                <GenderFilter />
            </Panel>

            <Panel header="Type" toggleable collapsed={typePanelCollapsed} onToggle={(event) => setTypePanelCollapsed(event.value)}>
                <PerfumeTypeFilter />
            </Panel>

            <Panel header="Brand" toggleable collapsed={brandPanelCollapsed} onToggle={(event) => setBrandPanelCollapsed(event.value)}>
                <BrandFilter brandFilterInputValue={brandFilterInputValue} setBrandFilterInputValue={setBrandFilterInputValue} />
            </Panel>

            <Panel header="Year" toggleable collapsed={yearPanelCollapsed} onToggle={(event) => setYearPanelCollapsed(event.value)}>
                <YearFilter />
            </Panel>

            {showClearFilters &&
                <div className="clear-filters">
                    {clearFiltersBtn}
                </div>
            }
        </>
    );
}


export default PerfumeFilters;
