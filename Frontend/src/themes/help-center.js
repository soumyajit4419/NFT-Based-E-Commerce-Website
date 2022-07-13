import React, { Component } from 'react';

import Header from '../components/Header/Header';
import Help from '../components/HelpCenter/HelpCenter';
import Faq from '../components/Faq/Faq';
import Footer from '../components/Footer/Footer';
import ModalSearch from '../components/Modal/ModalSearch';
import ModalMenu from '../components/Modal/ModalMenu';
import Scrollup from '../components/Scrollup/Scrollup';

class HelpCenter extends Component {
    render() {
        return (
            <div className="main">
                <Header />
                <Help />
                <Faq />
                <Footer />
                <ModalSearch />
                <ModalMenu />
                <Scrollup />
            </div>
        );
    }
}

export default HelpCenter;