import React from "react";
import { Link } from "react-router-dom";
import "../styles.css";

const SchoolSafety = () => {
  return (
    <div className="safety-detail-container">
      <div className="safety-detail-header">
        <h1>Fire Safety at School</h1>
        <Link to="/safety" className="back-link">
          &larr; Back to Safety Resources
        </Link>
      </div>
      
      <div className="safety-content-wrapper">
        <div className="safety-video-container">
          <div className="video-responsive">
            <iframe
              width="560"
              height="315"
              src="https://www.youtube.com/embed/vR4GtgrqnGQ"
              title="Fire Safety at School"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
        
        <div className="safety-detail-content">
          <p className="safety-intro">
            Fire safety isn't just a rule—it's a lifesaving habit! Knowing what to do in an emergency can protect you, 
            your friends, and your school. Stay alert, follow safety drills, and never ignore fire alarms. Small actions 
            like reporting fire hazards or practicing safe evacuation can make a big difference. Fire safety starts 
            with YOU! Be prepared, stay calm, and always put safety first. Together, we can prevent fire hazards and 
            create a safer future!
          </p>
          
          <h2>Essential School Fire Safety Tips</h2>
          <ul className="safety-tips-list">
            <li>
              <strong>Know Your Evacuation Routes</strong>
              <p>Familiarize yourself with all emergency exits and evacuation routes from your classroom, cafeteria, gym, and other areas you frequent at school.</p>
            </li>
            <li>
              <strong>Follow Fire Drill Procedures</strong>
              <p>Take every fire drill seriously. Follow directions, stay calm, walk quickly but don't run, and never use elevators during an evacuation.</p>
            </li>
            <li>
              <strong>Report Safety Hazards</strong>
              <p>If you notice overloaded electrical outlets, broken equipment, or blocked exits, report them to your teacher or administrator immediately.</p>
            </li>
            <li>
              <strong>Never Pull False Alarms</strong>
              <p>False alarms waste resources and can cause unnecessary panic. They can also lead to serious consequences for the person responsible.</p>
            </li>
            <li>
              <strong>Learn to Use Fire Extinguishers</strong>
              <p>Older students should learn the PASS technique: Pull, Aim, Squeeze, and Sweep. However, only attempt to fight very small fires if it's safe to do so.</p>
            </li>
          </ul>
          
          <div className="emergency-reminder">
            <h3>In Case of Fire:</h3>
            <ol>
              <li>Activate the nearest fire alarm</li>
              <li>Tell your teacher or another adult</li>
              <li>Leave the building through the nearest safe exit</li>
              <li>Never hide or return to the building</li>
              <li>Go to your designated meeting area</li>
            </ol>
          </div>
        </div>
      </div>
      
      {/* <div className="additional-resources">
        <h2>Additional Resources</h2>
        <div className="resource-links">
          <a href="#" className="resource-link">Download School Fire Safety Checklist</a>
          <a href="#" className="resource-link">Fire Safety Games for Students</a>
          <a href="#" className="resource-link">Information for Parents</a>
        </div>
      </div> */}
    </div>
  );
};

export default SchoolSafety;
