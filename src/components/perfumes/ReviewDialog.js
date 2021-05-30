import React, { useState } from 'react';
import PropTypes from "prop-types";
import "./ReviewDialog.scss"
import { ReactComponent as StarIcon } from '../../assets/icons/star.svg';
import { ReactComponent as StarGreyIcon } from '../../assets/icons/star-grey.svg';
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';

function Reviewer(props) {
    const [starValue, setStarValue] = React.useState("");
    const [textReview, setTextReview] = React.useState("");
    const [startTime, setStartTime] = React.useState(0);
    const [isSubmitted, setIsSubmitted] = React.useState(false);
    const [letterCorrected, setLetterCorrected] = React.useState(0);
    const [timesKeyPressed, setTimesKeyPressed] = React.useState(0);
    const [pastedTimes, setPastedTimes] = React.useState(0);
    const [fieldData, setFieldData] = React.useState([]);

    const [displayBasic, setDisplayBasic] = useState(false);
    const [position, setPosition] = useState('center');

    const dialogFuncMap = {
        'displayBasic': setDisplayBasic,
    }

    const onClick = (name, position) => {
        dialogFuncMap[`${name}`](true);

        if (position) {
            setPosition(position);
        }
    }
    const onHide = (name) => {
        dialogFuncMap[`${name}`](false);
    }

    const renderFooter = (name) => {
        return (
            <div>
                <Button form="reviewForm"  type="submit" label="Send Review" icon="pi" autoFocus onClick={() => onHide(name)}  />
            </div>
        );
    }


    React.useEffect(() => {
        var fieldDataObject = props.fieldData;
        // console.log(fieldDataObject);

        if (fieldDataObject !== undefined) {
            fieldDataObject = fieldDataObject.map((str, i) => ({
                name: str, id: i, stars: 0, text: ""
            }));
            setFieldData(fieldDataObject)
        }
    }, [props.fieldData])


    function submitReview(e) {
        e.preventDefault();
        setIsSubmitted(true)
        if (starValue !== null && starValue !== -1) {
        } else {
            alert("Please give it some stars");
        }
        var res = {
            text: textReview,
            stars: starValue,
            categoryData: fieldData
        }
        console.log("fielddata", fieldData);
        console.log("res", res);
        return res;
    }

    const handleStarChange = (newValue) => {
        setStarValue(newValue)
    }

    const clearStar = () => {
        setStarValue(-1)
    }


    const handleTextChange = (event) => {
        var textt = event.target.value;

        if (startTime === 0) {
            var startT = new Date();
            setStartTime(startT.getTime())
        }

        if (textReview.length > textt.length) {
            setLetterCorrected(letterCorrected + 1);
        }

        if (textt.length - textReview.length > 1) {
            setPastedTimes(pastedTimes + 1)
        }
        setTextReview(event.target.value);
        setTimesKeyPressed(timesKeyPressed + 1);
    }

    const handleFieldStarChange = (newValue, i) => {
        let newerFieldData = [...fieldData];
        newerFieldData[i].stars = newValue;
        setFieldData(newerFieldData)
    }

    const makeFieldUI = () => {
        return fieldData.map((field, i) => (
            <div key={i}>
                <div>
                    <div>
                        <p>{field.name}</p>

                        <div className="individual-rating">
                            <StarRating
                                value={fieldData[i].stars}
                                onChange={(newValue) => {
                                    //   console.log(newValue);
                                    handleFieldStarChange(newValue, i)
                                }}
                            />
                        </div>


                    </div>


                </div>
            </div>
        ))
    }

    return (
        <div>
            <Button onClick={() => onClick('displayBasic')} label="Write a review" className="p-button-outlined" />

            <Dialog header="Add a new review" visible={displayBasic} style={{ width: '50vw' }} footer={renderFooter('displayBasic')} onHide={() => onHide('displayBasic')}>
                {!isSubmitted ? (
                    <div>
                        <form noValidate id="reviewForm" autoComplete="off" onSubmit={submitReview}>
                            <div>

                                <div className="overall-rating">Overall Rating</div>
                                <div className="star-component">
                                    <StarRating value={starValue} onChange={handleStarChange} />
                                    <div className="rating-count">{starValue}</div>
                                </div>

                                <div>
                                    {makeFieldUI()}
                                </div>

                                <InputTextarea
                                    className="review-textarea"
                                    rows="4"
                                    cols="40"
                                    value={textReview}
                                    onChange={handleTextChange}
                                    placeholder="Write your review here..."
                                >
                                </InputTextarea >

                            </div>
                        </form>
                    </div>
                ) : (
                    <p>Thanks for Sharing your value review. We take our feedback system very seriously.</p>
                )}

            </Dialog>

        </div>
    )
}


function StarRating(props) {
    const change = (newStars) => {
        props.onChange(newStars)
    }
    return (
        <div >
            <div className="star-rating">
                {[1, 2, 3, 4, 5].map((n, i) => (
                    <Star
                        key={i}
                        selected={i < props.value}
                        onClick={() => change(i + 1)}
                    />
                ))}
            </div>
        </div>
    )
}

const Star = ({ selected = false, onClick = f => f }) => (
    <div >
        {selected ?
            (<StarIcon className="star-icon" onClick={onClick} />)
            :
            (<StarGreyIcon className="star-icon" onClick={onClick} />)}
    </div>
);

Reviewer.propTypes = {
    fieldData: PropTypes.array
};

export default Reviewer;