import React from "react";

import ColumnHeader from "./ColumnHeader";
import ColumnContent from "./ColumnContent";

    const Column = ({category, sharePage, showComments, setRef, accordionOpen, linked, onCheckChange, onScroll}) => {
        
        //console.log(accordionOpen);
        
        return (
        <div className="column">
            <ColumnHeader 
                category={category} 
                showVideos={!sharePage}
            />

            <ColumnContent
                linked={linked}    
                category={category} 
                readOnly={sharePage} 
                showComments={showComments}
                setRef={setRef}
                accordionOpen={accordionOpen}
                onCheckChange={onCheckChange}
                onScroll={onScroll}
            />
        </div>
    )};

export default Column