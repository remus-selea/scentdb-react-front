import React, { useState, useEffect } from 'react';
import Perfume from './Perfume'
import "./Perfumes.scss"
import Filters from '../filters/Filters'
import axiosApiCall from '../../util/axiosService'
import { ALL_PERFUMES_URL } from '../../util/constants';

function Perfumes(props) {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axiosApiCall(ALL_PERFUMES_URL, 'get');

      setData(result);
    };

    fetchData();

  }, []);


  let emptyResult = (data == null || (data.perfumes.length < 1 || data.perfumes === undefined));


  const renderResults = () => {
    if (emptyResult) {
      return <div><h2>No perfumes found.</h2></div>
    } else {
      return data.perfumes.map(perfume =>
        <Perfume key={perfume.perfumeId} perfume={perfume} />);
    }
  }
  return (
    <main className="main">
      <aside className="filters">
        <Filters />
      </aside>
      <div className="products">
        <div className="product-grid">
          {renderResults()}
        </div>

      </div>
    </main>

  );
}

export default Perfumes;
