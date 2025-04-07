import React from "react";
import { Link } from "react-router-dom";
import "../styles.css";

const VisionAndMission = () => {
    const location = useLocation();
  
  return (
    <div className="about-container">
      <div className="sidebar">
        <Link to="/about-us" className="nav-card">About Us</Link>
        <Link to="/functions-responsibilities" className="nav-card">Functions & Responsibilities</Link>
        <Link to="/vision-mission" className="nav-card active">Vision & Mission</Link>
      </div>
      <div className="content">
        <h2>OUR VISION</h2>
        <p>To create a fire-safe Mumbai by ensuring rapid emergency response, 
          promoting fire prevention awareness, and continuously improving firefighting capabilities 
          through innovation and training.</p>

        <h2>OUR MISSION</h2>
        <ul>
          <li>To protect lives, property, and the environment from fire hazards and emergencies.</li>
          <li>To provide a swift and efficient response to fire incidents, disasters, and rescue operations.</li>
          <li>To educate citizens about fire safety and emergency preparedness.</li>
          <li>To continuously upgrade firefighting techniques, equipment, and training programs.</li>
        </ul>
      </div>
    </div>
  );
};

export default VisionMission;
