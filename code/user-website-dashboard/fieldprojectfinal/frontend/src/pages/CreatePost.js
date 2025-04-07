// CreatePost.js
import "../styles.css";
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const token = localStorage.getItem('token');
      
      // Make the actual API call
      const response = await axios.post(
        'http://localhost:3001/api/community/create',
        { title, content },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      // Redirect to community page and force refresh
      navigate('/community', { state: { refresh: true } });
      
    } catch (err) {
      console.error('Post creation error:', err);
      setError(err.response?.data?.error || 'Failed to create post. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return (
    <div style={{ textAlign: 'center', padding: '40px' }}>
      <p>Creating your post...</p>
    </div>
  );

  return (
    <div style={{
      maxWidth: '600px',
      margin: '20px auto',
      padding: '20px',
      border: '1px solid #ccc',
      borderRadius: '5px',
      backgroundColor: '#fff'
    }}>
      <h2 style={{ color: '#333', marginBottom: '20px' }}>Create New Post</h2>
      
      {error && (
        <div style={{
          color: '#d32f2f',
          backgroundColor: '#ffebee',
          padding: '10px',
          borderRadius: '4px',
          marginBottom: '20px'
        }}>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '20px' }}>
          <label style={{ 
            display: 'block', 
            marginBottom: '8px', 
            fontWeight: '500',
            color: '#555'
          }}>
            Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{ 
              width: '100%', 
              padding: '10px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              fontSize: '16px'
            }}
            required
            disabled={loading}
          />
        </div>

        <div style={{ marginBottom: '25px' }}>
          <label style={{ 
            display: 'block', 
            marginBottom: '8px', 
            fontWeight: '500',
            color: '#555'
          }}>
            Content
          </label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            style={{ 
              width: '100%', 
              padding: '10px',
              minHeight: '150px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              fontSize: '16px',
              lineHeight: '1.5'
            }}
            required
            disabled={loading}
          />
        </div>

        <button 
          type="submit"
          disabled={loading}
          style={{
            padding: '12px 24px',
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '16px',
            fontWeight: '500',
            transition: 'background-color 0.3s',
            opacity: loading ? 0.7 : 1
          }}
        >
          {loading ? 'Creating...' : 'Publish Post'}
        </button>
      </form>
    </div>
  );
};

export default CreatePost;