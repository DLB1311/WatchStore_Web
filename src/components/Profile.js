import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from '../services/api';
import urlImg from '../services/urlImg';

import Header from './Header';
import Footer from './Footer';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import LogoutIcon from '@mui/icons-material/Logout';
import Swal from 'sweetalert';

import '../css/order.css';
const Profile = () => {
    const navigate = useNavigate(); // initialize navigate
    const [customer, setCustomer] = useState('');
    useEffect(() => {
        async function fetchData() {

            const token = getCookie('token');
            if (!token) {
                setCustomer(null)
                Swal({
                    title: "Please Login",
                    text: "",
                    icon: "error",
                    dangerMode: true,
                }).then(() => {
                    window.location.href = '/bskwatchofficial/signin';
                });

                return;
            }
            try {
                const response = await API.get('/account/get-cus', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setCustomer(response.data);

            } catch (error) {
                console.log('Error:', error);
                setCustomer(null);
                Swal({
                    title: "Please Login",
                    text: "",
                    icon: "error",
                    dangerMode: true,
                }).then(() => {
                    window.location.href = '/bskwatchofficial/signin';
                });

            }

        }
        fetchData();
    }, [navigate]);

    const handleProfileUpdate = async () => {
        const token = getCookie('token');
        if (!token) {
            setCustomer(null)
        }
        try {
            const customerData = { ...customer };
            delete customerData.password;
            const response = await API.post('/account/update-profile', customerData , {
                headers: { Authorization: `Bearer ${token}` },

            });

            Swal({
                title: response.data.message,
                text: "",
                icon: "success",
                dangerMode: false,
            }).then(() => {
                window.location.reload();
            });


        } catch (error) {
            setCustomer(null)
            Swal({
                title: error.message,
                text: "",
                icon: "error",
                dangerMode: true,
            }).then(() => {
                window.location.reload();
            });

        }
    };

    const getCookie = (name) => {
        const cookieValue = document.cookie.match(`(^|;)\\s*${name}\\s*=\\s*([^;]+)`);
        return cookieValue ? cookieValue.pop() : '';
    };

    const removeCookie = (name) => {
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
      };
    const handleLogout = () => {
        // Xóa token trong cookie
        removeCookie('token');

        // Tải lại trang
        window.location.reload();
    };
    return (
        <div class="form_watchlist">
            <Header />
            <div id="user_container">
                <div class="container pIHdXn">
                    <div class="AmWkJQ">
                        <div class="kul4+s">
                            <div class="miwGmI">
                                {customer && <div class="mC1Llc">{customer.name}</div>}
                                <div>
                                    <Link to="/account/profile" class="_78QHr1">
                                        <svg width="12" height="12" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M8.54 0L6.987 1.56l3.46 3.48L12 3.48M0 8.52l.073 3.428L3.46 12l6.21-6.18-3.46-3.48" fill="#9B9B9B" fill-rule="evenodd"></path></svg>
                                        Sửa hồ sơ
                                    </Link></div></div>

                            <div class="rhmIbk">
                                <div class="stardust-dropdown">
                                    <div class="stardust-dropdown__item-header">
                                    <Link to="/account/profile" class="+1U02e" >
                                            <div class="bfikuD">
                                                <img src="https://down-vn.img.susercontent.com/file/ba61750a46794d8847c3f463c5e71cc4" />
                                            </div>
                                            <div class="DlL0zX">
                                                <span class="adF7Xs">My Account</span>
                                            </div>
                                        </Link>
                                    </div>
                                    <div class="stardust-dropdown__item-body">
                                        <div class="Yu7gVR">
                                            <Link to="/account/profile"  class="FEE-3D" style={{ color: '#C09E57' }} >
                                                <span class="qyt-aY" >Profile</span>
                                            </Link>
                                            
                                            <Link to="/order" class="FEE-3D" >
                                                <span class="qyt-aY">Order</span>
                                            </Link>
                                            <Link to="/account/verify" class="FEE-3D" >
                                                <span class="qyt-aY">Đổi mật khẩu</span>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                                <div class="stardust-dropdown">
                                    <div class="stardust-dropdown__item-header">
                                        <a class="+1U02e" onClick={handleLogout}>
                                            <div class="bfikuD">
                                                <LogoutIcon />
                                            </div>
                                            <div class="DlL0zX">
                                                <span class="adF7Xs">Đăng Xuất</span>
                                            </div>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="xMDeox">
                        <div class="profile-container" >
                            <h2 class="h2-profile">GENERAL INFORMATION</h2>
                            <div class="info-blockform">
                                <div  >
                                    <label class="label-account" htmlFor="name">Name</label>
                                    <input class="input-account" type="text" placeholder="Enter name" id="name" value={customer?.name} onChange={(e) => setCustomer({ ...customer, name: e.target.value })} required />

                                </div>
                                <div>
                                    <label class="label-account" htmlFor="email">Email Adress</label>
                                    <input class="input-account" type="email" placeholder="Email adress" id="email" value={customer?.email} onChange={(e) => setCustomer({ ...customer, email: e.target.value })} required />
                                </div>
                                <div>
                                    <label class="label-account" htmlFor="phone">Mobile Phone Number</label>
                                    <input class="input-account" type="number" id="phone" placeholder="Moblie phone number" value={customer?.phone} onChange={(e) => setCustomer({ ...customer, phone: e.target.value })} required />
                                </div>
                                <div>
                                    <label class="label-account" htmlFor="address">Address</label>
                                    <input class="input-account" type="text" id="address" placeholder="Enter address" value={customer?.address} onChange={(e) => setCustomer({ ...customer, address: e.target.value })} required />
                                </div>

                                <div class="btn-access">
                                    <button class="button button-dark js_make_appointment_btn js_ma_watch_button" onClick={handleProfileUpdate}>SAVE</button>
                                </div>

                            </div>
                        </div>
                    </div>


                </div>

                <Footer />

            </div>
        </div>
    );
};

export default Profile;