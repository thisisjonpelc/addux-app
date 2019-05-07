import React from 'react';

import Column from './Column';

class LinkedColumns extends React.Component {
    constructor(props) {
        super(props);

        this.accordionRefs = [null, null, null, null, null];

        this.setAccordionRefs = (category, element) => {
            switch (category) {
                case 'projects':
                    this.accordionRefs[0] = element;
                    break;
                case 'timelines':
                    this.accordionRefs[1] = element;
                    break;
                case 'projectOwner':
                    this.accordionRefs[2] = element;
                    break;
                case 'resources':
                    this.accordionRefs[3] = element;
                    break;
                case 'progress':
                    this.accordionRefs[4] = element;
                    break;
            }
        }

        this.state = {
            accordionOpen: [false, false, false, false, false, false, false, false, false],
            isProjectsAccordionSyncing: false,
            isTimelinesAccordionSyncing: false,
            isProjectOwnerAccordionSyncing: false,
            isResourcesAccordionSyncing: false,
            isProgressAccordionSyncing: false
        }
    }


    onCheckChange = (num, target) => {
        //console.log(target.parentNode.parentNode);

        const accordionOpen = [...this.state.accordionOpen];

        accordionOpen[num] = !accordionOpen[num];

        if(this.state.accordionOpen[num] === false){
            //console.log('Input box was opened!');
        
            for(let i = 0; i < this.accordionRefs.length; i++){

                if(this.accordionRefs[i] === target.parentNode.parentNode){
                    setTimeout(() => {
                        this.accordionRefs[i].childNodes[num].childNodes[2].childNodes[0].focus()
                    }, 400);
                }
            }
        
        }

        this.setState({ accordionOpen });

        // setTimeout(() => {
        //     accordions[i].childNodes[num - 1].childNodes[2].firstChild.focus();
        //   },400)
    }

    onProjectsAccordionScroll = (category, target) => {
        if (!this.state.isProjectsAccordionSyncing) {
            this.setState(() => {
              return {
                isTimelinesAccordionSyncing: true,
                isProjectOwnerAccordionSyncing: true,
                isResourcesAccordionSyncing: true,
                isProgressAccordionSyncing: true
              }
            });
      
            for (let i = 0; i < this.accordionRefs.length; i++) {
              if (this.accordionRefs[i] !== target) {
                this.accordionRefs[i].scrollTop = target.scrollTop;
              }
            }
          }
      
          this.setState(() => {
            return {
              isProjectsAccordionSyncing: false
            }
          });
    }

    onTimelinesAccordionScroll = (category, target) => {
        if (!this.state.isTimelinesAccordionSyncing) {
            this.setState(() => {
              return {
                isProjectsAccordionSyncing: true,
                isProjectOwnerAccordionSyncing: true,
                isResourcesAccordionSyncing: true,
                isProgressAccordionSyncing: true
              }
            });
      
            for (let i = 0; i < this.accordionRefs.length; i++) {
              if (this.accordionRefs[i] !== target) {
                this.accordionRefs[i].scrollTop = target.scrollTop;
              }
            }
          }
      
          this.setState(() => {
            return {
              isTimelinesAccordionSyncing: false
            }
          });
    }

    onProjectOwnerAccordionScroll = (category, target) => {
        if (!this.state.isProjectOwnerAccordionSyncing) {
            this.setState(() => {
              return {
                isProjectsAccordionSyncing: true,
                isTimelinesAccordionSyncing: true,
                isResourcesAccordionSyncing: true,
                isProgressAccordionSyncing: true
              }
            });
      
            for (let i = 0; i < this.accordionRefs.length; i++) {
              if (this.accordionRefs[i] !== target) {
                this.accordionRefs[i].scrollTop = target.scrollTop;
              }
            }
          }
      
          this.setState(() => {
            return {
              isProjectOwnerAccordionSyncing: false
            }
          });
    }

    onResourcesAccordionScroll = (category, target) => {
        if (!this.state.isResourcesAccordionSyncing) {
            this.setState(() => {
              return {
                isProjectsAccordionSyncing: true,
                isTimelinesAccordionSyncing: true,
                isProjectOwnerAccordionSyncing: true,
                isProgressAccordionSyncing: true
              }
            });
      
            for (let i = 0; i < this.accordionRefs.length; i++) {
              if (this.accordionRefs[i] !== target) {
                this.accordionRefs[i].scrollTop = target.scrollTop;
              }
            }
          }
      
          this.setState(() => {
            return {
              isResourcesAccordionSyncing: false
            }
          });
    }

    onProgressAccordionScroll = (category, target) => {
        if (!this.state.isProgressAccordionSyncing) {
            this.setState(() => {
              return {
                isProjectsAccordionSyncing: true,
                isTimelinesAccordionSyncing: true,
                isProjectOwnerAccordionSyncing: true,
                isResourcesAccordionSyncing: true
              }
            });
      
            for (let i = 0; i < this.accordionRefs.length; i++) {
              if (this.accordionRefs[i] !== target) {
                this.accordionRefs[i].scrollTop = target.scrollTop;
              }
            }
          }
      
          this.setState(() => {
            return {
              isProgressAccordionSyncing: false
            }
          });
    }

    render() {
        return (
            <div style={{ display: 'flex' }}>
                <Column
                    linked={true}
                    category='projects'
                    sharePage={this.props.sharePage}
                    showComments={this.props.showComments}
                    setRef={this.setAccordionRefs}
                    accordionOpen={this.state.accordionOpen}
                    onCheckChange={this.onCheckChange}
                    onAccordionScroll={this.onProjectsAccordionScroll}
                />

                <Column
                    linked={true}
                    category='timelines'
                    sharePage={this.props.sharePage}
                    showComments={this.props.showComments}
                    setRef={this.setAccordionRefs}
                    accordionOpen={this.state.accordionOpen}
                    onCheckChange={this.onCheckChange}
                    onAccordionScroll={this.onTimelinesAccordionScroll}
                />

                <Column
                    linked={true}
                    category='projectOwner'
                    sharePage={this.props.sharePage}
                    showComments={this.props.showComments}
                    setRef={this.setAccordionRefs}
                    accordionOpen={this.state.accordionOpen}
                    onCheckChange={this.onCheckChange}
                    onAccordionScroll={this.onProjectOwnerAccordionScroll}
                />

                <Column
                    linked={true}
                    category='resources'
                    sharePage={this.props.sharePage}
                    showComments={this.props.showComments}
                    setRef={this.setAccordionRefs}
                    accordionOpen={this.state.accordionOpen}
                    onCheckChange={this.onCheckChange}
                    onAccordionScroll={this.onResourcesAccordionScroll}
                />

                <Column
                    linked={true}
                    category='progress'
                    sharePage={this.props.sharePage}
                    showComments={this.props.showComments}
                    setRef={this.setAccordionRefs}
                    accordionOpen={this.state.accordionOpen}
                    onCheckChange={this.onCheckChange}
                    onAccordionScroll={this.onProgressAccordionScroll}
                />

            </div>
        );
    }
}

export default LinkedColumns