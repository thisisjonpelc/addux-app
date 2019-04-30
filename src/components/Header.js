import React from "react";
import { connect } from 'react-redux';
import { debounce } from 'throttle-debounce';
import axios from 'axios';

import { history } from './../routers/AppRouter';

import { logout } from './../actions/auth';
import { editAddux } from './../actions/addux';

class Header extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            name: this.props.activeAddux.name
        }
    }

    onNameClick = (e) => {
        e.target.select();
    }

    saveName = debounce(1000, (name) => {

        const updates = {
            name
        };

        axios.patch(
            `/addux/${this.props.activeAddux._id}`,
            updates,
            {
                headers: {
                    'x-auth': this.props.token
                }
            }
        )
            .then((response) => {
                this.props.editAddux(this.props.activeAddux._id, updates);
            })
            .catch((error) => {
                if (error.response.status === 402) {
                    this.props.unsubscribe();
                    history.push('/subscribe');
                }
                else if (error.response.status === 401) {
                    this.props.logout();
                    history.push('/login');
                }
            });

    });

    onNameChange = (e) => {
        const name = e.target.value;

        //if(!this.props.sharePage){
            this.setState({ name });
            this.saveName(name);
        //}
    }

    onLogoutClick = () => {
        this.props.logout();
    }

    render() {
        return (
            <header className="header">
                <img src="img/addux-logo.png" className="logo" />

                {!this.props.sharePage
                    &&
                    <nav className="app-nav">
                        {
                            this.props.isAdmin
                            &&
                            (
                                <div onClick={this.props.changeAdminActive} className="app-nav__icon-box">
                                    <svg className="app-nav__icon">
                                        <use xlinkHref="img/sprite.svg#icon-cog"></use>
                                    </svg>
                                </div>
                            )
                        }
                        {!this.props.empty && <div onClick={this.props.changeShareActive} className="app-nav__icon-box">
                            <svg className="app-nav__icon">
                                <use xlinkHref="img/sprite.svg#icon-share-alt-solid"></use>
                            </svg>
                        </div>}
                        <div onClick={this.props.changeUserActive} className="app-nav__icon-box">
                            <svg className="app-nav__icon">
                                <use xlinkHref="img/sprite.svg#icon-user-solid"></use>
                            </svg>
                        </div>
                        {!this.props.empty && <div onClick={this.props.changeNotesActive} className="app-nav__icon-box">
                            <svg className="app-nav__icon">
                                <use xlinkHref="img/sprite.svg#icon-pencil-alt-solid"></use>
                            </svg>
                        </div>}
                        {!this.props.empty && <div onClick={this.props.changeListActive} className="app-nav__icon-box">
                            <svg className="app-nav__icon">
                                <use xlinkHref="img/sprite.svg#icon-list-solid"></use>
                            </svg>
                        </div>}
                        <div onClick={this.props.showCreateModal} className="app-nav__icon-box app-nav__icon-box--invert">
                            <svg className="app-nav__icon app-nav__icon-small">
                                <use xlinkHref="img/sprite.svg#icon-plus-solid"></use>
                            </svg>
                        </div>
                    </nav>
                }

                <div className='info-box'>
                    <input 
                        onClick={this.onNameClick} 
                        onChange={this.onNameChange} 
                        className='info-box__title' 
                        placeholder='Name your addux' 
                        type='text' 
                        value={this.state.name} 
                        readOnly={this.props.sharePage}
                    />
                </div>
                

                {!this.props.sharePage
                    &&
                    <div onClick={this.onLogoutClick} className='logout-button'>
                        <svg className="logout-button__icon">
                            <use xlinkHref="img/sprite.svg#icon-sign-out"></use>
                        </svg>
                        <p className='logout-button__text'>
                            Logout
                            </p>
                    </div>
                }

            </header>

        );
    }
}

const mapStateToProps = (state) => {
    return {
        activeAddux: state.addux[state.active],
        isAdmin: state.auth.isAdmin
    }
};

export default connect(mapStateToProps, { logout, editAddux })(Header);