import React from "react";
import {connect} from 'react-redux';

import AccordionItem from "./AccordionItem";

import {accordionSize} from './../constants/constants';

class Accordion extends React.Component{
    constructor(props){
        super(props);
        
        this.state = {
            open: -1
        }
    }

    changeOpenItem = (num) => {

        const newOpen = num === this.state.open ? -1 : num;

        this.setState({
            open:newOpen
        });
    }

    render() {

        let result = []        

        for(let i = 1; i <= accordionSize[this.props.category]; i++){
            result[i] = <AccordionItem 
                            key={`${this.props.activeAddux._id}-${i}`} 
                            category={this.props.category} 
                            number={i}
                            onCheckChange={this.props.onCheckChange} 
                            onLabelClick={this.onLabelClick} 
                            readOnly={this.props.readOnly}
                            activeAddux={this.props.activeAddux}
                        />
        }

        return (
            <div onScroll={this.props.onScroll} className="accordion">
                {result}
            </div>
        );

    }

}

const mapStateToProps = (state) => {
    return {
        activeAddux: state.addux[state.active]
    }
}

export default connect(mapStateToProps)(Accordion);