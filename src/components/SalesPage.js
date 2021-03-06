import React from 'react';
import {Link} from 'react-router-dom';

import SalesHeader from './SalesHeader';

class SalesPage extends React.Component{

    constructor(props){
        super(props);

        console.log(props);

        this.state = {
            individual: false,
            enterprise: false,
            showForm:false,
            error: ''
        }
    }

    render(){
        
        return (
            <div className='sales-page'>
                <SalesHeader />

                <div className='content'>
                    <div className='content-box'>
                        <div className='banner'>
                            <div className='ribbon'>
                                <div className='ribbon__text'>
                                    Launch Special
                                </div>
                            </div>

                            <div className='banner__login'>
                                <Link className='banner__button' to='/'>Login</Link>
                            </div>
                            

                            <h1 className='banner__header'>
                                <img alt='addux logo' src='/img/addux-logo.png'/> Online
                            </h1>
                            <img alt='addux app on various mediums' className='banner__image' src='/img/banner-image.png' />
                            <div className='banner__accent'>

                            </div>
                        </div>

                        <div className='blurb'>
                            <h2 className='blurb__heading'>
                                Software, online training, interactive coaching and a resource library to help you simplify and grow.
                            </h2>
                            <div className='blurb__lists'>
                                    <h3 className='blurb__list-heading'>
                                            Included in the addux Online System:
                                        </h3>
                                        <ul className='blurb__list'>
                                            <li>addux Software</li>
                                            <li>Online Training Course</li>
                                            <li>Weekly Coaching Call For Your Team (Valued @ $2,500/individual)</li>
                                            <li>Weekly Call on How to Best Use addux</li>
                                    </ul>
                            
                                    <h3 className='blurb__list-heading blurb__list-heading--offer'>
                                            Exclusive Launch Bonuses:
                                        </h3>
                                        <ul className='blurb__list'>
                                            <li>Instant Access Quick Win Strategy Guide</li>
                                            <li>addux Social Media Marketing Roadmap</li>
                                            <li>Free Strategy Consultation Call - Clarifying Your Opportunity in 2019</li>
                                            <li>Strategy Implementation Blueprint</li>
                                            <li>
                                                RIA Club (Results in Advance)
                                                <ul className='blurb__inner-list'>
                                                    <li>Additional Video Training</li>
                                                    <li>Action Exercises</li>
                                                    <li>e-books</li>
                                                </ul>
                                            </li>
                                        </ul>
                            </div>
                            

                        </div>
                    </div>

                    <div className='choose-block'>

                        {this.state.error && <p className='alert alert--failure'>{this.state.error}</p>}
                        <p className='choose-block__button'>
                            GET THE SYSTEM
                        </p>

                        <div className='choose-block__plans'>
                            <Link to='/signup/individual' className='plan'>
                                <p className='plan__title'>
                                    individual
                                </p>
                                <p className='plan__price'>
                                    <span className='plan__price--strike'>$397</span>
                                    $297<span className='plan__price--time'>per year</span>
                                </p>
                            </Link>
                            <Link to='/signup/enterprise' className='plan'>
                                <p className='plan__title'>
                                    enterprise
                                </p>
                                <p className='plan__extra'>
                                    (Up to 10 users)
                                </p>
                                <p className='plan__price'>
                                    <span className='plan__price--strike'>$2,997</span>
                                    $1,997<span className='plan__price--time'>per year</span>
                                </p>
                            </Link>
                        </div>
                    </div>

                </div>
            </div>

        );
    }
}

export default SalesPage;