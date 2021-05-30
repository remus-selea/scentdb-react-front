import React from 'react';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import "./CarouselSlider.scss"


export default class ThumbnailsExample extends React.Component {

    constructor(props) {
        super(props);

        this.primaryRef = React.createRef();
        this.secondaryRef = React.createRef();
    }

    /**
     * Set the sync target right after the component is mounted.
     */
    componentDidMount() {
        this.primaryRef.current.sync(this.secondaryRef.current.splide);
    }


    renderSlides() {
        return (
            <>
                <SplideSlide >
                    <img src={this.props.perfume.imgPath} className="slide-image" alt="" />
                </SplideSlide>
                <SplideSlide >
                    <img src={this.props.perfume.imgPath} className="slide-image" alt=""/>
                </SplideSlide>
                <SplideSlide >
                    <img src={this.props.perfume.imgPath} className="slide-image" alt="" />
                </SplideSlide>
            </>
        );
    };


    // renderSlides() {
    //     return createSlides().map(slide => (
    //         <SplideSlide key={slide.src}>
    //             <img src={slide.src} alt={slide.alt}  />
    //         </SplideSlide>
    //     ));
    // };


    render() {
        const primaryOptions = {
            type      : 'slide',
			perPage   : 1,
			perMove   : 1,
			gap       : '1rem',
			pagination: true,
            fixedWidth: 700,
            fixedHeight: 300,
            width: 700,
            height: 500,
        };

        const secondaryOptions = {
            type: 'slide',
            gap: '1.5625rem',
            pagination: false,
            fixedWidth: 100,
            fixedHeight: 100,
            height: 500,
            width: '100px',
            cover: true,
            focus: 'top',
            isNavigation: true,
            updateOnMove: true,
            arrows: false,
            direction: 'ttb',
        };

        return (
            <div className="carousel-wrapper">
                <Splide className="thumbnail-slider" options={secondaryOptions} ref={this.secondaryRef}>
                    {this.renderSlides()}
                </Splide>

                <Splide className="carousel-slider" options={primaryOptions} ref={this.primaryRef}>
                    {this.renderSlides()}
                </Splide>
            </div>
        );
    }
}