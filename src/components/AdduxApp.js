import React from "react";
import { connect } from "react-redux";
import axios from "axios";
import $ from 'jquery';

import Header from "./Header";
import Columns from "./Columns";
import Footer from "./Footer";
import LoadingPage from "./LoadingPage";
import AdduxList from './AdduxList';
import Notes from './Notes';
import ScrollArrow from './ScrollArrow';
import SharePage from './SharePage';
import AdminPage from './AdminPage';
import UserPage from './UserPage';
import AdduxNameForm from './AdduxNameForm';
import AppOverlay from './AppOverlay';
import VimeoVideo from './VimeoVideo';

import { history } from './../routers/AppRouter';

import { addAddux } from './../actions/addux';
import { initializeApp } from './../actions/general';
//import { unsubscribe } from './../actions/subscription';
import { logout } from './../actions/auth';

import {isEmptyObject} from './../utils/utils';

class AdduxApp extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            listActive: false,
            notesActive: false,
            dataStatus: "WAITING",
            shareActive: false,
            adminActive: false,
            notesActive: false,
            userActive: false,
            createModal: false,
            tutorialActive: false,
            redirectToSubscribePage: false
        }
    }

    changeListActive = () => {
        this.setState((prevState) => ({
            listActive: !prevState.listActive
        }));
    }

    changeShareActive = () => {
        this.setState((prevState) => ({
            shareActive: !prevState.shareActive
        }));
    }

    changeAdminActive = () => {
        this.setState((prevState) => ({
            adminActive: !prevState.adminActive
        }));
    }

    changeNotesActive = () => {
        this.setState((prevState) => ({
            notesActive: !prevState.notesActive
        }));
    }

    changeUserActive = () => {
        this.setState((prevState) => ({
            userActive: !prevState.userActive
        }));
    }

    changeTutorialActive = () => {

        if (this.state.tutorialActive) {
            var $frame = $(`iframe#301701128`);

            // saves the current iframe source
            var vidsrc = $frame.attr('src');

            // sets the source to nothing, stopping the video
            $frame.attr('src', '');

            // sets it back to the correct link so that it reloads immediately on the next window open
            $frame.attr('src', vidsrc);
        }

        this.setState((prevState) => ({
            tutorialActive: !prevState.tutorialActive
        }));
    }

    showCreateModal = () => {
        this.setState({ createModal: true });
    }

    handleCloseModal = () => {
        this.setState({ createModal: false, editModal: false })
    }

    createNewModal = (e) => {
        e.preventDefault();
        const name = e.target.children[0].children[0].value;

        axios.post(
            `/addux`,
            {
                name
            },
            {
                headers: {
                    'x-auth': this.props.token
                }
            })
            .then((response) => {
                this.handleCloseModal();
                this.props.addAddux(response.data.addux);
            })
            .catch((e) => {
                if (e.response.status === 402) {
                    this.props.unsubscribe();
                    history.push('/subscribe');
                }
                else {
                }
            });
    };

    componentDidMount() {

        if (!this.props.sharePage) {
            Promise.all(
                [
                    axios({
                        method: 'get',
                        url: '/addux',
                        headers: {
                            'x-auth': this.props.token
                        }
                    }),
                    axios({
                        method: 'get',
                        url: '/walkthrough'
                    })
                ])
                .then((responses) => {
                    const adduxResponse = responses[0];
                    const walkthroughResponse = responses[1];

                    console.log('Recieved Data from server!');

                    this.props.initializeApp(adduxResponse.data.adduxes, walkthroughResponse.data);
                    this.setState(() => {
                        return {
                            dataStatus: 'RECIEVED'
                        }
                    });
                })
                .catch((err) => {
                    if (err.response.status === 402) {
                        //this.props.unsubscribe();
                        history.push('/subscribe');
                    }
                    else if (err.response.status === 401) {
                        this.props.logout();
                        history.push('/login');
                    }
                    else {
                        //this.props.dataError();
                        this.setState(() => {
                            return {
                                dataStatus: 'ERROR'
                            }
                        });
                    }
                });
        }
        else{
            console.log('This is a share page!');
        }

    }

    render() {
        if (this.state.dataStatus === "WAITING") {
            return (
                <LoadingPage testId='MainAppPage' />
            )
        }
        else if (this.state.dataStatus === "RECIEVED") {
            return (
                <div className="app">
                    
                    
                    {!this.props.sharePage 
                        && 
                        <AdduxList 
                            listActive={this.state.listActive} 
                            changeListActive={this.changeListActive} 
                            empty={this.props.empty} 
                        />
                    }
                    
                        {!this.props.empty && !this.props.sharePage && <Notes key={`${this.props.activeAddux._id}-notes`} changeNotesActive={this.changeNotesActive} notesActive={this.state.notesActive} token={this.props.token} activeAddux={this.props.activeAddux} />}

                    <Header
                        sharePage={this.props.sharePage}
                        showCreateModal={this.showCreateModal}
                        changeListActive={this.changeListActive}
                        changeShareActive={this.changeShareActive}
                        changeAdminActive={this.changeAdminActive}
                        changeNotesActive={this.changeNotesActive}
                        changeUserActive={this.changeUserActive}
                        empty={this.props.empty}
                        token={this.props.token}
                        key={`${this.props.activeAddux._id}_${this.props.activeAddux.name}`}
                    />

                    <Columns
                        sharePage={this.props.sharePage}
                        showCreateModal={this.showCreateModal}
                        empty={this.props.empty}
                        readOnly={false}
                        showComments={this.props.showComments}
                    />

                    <AppOverlay
                        isOpen={this.state.createModal}
                        onRequestClose={this.handleCloseModal}
                    >
                        <AdduxNameForm
                            buttonText='Create new addux'
                            onSubmit={this.createNewModal}
                            closeModal={this.handleCloseModal}
                            token={this.props.token}
                        />
                    </AppOverlay>
                    
                </div>
            );
        }
        else {
            return (
                <h1>Error:  Unable to load data!</h1>
            );
        }
    }
}

