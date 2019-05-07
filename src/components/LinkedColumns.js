import React from 'react';

import Column from './Column';

class LinkedColumns extends React.Component {
  constructor(props) {
    super(props);

    this.accordionRefs = [];
    this.columnRefs = [];

    this.setRefs = (type, category, element) => {
      switch (category) {
        case 'projects':
          if (type === 'accordion') {
            this.accordionRefs[0] = element;
          }
          else {
            this.columnRefs[0] = element;
          }
          break;
        case 'timelines':
          if (type === 'accordion') {
            this.accordionRefs[1] = element;
          }
          else {
            this.columnRefs[1] = element;
          }
          break;
        case 'projectOwner':
          if (type === 'accordion') {
            this.accordionRefs[2] = element;
          }
          else {
            this.columnRefs[2] = element;
          }
          break;
        case 'resources':
          if (type === 'accordion') {
            this.accordionRefs[3] = element;
          }
          else {
            this.columnRefs[3] = element;
          }
          break;
        case 'progress':
          if (type === 'accordion') {
            this.accordionRefs[4] = element;
          }
          else {
            this.columnRefs[4] = element;
          }
          break;
      }
    }

    this.state = {
      accordionOpen: [false, false, false, false, false, false, false, false, false],
      isProjectsAccordionSyncing: false,
      isTimelinesAccordionSyncing: false,
      isProjectOwnerAccordionSyncing: false,
      isResourcesAccordionSyncing: false,
      isProgressAccordionSyncing: false,
      isProjectsColumnSyncing: false,
      isTimelinesColumnSyncing: false,
      isProjectOwnerColumnSyncing: false,
      isResourcesColumnSyncing: false,
      isProgressColumnSyncing: false
    }
  }


  onCheckChange = (num, target) => {
    const accordionOpen = [...this.state.accordionOpen];

    accordionOpen[num] = !accordionOpen[num];

    if (this.state.accordionOpen[num] === false) {

      for (let i = 0; i < this.accordionRefs.length; i++) {

        if (this.accordionRefs[i] === target.parentNode.parentNode) {
          setTimeout(() => {
            this.accordionRefs[i].childNodes[num].childNodes[2].childNodes[0].focus()
          }, 400);
        }
      }

    }

    this.setState({ accordionOpen });
  }

  onProjectsScroll = (type, target) => {
    if (type === 'accordion') {
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
    else {
      if (!this.state.isProjectsColumnSyncing) {

        console.log('Projects columns is not syncing');

        this.setState(() => {
          return {
            isTimelinesColumnSyncing: true,
            isProjectOwnerColumnSyncing: true,
            isResourcesColumnSyncing: true,
            isProgressColumnSyncing: true
          }
        });

        for (let j = 0; j < this.columnRefs.length; j++) {
          if (this.columnRefs[j] !== target) {
            this.columnRefs[j].scrollTop = target.scrollTop;
          }
        }
      }

      this.setState(() => {
        return {
          isProjectsColumnSyncing: false
        }
      });
    }

  }

  onTimelinesScroll = (type, target) => {
    if (type === 'accordion') {
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
    else {
      if (!this.state.isTimelinesColumnSyncing) {
        this.setState(() => {
          return {
            isProjectsColumnSyncing: true,
            isProjectOwnerColumnSyncing: true,
            isResourcesColumnSyncing: true,
            isProgressColumnSyncing: true
          }
        });

        for (let i = 0; i < this.columnRefs.length; i++) {
          if (this.columnRefs[i] !== target) {
            this.columnRefs[i].scrollTop = target.scrollTop;
          }
        }
      }

      this.setState(() => {
        return {
          isTimelinesColumnSyncing: false
        }
      });
    }

  }

  onProjectOwnerScroll = (type, target) => {
    if (type === 'accordion') {
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
    else {
      if (!this.state.isProjectOwnerColumnSyncing) {
        this.setState(() => {
          return {
            isProjectsColumnSyncing: true,
            isTimelinesColumnSyncing: true,
            isResourcesColumnSyncing: true,
            isProgressColumnSyncing: true
          }
        });

        for (let i = 0; i < this.columnRefs.length; i++) {
          if (this.columnRefs[i] !== target) {
            this.columnRefs[i].scrollTop = target.scrollTop;
          }
        }
      }

      this.setState(() => {
        return {
          isProjectOwnerColumnSyncing: false
        }
      });
    }
  }

  onResourcesScroll = (type, target) => {
    if (type === 'accordion') {
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
    else {
      if (!this.state.isResourcesColumnSyncing) {
        this.setState(() => {
          return {
            isProjectsColumnSyncing: true,
            isTimelinesColumnSyncing: true,
            isProjectOwnerColumnSyncing: true,
            isProgressColumnSyncing: true
          }
        });

        for (let i = 0; i < this.columnRefs.length; i++) {
          if (this.columnRefs[i] !== target) {
            this.columnRefs[i].scrollTop = target.scrollTop;
          }
        }
      }

      this.setState(() => {
        return {
          isResourcesColumnSyncing: false
        }
      });
    }
  }

  onProgressScroll = (type, target) => {
    if (type === 'accordion') {
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
    else {
      if (!this.state.isProgressColumnSyncing) {
        this.setState(() => {
          return {
            isProjectsColumnSyncing: true,
            isTimelinesColumnSyncing: true,
            isProjectOwnerColumnSyncing: true,
            isResourcesColumnSyncing: true
          }
        });

        for (let i = 0; i < this.columnRefs.length; i++) {
          if (this.columnRefs[i] !== target) {
            this.columnRefs[i].scrollTop = target.scrollTop;
          }
        }
      }

      this.setState(() => {
        return {
          isProgressColumnSyncing: false
        }
      });
    }
  }

  render() {

    //console.log(this.accordionRefs);

    return (
      <div style={{ display: 'flex' }}>
        <Column
          linked={true}
          category='projects'
          sharePage={this.props.sharePage}
          showComments={this.props.showComments}
          setRef={this.setRefs}
          accordionOpen={this.state.accordionOpen}
          onCheckChange={this.onCheckChange}
          onScroll={this.onProjectsScroll}
        />

        <Column
          linked={true}
          category='timelines'
          sharePage={this.props.sharePage}
          showComments={this.props.showComments}
          setRef={this.setRefs}
          accordionOpen={this.state.accordionOpen}
          onCheckChange={this.onCheckChange}
          onScroll={this.onTimelinesScroll}
        />

        <Column
          linked={true}
          category='projectOwner'
          sharePage={this.props.sharePage}
          showComments={this.props.showComments}
          setRef={this.setRefs}
          accordionOpen={this.state.accordionOpen}
          onCheckChange={this.onCheckChange}
          onScroll={this.onProjectOwnerScroll}
        />

        <Column
          linked={true}
          category='resources'
          sharePage={this.props.sharePage}
          showComments={this.props.showComments}
          setRef={this.setRefs}
          accordionOpen={this.state.accordionOpen}
          onCheckChange={this.onCheckChange}
          onScroll={this.onResourcesScroll}
        />

        <Column
          linked={true}
          category='progress'
          sharePage={this.props.sharePage}
          showComments={this.props.showComments}
          setRef={this.setRefs}
          accordionOpen={this.state.accordionOpen}
          onCheckChange={this.onCheckChange}
          onScroll={this.onProgressScroll}
        />

      </div>
    );
  }
}

export default LinkedColumns