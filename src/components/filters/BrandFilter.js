import React, { useState, useRef, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import {GET_ALL_COMPANIES_URL} from './../../util/constants'
import axiosApiCall from '../../util/axiosService'
import { BrandFilterContext } from '../../contexts/BrandFilterContext'

function BrandFilter(props) {
    const { inputValue, setInputValue } = props;
    const [brands, setBrands] = useState([]);
    const { selectedBrands, setSelectedBrands, reset } = React.useContext(BrandFilterContext)

    const dt = useRef(null);

    useEffect(() => {
        const fetchData = async () => {
            const params = new URLSearchParams();
            
            await fetchCompanies(params);
        };

        fetchData();
    }, []);

    
  const fetchCompanies = async (params) => {
    const result = await axiosApiCall(GET_ALL_COMPANIES_URL, 'get', null, params);
    // console.log("the result of the call to get all companies is:")
    // console.log(result)

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
        <InputText className="brand-search" type="search" placeholder="Search Brands" value={inputValue} onChange={(e) => onBrandInputChange(e)} />
    </div>;


    const onBrandInputChange = (event) => {
        dt.current.filter(event.target.value, 'name', 'custom');
        setInputValue(event.target.value);
    }


    return (
        <>
            <DataTable
                ref={dt}
                value={brands}
                className="p-datatable-brands"
                dataKey="companyId"
                rowHover
                selection={selectedBrands   }
                onSelectionChange={e => setSelectedBrands(e.value)}
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
