import React, { useState } from 'react';
import axios from 'axios';
import "../styles.css";
const CommentSection = ({ postId, initialComments }) => {
  const [comments, setComments] = useState(initialComments || []);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const res = await axios.post(
        `http://localhost:3001/api/community/posts/${postId}/comments`,
        { text: newComment },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      
      setComments([res.data, ...comments]);
      setNewComment('');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to post comment');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="comment-section">
      <h3>Comments ({comments.length})</h3>
      
      <form onSubmit={handleSubmit} className="comment-form">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Write your comment..."
          disabled={loading}
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Posting...' : 'Post Comment'}
        </button>
      </form>

      {error && <div className="error">{error}</div>}

      <div className="comments-list">
        {comments.map(comment => (
          <div key={comment._id} className="comment">
            <div className="comment-header">
              <strong>{comment.author?.name || 'Anonymous'}</strong>
              <span>{new Date(comment.createdAt).toLocaleString()}</span>
            </div>
            <p>{comment.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentSection;