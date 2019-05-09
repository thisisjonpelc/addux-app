import React from 'react';

const VimeoVideo = ({id, setRef}) => {
    
    const refValue = setRef ? (element) => setRef(element) : null;
    
    return (

        <div className='vimeo-video'>
        <div style={{
                padding:'56.25% 0 0 0',
                position:'relative'
                
        }}>
            <iframe ref={refValue} id={id} src={`https://player.vimeo.com/video/${id}?title=0&byline=0&portrait=0`} 
                    style={{
                        position: 'absolute',
                        top:0,
                        left:0,
                        width:'100%',
                        height:'100%'
                    }}
                    frameBorder="0" 
                    webkitallowfullscreen='true' 
                    mozallowfullscreen='true' 
                    allowFullScreen={true}>
            </iframe>
        </div>
        </div>
    );
}

export default VimeoVideo;