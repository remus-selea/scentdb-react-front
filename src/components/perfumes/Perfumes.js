import React, { useState, useEffect } from 'react';
import PerfumeCard from './PerfumeCard'
import "./Perfumes.scss"
import Filters from '../filters/Filters'
import axiosApiCall from '../../util/axiosService'
import { SEARCH_PERFUMES_URL } from '../../util/constants';
import { Button } from 'primereact/button';
import { Link } from "react-router-dom";
import { InputText } from 'primereact/inputtext';
import { Paginator } from 'primereact/paginator';
import { Dropdown } from 'primereact/dropdown';

import { GenderFilterContext } from '../../contexts/GenderFilterContext'
import { YearFilterContext } from '../../contexts/YearFilterContext'
import { PerfumeTypeFilterContext } from '../../contexts/PerfumeTypeFilterContext'
import { BrandFilterContext } from '../../contexts/BrandFilterContext'


function Perfumes(props) {
  const [data, setData] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(9);
  const [totalRecords, setTotalRecords] = useState(0);
  const [page, setPage] = useState(0);
  const { genders } = React.useContext(GenderFilterContext)
  const { yearRangeValues } = React.useContext(YearFilterContext)
  const { perfumeTypes } = React.useContext(PerfumeTypeFilterContext)
  const { selectedBrands } = React.useContext(BrandFilterContext)


  const fetchPerfumes = async (params) => {
    const result = await axiosApiCall(SEARCH_PERFUMES_URL, 'get', null, params);
    // console.log("the result of the call is:")
    // console.log(result)

    setData(result.content[0]);
    setTotalRecords(result.totalElements)
  }

  useEffect(() => {
    const fetchFilteredPerfumes = async () => {
      const params = new URLSearchParams();

      addFilterToParams(params, genders, "gender", "genderFilter");
      addFilterToParams(params, yearRangeValues, "year", "yearFilter");
      addFilterToParams(params, perfumeTypes, "perfumeType", "perfumeTypeFilter");

      let selectedBrandIdsArr = []
      if (selectedBrands) {
        selectedBrands.forEach(element => {
          selectedBrandIdsArr.push(element.companyId)
        });
      }

      addFilterToParams(params, selectedBrandIdsArr, "companyId", "companyFilter");

      await fetchPerfumes(params);
    };

    fetchFilteredPerfumes();
  }, [genders.length, yearRangeValues[0], yearRangeValues[1], JSON.stringify(perfumeTypes), JSON.stringify(selectedBrands)]);



  useEffect(() => {
    const fetchData = async () => {
      const params = new URLSearchParams();
      params.append('size', rows)

      await fetchPerfumes(params);
    };

    fetchData();
  }, []);

  const onCustomPageChange = async (event) => {
    setPage(event.page);
    setFirst(event.first);
    setRows(event.rows);

    const params = new URLSearchParams();
    params.append('q', searchQuery);
    params.append('page', event.page)
    params.append('size', event.rows)

    await fetchPerfumes(params);
  }

  const searchPerfumes = async () => {
    setPage(0);

    const params = new URLSearchParams();
    params.append('q', searchQuery);
    params.append('size', rows)
    params.append('page', page)
    addFilterToParams(params, genders, "gender", "genderFilter");
    addFilterToParams(params, yearRangeValues, "year", "yearFilter");
    addFilterToParams(params, perfumeTypes, "perfumeType", "perfumeTypeFilter");

    await fetchPerfumes(params);
  }

  const renderResults = () => {
    if (emptyResult) {
      return <div><h2>No perfumes found.</h2></div>
    } else {
      return data.perfumes.map(perfume =>
        <PerfumeCard key={perfume.perfumeId} perfume={perfume} />);
    }
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

  let emptyResult = (data == null || (data.perfumes.length < 1 || data.perfumes === undefined));


  function addFilterToParams(params, filterArray, filterName, filterUrlParamName = "filter") {
    let filter = filterName + ':';

    for (const [i, filterValue] of filterArray.entries()) {

      if (i === filterArray.length - 1) {
        filter = filter + filterValue;
      } else {
        filter = filter + filterValue + ',';
      }
    }

    if (filter != filterName + ':') {
      params.append(filterUrlParamName, filter + ';');
    }
  }

  return (
    <main className="container">
      <div className="user-actions-bar">

        <div className="perfumes-search">
          <div className="p-inputgroup">
            <InputText className="p-inputtext-sm" value={searchQuery}
              onChange={
                (e) => setSearchQuery(e.target.value)}
              placeholder="Search" />
            <Button icon="pi pi-search" className="search-button" onClick={() => searchPerfumes()} />
          </div>

        </div>

        <Link className="add-perfume-link"
          to={{
            pathname: "/perfumes/new"
          }}
        >
          <Button label="Add Perfume" className="p-button-outlined" />
        </Link>

      </div>

      <div className="main">
        <aside className="filters">
          <Filters />
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

    </main>

  );


}

export default Perfumes;
