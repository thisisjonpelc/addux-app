import React from "react";
import { connect } from 'react-redux';

import AccordionItem from "./AccordionItem";

import { accordionSize } from './../constants/constants';

class Accordion extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            open: -1
        }
    }

    onScroll = (e) => {
        this.props.onAccordionScroll(this.props.category, e.target);
    }

    render() {
        //console.log(this.props);

        const refValue = this.props.setRef ? (element) => this.props.setRef(this.props.category, element) : null;

        let result = [];

        for (let i = 1; i <= accordionSize[this.props.category]; i++) {
            const open = this.props.accordionOpen ? this.props.accordionOpen[i - 1] : false;

            result[i] = <AccordionItem
                key={`${this.props.activeAddux._id}-${i}`}
                linked={this.props.linked}
                category={this.props.category}
                number={i}
                readOnly={this.props.readOnly}
                open={open}
                onCheckChange={this.props.onCheckChange}
            />
        }

        return (
            <div ref={refValue} onScroll={(e) => this.props.onAccordionScroll(this.props.category, e.target)} className="accordion">
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