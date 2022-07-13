import React, { Component } from 'react';

import Header from '../components/Header/Header';

import Explore from '../components/Explore/ExploreTwo';
import Footer from '../components/Footer/Footer';
import ModalSearch from '../components/Modal/ModalSearch';
import ModalMenu from '../components/Modal/ModalMenu';
import Scrollup from '../components/Scrollup/Scrollup';

class ExploreOne extends Component {
    render() {
        return (
            <div className="main">
                <Header />
                <Explore />
                <Footer />
                <ModalSearch />
                <ModalMenu />
                <Scrollup />
            </div>
        );
    }
}

export default ExploreOne;