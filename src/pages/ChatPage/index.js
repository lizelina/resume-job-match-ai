import React from 'react';
import './ChatPage.css';
import addIcon from '../../static/加号.png';
import recommendationIcon from '../../static/推荐2.png';
import rankIcon from '../../static/排序.png';
import consultantIcon from '../../static/13咨询.png';
import jobsIcon from '../../static/工作.png';
import userIcon from '../../static/人物.png';
import uploadFolderIcon from '../../static/上传文件夹-01.png';
import resumeIcon from '../../static/流程-简历.png';
import arrowUpIcon from '../../static/向上箭头.png';
import axios from 'axios';

class ChatPage extends React.Component {
  state = {
    activeButton: null,
    textInput: '',
  };
  async getData() {
    const res = await axios.get('http://172.25.100.106:5005/')
    console.log('res', res)
  }

  componentDidMount() {
    this.getData()
  }
  handleButtonClick = (buttonId) => {
    this.setState({ activeButton: buttonId });
    this.buttons.forEach((btn) => btn.classList.remove('active-state'));
    document.getElementById(buttonId).classList.add('active-state');
  };

  handleTextInput = (event) => {
    this.setState({ textInput: event.target.value });
    const button = document.getElementById('actionButton');
    if (event.target.value) {
      button.classList.add('active1');
    } else {
      button.classList.remove('active1');
    }
  };

  handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('resume', file);
      fetch('/upload', {
        method: 'POST',
        body: formData,
      })
        .then((response) => response.text())
        .then((data) => {
          if (data) {
            alert('Upload Successfully');
            window.location.href = '/recommendation';
          }
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    }
  };

  handleRecommendationClick = () => {
    window.location.href = '/recommendation';
  };

  buttons = ['choose_recommendation', 'choose', 'choose', 'choose', 'choose'];

  render() {
    const { activeButton, textInput } = this.state;

    return (
      <div className="container">
        <div className="chooseblock">
          <div className="logo-2">OfferAgent</div>
          <div className="label">
            <button className="chatbutton" onClick={this.getData}>
              <img src={addIcon} alt="" style={{ height: '18px', marginRight: '20px' }} />
              New Chat
            </button>
            {this.buttons.map((buttonId, index) => (
              <button
                key={index}
                id={buttonId}
                className={`choosebutton ${activeButton === buttonId ? 'active-state' : ''}`}
                onClick={() => this.handleButtonClick(buttonId)}
              >
                <img
                  src={
                    index === 0
                      ? recommendationIcon
                      : index === 1
                        ? rankIcon
                        : index === 2
                          ? consultantIcon
                          : jobsIcon
                  }
                  alt=""
                  style={{ height: '18px', marginRight: '10px' }}
                />
                {index === 0 ? 'Recommendation' : index === 1 ? 'Rank' : index === 2 ? 'Consultant' : 'Latest Jobs'}
              </button>
            ))}
            <button className="accountbutton">
              <img src={userIcon} alt="" style={{ height: '23px', marginRight: '20px' }} />
              Sign up / Log in
            </button>
          </div>
        </div>
        <div className="chatblock">
          <div className="chatwindow">
            <div className="logosentence">
              <i>OfferAgent</i> | Your Personal Job-Seeking Assistant
            </div>
            <div className="uploadsentence">START WITH RESUME</div>
            <div className="upload">
              <div className="container1">
                <img src={uploadFolderIcon} alt="" style={{ height: '60px', marginTop: '12px' }} />
                <div style={{ fontSize: '15px', fontWeight: 'bold' }}>
                  Upload Resume to get customized job list immediately
                </div>
                <label htmlFor="fileInput" id="uploadButton">
                  <img src={resumeIcon} alt="" style={{ height: '20px', marginRight: '8px', marginLeft: '6px' }} />
                  Upload Resume
                </label>
                <input type="file" id="fileInput" name="resume" accept="application/pdf" onChange={this.handleFileUpload} />
              </div>
            </div>
          </div>
          <div className="chatbot">
            <form>
              <input
                type="text"
                id="textInput"
                placeholder="Enter your requirements"
                value={textInput}
                onChange={this.handleTextInput}
              />
              <button className="send-icon" id="actionButton" onClick={this.handleRecommendationClick}>
                <img src={arrowUpIcon} alt="" style={{ height: '15px' }} />
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default ChatPage;