import React from 'react';
import addIconPath from '../../static/加号.png';
import CommonButtons from '../CommonButtons';
import userIconPath from '../../static/人物.png';
import sendIconPath from '../../static/向上箭头.png';
import './OfferAgent.css';
import JobList from '../JobList';
import ResumeUpload from '../ResumeUpload';
import { UploadResumeAPI } from '../../apis/Upload';
import { message } from 'antd';
import { removeToken } from '../../utils';


class OfferAgent extends React.Component {
  state = {
    selectedButton: null,
    inputValue: '',
    documentId: null,
    resumeUploaded: false, //State to track whether the resume has been uploaded
  };

  // JS Navigate to the home page
  navigateToHome = () => {
    window.location.href = '/home';
  };

  handleButtonClick = (buttonId) => {
    console.log('Button clicked:', buttonId);
    this.setState({ selectedButton: buttonId });
  };

  handleInputChange = (event) => {
    this.setState({ inputValue: event.target.value });
  };

  handleSubmit = () => {
    // Send the input content to the server
    console.log('Submitted:', this.state.inputValue);
    this.setState({ inputValue: '' });
  };

  handleJobInfoSubmit = (jobInfo) => {
    // Send the job information to the server
    console.log('Job info submitted:', jobInfo);
    // You can add the code to send the data here
  };

  handleNewChatButton = () => {
    this.setState({ resumeUploaded: false })
  }

 handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
        formData.append('resume', file);
        try {
            const res = await UploadResumeAPI(formData);
            if (res) {
               console.log('Resume uploaded successfully:', res);
               this.setState({ 
                resumeUploaded: true, // Update the state after the resume is uploaded
                documentId: String(res.document_id)// Save the document_id in the state
              }); 
            }
        } catch (error) {
            console.error('Error:', error);
        }}
  }

  handleLogout = () => {
    if (window.confirm('Are you sure you want to log out?')) {
      // Log out the user
      console.log('User logged out');
      removeToken();
      this.navigateToHome();
    }
    
  };

  render() {
    const { selectedButton, inputValue, resumeUploaded } = this.state;

    return (
      <div className="container">
        <div className="chooseblock">
          <div className="logo-2">OfferAgent</div>
          <div className="label">
            <button className="chatbutton" onClick={this.handleNewChatButton} >
              <img src={addIconPath} alt="" className="chatbutton-icon" />
              New Chat
            </button>

            <CommonButtons selectedButton={selectedButton} handleButtonClick={this.handleButtonClick} />

            <button className="accountbutton" onClick={this.handleLogout}>
              <img src={userIconPath} alt="" className="account-icon" />
              <p>Log out</p>
            </button>
          </div>
        </div>
        <div className="chatblock">
          <div className="chatwindow">

            {resumeUploaded ? (
              <JobList documentId={this.state.documentId} />
            ) : (
              <ResumeUpload handleFileUpload={this.handleFileUpload} />
            )}
            {/* <ResumeUpload handleFileUpload={this.handleFileUpload} /> */}

          </div>
          <div className="chatbot">
            <input
              type="text"
              id="textInput"
              placeholder="Enter your requirements"
              value={inputValue}
              onChange={this.handleInputChange}
            />
            <button className={`send-icon ${inputValue ? 'active1' : ''}`} onClick={this.handleSubmit}>
              <img src={sendIconPath} alt="" style={{ height: '15px' }} />
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default OfferAgent;