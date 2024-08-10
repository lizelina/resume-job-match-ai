import React from 'react';
import arrowIconPath from '../../static/右箭头.png';
import tickIconPath from '../../static/打勾1.png';
import recommendationsImagePath from '../../static/推荐结果.png';
import resumeTemplateImagePath from '../../static/简历模版.png';
import uploadPictureImagePath from '../../static/uploadpicture.png';
import findJobImagePath from '../../static/findjob.png';
import './HomePage.css';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {

  const navigate = useNavigate();

  const navigateToChat = () => {
    navigate('/offeragent');
  };

  return (
    <div className="body">
      <div className="header">
        <div className="logo">OfferAgent</div>
        <button className="button" style={{ marginLeft: 'auto' }} onClick={navigateToChat}>
          <span className="fas">
            <img src={arrowIconPath} style={{ width: '15px', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }} alt="Arrow" />
          </span>
          <span className="starttext" style={{ display: 'inline-block', position: 'relative', top: '3.5px' }}>
            Find Job Now
          </span>
        </button>
      </div>
      <div className="blocks-container">
        <div className="block-left">
          <p className="slogan">
            The <i style={{ color: '#7D3C98', fontStyle: 'normal' }}>fastest</i> way to find your{' '}
            <i style={{ color: '#7D3C98', fontStyle: 'normal' }}>best Job</i>
          </p>
          <div className="introduction">
            <ul>
              <li style={{ marginBottom: '0.6em' }}>
                <i>
                  <img src={tickIconPath} alt="Tick" style={{ width: '1rem', marginLeft: '0.2rem', marginRight: '0.2rem', position: 'relative', top: '0.2rem' }} />
                </i>
                Upload your resume and instantly match with the most suitable job opportunities
              </li>
              <li style={{ marginBottom: '0.6em' }}>
                <i>
                  <img src={tickIconPath} alt="Tick" style={{ width: '1rem', marginLeft: '0.2rem', marginRight: '0.2rem', position: 'relative', top: '0.2rem' }} />
                </i>
                AI assistant helps you analyze and find the best strategy to land the job
              </li>
              <li style={{ marginBottom: '0.6em' }}>
                <i>
                  <img src={tickIconPath} alt="Tick" style={{ width: '1rem', marginLeft: '0.2rem', marginRight: '0.2rem', position: 'relative', top: '0.2rem' }} />
                </i>
                Receive the latest job opportunities launched everyday
              </li>
            </ul>
          </div>
        </div>
        <div className="block-right">
          <img src={recommendationsImagePath} alt="Recommendations" style={{ height: '280px', borderRadius: '10px', marginLeft: '18px' }} />
          <img
            src={resumeTemplateImagePath}
            alt="Resume Template"
            style={{
              height: '280px',
              borderRadius: '10px',
              marginLeft: '18px',
              position: 'absolute',
              right: '120px',
              marginTop: '120px',
              boxShadow: '0 8px 16px rgba(0, 0, 0, 0.3)',
            }}
          />
          <img src={uploadPictureImagePath} alt="Upload" style={{ height: '30px', borderRadius: '10px', marginLeft: '228px', position: 'absolute', marginTop: '188px' }} />
          <img src={findJobImagePath} alt="Find Job" style={{ height: '30px', borderRadius: '10px', marginLeft: '308px', position: 'absolute', marginTop: '48px' }} />
        </div>
      </div>
      <div className="button-button">
        <div className="start1">
          <button className="button" id="navigateButton" onClick={navigateToChat}>
            <span className="fas">
              <img src={arrowIconPath} style={{ width: '15px', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }} alt="Arrow" />
            </span>
            <span className="starttext" style={{ display: 'inline-block', position: 'relative', top: '3.5px' }}>
              Find Job Now
            </span>
          </button>
        </div>
        <div className="join-us">
          <button className="button-contactus">
            <p>Contact us</p>
          </button>
        </div>
      </div>
      <div className="aim">AI agent aims to help individuals find most suitable Job</div>
    </div>
  );

}

export default HomePage;