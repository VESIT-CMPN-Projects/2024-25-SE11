// import React, { useEffect, useState } from "react";
// import "../styles.css";
// import axios from "axios";
// import { useParams } from "react-router-dom";

// const PostDetails = () => {
//   const { postId } = useParams();
//   const [post, setPost] = useState(null);
//   const [comment, setComment] = useState("");

//   useEffect(() => {
//     axios.get(`http://localhost:5000/api/community/posts/${postId}`).then((res) => setPost(res.data));
//   }, [postId]);

//   const handleCommentSubmit = async (e) => {
//     e.preventDefault();
//     await axios.post(`http://localhost:5000/api/community/comment/${postId}`, { text: comment }, { withCredentials: true });
//     setComment("");
//     window.location.reload();
//   };

//   return (
//     <div>
//       {post ? (
//         <>
//           <h2>{post.title}</h2>
//           <p>{post.content}</p>
//           <p>By: {post.author?.name || "Anonymous"}</p>
//           <h3>Comments</h3>
//           {post.comments.map((c) => (
//             <p key={c._id}>{c.text} - <b>{c.author?.name || "Anonymous"}</b></p>
//           ))}
//           <form onSubmit={handleCommentSubmit}>
//             <input type="text" value={comment} onChange={(e) => setComment(e.target.value)} required />
//             <button type="submit">Add Comment</button>
//           </form>
//         </>
//       ) : <p>Loading...</p>}
//     </div>
//   );
// };

// export default PostDetails;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../styles.css';

const PostDetail = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchPostAndComments = async () => {
    try {
      setLoading(true);
      const [postRes, commentsRes] = await Promise.all([
        axios.get(`http://localhost:3001/api/community/posts/${postId}`),
        axios.get(`http://localhost:3001/api/community/posts/${postId}/comments`)
      ]);
      
      setPost(postRes.data);
      setComments(commentsRes.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to load post');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPostAndComments();
  }, [postId]);

  const handleCommentSubmit = async (commentText) => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.post(
        `http://localhost:3001/api/community/posts/${postId}/comments`,
        { text: commentText },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      // Update both comments list and post comment count
      setComments([res.data, ...comments]);
      setPost(prev => ({
        ...prev,
        comments: [res.data._id, ...prev.comments]
      }));
    } catch (err) {
      setError('Failed to post comment');
    }
  };

  if (loading) return <div className="loading-spinner"></div>;
  if (error) return <div className="error-message">{error}</div>;
  if (!post) return <div>Post not found</div>;

  return (
    <div className="post-detail-container">
      <article className="post-content">
        <h1>{post.title}</h1>
        <div className="post-meta">
          <span>Posted by {post.author?.name || 'Anonymous'}</span>
          <span>{new Date(post.createdAt).toLocaleDateString()}</span>
        </div>
        <p>{post.content}</p>
      </article>

      <div className="comment-section">
        <h3>Comments ({post.comments?.length || 0})</h3>
        
        <CommentForm onSubmit={handleCommentSubmit} />
        
        {comments.length > 0 ? (
          <div className="comments-list">
            {comments.map(comment => (
              <CommentItem key={comment._id} comment={comment} />
            ))}
          </div>
        ) : (
          <p className="no-comments">No comments yet. Be the first to comment!</p>
        )}
      </div>
    </div>
  );
};

const CommentForm = ({ onSubmit }) => {
  const [commentText, setCommentText] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    
    setSubmitting(true);
    try {
      await onSubmit(commentText);
      setCommentText('');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="comment-form">
      <textarea
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
        placeholder="Write your comment..."
        disabled={submitting}
      />
      <button type="submit" disabled={submitting}>
        {submitting ? 'Posting...' : 'Post Comment'}
      </button>
    </form>
  );
};

const CommentItem = ({ comment }) => (
  <div className="comment">
    <div className="comment-header">
      <strong>{comment.author?.name || 'Anonymous'}</strong>
      <span>{new Date(comment.createdAt).toLocaleString()}</span>
    </div>
    <p>{comment.text}</p>
  </div>
);

export default PostDetail;