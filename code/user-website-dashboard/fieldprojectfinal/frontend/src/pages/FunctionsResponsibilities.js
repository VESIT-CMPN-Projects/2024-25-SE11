import React from "react";
import { Link } from "react-router-dom";
import "../styles.css";

const FunctionsAndResponsibilities = () => {
    const location = useLocation();

    return (
    <div className="about-container">
      <div className="sidebar">
        <Link to="/about-us" className="nav-card">About Us</Link>
        <Link to="/functions-responsibilities" className="nav-card active">Functions & Responsibilities</Link>
        <Link to="/vision-mission" className="nav-card">Vision & Mission</Link>
      </div>
      <div className="content">
        <h2>FUNCTIONS AND RESPONSIBILITIES</h2>

        <h3>Fire Suppression and Rescue Operations:</h3>
        <ul>
          <li>Extinguishing fires to protect lives and property.</li>
          <li>Rescuing individuals from fire incidents and other emergencies.</li>
        </ul>

        <h3>Emergency Response Services:</h3>
        <ul>
          <li>Addressing road traffic accidents by rescuing trapped individuals.</li>
          <li>Managing hazardous material incidents, including gas leaks and oil spills.</li>
          <li>Responding to building collapses, drownings, and natural disasters.</li>
        </ul>

        <h3>Fire Prevention and Safety Enforcement:</h3>
        <ul>
          <li>Conducting inspections to ensure compliance with fire safety regulations.</li>
          <li>Implementing the Maharashtra Fire Prevention and Life Safety Measures Act, 2006.</li>
          <li>Promoting fire safety awareness within the community.</li>
        </ul>

        <h3>Community Education and Awareness:</h3>
        <ul>
          <li>Organizing fire safety drills and educational programs.</li>
          <li>Collaborating with organizations to enhance public knowledge on fire prevention.</li>
        </ul>

        <h3>Specialized Rescue Services:</h3>
        <ul>
          <li>Handling emergencies such as flooding and terrorist attacks.</li>
          <li>Performing high-angle rescues and confined space operations.</li>
        </ul>

        <h3>Infrastructure Maintenance:</h3>
        <ul>
          <li>Maintaining fire hydrants and ensuring their operational readiness.</li>
          <li>Managing a fleet of fire stations and emergency vehicles across the city.</li>
        </ul>
      </div>
    </div>
  );
};

export default FunctionsResponsibilities;
