import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { ProgressSpinner } from 'primereact/progressspinner';
import { useForm } from "react-hook-form"

import { GenderFilterContext } from '../../contexts/GenderFilterContext'
import { YearFilterContext } from '../../contexts/YearFilterContext'
import { PerfumeTypeFilterContext } from '../../contexts/PerfumeTypeFilterContext'
import { BrandFilterContext } from '../../contexts/BrandFilterContext'
import { SEARCH_PERFUMES_URL } from '../../util/constants';
import SortDropdown from './SortDropdown';
import PerfumePaginator from './PerfumePaginator';
import PerfumeCard from './PerfumeCard'
import Filters from '../filters/Filters'
import axiosApiCall from '../../util/axiosService'
import { Controller } from "react-hook-form";


import "./Perfumes.scss"

function Perfumes() {
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
  const [selectedSortOrder, setSelectedSortOrder] = useState(null);
  const [loading, setLoading] = useState(false);

  const { handleSubmit, control } = useForm({
    defaultValues: {
      search: "",
    }
  });

  const onSearchFormSubmit = (submittedData) => {
    setSearchQuery(submittedData.search);
  }


  const fetchPerfumes = async (params) => {
    setLoading(true);
    const result = await axiosApiCall(SEARCH_PERFUMES_URL, 'get', null, params);
    setLoading(false);
    // console.log("the result of the call to fetch perfumes is:", result)

    if (result) {
      setData(result.content[0]);
      setTotalRecords(result.totalElements)
    }
  }

  useEffect(() => {
    const fetchFilteredPerfumes = async () => {
      const params = new URLSearchParams();
      params.append('q', searchQuery);

      addSortOrderUrlParams(selectedSortOrder, params);
      addFilterToUrlParams(params, genders, "gender", "genderFilter");
      addFilterToUrlParams(params, yearRangeValues, "year", "yearFilter");
      addFilterToUrlParams(params, perfumeTypes, "perfumeType", "perfumeTypeFilter");

      let selectedBrandIdsArr = []
      if (selectedBrands) {
        selectedBrands.forEach(element => {
          selectedBrandIdsArr.push(element.companyId)
        });
      }

      addFilterToUrlParams(params, selectedBrandIdsArr, "companyId", "companyFilter");

      await fetchPerfumes(params);
    };

    fetchFilteredPerfumes();
  }, [genders, perfumeTypes, selectedBrands, yearRangeValues, selectedSortOrder, searchQuery]);


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

  
  function addFilterToUrlParams(params, filterArray, filterName, filterUrlParamName = "filter") {
    let filter = filterName + ':';

    for (const [i, filterValue] of filterArray.entries()) {

      if (i === filterArray.length - 1) {
        filter = filter + filterValue;
      } else {
        filter = filter + filterValue + ',';
      }
    }

    if (filter !== filterName + ':') {
      params.append(filterUrlParamName, filter + ';');
    }
  }

  function addSortOrderUrlParams(selectedSortOrder, params) {
    if (selectedSortOrder != null && selectedSortOrder !== undefined && selectedSortOrder.sortField !== undefined) {
      params.append("sort", selectedSortOrder.sortField + ',' + selectedSortOrder.direction);
    }
  }

  let emptyResult = (data == null || (data.perfumes.length < 1 || data.perfumes === undefined));

  const renderResults = () => {
    if (loading) {
      return (
        <div className="spinner-container">
          <ProgressSpinner />
        </div>
      );
    }

    if (emptyResult) {
      return (<div><h2>No perfumes found.</h2></div>);
    } else {
      return (
        <div className="product-grid">
          {
            data.perfumes.map(perfume =>
              <PerfumeCard key={perfume.perfumeId} perfume={perfume} />)
          }
        </div>
      );
    }

  }

  return (
    <main className="container">

      <div className="main">
        <aside className="filters">

          <div className="perfumes-search">
            <form className="add-company-form" onSubmit={handleSubmit(onSearchFormSubmit)}>

              <div className="p-inputgroup">
                <Controller
                  name="search"
                  control={control}
                  render={({ field }) =>
                    <InputText id={field.name}{...field} className="p-inputtext-sm" placeholder="Search" />}
                />
                <Button icon="pi pi-search" className="search-button" type="submit" />
              </div>
            </form>

          </div>

          <div className="filters-container">
            <Filters />
          </div>
        </aside>

        <div className="products">
          <div className="user-actions-bar">
            <SortDropdown selectedSortOrder={selectedSortOrder} setSelectedSortOrder={setSelectedSortOrder} />

            <Link className="add-perfume-link"
              to={{
                pathname: "/perfumes/new"
              }}
            >
              <Button label="Add Perfume" className="p-button-outlined" />
            </Link>

          </div>

          {renderResults()}

          <div className="paginator-container">
            <PerfumePaginator onCustomPageChange={onCustomPageChange} first={first} rows={rows} setRows={setRows} totalRecords={totalRecords} />
          </div>
        </div>

      </div>

    </main >

  );

}

export default Perfumes;