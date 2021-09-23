import React, { useState, useRef, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';

import { BrandFilterContext } from '../../contexts/BrandFilterContext'
import { GET_ALL_COMPANIES_URL } from './../../util/constants'
import axiosApiCall from '../../util/axiosService'

function BrandFilter(props) {
    const { brandFilterInputValue, setBrandFilterInputValue } = props;
    const [brands, setBrands] = useState([]);
    const { selectedBrands, setSelectedBrands } = React.useContext(BrandFilterContext)

    const dataTableRef = useRef(null);

    useEffect(() => {
        const fetchData = async () => {
            const params = new URLSearchParams();

            await fetchCompanies(params);
        };

        fetchData();
    }, []);

    const fetchCompanies = async (params) => {
        let apiUrl = GET_ALL_COMPANIES_URL;
        if (process.env.REACT_APP_USE_MOCK_API === 'true') {
          apiUrl = "/mocks/brands/get-all-brands.json";
          console.log("Using mock data")
        }
        const result = await axiosApiCall(apiUrl, 'get', null, params);
        // console.log("the result of the call to get all companies is:", result)

        setBrands(result);
    }

    const brandBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <span>
                    {rowData.name}
                </span>
            </React.Fragment>
        );
    }

    const brandFilterFunction = (value, filter) => {
        return value.toUpperCase().indexOf(filter.toUpperCase()) >= 0
    }

    const brandFilter = <div className="p-input-icon-left">
        <i className="pi pi-search" />
        <InputText className="brand-search" type="search" placeholder="Search Brands" value={brandFilterInputValue} onChange={(e) => onBrandInputChange(e)} />
    </div>;


    const onBrandInputChange = (event) => {
        dataTableRef.current.filter(event.target.value, 'name', 'custom');
        setBrandFilterInputValue(event.target.value);
    }


    return (
        <>
            <DataTable
                ref={dataTableRef}
                value={brands}
                className="p-datatable-brands"
                dataKey="companyId"
                rowHover
                selection={selectedBrands}
                onSelectionChange={event => setSelectedBrands(event.value)}
                emptyMessage="No brands found"
                scrollable
                scrollHeight="210px"
            >
                <Column selectionMode="multiple"
                    headerClassName="brands-filter-header" />
                <Column
                    // sortable
                    sortField="name"
                    filterField="name"
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
