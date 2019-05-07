import React from 'react';
import { connect } from 'react-redux';
import RichTextEditor from 'react-rte';
import { debounce } from 'throttle-debounce';

import { startEditAddux } from './../actions/addux';

class Notes extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            value: RichTextEditor.createValueFromString((props.activeAddux.notes ? props.activeAddux.notes : ''), 'html'),
            html: props.activeAddux.notes
        }
    }

    saveNotes = debounce(1000, (notes) => {

        const updates = {
            notes
        }

        this.props.startEditAddux(this.props.activeAddux._id, updates);

    });

    onChange = (value) => {
        const html = value.toString('html');


        const htmlChanged = this.state.html !== html;

        this.setState({ value, html });

        if (htmlChanged) {
            this.saveNotes(html)
        }
    }

    render() {
        return (
            <div className={`notes ${this.props.notesActive && 'notes--active'}`}>
                <svg onClick={this.props.changeNotesActive} className='notes__close'>
                    <use xlinkHref='img/sprite.svg#icon-close'></use>
                </svg>
                <RichTextEditor
                    value={this.state.value}
                    onChange={this.onChange}
                    className='notes__editor'
                    placeholder='Place your notes here...'
                />
            </div>
        );
    }
}

export default connect(null, { startEditAddux })(Notes);