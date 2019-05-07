import React from "react";
import { connect } from 'react-redux';

import Column from "./Column";
import EmptyPage from './EmptyPage';
import ScrollArrow from './ScrollArrow';
import ColumnHeader from './ColumnHeader';
import CommentsForm from './CommentsForm';
import Accordion from './Accordion';
import LinkedColumns from './LinkedColumns';

class Columns extends React.Component {
  constructor(props) {
    super(props);

    this.columnsRef = React.createRef();
  }

  scrollColumns = (scrollTo, direction) => {
    const scrollPosition = this.columnsRef.current.scrollLeft;
    const distance = direction ==='left' ? -250 : 250;

    scrollTo({ref: this.columnsRef, x:scrollPosition + distance, smooth:true});
  }

  render() {

    return (
      this.props.empty ?
        (
          <main className='main-content'>
            <EmptyPage showCreateModal={this.props.showCreateModal} />
          </main>
        )
        :
        (
          <main className='main-content' ref={this.columnsRef}>
            {!this.props.empty && <ScrollArrow direction={'left'} onArrowClick={this.scrollColumns} />}
            {!this.props.empty && <ScrollArrow direction={'right'} onArrowClick={this.scrollColumns} />}

            <Column
              category='objective'
              sharePage={this.props.sharePage}
              showComments={this.props.showComments}
            />

            <Column
              category='goals'
              sharePage={this.props.sharePage}
              showComments={this.props.showComments}
            />

            <LinkedColumns 
              sharePage={this.props.sharePage} 
              showComments={this.props.showComments}
            />

          </main>
        )
    );
  }
}

const mapStateToProps = (state) => {
  return {
    activeAddux: state.addux[state.active],
    walkthrough: state.walkthrough
  }
}

export default connect(mapStateToProps)(Columns);

//OBJECTIVE COLUMN
// <div className="column">

//               <ColumnHeader
//                 category={'objective'}
//                 walkthrough={this.props.walkthrough}
//                 showVideos={!this.props.readOnly}
//               />

//               <div className="column__content">
//                 <p className="column__question">
//                   {this.props.walkthrough[`objective_prompt`]}
//                 </p>

//                 <div className='objective-block'>
//                   <p className='objective-block__label'>Objective</p>
//                   <ObjectiveTextArea
//                     key={`${this.props.activeAddux._id}-obj`}
//                     category={'objective'}
//                     activeAddux={this.props.activeAddux}
//                     id={this.props.activeAddux._id}
//                     readOnly={this.props.readOnly} />
//                 </div>

//                 {
//                   this.props.showComments
//                   &&
//                   <CommentsForm
//                     key={`${this.props.activeAddux._id}-comments`}
//                     category={'objective'}
//                     comment={this.props.activeAddux[`objective_comments`]}
//                     active={this.props.activeAddux._id}
//                   />
//                 }

//               </div>
//             </div>


//GOALS COLUMN
// <div className='column'>

//               <ColumnHeader
//                 category={'goals'}
//                 walkthrough={this.props.walkthrough}
//                 showVideos={!this.props.readOnly}
//               />

//               <div className='column__content'>
//                 <p className='column__question'>
//                   {this.props.walkthrough['goals_prompt']}
//                 </p>


//                 <Accordion
//                   size={3}
//                   linked={this.props.linked}
//                   onCheckChange={this.onGoalsCheckChange}
//                   openFields={this.state.openFields}
//                   activeAddux={this.props.activeAddux}
//                   category={'goals'}
//                   readOnly={this.props.readOnly}
//                 />

//                 {
//                   this.props.showComments
//                   &&
//                   <CommentsForm
//                     key={`${this.props.activeAddux._id}-comments`}
//                     category={'goals'}
//                     comment={this.props.activeAddux[`goals_comments`]}
//                     active={this.props.activeAddux._id}
//                   />
//                 }
//               </div>
//             </div>

//LINKED COLUMNS

// <div style={{ display: 'flex' }}>
//               <div className='column'>

//                 <ColumnHeader
//                   category={'projects'}
//                   walkthrough={this.props.walkthrough}
//                   showVideos={!this.props.readOnly}
//                 />

//                 <div className='column__content'>
//                   <p className='column__question'>
//                     {this.props.walkthrough['projects_prompt']}
//                   </p>


//                   <Accordion
//                     size={9}
//                     linked={true}
//                     onCheckChange={this.onCheckChange}
//                     openFields={this.state.openFields}
//                     activeAddux={this.props.activeAddux}
//                     category={'projects'}
//                     readOnly={this.props.readOnly}
//                     onScroll={this.projectColumnScroll}
//                   />

