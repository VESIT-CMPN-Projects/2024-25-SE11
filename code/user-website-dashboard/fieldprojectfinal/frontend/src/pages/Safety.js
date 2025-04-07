import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles.css";
import Chatbot from "../components/chatbot";

const Safety = () => {
  const [activeTab, setActiveTab] = useState("home");

  const safetyData = [
    {
      id: "home",
      title: "At Home",
      image: "/src/assets/home-safety.jpg",
      link: "/safety/home",
      alt: "Home safety"
    },
    {
      id: "workplace",
      title: "At Workplace",
      image: "/src/assets/workplace-safety.jpg",
      link: "/safety/workplace",
      alt: "Workplace safety"
    },
    {
      id: "firecrackers",
      title: "Bursting Fire Crackers",
      image: "/src/assets/firecrackers-safety.jpg",
      link: "/safety/firecrackers",
      alt: "Fire crackers safety"
    },
    {
      id: "school",
      title: "At School",
      image: "/src/assets/school-safety.jpg",
      link: "/safety/school",
      alt: "School safety"
    }
  ];

  return (
    <div className="safety-container">
      <section className="safety-hero">
        <h1>Fire Safety Resources</h1>
        <p>Learn how to stay safe from fire hazards in different environments</p>
      </section>

      <div className="location-tabs">
        {safetyData.map((item) => (
          <button
            key={item.id}
            className={`tab-button ${activeTab === item.id ? "active" : ""}`}
            onClick={() => setActiveTab(item.id)}
          >
            {item.title}
          </button>
        ))}
      </div>

      <div className="safety-cards-grid">
        {safetyData.map((item) => (
          activeTab === item.id && (
            <Link to={item.link} key={item.id} className="safety-card">
              <div className="safety-card-image">
                <img src={item.image} alt={item.alt} />
                <div className="safety-card-overlay">
                  <h2>{item.title}</h2>
                </div>
              </div>
            </Link>
          )
        ))}
      </div>

      <section className="safety-info-section">
        <h2>Why Fire Safety Matters</h2>
        <p>
          Fire safety isn't just a set of rules—it's a lifesaving habit. Taking the time to learn
          proper precautions and what to do in case of emergency can protect you, your loved ones,
          and your property. Small actions like installing smoke detectors or practicing evacuation
          routes can make all the difference in an emergency situation.
        </p>
      </section>

      <Chatbot />
    </div>
  );
};

export default Safety;

