import { ProgressBar } from 'primereact/progressbar';
import React, { useState } from 'react';
import "./Reviews.scss"
import RatingComponent from '../RatingComponent'
import ReviewDialog from './ReviewDialog'

function Reviews(props) {
    const [fiveStarReviewValue, setFiveStarReviewValue] = useState(62);
    const [fourStarReviewValue, setFourStarReviewValue] = useState(14);
    const [threeStarReviewValue, setThreeStarReviewValue] = useState(8);
    const [twoStarReviewValue, setTwoStarReviewValue] = useState(7);
    const [oneStarReviewValue, setOneStarReviewValue] = useState(9);

    const fieldData = ['Longevity', 'Sillage', 'Bottle appearance', 'Value for money']

    return (
        <div className="reviews-summary">

            <div className="review-stars-summary">
                {/* <div className="review-count">52 Reviews</div> */}
                <div className="stars-average">4.6/5</div>

                <div className="ratings">
                    <RatingComponent readonly={true} showCount={true} />
                </div>

                <div>
                    <ReviewDialog fieldData={fieldData} />
                </div>

            </div>

            <div>
                <div className="rating-row">
                    <span>5 Stars</span>
                    <ProgressBar value={fiveStarReviewValue}></ProgressBar>
                </div>
                <div className="rating-row">
                    <span>4 Stars</span>
                    <ProgressBar value={fourStarReviewValue}></ProgressBar>
                </div>
                <div className="rating-row">
                    <span>3 Stars</span>
                    <ProgressBar value={threeStarReviewValue}></ProgressBar>
                </div>
                <div className="rating-row">
                    <span>2 Stars</span>
                    <ProgressBar value={twoStarReviewValue}></ProgressBar>
                </div>
                <div className="rating-row">
                    <span>1 Stars</span>
                    <ProgressBar value={oneStarReviewValue}></ProgressBar>
                </div>

            </div>
            <div>
                <div className="rating-parameter-row">
                    <ProgressBar className="progressbar-segment" value={100}></ProgressBar>
                    <ProgressBar className="progressbar-segment" value={100}></ProgressBar>
                    <ProgressBar className="progressbar-segment" value={100}></ProgressBar>
                    <ProgressBar className="progressbar-segment" value={100}></ProgressBar>
                    <ProgressBar className="progressbar-segment" value={100}></ProgressBar>
                    <span className="rating-parameter-name">Longevity</span>
                </div>
                <div className="rating-parameter-row">
                    <ProgressBar className="progressbar-segment" value={100}></ProgressBar>
                    <ProgressBar className="progressbar-segment" value={100}></ProgressBar>
                    <ProgressBar className="progressbar-segment" value={100}></ProgressBar>
                    <ProgressBar className="progressbar-segment" value={0}></ProgressBar>
                    <ProgressBar className="progressbar-segment" value={0}></ProgressBar>
                    <span className="rating-parameter-name">Sillage</span>
                </div>
                <div className="rating-parameter-row">
                    <ProgressBar className="progressbar-segment" value={100}></ProgressBar>
                    <ProgressBar className="progressbar-segment" value={100}></ProgressBar>
                    <ProgressBar className="progressbar-segment" value={100}></ProgressBar>
                    <ProgressBar className="progressbar-segment" value={100}></ProgressBar>
                    <ProgressBar className="progressbar-segment" value={0}></ProgressBar>
                    <span className="rating-parameter-name">Bottle appearance</span>
                </div>
                <div className="rating-parameter-row">
                    <ProgressBar className="progressbar-segment" value={100}></ProgressBar>
                    <ProgressBar className="progressbar-segment" value={100}></ProgressBar>
                    <ProgressBar className="progressbar-segment" value={100}></ProgressBar>
                    <ProgressBar className="progressbar-segment" value={100}></ProgressBar>
                    <ProgressBar className="progressbar-segment" value={100}></ProgressBar>
                    <span className="rating-parameter-name">Value for money</span>
                </div>
            </div>
        </div>
    );
}

export default Reviews;
