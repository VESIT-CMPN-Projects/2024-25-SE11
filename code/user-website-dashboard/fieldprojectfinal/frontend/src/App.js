// import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Incidents from "./pages/Incidents";
import Drills from "./pages/Drills";
import SafetyMeasures from "./pages/SafetyMeasures";
import Login from "./components/Login";
import Community from "./pages/Community";
import PostDetails from "./pages/PostDetails";
import CreatePost from "./pages/CreatePost";
import CommentSection from "./pages/CommentSection";
import Safety from "./pages/Safety";

// Private Route Component
const PrivateRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem("token");
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/incidents" element={<Incidents />} />
        <Route path="/safety" element={<Safety />} />
        <Route path="/drills" element={<Drills />} />
        <Route path="/community/create" element={<CreatePost />} />
        <Route path="/community/posts/:postId" element={<PostDetails />} />
        <Route path="/posts/:postId/comments" element={<CommentSection />} />
        <Route path="/safety-measures" element={<SafetyMeasures />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/community"
          element={
            <PrivateRoute>
              <Community />
            </PrivateRoute>
          }
        />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;