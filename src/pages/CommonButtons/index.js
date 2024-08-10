import React from 'react';
import './CommonButtons.css';
import recommendationIconPath from '../../static/推荐2.png';
import rankIconPath from '../../static/排序.png';
import consultantIconPath from '../../static/13咨询.png';
import latestJobsIconPath from '../../static/工作.png';

// Define the buttons
const buttons = [
    { key: 'recommendation', label: 'Recommendation', iconPath: recommendationIconPath },
    { key: 'rank', label: 'Rank', iconPath: rankIconPath },
    { key: 'consultant', label: 'Consultant', iconPath: consultantIconPath },
    { key: 'latestJobs', label: 'Latest Jobs', iconPath: latestJobsIconPath },
  ];

  // CommonButtons component
class CommonButtons extends React.Component {
    renderButton(button) {
      return (
        <button
          key={button.key}
          className={`choosebutton ${this.props.selectedButton === button.key ? 'active-state' : ''}`}
          onClick={() => this.props.handleButtonClick(button.key)}
        >
          <img src={button.iconPath} alt={button.label} className="button-icon" />
          {button.label}
        </button>
      );
    }
  
    render() {
      return (
        <div>
          {buttons.map(button => this.renderButton(button))}
        </div>
      );
    }
  }

  export default CommonButtons;