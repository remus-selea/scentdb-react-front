import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, useLocation } from "react-router-dom";

import { PERFUME_BY_ID_URL } from '../../util/constants';
import axiosApiCall from '../../util/axiosService'
import CarouselSlider from './CarouselSlider';
import RatingComponent from '../RatingComponent'
import { Button } from 'primereact/button';

import { ReactComponent as WishIcon } from '../../assets/icons/wish.svg';
import { ReactComponent as OwnIcon } from '../../assets/icons/own.svg';
import { ReactComponent as WearIcon } from '../../assets/icons/wear.svg';

import { ReactComponent as Rakuten } from '../../assets/icons/rakuten.svg';
import { AiOutlineAmazon, AiOutlineAlibaba } from "react-icons/ai";
import { SiDior } from "react-icons/si";


import '@splidejs/splide/dist/css/themes/splide-default.min.css';
import "./PerfumeDetails.scss"

function PerfumeDetails(props) {
  const location = useLocation();
  const { perfumeId } = location.state;
  const [data, setData] = useState(null);
  const [price, setPRice] = useState("$53.99");

  useEffect(() => {
    const fetchData = async () => {
      const result = await axiosApiCall(PERFUME_BY_ID_URL + perfumeId, 'get',);
      setData(result);
    };
    fetchData();
  }, []);


  let emptyResult = (data == null || (data.perfumes.length < 1 || data.perfumes == undefined));

  return (
    <div className="perfume-details container">
      { !emptyResult &&
        <CarouselSlider perfume={data.perfumes[0]} />
      }

      <div className="perfume-content">
        {!emptyResult &&
          <header className="perfume-details-headings">
            <h1 className="perfume-name"> {data.perfumes[0].title}</h1>
            <h2 className="perfume-brand"> {data.perfumes[0].brand}</h2>
          </header>
        }

        <RatingComponent />

        <div className="perfume-details-actions">
          <div className="perfume-action wishlist-action">
            <WishIcon className="action-icon" />
            <div className="action-name">WISH</div>
            <div className="action-count">53</div>
          </div>
          <div className="perfume-action own-action">
            <WearIcon className="action-icon" />
            <div className="action-name">WEAR</div>
            <div className="action-count">21</div>
          </div>
          <div className="perfume-action wear-action">
            <OwnIcon className="action-icon" />
            <div className="action-name">OWN</div>
            <div className="action-count">86</div>
          </div>
        </div>



        <div className="stores-panel">
          <div className="divider"> </div>
          <h3 className="stores-heading">Prices</h3>
          <div className="divider"> </div>

          <div className="store-item">
            <AiOutlineAmazon className="store-icon" />

            <div className="buy-button-wrapper">
              <Button label={price} className="buy-button" />
              <span className="buy-notice">Taxes and delivery charges applicable</span>

            </div>

          </div>

          <div className="divider"></div>
          <div className="store-item">
            <AiOutlineAlibaba className="store-icon" />

            <div className="buy-button-wrapper">
              <Button label={price} className="buy-button" />
              <span className="buy-notice">Taxes and delivery charges applicable</span>

            </div>

          </div>

          <div className="divider"></div>
          <div className="store-item">
            <SiDior className="store-icon" />

            <div className="buy-button-wrapper">
              <Button label={price} className="buy-button" />
              <span className="buy-notice">Taxes and delivery charges applicable</span>


            </div>

          </div>

          <div className="divider"></div>

          <div className="store-item">
            <Rakuten className="store-icon" />

            <div className="buy-button-wrapper">
              <Button label={price} className="buy-button" />
              <span className="buy-notice">Taxes and delivery charges applicable</span>

            </div>
          </div>

          <div className="divider"></div>
        </div>

      </div>

    </div>
  );
}

export default PerfumeDetails;
