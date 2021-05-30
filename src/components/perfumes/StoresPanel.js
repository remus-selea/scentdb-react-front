import { ReactComponent as Rakuten } from '../../assets/icons/rakuten.svg';
import { AiOutlineAmazon, AiOutlineAlibaba } from "react-icons/ai";
import { SiDior } from "react-icons/si";
import { Button } from 'primereact/button';
import React, { useState } from 'react';

function StoresPanel(props) {
    const [price, setPrice] = useState("$53.99");


    return (
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

    );
}
  
export default StoresPanel;
  