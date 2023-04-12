import '../css/signin.css';
import React, { useState } from 'react';
import API from '../services/api';
import Header from './Header';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert';

const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleNameChange = (event) => {
        setName(event.target.value);
    };
    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };
    const handlePhoneChange = (event) => {
        setPhone(event.target.value);
    };
    const handleAddressChange = (event) => {
        setAddress(event.target.value);
    };
    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };
    const handleSubmit = (event) => {
        event.preventDefault();


        const data = { name, email, phone, address, password };

        API.post('/account/sign-up', data)
            .then((response) => {
                if (response.data.success) {
                    Swal({
                        title: "Sign up success!",
                        text: response.data.message,
                        icon: "success",
                        dangerMode: true,
                    })
                      .then(() => {
                        // Chuyển hướng đến trang đăng nhập
                        window.location.href = '/bskwatchofficial/signin';
                    });

                } else {
                    setErrorMessage(response.data.message);
                }
            })
            .catch((error) => {
                // Xử lý lỗi ở đây
                if (error.response) {
                    setErrorMessage(error.response.data.message);
                } else {
                    setErrorMessage('Đã có lỗi xảy ra trong quá trình đăng kí!');
                }
            });
    };

    return (
        <div class="form-account">
            <Header />
            <div class="form">
                <div class="account-container" >
                    <h1 class="h1-account">CREATE A BSK STORE ACCOUNT</h1>
                    <p class="subtitle-container">Create your account to manage your profile, track your orders and more. Once it is set up, you will also be able to register your watch</p>
                </div>
                <div class="profile" >
                    <div class="profile-container" >
                        <h2 class="h2-profile">GENERAL INFORMATION</h2>
                        <div class="info-blockform">
                            <form onSubmit={handleSubmit}>
                                {errorMessage && <div class="error">{errorMessage}</div>}

                                <div  >
                                    <label class="label-account" htmlFor="name">Name</label>
                                   <input class="input-account" type="text" placeholder="Enter name" id="name" value={name} onChange={handleNameChange} required />
                                    
                                </div>
                                <div>
                                    <label class="label-account" htmlFor="email">Email Adress</label>
                                    <input class="input-account" type="email" placeholder="Email adress" id="email" value={email} onChange={handleEmailChange} required />
                                </div>
                                <div>
                                    <label class="label-account" htmlFor="phone">Mobile Phone Number</label>
                                    <input class="input-account" type="number" id="phone" placeholder="Moblie phone number"  value={phone} onChange={handlePhoneChange} required />
                                </div>
                                <div>
                                    <label class="label-account" htmlFor="address">Address</label>
                                    <input class="input-account" type="text" id="address" placeholder="Enter adress"  value={address} onChange={handleAddressChange} required />
                                </div>
                                <div>
                                    <label class="label-account" htmlFor="password">Password</label>
                                    <input class="input-account" type="password" id="password"  placeholder="Enter password"  value={password} onChange={handlePasswordChange} required />
                                </div>
                                <div class="signinup-now">
                                    <label class="label-acc">Already have an account? </label><Link to="/signin" class="link-signinup-now">Sign In</Link>
                                </div>
                                <div class="btn-access">
                                    <button class="btn-account" type="submit">CREATE MY ACCOUNT</button>
                                </div>
                                
                            </form>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Signup;
