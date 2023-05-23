import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from '../services/api';
import urlImg from '../services/urlImg';
import Header from './Header';
import Footer from './Footer';
import WatchesLatest from './WatchesLatest';
import '../css/home.css';

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Home = () => {
    const [watches, setWatches] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const response = await API.get('/watch/get-rand-watches');
            setWatches(response.data);
        }
        fetchData();
    }, []);

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: Math.min(5, watches.length),
        slidesToScroll: Math.min(5, watches.length),
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: false,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };


    return (

        <div class="form-home">
            <Header />
            <div id="slider">
                <video autoplay="" loop muted class="css-yj28j3" controlslist="nofullscreen nodownload" disablepictureinpicture="" disableremoteplayback="" playsinline="" preload="metadata" tabindex="-1" >
                    <source src="https://content.rolex.com/v7/dam/new-watches/2023/homepage/watches/new-watches-2023/homepage-new-watches-2023-all-watches-autoplay.mp4" type="video/mp4">
                    </source>
                </video>


                <div class="text-content">

                    <a class="btn-down-list" href="#new-watch-showcase">
                        <h2 class="text-heading">Discover now</h2>
                        <svg class="arrows">
                            <path class="a1" d="M0 0 L10 11 L20 0"></path>
                            <path class="a2" d="M0 7 L10 17 L20 7"></path>
                            <path class="a3" d="M0 14 L10 24 L20 14"></path>
                        </svg>
                    </a>
                </div>

            </div>
            <WatchesLatest />
            <div id="watch-showcase">
                <h2 class="title-list-watch">EXPLORE WATCHES</h2>
                <div class="slider-wrapper">

                    <Slider {...settings} className="watches">


                        {watches.map((watch) => (

                            <div
                                key={watch._id}
                                className="watch" >
                                <Link to={`/watch/${watch._id}`} className="watches-link">
                                    <img src={urlImg + watch.image} />
                                </Link>
                                <h3 className="watch-title">{watch.name}</h3>

                            </div>


                        ))}

                    </Slider>

                </div>

            </div>

            <div class="cl-subcollections__gutter">

                <div class="cl-subcollections__appointment">
                    <div class="cl-subcollections__cta">
                        <Link to={`/watchlist`} class="cl-subcollections__button button" >VIEW ALL WATCHES</Link>
                    </div>
                </div>
            </div>
            <Footer />



        </div>
    );
};

export default Home;