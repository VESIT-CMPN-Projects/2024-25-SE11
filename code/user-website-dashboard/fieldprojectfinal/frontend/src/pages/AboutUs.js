import React from "react";
import { Link, useLocation } from "react-router-dom"; // Added useLocation import
import "../styles.css"; // Ensure styles are imported

const AboutUs = () => {
    const location = useLocation(); // This is correctly placed

    return (
        <div className="about-container">
            <div className="sidebar">
                <Link to="/about-us" className={`nav-card ${location.pathname === "/about-us" ? "active" : ""}`}>About Us</Link>
                <Link to="/functions-responsibilities" className={`nav-card ${location.pathname === "/functions-responsibilities" ? "active" : ""}`}>Functions & Responsibilities</Link>
                <Link to="/vision-mission" className={`nav-card ${location.pathname === "/vision-mission" ? "active" : ""}`}>Vision & Mission</Link>
            </div>
            <div className="content">
                <h2>ABOUT US</h2>
                <p>
                    The Directorate General, Civil Defence was established by MHA on 17th November, 1962.
                    There were only four sections during that time: Fire Section, Civil Defence, Home Guards,
                    and Communication Section. On 7th January 2003, this office was declared an attached office of MHA 
                    under the Disaster Management Division, and two more sections (Cash and Establishment) were added.
                </p>
                <p>
                    On 2nd September 2004, it was re-designated as Director General, National Emergency Response Force 
                    and Civil Defence. On 1st December 2006, it was re-designated as Director General, 
                    National Disaster Response Force & Civil Defence. Again, on 26th February 2014, it was re-designated 
                    as Director General, Fire Services, Civil Defence, and Home Guards.
                </p>
            </div>
        </div>
    );
};

export default AboutUs;
