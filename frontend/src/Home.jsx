
import React, { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { Heart } from 'reicon-react';
import { History } from 'reicon-react';
import HistoryPage from "./HistoryPage";


const Home = () => {
  const [query, setQuery] = useState("");
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [username , setusername] = useState("")
  const [ishistory , setIshistory] = useState(false)
  
 async function getname() {
    const user = await axios.get("http://localhost:3000/api/auth/getuser" ,  {
                withCredentials: true
            });
   setusername(user.data.user.name)
 }

 useEffect(()=>{
    getname()
 } , [])
 

  async function handleSearch(e) {
    e.preventDefault();

    try {
        setLoading(true)
        const response = await axios.get(
            "http://localhost:3000/api/auth/search",
            {
                params: {
                    query: query,
                    page: 1
                },
                withCredentials: true
            }
        );

        setImages(response.data.image);

    } catch (error) {
        console.log(error.response?.status);
        console.log(error.response?.data);
    }finally{
        setLoading(false)
    }
}
  return (
    <div className="home-container">

      {/* Sidebar */}
      <aside className="sidebar">
        <h2 className="logo">PixelSearch.</h2>

        <div className="user-profile">
          <div className="user-avatar">
            {username.charAt(0).toUpperCase()}
          </div>

          <div>
            <h3>{username}</h3>
            <p>Welcome back!</p>
          </div>
         
        </div>
         <div className="likecon">
            <Heart className = "like" size={24} weight="Filled" /> <p>Likes</p>
          </div>
           <div className="likecon" onClick={()=>{
            setIshistory(true)
           }}>
           <History className="his" size={24}  />
 <p>History</p> 
          </div>
      </aside>

      {/* Main Content */}
      <main className="main-content">

        {/* Top Search Bar */}
        <header className="top-header">
          <form className="search-form" onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Search for images..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />

            <button type="submit" disabled={loading}>
              {loading ? "Searching..." : "Search"}
            </button>
          </form>
        </header>

        {/* Image Section */}
        { ishistory ? <HistoryPage/>:<section className="image-section">

          {!loading && images.length === 0 && !error && (
            <div className="empty-state">
              <h2>Discover something beautiful.</h2>
              <p>Search for images to get started.</p>
            </div>
          )}

          {loading && (
            <div className="loading">
              <div className="spinner"></div>
              <p>Finding amazing images...</p>
            </div>
          )}

          {error && <p className="error-message">{error}</p>}

          {!loading && images.length > 0 && (
            <div className="image-grid">
              {images.map((image) => (
                <div className="image-card" key={image.id}>
                  <img
                    src={image.urls.raw}
                    alt={image.description || "Search result"}
                  />

                  <div className="image-info">
                    <p>
                      {image.description || "Beautiful image"}
                    </p>

                    <span>
                      Photo by {image.photographer || "Unknown"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}

        </section>}
      </main>
    </div>
  );
};

export default Home;
