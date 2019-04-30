import React from 'react';
import {connect} from "react-redux";

import {setActive} from './../actions/active';

import AdduxListItem from './AdduxListItem';

const AdduxList = (props) => {

    const AdduxItems = [];

    for(let key in props.addux){
        if(key !== 'active'){
            AdduxItems.push(
                <AdduxListItem 
                    key={`${key}_${props.addux[key].name}`} 
                    id={key} 
                    token={props.token} 
                    changeListActive={props.changeListActive} 
                    active={props.active === key} 
                    {...props.addux[key]} 
                    onClick={
                        () => {
                            if(props.active !== key){
                                props.setActive(key); 
                                props.changeListActive();
                            }
                        }
                    }
                />
            );
        }
    }

    return(

        <div className={`addux-list ${props.listActive && 'addux-list--active'}`}>
            <svg onClick={props.changeListActive} className='addux-list__close'>
                <use xlinkHref='img/sprite.svg#icon-close'></use>    
            </svg>

            {props.empty ? 
                <h1> You don't have an addux </h1>
                :
                (
                    <div className='addux-list__list'>
                        {AdduxItems}        
                    </div>
                )
            }

        </div>

    );

}

const mapStateToProps = (state) => {
    return {
        addux:state.addux,
        token:state.auth.token,
        active:state.active
    };
}

export default connect(mapStateToProps, {setActive})(AdduxList);