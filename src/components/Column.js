import React from "react";

import ColumnHeader from "./ColumnHeader";
import ColumnContent from "./ColumnContent";
import { PromiseProvider } from "mongoose";

    const Column = ({category, sharePage, showComments, setRef, accordionOpen, linked, onCheckChange, onAccordionScroll}) => {
        
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
                onAccordionScroll={onAccordionScroll}
            />
        </div>
    )};

export default Column