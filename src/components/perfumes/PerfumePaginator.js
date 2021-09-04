import React from 'react';
import { Dropdown } from 'primereact/dropdown';
import { Paginator } from 'primereact/paginator';


function PerfumePaginator(props) {
    const { first, rows, setRows, totalRecords, onCustomPageChange,  } = props;

    const paginatorTemplate = {
        layout: 'RowsPerPageDropdown FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport', 'RowsPerPageDropdown': (options) => {
            const dropdownOptions = [
                { label: 9, value: 9 },
                { label: 18, value: 18 },
                { label: 27, value: 27 },
                { label: 36, value: 36 }
            ];
            return (
                <React.Fragment>
                    <Dropdown value={options.value} options={dropdownOptions} label="items to display" onChange={(event) => onChangeItemsToDisplay(event)} appendTo={document.body} />
                </React.Fragment>
            );
        },
        'CurrentPageReport': (options) => {
            return (
                <span style={{ color: 'var(--text-color)', userSelect: 'none', width: '120px', textAlign: 'center' }}>
                    {options.first} - {options.last} of {options.totalRecords}
                </span>
            )
        }
    }


    const onChangeItemsToDisplay = (options) => {
        setRows(options.value)
    }


    return (
        <Paginator template={paginatorTemplate} first={first} rows={rows}
            totalRecords={totalRecords}
            onPageChange={(event) => onCustomPageChange(event)}
        ></Paginator>
    );

}

export default PerfumePaginator;
