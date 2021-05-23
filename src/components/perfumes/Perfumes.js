import React, { useState } from 'react';
import Perfume from './Perfume'
import "./Perfumes.scss"
import Filters from './Filters'
function Perfumes(props) {


return (
  <main className="main">
    <aside className="filters">
      <Filters/>
    </aside>
    <div className="products">
      Perfumes
      <div className="product-grid">
        <Perfume />
        <Perfume />
        <Perfume />
        <Perfume />
        <Perfume />
      </div>

    </div>
  </main>

);
}

export default Perfumes;
