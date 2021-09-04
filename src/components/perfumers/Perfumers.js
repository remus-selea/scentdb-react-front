import React, { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Link } from "react-router-dom";
import { InputText } from 'primereact/inputtext';
import { Paginator } from 'primereact/paginator';
import { Dropdown } from 'primereact/dropdown';

import PerfumerCard from './PerfumerCard';
import { SEARCH_PERFUMERS_URL } from '../../util/constants';
import axiosApiCall from '../../util/axiosService'
import './Perfumers.scss'

function Perfumers(props) {
  const [data, setData] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [totalRecords, setTotalRecords] = useState(0);
  const [rows, setRows] = useState(9);
  const [page, setPage] = useState(0);
  const [first, setFirst] = useState(0);
  const [loading, setLoading] = useState(true);


  const getPerfumers = async (params) => {
    setLoading(true);
    const result = await axiosApiCall(SEARCH_PERFUMERS_URL, 'get', null, params);
    setLoading(false);

    // console.log("the result of the perfumers search request is: ", result)

    if (result) {
      setData(result);
      setTotalRecords(result.totalElements)
    }
  }

  const onCustomPageChange = async (event) => {
    setPage(event.page);
    setFirst(event.first);
    setRows(event.rows);

    const params = new URLSearchParams();
    params.append('q', searchQuery);
    params.append('page', event.page)
    params.append('size', event.rows)

    await getPerfumers(params);
  }

  const searchPerfumers = async () => {
    setPage(0);

    const params = new URLSearchParams();
    params.append('q', searchQuery);
    params.append('size', rows)
    params.append('page', page)

    await getPerfumers(params);
  }

  useEffect(() => {
    const fetchData = async () => {
      const params = new URLSearchParams();
      params.append('size', rows)

      await getPerfumers(params);
    };

    fetchData();
  }, [rows]);


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
    if (loading) {
      return (
        <div className="spinner-container">
          <ProgressSpinner />
        </div>
      );
    }
    
    if (emptyResult) {
      return <div><h2>No perfumers found.</h2></div>
    } else {
      return data.content.map(perfumer => {
        return <PerfumerCard key={perfumer.perfumerId} perfumer={perfumer} />
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
            <Button icon="pi pi-search" className="search-button" onClick={() => searchPerfumers()} />
          </div>

        </div>

        <Link className="add-perfumer-link"
          to={{
            pathname: "/perfumers/new"
          }}
        >
          <Button label="Add Perfumer" className="p-button-outlined" />
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

export default Perfumers;
