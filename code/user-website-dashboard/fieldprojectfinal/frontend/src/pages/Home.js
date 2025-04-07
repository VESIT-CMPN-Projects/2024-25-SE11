import React from "react";
import "../styles.css"; // Adjust the path as needed
import Chatbot from "../components/chatbot.js";
const Home = () => {
  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>Keeping Our Community Safe</h1>
          <p>Rapid response and effective emergency management for all incidents</p>
          <div className="hero-buttons">
            <a href="/safety-measures" className="btn btn-primary">Safety Advice</a>
            <a href="/incidents" className="btn btn-secondary">View Recent Incidents</a>
          </div>
        </div>
      </section>

      {/* Information Cards Section */}
      <section className="info-cards-section">
        <div className="info-card">
          <div className="info-card-icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#d32f2f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              <path d="M9 12h6"/>
              <path d="M12 9v6"/>
            </svg>
          </div>
          <h2>Emergency Response</h2>
          <p>Our teams are ready to respond 24/7 to any emergency situation in the area.</p>
          <a href="/drills" className="card-link">Learn About Our Drills</a>
        </div>

        <div className="info-card">
          <div className="info-card-icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#4caf50" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              <path d="M12 8v4"/>
              <path d="M12 16h.01"/>
            </svg>
          </div>
          <h2>Prevention Advice</h2>
          <p>Get expert advice on how to prevent incidents and keep your home and workplace safe.</p>
          <a href="/safety-measures" className="card-link">Safety Measures</a>
        </div>

        <div className="info-card">
          <div className="info-card-icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#2196f3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
              <circle cx="9" cy="7" r="4"/>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
            </svg>
          </div>
          <h2>Community Outreach</h2>
          <p>We work with the community to build awareness and improve safety standards.</p>
          <a href="#" className="card-link">Community Programs</a>
        </div>
      </section>

      {/* Add Chatbot Below */}
      <Chatbot />

      
    </div>
  );
};

export default Home;