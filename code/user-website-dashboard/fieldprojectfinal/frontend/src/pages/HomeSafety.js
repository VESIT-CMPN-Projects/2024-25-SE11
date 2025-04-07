import React from "react";
import { Link } from "react-router-dom";
import "../styles.css";

const HomeSafety = () => {
  return (
    <div className="safety-detail-container">
      <div className="safety-detail-header">
        <h1>Fire Safety at Home</h1>
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
              src="https://www.youtube.com/embed/Y5fJg0JJ10FScBCB" // Replace VIDEO_ID with actual YouTube video ID
              title="Fire Safety at Home"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
        
        <div className="safety-detail-content">
          <p className="safety-intro">
            Your home should be a place of comfort and safety. Unfortunately, residential fires are all too common. 
            The good news is that most home fires are preventable with proper precautions and preparation. 
            By following some simple safety measures and having a plan in place, you can protect your family and property.
          </p>
          
          <h2>Essential Home Fire Safety Tips</h2>
          <ul className="safety-tips-list">
            <li>
              <strong>Install Smoke Alarms</strong>
              <p>Install smoke alarms on every level of your home, inside bedrooms and outside sleeping areas. Test them monthly and replace batteries at least once a year.</p>
            </li>
            <li>
              <strong>Create and Practice an Evacuation Plan</strong>
              <p>Develop a home fire escape plan with all family members and practice it twice a year. Ensure everyone knows two ways out of each room.</p>
            </li>
            <li>
              <strong>Kitchen Safety</strong>
              <p>Never leave cooking unattended. Keep flammable items away from the stove. Have a fire extinguisher in the kitchen and know how to use it.</p>
            </li>
            <li>
              <strong>Heating Equipment</strong>
              <p>Keep space heaters at least 3 feet away from anything that can burn. Turn them off when leaving the room or going to bed.</p>
            </li>
            <li>
              <strong>Electrical Safety</strong>
              <p>Don't overload outlets. Replace damaged electrical cords immediately. Use light bulbs with the correct wattage for the fixture.</p>
            </li>
          </ul>
          
          <div className="emergency-reminder">
            <h3>In Case of Fire:</h3>
            <ol>
              <li>Get out and stay out</li>
              <li>Call emergency services from outside</li>
              <li>Meet at your designated meeting spot</li>
              <li>Never go back inside a burning building</li>
              <li>If trapped, close doors, put wet towels under doors, and signal from windows</li>
            </ol>
          </div>
        </div>
      </div>
      
     {/* <div className="additional-resources">
        <h2>Additional Resources</h2>
        <div className="resource-links">
          <a href="#" className="resource-link">Home Fire Safety Checklist</a>
          <a href="#" className="resource-link">Smoke Alarm Information</a>
          <a href="#" className="resource-link">Creating a Family Emergency Plan</a>
        </div>
      </div>*/}
    </div>
  );
};

export default HomeSafety;