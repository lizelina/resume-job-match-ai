import React from 'react';
import './JobList.css';
import goodImg from '../../static/赞.png';
import goodImgHover from '../../static/赞黑.png';
import badImg from '../../static/踩.png';
import badImgHover from '../../static/踩黑.png';
import { JobListAPI } from '../../apis/Jobs';

class JobList extends React.Component {
  state = {
    jobList: [],
  };

  async componentDidMount() {
    const { documentId } = this.props;
    if (documentId) {
      try {
        console.log('Fetching job list...', documentId);
        const res = await JobListAPI(documentId);
        if (res) {
          console.log('Job list:', res);
          this.setState({ jobList: res.match_result });
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
  }


  render() {
    const { jobList } = this.state; // Get jobList from state
    return (
      <div className="joblist">
        <div className="header">
          <div className="jobtype">Intenet</div>
          <div className="jobtype">Marketing</div>
          <div className="jobtype">Hardware</div>
          <div className="jobtype">Architerture</div>
          <div className="jobtype">Consultant</div>
          <div className="jobtype">Finance</div>
          <div className="jobtype">HR</div>
          <div className="jobtype">Management</div>
        </div>
        {jobList.map((value, index) => (
          <div key={index} className="jobitem">
            <div className="fd_info">
              <ul>
                <li className="jobtitle">
                  <div style={{ lineHeight: '28px', fontWeight: 'bolder', fontSize: '14px' }}>{value['Job_Title']}</div>
                </li>
                <li className="other">Location:{value['Location']}</li>
                <li className="other">Company:{value['Company']}</li>
              </ul>
            </div>
            <div className="JD">
              <ul>
                <li style={{ lineHeight: '28px', fontWeight: 'bolder', fontSize: '14px' }}>Job Description</li>
                {/* <li>{value['job-description']}</li> */}
                <li
                  dangerouslySetInnerHTML={{ __html: value['job-description'] }}
                ></li>
              </ul>
            </div>
            <div className="comm">
              <ul>
                <li>
                  <button className="good" style={{ border: 'none', backgroundColor: 'transparent' }}>
                    <img className="default-img" src={goodImg} alt="赞" />
                  </button>
                </li>
                <li>
                  <button className="bad" style={{ border: 'none', backgroundColor: 'transparent' }}>
                    <img className='default-img-bad' src={badImg} alt="踩" />
                  </button>
                </li>
              </ul>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default JobList;
