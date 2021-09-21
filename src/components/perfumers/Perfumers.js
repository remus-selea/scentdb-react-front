import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { useForm, Controller } from "react-hook-form"
import { Button } from 'primereact/button';
import { ProgressSpinner } from 'primereact/progressspinner';
import { InputText } from 'primereact/inputtext';

import SortDropdown from '../common/SortDropdown';
import CustomPaginator from '../common/CustomPaginator';
import PerfumerCard from './PerfumerCard';
import axiosApiCall from '../../util/axiosService'
import { SEARCH_PERFUMERS_URL } from '../../util/constants';

import './Perfumers.scss'

function Perfumers(props) {
  const [data, setData] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [totalRecords, setTotalRecords] = useState(0);
  const [rows, setRows] = useState(9);
  const [first, setFirst] = useState(0);
  const [loading, setLoading] = useState(false);
  const [selectedSortOrder, setSelectedSortOrder] = useState(null);

  const { handleSubmit, control } = useForm({
    defaultValues: {
      search: "",
    }
  });

  const onSearchFormSubmit = (submittedData) => {
    setSearchQuery(submittedData.search);
  }

  useEffect(() => {
    const fetchSortedPerfumers = async () => {
      const params = new URLSearchParams();
      params.append('q', searchQuery);
      addSortOrderUrlParams(selectedSortOrder, params);

      await getPerfumers(params);
    };

    fetchSortedPerfumers();
  }, [selectedSortOrder, searchQuery]);

  const onCustomPageChange = async (event) => {
    setFirst(event.first);
    setRows(event.rows);

    const params = new URLSearchParams();
    params.append('q', searchQuery);
    params.append('page', event.page)
    params.append('size', event.rows)

    await getPerfumers(params);
  }

  const getPerfumers = async (params) => {
    setLoading(true);
    const result = await axiosApiCall(SEARCH_PERFUMERS_URL, 'get', null, params);
    setLoading(false);

    console.log("the result of the perfumers search request is: ", result)

    if (result) {
      setData(result);
      setTotalRecords(result.totalElements)
    }
  }

  function addSortOrderUrlParams(selectedSortOrder, params) {
    if (selectedSortOrder != null && selectedSortOrder !== undefined && selectedSortOrder.sortField !== undefined) {
      params.append("sort", selectedSortOrder.sortField + ',' + selectedSortOrder.direction);
    }
  }

  const sortOrders = [
    { name: 'Best Matches', code: 'BEST', sortField: "bestMatch", direction: "desc" },
    { name: 'Name Asc', code: 'NAME_ASC', sortField: "nameKeyword", direction: "asc" },
    { name: 'Name Desc', code: 'NAME_DESC', sortField: "nameKeyword", direction: "desc" },
  ];

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
      return (
        <div className="product-grid">
          {
            data.content.map(perfumer =>
              <PerfumerCard key={perfumer.perfumerId} perfumer={perfumer} />)
          }
        </div>
      );
    }
  }

  return (
    <div className="container">
      <div className="main">
        <aside className="filters">

          <div className="perfumers-search">
            <form className="search-note-form" onSubmit={handleSubmit(onSearchFormSubmit)}>

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
          </div>
        </aside>

        <div className="products">
          <div className="user-actions-bar">
            <SortDropdown selectedSortOrder={selectedSortOrder} setSelectedSortOrder={setSelectedSortOrder} sortOrders={sortOrders} />

            <Link className="add-perfumer-link"
              to={{
                pathname: "/perfumers/new"
              }}
            >
              <Button label="Add Perfumer" className="p-button-outlined" />
            </Link>

          </div>

          {renderResults()}

          <div className="paginator-container">
            <CustomPaginator onCustomPageChange={onCustomPageChange} first={first} rows={rows} setRows={setRows} totalRecords={totalRecords} />
          </div>

        </div>
      </div>

    </div>

  );
}

export default Perfumers;
