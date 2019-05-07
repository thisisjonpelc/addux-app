import React from 'react';
import { connect } from 'react-redux';
import { debounce } from 'throttle-debounce';

import { labels } from '../constants/constants';

import { startEditAddux } from './../actions/addux';

class AccordionItem extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            text: props.activeAddux[`${props.category}_${props.number}`],
            showSuccess: false,
            showFailure: false,
            statusSelected: props.activeAddux[`${props.category}_${props.number}_status`]
        }
    }

    onCheckChange = (e) => {
        this.props.onCheckChange(this.props.number - 1);
    }

    saveText = debounce(1000, (text) => {

        const updates = {};

        updates[`${this.props.category}_${this.props.number}`] = text;

        this.props.startEditAddux(this.props.activeAddux._id, updates)
            .then(() => {
                this.setState(() => {
                    return {
                        showSuccess: true
                    };
                });

                setTimeout(() => {
                    this.setState(() => {
                        return {
                            showSuccess: false
                        }
                    })
                },
                    1000);
            })
            .catch((err) => {
                console.log('Error!');

                this.setState(() => {
                    return {
                        showFailure: true
                    };
                });

                setTimeout(() => {
                    this.setState(() => {
                        return {
                            showFailure: false
                        }
                    })
                },
                    1000);
            });
    });

    onTextChange = (e) => {
        const text = e.target.value;
        this.setState(() => ({ text }));
        this.saveText(text);
    }

    onStatusClick = (statusSelected) => {

        this.setState(() => ({ statusSelected }));

        const updates = {};

        updates[`${this.props.category}_${this.props.number}_status`] = statusSelected;

        this.props.startEditAddux(this.props.activeAddux._id, updates)
            .then(() => {
                this.setState(() => {
                    return {
                        showSuccess: true
                    };
                });

                setTimeout(() => {
                    this.setState(() => {
                        return {
                            showSuccess: false
                        }
                    })
                },
                    1000);
            })
            .catch((err) => {
                this.setState(() => {
                    return {
                        showFailure: true
                    };
                });

                setTimeout(() => {
                    this.setState(() => {
                        return {
                            showFailure: false
                        }
                    })
                },
                    1000);
            });
    }

    renderInput = () => {

        if (this.props.linked) {
            return (
                <input
                    id={`${this.props.category}-${this.props.number}`}
                    type='checkbox'
                    checked={this.props.open}
                    onChange={(e) => this.props.onCheckChange(this.props.number - 1, e.target)}
                />
            );
        }
        else {
            return (
                <input
                    id={`${this.props.category}-${this.props.number}`}
                    type='checkbox'
                />
            );
        }
    }

    render() {
        return (
            <div className='accordion__item'>
                {this.renderInput()}

                <label
                    className='accordion__label'
                    htmlFor={`${this.props.category}-${this.props.number}`}
                >
                    <span>
                        {`${labels[this.props.category]} ${this.props.number}`}
                    </span>
                    <svg className='accordion__icon'>
                        <use xlinkHref='img/sprite.svg#icon-chevron-down-solid'></use>
                    </svg>
                </label>

                <div className='accordion__text'>
                    <textarea
                        maxLength='100'
                        className='addux-textarea'
                        onChange={this.onTextChange}
                        value={this.state.text}
                        readOnly={this.props.readOnly}>
                    </textarea>
                    {
                        this.props.category === 'progress'
                        &&
                        (<div className='accordion__status'>
                            <div onClick={() => { this.onStatusClick('red') }} className={`accordion__button accordion__button--red ${this.state.statusSelected === 'red' ? 'accordion__button--selected' : ''}`} />
                            <div onClick={() => { this.onStatusClick('yellow') }} className={`accordion__button accordion__button--yellow ${this.state.statusSelected === 'yellow' ? 'accordion__button--selected' : ''}`} />
                            <div onClick={() => { this.onStatusClick('green') }} className={`accordion__button accordion__button--green ${this.state.statusSelected === 'green' ? 'accordion__button--selected' : ''}`} />
                        </div>)
                    }
                    <div className={`accordion__alert accordion__alert--success ${this.state.showSuccess ? '' : 'accordion__alert--hidden'}`}>Input saved</div>
                    <div className={`accordion__alert accordion__alert--failure ${this.state.showFailure ? '' : 'accordion__alert--hidden'}`}>Failed to save input</div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {

    return {
        activeAddux: state.addux[state.active],
        token: state.auth.token
    }
}

export default connect(mapStateToProps, { startEditAddux })(AccordionItem);