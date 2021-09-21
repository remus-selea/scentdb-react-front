import React from 'react';
import { Dropdown } from 'primereact/dropdown';


function SortDropdown(props) {
    const { selectedSortOrder, setSelectedSortOrder, sortOrders } = props;

    const onSortOrderChange = (e) => {
        setSelectedSortOrder(e.value);
    }

    const isOptionDisabled = (option) => {
        if (option.code === 'MOST_POP' ||
            option.code === 'LEAST_POP' ||
            option.code === 'LEAST_REV' ||
            option.code === 'MOST_REV'
        ) {
            return true;
        }
    }

    return (
        <div>
            <Dropdown className="sort-dropdown" value={selectedSortOrder} options={sortOrders} optionDisabled={isOptionDisabled} onChange={onSortOrderChange} optionLabel="name" placeholder="Sort By" scrollHeight="500px" />
        </div>
    );

}

export default SortDropdown;
