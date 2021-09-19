/* eslint-disable no-alert */
import React, { useState } from 'react';
import Rating from 'react-rating'
import star from '../../assets/icons/star.svg'; // with import
import starGrey from '../../assets/icons/star-grey.svg'; // with import

const RatingComponent = (props) => {
    const [value, setValue] = useState(4);
    const { readonly, showCount } = props;
    return (
        <div className="rating-component">

            <Rating
                readonly={readonly}
                initialRating={value}
                onChange={(rate) => setValue(rate)}
                className="rating"
                emptySymbol={<img src={starGrey} className="icon" alt="" />}
                fullSymbol={<img src={star} className="icon" alt="" />}
            />
            {showCount &&
                <div className="rating-count"> ({value} Reviews) </div>

            }
        </div>
    )
}

export default RatingComponent;
