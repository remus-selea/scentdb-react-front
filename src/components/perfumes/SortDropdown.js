import React from 'react';
import { Dropdown } from 'primereact/dropdown';


function SortDropdown(props) {
    const { selectedSortOrder, setSelectedSortOrder } = props;

    const sortOrders = [
        { name: 'Best Matches', code: 'BEST', sortField: "bestMatch", direction: "desc" },
        { name: 'Newest', code: 'NEWEST', sortField: "launchYear", direction: "desc", },
        { name: 'Oldest', code: 'OLDEST', sortField: "launchYear", direction: "asc" },
        { name: 'Name Asc', code: 'NAME_ASC', sortField: "titleKeyword", direction: "asc" },
        { name: 'Name Desc', code: 'NAME_DESC', sortField: "titleKeyword", direction: "desc" },
        { name: 'Most Reviews', code: 'MOST_REV', direction: "asc" },
        { name: 'Least Reviews', code: 'LEAST_REV', direction: "desc" },
        { name: 'Most Popular', code: 'MOST_POP', direction: "asc" },
        { name: 'Least Popular', code: 'LEAST_POP', direction: "desc" },
    ];

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
