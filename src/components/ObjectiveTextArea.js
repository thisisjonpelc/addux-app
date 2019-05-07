import React from "react";
import { connect } from "react-redux";

import { debounce } from 'throttle-debounce';
import axios from 'axios';

import { history } from './../routers/AppRouter';

import { editAddux } from './../actions/addux';
import { logout } from './../actions/auth';

class ObjectiveTextArea extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            text: this.props.activeAddux['objective'],
            showSuccess: false,
            showFailure: false
        }
    }

    onTextChange = (e) => {
        const text = e.target.value;
        this.setState(() => ({ text }));
        this.saveText(text);
    }

    saveText = debounce(1000, (text) => {

        const updates = {};

        updates['objective'] = text;

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

                this.setState(() => {
                    return {
                        showSuccess:true
                    };
                });
    
                setTimeout(() => {
                    this.setState(() => {
                        return {
                            showSuccess:false
                        }
                    })
                },
                1000);

                this.props.editAddux(this.props.activeAddux._id, updates);

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
                    this.setState(() => {
                        return {
                            showFailure:true
                        };
                    });
        
                    setTimeout(() => {
                        this.setState(() => {
                            return {
                                showFailure:false
                            }
                        })
                    },
                    1000);
                }
            });
    });

    render() {
        return (
            <div className='objective-block__input'>
                <textarea
                    maxLength='100'
                    className='addux-textarea addux-textarea--single'
                    onChange={this.onTextChange}
                    value={this.state.text}
                    readOnly={this.props.readOnly}>
                </textarea>
                <div className={`objective-block__alert objective-block__alert--success ${this.state.showSuccess ? '' : 'objective-block__alert--hidden'}`}>Input saved</div>
                <div className={`objective-block__alert objective-block__alert--failure ${this.state.showFailure ? '' : 'objective-block__alert--hidden'}`}>Failed to save input</div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        token: state.auth.token,
        activeAddux: state.addux[state.active]
    }
}

export default connect(mapStateToProps, {editAddux, logout})(ObjectiveTextArea);