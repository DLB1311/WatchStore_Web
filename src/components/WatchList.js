import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from '../services/api';
import urlImg from '../services/urlImg';
import Header from './Header';
import Footer from './Footer';
import '../css/watchlist.css';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';

const WatchList = () => {
    const [watches, setWatches] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const response = await API.get('/watch/get-all-watches');
            setWatches(response.data);
        }
        fetchData();
    }, []);



    return (

        <div class="form_watchlist">
            <Header />
            <div id="watchlist_container">
                <div class="watchlist_content">
                    <div class="pl_header">
                        <div class="pl_header__title">
                            <h1 class="title-72">All watches</h1>
                        </div>
                    </div>
                    <div class="pl_watches anchor-plp-sections">
                    
                        <section class="pl_section js-plp-section" data-group="1612">
                            <div class="pl_section__header">
                                <h3 class="pl_section__title title-36-light">Watches</h3>
                            </div>
                            <div class="pl_section__elements-wrapper">

                                <ul class="pl_section__elements anchor-plp-list-elements">
                                {watches.map(watch => (

                                /*---------------- 1 đồng hồ test -----------------------------*/
                                    <li key={watch._id} class="ts_watch js-plp-watch">
                                        <Link to={`/watch/${watch._id}`} data-list-online-exclusive="false" class="ts_watch__tile js_watch_link">
                                            <figure class="ts_watch__card">
                                                <ul class="sc_watch__label-list">
                                                    <li>
                                                        <span class="sc_watch__new_label label-10">New</span>
                                                    </li>
                                                </ul>
                                                <img  src={urlImg + watch.image} alt={watch.name}/>

                                                    <figcaption>
                                                        <span class="ts_watch__collection label-12">{watch.line.brand.name}</span>
                                                        <h2 class="ts_watch__subcollection title-16">{watch.name}</h2>

                                                        <div class="ts_watch__divider"></div>
                                                        <small class="ts_watch__price label-14 tooltip-relative tooltip-touchable" aria-describedby="price-show-info-4146">
                                                            <span class="js-watch-price" > ${watch.price}</span>
                                                            
                                                        </small>
                                                    </figcaption>
                                            </figure>
                                        </Link>
                                        <button type="button" class="wl_button wl_button--tile-cta js-wishlist-btn"  >
                                            <FavoriteBorderOutlinedIcon aria-hidden="true"></FavoriteBorderOutlinedIcon>
                                        </button>
                                    </li>
                  
                                /*---------------- 1 đồng hồ test END -----------------------------*/


                                ))}
                                </ul>
                            </div>

                            {/* <div class="pl_section__footer js-plp-section-footer">
                                <button class="pl_section__view-more button-ghost js-plp-pagination-cta">
                                    <span class="link">View more</span>
                                    <span class="icon icon-close" aria-hidden="true"></span>
                                </button>
                            </div> */}

                        </section>
                    </div>




                </div>
            </div>


            <Footer />



        </div>
    );
};

export default WatchList;