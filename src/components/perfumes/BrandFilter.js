import React, { useState, useRef, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { BrandService } from './BrandService';


function BrandFilter(props) {
    const {selectedBrands, setSelectedBrands, inputValue, setInputValue} = props;

    const [brands, setBrands] = useState([]);

    const dt = useRef(null);

    const brandService = new BrandService();

    useEffect(() => {
        brandService.getBrands().then(data => setBrands(data));
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const brandBodyTemplate = (rowData) => {
        let { name } = rowData.brand;
        return (
            <React.Fragment>
                <span>
                    {name}
                </span>
            </React.Fragment>
        );
    }

    const brandFilterFunction = (value, filter) => {
        return value.toUpperCase().indexOf(filter.toUpperCase()) >= 0
    }

    const brandFilter = <div className="p-input-icon-left">
        <i className="pi pi-search" />
        <InputText className="brand-search" type="search" placeholder="Search Brands" value={inputValue} onChange={(e) => onBrandInputChange(e)} />
    </div>;


    const onBrandInputChange = (event) => {
        dt.current.filter(event.target.value, 'brand.name', 'custom');
        setInputValue(event.target.value);
    }

    return (
        <>
            <DataTable
                ref={dt}
                value={brands}
                className="p-datatable-brands"
                dataKey="id"
                rowHover
                selection={selectedBrands}
                onSelectionChange={e => setSelectedBrands(e.value)}
                emptyMessage="No brands found"
                scrollable
                scrollHeight="200px"
            >
                <Column selectionMode="multiple"
                    headerClassName="brands-filter-header" />
                <Column
                    // sortable
                    sortField="brand.name"
                    filterField="brand.name"
                    body={brandBodyTemplate}
                    filter
                    filterMatchMode="custom" filterFunction={brandFilterFunction}
                    filterElement={brandFilter}
                />
            </DataTable>
        </>
    );
}

export default BrandFilter;
