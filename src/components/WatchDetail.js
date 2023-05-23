import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import API from '../services/api';
import urlImg from '../services/urlImg';
import Header from './Header';
import Footer from './Footer';
import '../css/home.css';
import '../css/watchdetail.css';

import Slider from "react-slick";
import '../css/home.css';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import Swal from 'sweetalert';

const WatchDetail = () => {
    const { watchId } = useParams();
    const [watch, setWatch] = useState({});
    const [brandWatches, setBrandWatches] = useState([]);
    const navigate = useNavigate(); // initialize navigate

    useEffect(() => {
        async function fetchData() {
            const response = await API.get(`/watch/get-watch-by-id/${watchId}`);
            setWatch(response.data);

            const brandResponse = await API.get(`/watch/get-watches-by-brand/${response.data.line.brand._id}`);
            setBrandWatches(brandResponse.data.response);
        }
        fetchData();
    }, [watchId]);

    const handleAddToCart = async (watchId) => {
        const token = getCookie('token');
        if (!token) {
            navigate('/signin');
        }
        try {

            await API.post('/cart/add-watch-to-cart', { watchId }, {
                headers: { Authorization: `Bearer ${token}` },
            });
            navigate('/cart'); 

        } catch (error) {
            const errorMessage = error.response.data.message;
            Swal({
                title: errorMessage,
                text:"",
                icon: "error",
                dangerMode: true,
            })
            // navigate('/signin');
        }
    };

    const getCookie = (name) => {
        const cookieValue = document.cookie.match(`(^|;)\\s*${name}\\s*=\\s*([^;]+)`);
        return cookieValue ? cookieValue.pop() : '';
    };

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: Math.min(5, brandWatches.length),
        slidesToScroll: Math.min(5, brandWatches.length),
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
        <div class="form-watchdetail">
            
            <Header />
            <div id="watchdetail">
                <div class="js_pd_hero pd_hero component component--type--pd-hero component--view-mode--default font_color_">
                    <div class="pd_hero__wrapper jd_pd_hero" data-brand="Hublot" data-category="Watches" data-id="541.NX.1171.RX" data-name="Chronograph Titanium 42MM" data-english-name="Chronograph Titanium42MM" data-product-case="Satin-finished and Polished Titanium" data-product-case-size="42MM" data-product-color="Black" data-product-mid-category="Classic Fusion" data-product-mid-category-english-name="Classic Fusion" data-product-power-reserve="42 Hours" data-product-strap="Black Lined Rubber Straps" data-product-water-resistance="50m or 5 ATM" data-product-watch-case="Titanium" data-product-sub-category="42MMmm">
                        <div class="pd_hero__content">

                            <div class="pd_hero__title--mobile pd_hero__col">
                                <span class="label-10">Classic Fusion</span>
                                <h1 class="title-40">Chronograph Titanium</h1>
                            </div>
                            <div class="pd_hero__content_details pd_hero__col">
                                <div class="pd_hero__content_flags">
                                </div>
                                <div class="pd_hero__title--desktop">
                                    {watch && watch.line && <span class="label-10">{watch.line.brand.name} {watch.line.name}</span>}
                                    {watch && <h1 class="js_nft_title title-40">{watch.name}</h1>}
                                </div>
                                <div class="pd_hero__divider"></div>

                                <div class="pd_hero__actions">
                                    <span class="label-16 pd_hero__actions_spacing tooltip-relative tooltip-touchable" aria-describedby="price-show-info-3161">

                                        {watch && <span class="js-watch-price" data-uid="541.NX.1171.RX">{watch.price} $</span>}


                                    </span>
                                    <div class="pd_hero__actions_btns">
                                        <button type="button" data-id="3161" data-sku="541.NX.1171.RX" data-name="Classic Fusion Chronograph Titanium 42MM" data-english-name="Classic Fusion Chronograph Titanium 42MM" data-case="Satin-finished and Polished Titanium" data-case-size="42MM" data-color="Black" data-power-reserve="42 Hours" data-strap="Black Lined Rubber Straps" data-water-resistance="50m or 5 ATM" data-subcollection="Chronograph" data-subcollection-english-name="Chronograph" data-collection="Classic Fusion" data-collection-english-name="Classic Fusion" class="wl_button pd_hero__action-button js-wishlist-btn" data-aria-label-pressed="Remove this watch from your wishlist" data-aria-label-unpressed="Add this watch to your wishlist" aria-labelledby="watchlist-pd-hero-labelledby">
                                            <FavoriteBorderOutlinedIcon aria-hidden="true"></FavoriteBorderOutlinedIcon>
                                        </button>
                                        <button type="button" data-id="3161" class="share_button pd_hero__action-button js_share_btn" aria-label="Open the share modal">
                                            <span aria-hidden="true" class="icon-arrow-forward"></span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div class="pd_hero__content_watch pd_hero__col">
                                <div class="pd_hero__content_watch_img js_watch_no_nft">

                                    <img src={urlImg + watch.image} />

                                </div>
                                <div class="pd_hero__icons">
                                    <span id="watchlist-pd-hero-labelledby-mobile" class="visually-hidden">Add this watch to your wishlist</span>
                                    <button type="button" data-id="3161" data-sku="541.NX.1171.RX" data-name="Classic Fusion Chronograph Titanium 42MM" data-english-name="Classic Fusion Chronograph Titanium 42MM" data-case="Satin-finished and Polished Titanium" data-case-size="42MM" data-color="Black" data-power-reserve="42 Hours" data-strap="Black Lined Rubber Straps" data-water-resistance="50m or 5 ATM" data-subcollection="Chronograph" data-subcollection-english-name="Chronograph" data-collection="Classic Fusion" data-collection-english-name="Classic Fusion" class="wl_button pd_hero__action-button js-wishlist-btn" data-aria-label-pressed="Remove this watch from your wishlist" data-aria-label-unpressed="Add this watch to your wishlist" aria-labelledby="watchlist-pd-hero-labelledby-mobile">
                                        <span class="wl_button__icon icon-wishlist" aria-hidden="true"></span>
                                    </button>
                                    <button type="button" data-id="3161" class="share_button pd_hero__action-button js_share_btn" aria-label="Open the share modal">
                                        <span aria-hidden="true" class="icon-arrow-forward"></span>
                                    </button>
                                </div>
                            </div>

                            <div class="pd_hero__content_message pd_hero__col">
                            </div>
                        </div>



                        <div class="pd_hero__cta">
                            <div class="pd_hero__make_appointment">

                                <button type="button" class="button button-dark pd_hero__make_appointment_btn js_make_appointment_btn js_ma_watch_button" data-watch-id={watch._id} onClick={(e) => handleAddToCart(e.target.dataset.watchId)}>
                                    ADD TO CART
                                </button>



                            </div>

                        </div>
                    </div>
                </div>
            </div>
            <div id="introduction">
                <div class="introduction_container">
                    <div className="intro_header">
                        <h2>INTRODUCTION</h2>
                        <div className="watch_description">
                            {watch && <p>{watch.description}</p>}
                        </div>
                    </div>
                    <div className="intro_details">
                        <div class="watch_detail">
                            <h3>TYPE</h3>
                            {watch && <p class="wtlb_title">{watch.type}</p>}
                        </div>
                        <div class="watch_detail">
                            <h3>LINE</h3>
                            {watch && watch.line && <p class="wtlb_title">{watch.line.name}</p>}
                            {watch&& watch.line &&  <p class="wbl_desc">{watch.line.description}</p>}
                        </div>
                        <div class="watch_detail">
                            <h3>BRAND</h3>
                            {watch && watch.line && <p class="wtlb_title">{watch.line.brand.name}</p>}
                            {watch && watch.line && <p class="wbl_desc">{watch.line.brand.description}</p>}

                        </div>
                    </div>

                </div>

            </div>
            <div id="watchbybrand">
                <h2 class="cl-black title-list-watch">EXPLORE WATCHES</h2>
                <div class="slider-wrapper">

                    <Slider {...settings} className="watches">

                        {brandWatches.map((watchbrand) => (
                            <div
                                key={watchbrand._id}
                                className="watch" >
                                <Link to={`/watch/${watchbrand._id}`} className="watches-link">
                                    <img src={urlImg + watchbrand.image} />
                                </Link>
                                <h3 className="cl-black watch-title">{watchbrand.name}</h3>

                            </div>


                        ))}
                    </Slider>
                </div>
            </div>
            <Footer />
        </div>





    );
}

export default WatchDetail;
{/* <div>
      <img src={urlImg + watch.image} />
      <h3 className="watch-title">{watch.name}</h3>
      <p>{watch.description}</p>
      <p>Price: ${watch.price}</p>
    </div> */}