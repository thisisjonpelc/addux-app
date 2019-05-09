import React from 'react';
import {connect} from 'react-redux';
import axios from 'axios';

import {history} from './../routers/AppRouter';

import {startAddAddux} from './../actions/addux';
import {logout} from './../actions/auth';

class AdduxNameForm extends React.Component{
    constructor(props){
        super(props);

        this.state ={
            name : props.addux ? props.addux.name : "",
            error: '',
            creating: false
        }
    }

    onNameChange = (e) => {
        const name = e.target.value;
        this.setState({name});
    }

    onSubmit = (e) => {
        e.preventDefault();

        if(!this.state.name){
            this.setState({
                error: 'Your addux must have a name!'
            });
        }
        else{

            this.setState({
                error:'',
                creating:true
            });

            this.props.startAddAddux(this.state.name)
                .then(() => {
                    this.props.closeModal();
                    
                    this.setState({
                        creating:false,
                        name:''
                    })
                })
                .catch((err) => {
                    console.log('Error when creating addux');
                    console.log(err);
                });
        }
    }

    render() {
        return (
            <div>
                <form className='form form--300' onSubmit={this.onSubmit}>     
                    <div className='form__form-group'>
                        <input className='form__input' type='text' value={this.state.name} onChange={this.onNameChange} placeholder='Name your new addux'/>
                    </div>
                    <button className='btn btn--full-width' disabled={this.state.creating}>{this.state.creating ? (<img className='btn__loading' src='img/loading.gif'/>): (this.props.buttonText)}</button>
                    {this.state.error && <p className='alert alert--failure'>{this.state.error}</p>}
                </form>
            </div>
        );
    }
}

export default connect(null, {startAddAddux})(AdduxNameForm);