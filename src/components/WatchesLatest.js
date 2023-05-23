import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from '../services/api';
import Header from './Header';
import '../css/home.css';
import urlImg  from '../services/urlImg';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const WatchesLatest = () => {
    const [latestWatches, setLatestWatches] = useState([]);
    const [hoverIndex, setHoverIndex] = useState(-1);

    useEffect(() => {
        async function fetchData() {
            const response = await API.get('/watch/get-watches-latest');
            setLatestWatches(response.data);
        }
        fetchData();
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (hoverIndex >= 0 && hoverIndex < latestWatches.length) {
                const newWatches = [...latestWatches];
                const brandWatches = newWatches[hoverIndex].watches;
                const firstWatch = brandWatches.shift();
                brandWatches.push(firstWatch);
                setLatestWatches(newWatches);
            }
        }, 2000);

        return () => {
            clearTimeout(timer);
        };
    }, [hoverIndex, latestWatches]);

    const handleHover = (brandIndex, watchIndex) => {
        if (watchIndex === 0) {
            setHoverIndex(brandIndex);
        } else {
            setHoverIndex(-1);
        }
    };

    const settings2 = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: Math.min(3, latestWatches.length),
        slidesToScroll: Math.min(3, latestWatches.length),
        initialSlide: 0,
        responsive: [
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
        <div id="new-watch-showcase">
            <h2 className="title-list-watch cl-black">NEW WATCHES</h2>
            <div className="slider-wrapper-wl">
                <Slider {...settings2} className="watches">
                    {latestWatches.map((brand, brandIndex) => (


                        <div key={brand._id}>


                            <div className="brandwatches">
                                {brand.watches.map((watch, watchIndex) => (
                                    <Link to={`/watch/${watch._id}`} className="watches-link">

                                    
                                        <div key={watch._id} className="watchlatest"
                                            onMouseEnter={() => handleHover(brandIndex, watchIndex)}
                                            onMouseLeave={() => setHoverIndex(-1)}>


                                            <img src={urlImg+watch.image} alt={watch.name} />


                                            <h3 className="watch-latest-title">{brand.name}
                                            
                                            </h3>

                                        </div>
                                   </Link>
                                ))}

                            </div>



                        </div>

                    ))}

                </Slider>
            </div>
        </div>
    );
};

export default WatchesLatest;
