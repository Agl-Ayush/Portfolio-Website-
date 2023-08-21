import React, { useState, useEffect } from 'react';
import Webcam from 'react-webcam';
import './App.css';

function App() {
  const [tabSwitches, setTabSwitches] = useState(0);
  const [isAssessmentStarted, setIsAssessmentStarted] = useState(false);
  const [showWarningModal, setShowWarningModal] = useState(false);

  useEffect(() => {
    const tabSwitchHandler = () => {
      if (isAssessmentStarted) {
        setTabSwitches((prevCount) => prevCount + 1);
      }
    };
    window.addEventListener('blur', tabSwitchHandler);

    return () => {
      window.removeEventListener('blur', tabSwitchHandler);
    };
  }, [isAssessmentStarted]);

  const startAssessment = () => {
    setIsAssessmentStarted(true);
    setShowWarningModal(true);
  };

  const closeModal = () => {
    setShowWarningModal(false);
  };

  return (
    <div className="container">
      <h1>Tab Switch Count with Camera</h1>
      <p>Press the "Start Assessment" button to begin tracking tab switches and access the camera.</p>
      <button onClick={startAssessment} disabled={isAssessmentStarted}>Start Assessment</button>
      <p>Number of Tab Switches: <span>{tabSwitches}</span></p>

      <Webcam
        className={`camera-video ${isAssessmentStarted ? 'blinking-border' : ''}`}
        audio={false}
      />

      {showWarningModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>&times;</span>
            <h2>Warning</h2>
            <p>Switching tabs during the assessment may lead to termination. Are you sure you want to continue?</p>
            <button onClick={closeModal}>Continue</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
