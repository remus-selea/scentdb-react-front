/* eslint-disable no-alert */
import React, { useState } from 'react';
import Rating from 'react-rating'
import star from '../assets/icons/star.svg'; // with import
import starGrey from '../assets/icons/star-grey.svg'; // with import

const RatingComponent = () => {
    const [value, setValue] = useState(4);

    return (
        <div className="rating-component">
            
            <Rating
                initialRating={value}
                onChange={(rate) => setValue(rate)}
                className="rating"
                emptySymbol={<img src={starGrey} className="icon" />}
                fullSymbol={<img src={star} className="icon" />}
            /> 
            <div> {value} </div>
        </div>
    )
}

export default RatingComponent;
