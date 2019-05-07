import React from 'react';
import {connect} from 'react-redux';

import {deleteAddux, startEditAddux} from './../actions/addux';

class AdduxListItem extends React.Component{

    constructor(props){
        super(props);

        this.state ={
            nameEdit:false,
            name:props.name,
            nameChanged:false
        }
    }

    onDeleteClick = (e) => {
        e.stopPropagation();

        // if(confirm(`Are you sure you want to delete ${this.props.name}?`)){
        //     axios.delete(`/addux/${this.props.id}`,
        //         {headers: {'x-auth': this.props.token}})
        //     .then((response) => {
        //         this.props.deleteAddux(this.props.id);
        //     })
        //     .catch((err) => {
        //         if(err.response.status === 402){
        //             this.props.unsubscribe();
        //             history.push('/subscribe');
        //         }
        //         else if(err.response.status === 401){
        //             this.props.logout();
        //             history.push('/login');
        //         }
        //     });
        // }
    }

    onEditClick = (e) => {
        e.stopPropagation();

        this.setState({nameEdit:true});
    }

    onDoneClick = (e) => {
        e.stopPropagation();

        if(this.state.nameChanged){
            this.props.startEditAddux(this.props.id, {name: this.state.name});
        }
 
        this.setState({nameEdit:false, nameChanged:false});
    }

    onNameChange = (e) => {
        const name = e.target.value;

        this.setState({name, nameChanged:true});
    };

    render() {

        if(this.state.nameEdit){
            return (
                <div className={`addux-list-item ${this.props.active ? 'addux-list-item--active' : ''}`}>
                
                    <input onChange={this.onNameChange} className='addux-list-item__name addux-list-item__name--input' autoFocus={true} type='text' readOnly={!this.state.nameEdit} value={this.state.name} />
                
                    <button onClick={this.onDoneClick} className='btn btn--tiny addux-list-item__button'>Done</button>

                </div>
            );
        }
        else{
            return (
                <div className={`addux-list-item ${this.props.active ? 'addux-list-item--active' : ''}`} onClick={this.props.onClick}>
                    <div className="addux-list-item__name addux-list-item__name--display">{this.state.name}</div>
            
                    <svg onClick={this.onEditClick} className='addux-list-item__icon'>
                        <use xlinkHref="img/sprite.svg#icon-pencil-alt-solid"></use>
                    </svg>
                    <svg onClick={this.onDeleteClick} className='addux-list-item__icon addux-list-item__icon--delete'>
                        <use xlinkHref="img/sprite.svg#icon-trash-o"></use>
                    </svg>
                </div>
            );
        }
    }
}

export default connect(null, {startEditAddux})(AdduxListItem);