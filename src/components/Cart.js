import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from '../services/api';
import urlImg from '../services/urlImg';
import Header from './Header';
import Footer from './Footer';
import '../css/watchlist.css';
import '../css/cart.css';
import '../css/watchdetail.css';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import Swal from 'sweetalert';

const Cart = () => {
    const [items, setItems] = useState([]);
    const navigate = useNavigate(); // initialize navigate
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        async function fetchData() {

            const token = getCookie('token');
            if (!token) {
                navigate('/signin'); // redirect to signin if no token is found
                return;
            }
            try {
                const response = await API.get('/cart/get-cart', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                if (response.message === "Server error") {
                    navigate('/signin');
                }
                setItems(response.data.items);

            } catch (error) {
                if (error.response && error.response.status === 500) {
                    Swal({
                        title: "Please login to view cart",
                        text:"",
                        icon: "error",
                        dangerMode: true,
                    }).then(() => {
                        // Chuyển hướng đến trang đăng nhập
                        navigate('/signin');
                    });
                }
                
            }
        }
        fetchData();
    }, [navigate]);

    const handleAddToCart = async (watchId) => {
        const token = getCookie('token');
        if (!token) {
            navigate('/signin');
            return;
        }
        try {

            const response = await API.post('/cart/add-watch-to-cart', { watchId }, {
                headers: { Authorization: `Bearer ${token}` },
            });
            window.location.reload(); // Load lại trang

        } catch (error) {
            console.error(error);
            Swal({
                title: "You pressed too fast, please try again later!",
                text:"",
                icon: "error",
                dangerMode: true,
            })
              
        }
    };
    const handleSub = async (watchId) => {
        const token = getCookie('token');
        if (!token) {
            navigate('/signin');
            return;
        }
        try {

            const response = await API.post('/cart/remove-watch-from-cart', { watchId }, {
                headers: { Authorization: `Bearer ${token}` },
            });
            window.location.reload(); // Load lại trang

        } catch (error) {
            console.error(error);
            Swal({
                title: "You pressed too fast, please try again later!",
                text:"",
                icon: "error",
                dangerMode: true,
            })
              
        }
    };

    const handleRemove = async (itemId) => {
        const token = getCookie('token');
        if (!token) {
            navigate('/signin');
            return;
        }
        try {

            const response = await API.post('/cart/remove-item-from-cart', { itemId }, {
                headers: { Authorization: `Bearer ${token}` },
            });
            window.location.reload(); // Load lại trang

        } catch (error) {
            console.error(error);
        }
    };

    const handleCreateOrder = async () => {
        const token = getCookie('token');
        if (!token) {
          navigate('/signin');
        }
        try {
          await API.post('/order/create-order', null, {
            headers: { Authorization: `Bearer ${token}` },
          });
          navigate('/order');
        } catch (error) {
          navigate('/signin');
        }
      };

    const getCookie = (name) => {
        const cookieValue = document.cookie.match(`(^|;)\\s*${name}\\s*=\\s*([^;]+)`);
        return cookieValue ? cookieValue.pop() : '';
    };

    const subTotal = items.reduce((acc, item) => {
        return acc + item.watch.price*item.quantity;
    }, 0);

    const tax = subTotal * 0.1;

    const total = subTotal + tax;

    

    return (

        <div class="form_watchlist">
            <Header />
            <div id="watchlist_container">
                <div id="maincontent" class="page-main contents">


                    <div class="main main-s">

                        {items.length > 0 ? (

                            <><div class="sec bd-t-gry-1">
                                <div class="sec-inr pt-none">
                                    <form id="form-validate" class="form form-cart">
                                        <div id="shopping-cart-table" class="cart items data table table-wrapper">
                                            <div class="dataItem mybag-dataItem">
                                                {items.map((item) => (
                                                    
                                                    <div key={item._id} class="dataItem-inr dataItem-2col">
                                                        <div class="dataItem-img">
                                                            <img class="product-image-photo" src={urlImg + item.watch.image} alt={item.watch.name} loading="lazy" width="110" height="160" alt=" " />
                                                        </div>
                                                        <div class="dataItem-txt">
                                                            <div class="col title">
                                                                <div class="dataItem-header dataItem-header-2col">
                                                                    <div class="dataItem-header-col cart_productname_wrapper">
                                                                        <h2 class="dataItem-title">
                                                                            <span class="is-category casio_us">{item.watch.name}</span>
                                                                            <span class="is-model"></span>
                                                                            <button onClick={() => handleRemove(item._id)}>
                                                                                <CloseOutlinedIcon />
                                                                            </button>

                                                                        </h2>
                                                                        <div class="dataItem-header-col cart_price_wrapper">
                                                                            <p class="ta-r-pc is-price">
                                                                                <span class="price-excluding-tax" data-label="Excl. Tax">
                                                                                    <span class="cart-price">
                                                                                        <span class="price">${item.watch.price} </span></span> </span>
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="dataItem-txt w-100-sp qty_delete_container">
                                                                <div class="col">
                                                                    <div class="dataItem-header dataItem-header-2col">
                                                                        <div class="dataItem-header-col clear-both">
                                                                            <div class="dataItem-amount is-amount-with-ui qty_wrapper">
                                                                                <button type="button" aria-label="Decrease quantity" class="btn bg-wht-1 dataItem-amount-mns-btn is-mns-btn decrease-qty" data-watch-id={item.watch._id} onClick={(e) => handleSub(e.target.dataset.watchId)}>
                                                                                    <span class="minus">-</span>
                                                                                </button>

                                                                                <input id="cart-3185159-qty" class="dataItem-amount-input is-amount input-text qty aaaa" aria-label="Quantity" value={item.quantity} readOnly />

                                                                                <button type="button" aria-label="Increase quantity" class="btn bg-wht-1 dataItem-amount-pls-btn is-pls-btn increase-qty" data-watch-id={item.watch._id} onClick={(e) => handleAddToCart(e.target.dataset.watchId)} disabled={item.quantity === item.watch.quantity}>
                                                                                    <span class="plus">+</span>
                                                                                    <image class="no-display" alt="" />
                                                                                </button>
                                                                            </div>
                                                                        </div>

                                                                    </div>
                                                                </div>
                                                                <div class="col dataItem-option">
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                                
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                                <div class="sec-inr pt-none">
                                    <div class="dataItem dataItem-accounting bd-t-gry-1"><div class="dataItem-inr dataItem-accounting-inr dataItem-2col"><h2 class="title-2">Order Summary</h2><div class="dataItem-txt w-100-sp"><div class="col"></div> <div class="col"><div id="bottom-cart-totals" class="cart-totals" data-bind="scope:'block-totals'">
                                        <div class="table-wrapper" data-bind="blockLoader: isLoading">
                                            <table class="dataItem-table dataItem-table-price dataItem-table-price-s dataItem-table-total">
                                                <tbody>

                                                    <tr class="totals sub">
                                                        <th class="dataItem-th" scope="row">
                                                            <span>Cart Subtotal:</span>
                                                            <span class="order-summary-tooltip">
                                                                <button aria-label="Cart subtotal tooltip">
                                                                    <i class="fa fa-question-circle"></i>
                                                                </button>
                                                                <span class="tooltip-content" role="tooltip">
                                                                </span>
                                                            </span>
                                                        </th>
                                                        <td class="dataItem-td">
                                                            <span class="price" data-th="Cart Subtotal:"> ${subTotal.toFixed(2)}</span>
                                                        </td>
                                                    </tr>

                                                    <tr class="totals-tax">
                                                        <th class="dataItem-th mark" colspan="1" scope="row">
                                                            <span >Tax:</span>

                                                        </th>
                                                        <td class="dataItem-td amount" data-th="Tax">
                                                            <span class="price" >${tax.toFixed(2)}</span>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                    </div>
                                        <div class="col col-total" id="bottom-cart-grand-totals" data-bind="scope:'bottom-grand-total'">
                                            <div class="col col-total">
                                                <table class="dataItem-table dataItem-table-price dataItem-table-total">
                                                    <tbody>
                                                        <tr>
                                                            <th class="dataItem-th" >Estimated Total:</th>
                                                            <td class="dataItem-td" data-th="Total Amount">
                                                                <span data-bind="text: getValue()"> ${total.toFixed(2)}</span>

                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div></div></div></div>

                                </div>
                                <div class="pd_hero__cta">
                                    <div class="pd_hero__make_appointment">
                                        <button type="button" class="button button-dark pd_hero__make_appointment_btn js_make_appointment_btn js_ma_watch_button" onClick={handleCreateOrder}>
                                            BUY NOW
                                        </button>
                                    </div>
                                </div>

                            </>


                        ) : (
                            <div className="sec bd-t-gry-1">
                                <div className="sec-inr pt-none">
                                    <div className="cart-empty">
                                        <h1>You still don't have anything on your cart</h1>

                                    </div>
                                    <div class="pd_hero__cta">
                                        <div class="pd_hero__make_appointment">
                                            <Link to={`/watchlist`} type="button" class="button button-dark pd_hero__make_appointment_btn js_make_appointment_btn js_ma_watch_button" >
                                                VIEW ALL WATCHES
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                    </div>

                </div>

            </div>
            <Footer />
        </div>
    );
};

export default Cart;