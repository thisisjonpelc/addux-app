import React from "react";

import ColumnHeader from "./ColumnHeader";
import ColumnContent from "./ColumnContent";

const Column = ({category, sharePage, showComments}) => (
    <div className="column">
        <ColumnHeader 
            category={category} 
            showVideos={!sharePage}
        />

        <ColumnContent    
            category={category} 
            readOnly={sharePage} 
            showComments={showComments} 
        />
    </div>
);

export default Column