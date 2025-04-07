import React, { useState } from 'react';
import '../styles.css';

const SafetyMeasures = () => {
  const [activeTab, setActiveTab] = useState('home');

  const safetyData = {
    home: {
      title: "Home Fire Safety",
      tips: [
        "Install smoke alarms on every level of your home",
        "Test smoke alarms every month",
        "Create and practice a fire escape plan with two ways out",
        "Never leave cooking unattended",
        "Keep flammable items away from heat sources",
        "Check electrical cords for damage regularly"
      ],
      emergency: "If a fire starts: Get out, stay out, and call 101"
    },
    school: {
      title: "School Fire Safety",
      tips: [
        "Know the location of all fire exits",
        "Participate in all fire drills seriously",
        "Never prop open fire doors",
        "Report any blocked exits or damaged fire equipment",
        "Learn the location of fire alarm pull stations",
        "Follow teacher instructions during emergencies"
      ],
      emergency: "During school fires: Follow evacuation procedures calmly"
    },
    workplace: {
      title: "Workplace Fire Safety",
      tips: [
        "Know your building's evacuation plan",
        "Keep fire exits and pathways clear at all times",
        "Report any fire hazards immediately",
        "Know how to use fire extinguishers (PASS method)",
        "Store flammable materials properly",
        "Ensure electrical equipment is PAT tested"
      ],
      emergency: "In workplace fires: Activate alarm, evacuate, call 101"
    }
  };

  return (
    <div className="safety-container">
      <div className="safety-hero">
        <h1>Fire Safety Advice</h1>
        <p>Select a location to view specific safety information</p>
      </div>

      <div className="location-tabs">
        <button 
          className={`tab-button ${activeTab === 'home' ? 'active' : ''}`}
          onClick={() => setActiveTab('home')}
        >
          Home
        </button>
        <button 
          className={`tab-button ${activeTab === 'school' ? 'active' : ''}`}
          onClick={() => setActiveTab('school')}
        >
          School
        </button>
        <button 
          className={`tab-button ${activeTab === 'workplace' ? 'active' : ''}`}
          onClick={() => setActiveTab('workplace')}
        >
          Workplace
        </button>
      </div>

      <div className="safety-content">
        <h2>{safetyData[activeTab].title}</h2>
        
        <div className="safety-tips">
          <h3>Essential Safety Tips:</h3>
          <ul>
            {safetyData[activeTab].tips.map((tip, index) => (
              <li key={index}>{tip}</li>
            ))}
          </ul>
        </div>

        <div className="emergency-info">
          <h3>Emergency Procedure:</h3>
          <p>{safetyData[activeTab].emergency}</p>
        </div>

        {activeTab === 'home' && (
          <div className="additional-resources">
            <h3>Home Fire Safety Resources:</h3>
            <div className="resource-cards">
              <div className="resource-card">
                <h4>Smoke Alarms</h4>
                <p>Installation and maintenance guide for smoke detectors</p>
              </div>
              <div className="resource-card">
                <h4>Escape Planning</h4>
                <p>How to create and practice a home fire escape plan</p>
              </div>
              <div className="resource-card">
                <h4>Cooking Safety</h4>
                <p>Preventing kitchen fires and proper response</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SafetyMeasures;