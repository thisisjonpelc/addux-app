import React from 'react';
import {connect} from 'react-redux';

import AdduxApp from './AdduxApp';
import LoginPage from './LoginPage';

const AdduxWrapper = (props) => {
        return props.isAuthenticated ? (<AdduxApp sharePage={false} showComments={true} />) : (<LoginPage />);
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: '_id' in state.auth
    };
};

export default connect(mapStateToProps)(AdduxWrapper);