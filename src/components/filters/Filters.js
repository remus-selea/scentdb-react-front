import { Panel } from 'primereact/panel';
import React, { useState, useRef } from 'react';
import { Button } from 'primereact/button';
import GenderFilter from './GenderFilter';
import BrandFilter from './BrandFilter';
import YearFilter from './YearFilter';
import PerfumeTypeFilter from './PerfumeTypeFilter';
import { BrandFilterContext } from '../../contexts/BrandFilterContext'

import "./Filters.scss"


function Filters(props) {
    const [genderPanelCollapsed, setGenderPanelCollapsed] = useState(false);
    const [brandPanelCollapsed, setBrandPanelCollapsed] = useState(false);

    const dt = useRef(null);
    const [inputValue, setInputValue] = useState([]);
    const {setSelectedBrands} = React.useContext(BrandFilterContext)

    const reset = () => {
        setSelectedBrands(null);
        setInputValue('');  
        if (dt.current != null) {
            dt.current.reset();
        }
    }

    const clearFiltersBtn = (
        <div className="table-header">
            <Button type="button" label="Clear" className="p-button-outlined" icon="pi pi-filter-slash" onClick={reset} />
        </div>
    );

    let showClearFilters = (!brandPanelCollapsed || !genderPanelCollapsed);

    return (
        <>
            <Panel header="Gender" toggleable collapsed={genderPanelCollapsed} onToggle={(e) => setGenderPanelCollapsed(e.value)}>
                <GenderFilter />
            </Panel>
            
            <Panel header="Type" toggleable>
                <PerfumeTypeFilter />
            </Panel>

            <Panel header="Brand" toggleable collapsed={brandPanelCollapsed} onToggle={(e) => setBrandPanelCollapsed(e.value)}>
                <BrandFilter inputValue={inputValue} setInputValue={setInputValue} />
            </Panel>

            <Panel header="Year" toggleable>
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


export default Filters;
