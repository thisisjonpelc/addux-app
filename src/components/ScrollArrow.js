import React from 'react';
import { ScrollTo } from 'react-scroll-to';

const ScrollArrow = (props) => {
    return (
        <ScrollTo>
            {({ scrollTo }) => (
                <div id={`scroll-${props.direction}`} className={`scroll-button scroll-button--${props.direction}`} onClick={() => props.onArrowClick(scrollTo, props.direction)}>
                    <svg className={`scroll-button__icon scroll-button__icon--${props.direction}`}>
                        <use xlinkHref="/img/sprite.svg#icon-chevron-right-solid"></use>
                    </svg>
                </div>
            )}
        </ScrollTo>
    );
}

export default ScrollArrow;