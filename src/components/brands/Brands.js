import React, { useState, useEffect } from 'react';
import { SEARCH_COMPANIES_URL } from '../../util/constants';
import axiosApiCall from '../../util/axiosService'
import { Button } from 'primereact/button';
import { Link } from "react-router-dom";
import { InputText } from 'primereact/inputtext';
import { Paginator } from 'primereact/paginator';
import { Dropdown } from 'primereact/dropdown';
import CompanyCard from './CompanyCard'
import "./Brands.scss"

function Brands(props) {
  const [data, setData] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [totalRecords, setTotalRecords] = useState(0);
  const [rows, setRows] = useState(9);
  const [page, setPage] = useState(0);
  const [first, setFirst] = useState(0);

  const fetchBrands = async (params) => {
    const result = await axiosApiCall(SEARCH_COMPANIES_URL, 'get', null, params);
    // console.log("the result of the companies search request is:")
    // console.log(result)

    setData(result);
    setTotalRecords(result.totalElements)
  }

  useEffect(() => {
    const fetchData = async () => {
      const params = new URLSearchParams();
      params.append('size', rows)

      await fetchBrands(params);
    };

    fetchData();
  }, []);

  const searchCompanies = async () => {
    setPage(0);

    const params = new URLSearchParams();
    params.append('q', searchQuery);
    params.append('size', rows)
    params.append('page', page)

    await fetchBrands(params);  
  }

  const onCustomPageChange = async (event) => {
    setPage(event.page);
    setFirst(event.first);
    setRows(event.rows);

    const params = new URLSearchParams();
    params.append('q', searchQuery);
    params.append('page', event.page)
    params.append('size', event.rows)

    await fetchBrands(params);
  }

  const onChangeItemsToDisplay = (options) => {
    setRows(options.value)
  }

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


  let emptyResult = (data == null || (data.content < 1 || data === undefined));

  const renderResults = () => {

    if (emptyResult) {
      return <div><h2>No companies found.</h2></div>
    } else {
      return data.content.map(company =>{
        return <CompanyCard key={company.companyId} company={company} />
      })
    }
  }
  

  return (
    <div className="container">
      <div className="user-actions-bar">

        <div>
          <div className="p-inputgroup">
            <InputText className="p-inputtext-sm" value={searchQuery}
              onChange={
                (e) => setSearchQuery(e.target.value)}
              placeholder="Search" />
            <Button icon="pi pi-search" className="search-button" onClick={() => searchCompanies()} />
          </div>

        </div>

        <Link className="add-company-link"
          to={{
            pathname: "/companies/new"
          }}
        >
          <Button label="Add Company" className="p-button-outlined" />
        </Link>

      </div>

      <div className="main">
        <aside className="filters">
        </aside>

        <div className="products">
          <div className="product-grid">
            {renderResults()}
          </div>

          <div className="paginator-container">
            <Paginator template={paginatorTemplate} first={first} rows={rows}
              totalRecords={totalRecords}
              onPageChange={(event) => onCustomPageChange(event)}
            ></Paginator>
          </div>

        </div>
      </div>

    </div>

  );

}
  
export default Brands;
  