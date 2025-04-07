import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles.css"; // Correct relative path
 // Make sure to include the CSS file

const Incidents = () => {
  const [incidents, setIncidents] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/incidents", { withCredentials: true })
      .then((response) => {
        setIncidents(response.data.map(incident => ({
          _id: incident._id,
          type: incident.incidentType,
          location: incident.location,
          severity: incident.severity,
          actionTaken: incident.actionTaken,
          casualty: incident.casualties ? "Yes" : "No"
        })));
      })
      .catch((error) => {
        console.error("Error fetching incidents:", error);
        // Keep using sample data if API call fails
      });
  }, []);

  return (
    <div>
      

      {/* Incidents Container */}
      <div className="incidents-container">
        <h2>Recent Incidents</h2>
        <div className="incidents-list">
          {incidents.map((incident) => (
            <div 
              key={incident._id} 
              className="incident-card" 
              data-severity={incident.severity}
            >
              <h3>{incident.type}</h3>
              <p><strong>Location:</strong> {incident.location}</p>
              <p><strong>Severity:</strong> {incident.severity}</p>
              <p><strong>Action Taken:</strong> {incident.actionTaken}</p>
              <p><strong>Casualty:</strong> {incident.casualty}</p>
            </div>
          ))}
        </div>
      </div>

      
    </div>
  );
};

export default Incidents;