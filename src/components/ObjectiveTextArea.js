import React from "react";
import { connect } from "react-redux";
import { debounce } from 'throttle-debounce';

import { startEditAddux } from './../actions/addux';

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

        this.props.startEditAddux(this.props.activeAddux._id, updates);
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

export default connect(mapStateToProps, {startEditAddux})(ObjectiveTextArea);