const mapStateToProps = (state) => {
    return {
        token: state.auth.token,
        empty: isEmptyObject(state.addux),
        activeAddux: state.addux[state.active],
        isAdmin: state.auth.isAdmin,
        walkthrough: state.walkthrough
    }
};

export default connect(mapStateToProps, { initializeApp, addAddux, logout })(AdduxApp);


/*

<Columns
                        showCreateModal={this.showCreateModal}
                        empty={this.props.empty}
                        readOnly={false}
                        showComments={true}
                        activeAddux={this.props.activeAddux}
                        walkthrough={this.props.walkthrough}
                    />

                    <Footer changeTutorialActive={this.changeTutorialActive} showCreateModal={this.showCreateModal} />

                    <AppOverlay
                        isOpen={this.state.createModal}
                        onRequestClose={this.handleCloseModal}
                    >
                        <AdduxNameForm
                            buttonText='Create new addux'
                            onSubmit={this.createNewModal}
                            closeModal={this.handleCloseModal}
                            token={this.props.token}
                        />
                    </AppOverlay>

                    <AppOverlay
                        isOpen={this.state.userActive}
                        onRequestClose={this.changeUserActive}
                    >
                        <UserPage />
                    </AppOverlay>

                    <AppOverlay
                        isOpen={this.state.tutorialActive}
                        onRequestClose={this.changeTutorialActive}
                    >
                        <VimeoVideo id={303574328} />
                    </AppOverlay>

                    {!this.props.empty
                        &&
                        <AppOverlay
                            isOpen={this.state.shareActive}
                            onRequestClose={this.changeShareActive}
                        >
                            <SharePage key={this.props.activeAddux._id} />
                        </AppOverlay>}

                    {this.props.isAdmin
                        &&
                        <AppOverlay
                            isOpen={this.state.adminActive}
                            onRequestClose={this.changeAdminActive}
                        >
                            <AdminPage token={this.props.token} />
                        </AppOverlay>}


                        */