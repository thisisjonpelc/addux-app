import React from "react";
import {connect} from "react-redux";

import Accordion from "./Accordion";
import CommentsForm from "./CommentsForm";
import ObjectiveTextArea from "./ObjectiveTextArea";

import {accordionSize} from "./../constants/constants";

class ColumnContent extends React.Component{

    constructor(props){
        super(props);

        this.state ={
            //text: props.activeAddux[`${props.category}`] ? props.activeAddux[`${props.category}`] : ""
        }
    }

    render() {
        const prompt = this.props.walkthrough[`${this.props.category}_prompt`];
        
        console.log(accordionSize[this.props.category]);

        return (
            <div className="column__content">
                <p className="column__question">
                    {prompt}
                </p>

                {accordionSize[this.props.category] > 1 
                    ? 
                    (<Accordion 
                        onCheckChange={this.props.onCheckChange} 
                        category={this.props.category} 
                        readOnly={this.props.readOnly} 
                    />) 
                    : 
                    (<div className='objective-block'>
                        <p className='objective-block__label'>Objective</p>
                        <ObjectiveTextArea 
                            key={`${this.props.activeAddux._id}-obj`} 
                            readOnly={this.props.readOnly}
                        />
                    </div>)
                }
                {
                    this.props.showComments 
                        && 
                    <CommentsForm 
                        key={`${this.props.activeAddux._id}-comments`} 
                        category={this.props.category} 
                        comment={this.props.activeAddux[`${this.props.category}_comments`]}
                        active={this.props.activeAddux._id}
                    />
                }
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        walkthrough: state.walkthrough,
        activeAddux: state.addux[state.active],
        active:state.active
    }
}

export default connect(mapStateToProps)(ColumnContent);