//                   {
//                     this.props.showComments
//                     &&
//                     <CommentsForm
//                       key={`${this.props.activeAddux._id}-comments`}
//                       category={'projects'}
//                       comment={this.props.activeAddux[`projects_comments`]}
//                       active={this.props.activeAddux._id}
//                     />
//                   }
//                 </div>
//               </div>

//               <div className='column'>

//                 <ColumnHeader
//                   category={'timelines'}
//                   walkthrough={this.props.walkthrough}
//                   showVideos={!this.props.readOnly}
//                 />

//                 <div className='column__content'>
//                   <p className='column__question'>
//                     {this.props.walkthrough['timelines_prompt']}
//                   </p>


//                   <Accordion
//                     size={9}
//                     linked={true}
//                     onCheckChange={this.onCheckChange}
//                     openFields={this.state.openFields}
//                     activeAddux={this.props.activeAddux}
//                     category={'timelines'}
//                     readOnly={this.props.readOnly}
//                     onScroll={this.timelinesColumnScroll}
//                   />

//                   {
//                     this.props.showComments
//                     &&
//                     <CommentsForm
//                       key={`${this.props.activeAddux._id}-comments`}
//                       category={'timelines'}
//                       comment={this.props.activeAddux[`timelines_comments`]}
//                       active={this.props.activeAddux._id}
//                     />
//                   }
//                 </div>
//               </div>

//               <div className='column'>

//                 <ColumnHeader
//                   category={'projectOwner'}
//                   walkthrough={this.props.walkthrough}
//                   showVideos={!this.props.readOnly}
//                 />

//                 <div className='column__content'>
//                   <p className='column__question'>
//                     {this.props.walkthrough['projectOwner_prompt']}
//                   </p>


//                   <Accordion
//                     size={9}
//                     linked={true}
//                     onCheckChange={this.onCheckChange}
//                     openFields={this.state.openFields}
//                     activeAddux={this.props.activeAddux}
//                     category={'projectOwner'}
//                     readOnly={this.props.readOnly}
//                     onScroll={this.projectOwnerColumnScroll}
//                   />

//                   {
//                     this.props.showComments
//                     &&
//                     <CommentsForm
//                       key={`${this.props.activeAddux._id}-comments`}
//                       category={'projectOwner'}
//                       comment={this.props.activeAddux[`projectOwner_comments`]}
//                       active={this.props.activeAddux._id}
//                     />
//                   }
//                 </div>
//               </div>

//               <div className='column'>

//                 <ColumnHeader
//                   category={'resources'}
//                   walkthrough={this.props.walkthrough}
//                   showVideos={!this.props.readOnly}
//                 />

//                 <div className='column__content'>
//                   <p className='column__question'>
//                     {this.props.walkthrough['resources_prompt']}
//                   </p>


//                   <Accordion
//                     size={9}
//                     linked={true}
//                     onCheckChange={this.onCheckChange}
//                     openFields={this.state.openFields}
//                     activeAddux={this.props.activeAddux}
//                     category={'resources'}
//                     readOnly={this.props.readOnly}
//                     onScroll={this.resourcesColumnScroll}
//                   />

//                   {
//                     this.props.showComments
//                     &&
//                     <CommentsForm
//                       key={`${this.props.activeAddux._id}-comments`}
//                       category={'resources'}
//                       comment={this.props.activeAddux[`resources_comments`]}
//                       active={this.props.activeAddux._id}
//                     />
//                   }
//                 </div>
//               </div>

//               <div className='column'>

//                 <ColumnHeader
//                   category={'progress'}
//                   walkthrough={this.props.walkthrough}
//                   showVideos={!this.props.readOnly}
//                 />

//                 <div className='column__content'>
//                   <p className='column__question'>
//                     {this.props.walkthrough['progress_prompt']}
//                   </p>


//                   <Accordion
//                     size={9}
//                     linked={true}
//                     onCheckChange={this.onCheckChange}
//                     openFields={this.state.openFields}
//                     activeAddux={this.props.activeAddux}
//                     category={'progress'}
//                     readOnly={this.props.readOnly}
//                     onScroll={this.progressColumnScroll}
//                   />

//                   {
//                     this.props.showComments
//                     &&
//                     <CommentsForm
//                       key={`${this.props.activeAddux._id}-comments`}
//                       category={'progress'}
//                       comment={this.props.activeAddux[`progress_comments`]}
//                       active={this.props.activeAddux._id}
//                     />
//                   }
//                 </div>
//               </div>
//             </div>