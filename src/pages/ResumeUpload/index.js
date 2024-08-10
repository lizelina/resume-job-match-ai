import React from 'react';
import uploadFolderIcon from '../../static/上传文件夹-01.png';
import resumeIcon from '../../static/流程-简历.png';

class ResumeUpload extends React.Component {

  render() {
    return (
      <div className="chatwindow2">
        <div className="logosentence">
          <i>OfferAgent</i> | Your Personal Job-Seeking Assistant
        </div>
        <div className="uploadsentence">START WITH RESUME</div>
        <div className="upload">
          <div className="container1">
            <img src={uploadFolderIcon} alt="upload" style={{ height: '60px', marginTop: '12px' }} />
            <div style={{ fontSize: '15px', fontWeight: 'bold' }}>
              Upload Resume to get customized job list immediately
            </div>
            <label htmlFor="fileInput" id="uploadButton">
              <img src={resumeIcon} alt="resume" style={{ height: '20px', marginRight: '8px', marginLeft: '6px' }} />
              Upload Resume
            </label>
            <input type="file" id="fileInput" name="resume" accept="application/pdf" onChange={this.props.handleFileUpload} />
          </div>
        </div>
      </div>
    );
  }
}

export default ResumeUpload;