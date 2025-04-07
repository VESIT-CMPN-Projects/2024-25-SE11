// // import React from "react";
// // import { useNavigate } from "react-router-dom";

// // const Community = () => {
// //   const navigate = useNavigate();

// //   // Check if user is authenticated
// //   const isAuthenticated = localStorage.getItem("isAuthenticated");

// //   if (!isAuthenticated) {
// //     navigate("/login"); // Redirect to login page if not authenticated
// //     return null;
// //   }

// //   return (
// //     <div className="community-container">
// //       <h2>Welcome to the Community Page</h2>
// //       <p>Discuss fire safety topics, share experiences, and connect with others.</p>
// //     </div>
// //   );
// // };

// // export default Community;
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import "../styles.css";
// import { Link, useNavigate } from "react-router-dom";

// const Community = () => {
//   const [posts, setPosts] = useState([]);
//   const [pagination, setPagination] = useState({
//     page: 1,
//     total: 0,
//     pages: 0
//   });
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchPosts = async () => {
//       try {
//         const response = await axios.get("http://localhost:5000/api/community/posts");
//         setPosts(response.data.posts || []);
//         setPagination({
//           page: response.data.page,
//           total: response.data.total,
//           pages: response.data.pages
//         });
//       } catch (err) {
//         setError(err.response?.data?.error || "Error fetching posts");
//         setPosts([]);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchPosts();
//   }, []);

//   const handleCreatePost = () => {
//     navigate("/community/create");
//   };

//   if (loading) return <div className="loading-spinner"></div>;
//   if (error) return <div className="error-message">{error}</div>;

//   return (
//     <div className="community-container">
//       <div className="community-header">
//         <h2>Community Posts</h2>
//         <button onClick={handleCreatePost} className="create-post-btn">
//           + Create Post
//         </button>
//       </div>

//       <div className="pagination-info">
//         Showing {posts.length} of {pagination.total} posts
//       </div>

//       <div className="posts-grid">
//         {posts.length === 0 ? (
//           <div className="no-posts">
//             <p>No posts yet. Be the first to share!</p>
//             <button onClick={handleCreatePost} className="create-post-btn">
//               Create First Post
//             </button>
//           </div>
//         ) : (
//           posts.map((post) => (
//             <div key={post._id} className="post-card">
//               <div className="post-header">
//                 <h3>{post.title}</h3>
//                 <span className="post-author">
//                   <i className="fas fa-user"></i> {post.author?.name || "Anonymous"}
//                 </span>
//               </div>
//               <div className="post-content">
//                 <p>{post.content}</p>
//               </div>
//               <div className="post-footer">
//                 <Link to={`/community/posts/${post._id}`} className="view-post-btn">
//                   <i className="fas fa-eye"></i> View Post
//                 </Link>
//                 <span className="post-date">
//                   {new Date(post.createdAt).toLocaleDateString()}
//                 </span>
//               </div>
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// };

// export default Community;
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "../styles.css";

const Community = () => {
  const [posts, setPosts] = useState([]);
  const [pagination, setPagination] = useState({
    page: 1,
    total: 0,
    pages: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const fetchPosts = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3001/api/community/posts",
        {
          params: {
            page: pagination.page,
            limit: 10
          }
        }
      );
      
      setPosts(response.data.posts || []);
      setPagination({
        page: response.data.page,
        total: response.data.total,
        pages: response.data.pages
      });
    } catch (err) {
      setError(err.response?.data?.error || "Error fetching posts");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Refresh if coming from post creation
    if (location.state?.refresh) {
      setPosts([]);
      setPagination(prev => ({ ...prev, page: 1 }));
    }
    fetchPosts();
  }, [pagination.page, location.state]);

  const handleCreatePost = () => {
    navigate("/community/create");
  };

  const handlePageChange = (newPage) => {
    setPagination(prev => ({ ...prev, page: newPage }));
  };

  if (loading && posts.length === 0) return <div className="loading-spinner"></div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="community-container">
      <div className="community-header">
        <h2>Community Posts</h2>
        <button onClick={handleCreatePost} className="create-post-btn">
          + Create Post
        </button>
      </div>

      <div className="pagination-info">
        Showing {posts.length} of {pagination.total} posts • Page {pagination.page} of {pagination.pages}
      </div>

      <div className="posts-grid">
        {posts.length === 0 ? (
          <div className="no-posts">
            <p>No posts yet. Be the first to share!</p>
            <button onClick={handleCreatePost} className="create-post-btn">
              Create First Post
            </button>
          </div>
        ) : (
          posts.map((post) => (
            <div key={post._id} className="post-card">
              <div className="post-header">
                <h3>{post.title}</h3>
                <span className="post-author">
                  <i className="fas fa-user"></i> {post.author?.name || "Anonymous"}
                </span>
              </div>
              <div className="post-content">
                <p>{post.content.length > 150 ? `${post.content.substring(0, 150)}...` : post.content}</p>
              </div>
              <div className="post-footer">
                <div className="post-meta">
                  <span className="comment-count">
                    <i className="fas fa-comment"></i> {post.comments?.length || 0} comments
                  </span>
                  <span className="post-date">
                    {new Date(post.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <Link 
                  to={`/community/posts/${post._id}`} 
                  className="view-post-btn"
                  state={{ fromList: true }}
                >
                  <i className="fas fa-eye"></i> View Post
                </Link>
              </div>
            </div>
          ))
        )}
      </div>

      {pagination.pages > 1 && (
        <div className="pagination-controls">
          <button
            onClick={() => handlePageChange(pagination.page - 1)}
            disabled={pagination.page === 1}
          >
            Previous
          </button>
          <span>
            Page {pagination.page} of {pagination.pages}
          </span>
          <button
            onClick={() => handlePageChange(pagination.page + 1)}
            disabled={pagination.page === pagination.pages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Community;