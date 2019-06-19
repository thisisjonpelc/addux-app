import React from "react";
import {connect} from 'react-redux';

import AppOverlay from './AppOverlay';
import VimeoVideo from './VimeoVideo';

import {labels} from "../constants/constants";
import {stopVideo} from './../utils/utils';

class ColumnHeader extends React.Component{
    constructor(props){
        super(props);

        this.videoRef = null;

        this.setVideoRef = (element) => {
            this.videoRef = element;
        }

        this.state = {
            showVideo: false
        }
    }

    onHeaderClick = () => {
        if(this.props.showVideos){
            this.setState({
                showVideo:true
            });
        }
    }

    handleCloseModal = () => {

        stopVideo(this.videoRef);

        this.setState({
            showVideo:false
        });
    }

    render(){
        const videoId = this.props.walkthrough[`${this.props.category}_video`];

        return (
            <div>
                <div onClick={this.onHeaderClick} className="column-header">
                    <span className="column-header__text">{labels[this.props.category]}</span>
                    <svg className="column-header__icon">
                        <use xlinkHref="/img/sprite.svg#icon-video-solid"></use>
                    </svg>
                </div>

                {this.props.showVideos && (<AppOverlay
                    isOpen={this.state.showVideo}
                    onRequestClose={this.handleCloseModal}
                >
                    <VimeoVideo setRef={this.setVideoRef} id={videoId} />
                </AppOverlay>)}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        walkthrough: state.walkthrough
    }
}


export default connect(mapStateToProps)(ColumnHeader);