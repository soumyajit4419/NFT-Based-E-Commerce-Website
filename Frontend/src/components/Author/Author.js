import React, { lazy, Suspense} from 'react';
import AuthorProfile from '../AuthorProfile/AuthorProfile';
import Explore from '../Explore/ExploreSix';

// const AuthorProfile = lazy(() => import("../AuthorProfile/AuthorProfile"));
// const Explore = lazy(() => import("../Explore/ExploreSix"));

function Author(props) {
    return (
            <section className="author-area explore-area popular-collections-area">
                <div className="container">
                    <div className="row justify-content-between">
                        <div className="col-12 col-md-4">
                            {/* Author Profile */}
                            {/* <Suspense fallback={<div>loading...</div>}> */}
                                <AuthorProfile data={props.data}/>
                            {/* </Suspense> */}
                            
                        </div>
                        <div className="col-12 col-md-8">
                            {/* <Suspense fallback={<div style={{color: "white"}}>loading...</div>}> */}
                                <Explore 
                                    nfts={props.nfts} 
                                    activity={props.activity}
                                    collectibles={props.collectibles} 
                                />
                            {/* </Suspense> */}
                            {/* <Explore nfts={props.nfts}/> */}
                        </div>
                    </div>
                </div>
            </section>
        );
}



// class components deprecated

// class Author extends Component {
//     render() {
//         return (
//             <section className="author-area explore-area popular-collections-area">
//                 <div className="container">
//                     <div className="row justify-content-between">
//                         <div className="col-12 col-md-4">
//                             {/* Author Profile */}
//                             <AuthorProfile data={this.props.data}/>
//                         </div>
//                         <div className="col-12 col-md-8">
//                             <Explore data={this.props.data}/>
//                         </div>
//                     </div>
//                 </div>
//             </section>
//         );
//     }
// }

export default Author;