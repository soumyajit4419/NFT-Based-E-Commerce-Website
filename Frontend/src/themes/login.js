import React, { Component } from 'react';

import Header from '../components/Header/Header';
import Breadcrumb from '../components/Breadcrumb/Breadcrumb';
import LoginSection from '../components/Login/Login';
import Footer from '../components/Footer/Footer';
import ModalSearch from '../components/Modal/ModalSearch';
import ModalMenu from '../components/Modal/ModalMenu';
import Scrollup from '../components/Scrollup/Scrollup';

class Login extends Component {
    render() {
        return (
            <div className="main">
                <Header />
                <LoginSection />
                <ModalSearch />
                <ModalMenu />
                <Scrollup />
            </div>
        );
    }
};

export default Login;