import React, { useState, useEffect } from "react";
import axios from "axios";

const YouTubeLearning = () => {
  const [videos, setVideos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    if (!isSearching) {
      fetchRandomVideos();
    }
  }, [isSearching]);

  const fetchRandomVideos = async () => {
    try {
      const response = await axios.get(
        "https://www.googleapis.com/youtube/v3/search",
        {
          params: {
            channelId: "UC8butISFwT-Wl7EV0hUK0BQ",
            part: "snippet",
            maxResults: 5,
            type: "video",
            order: "date",
            key: "AIzaSyD6NwpraXG-ab1AbSttAHu0HcwocyHFfuE",
          },
        }
      );
      setVideos(response.data.items);
    } catch (error) {
      console.error("Error Fetching Random Videos : ", error);
    }
  };

  const fetchVideosBySearch = async (term) => {
    try {
      const response = await axios.get(
        "https://www.googleapis.com/youtube/v3/search",
        {
          params: {
            q: term,
            channelId: "UC8butISFwT-Wl7EV0hUK0BQ",
            part: "snippet",
            maxResults: 10,
            type: "video",
            key: "AIzaSyD6NwpraXG-ab1AbSttAHu0HcwocyHFfuE",
          },
        }
      );
      setVideos(response.data.items);
    } catch (error) {
      console.error("Error Fetching Videos :", error);
    }
  };

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    if (term.trim()) {
      setIsSearching(true);
      fetchVideosBySearch(term);
    } else {
      setIsSearching(false);
    }
  };

  const handleVideoSelect = (videoId) => {
    window.open(`https://www.youtube.com/watch?v=${videoId}`, "_blank");
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        fontFamily: "Poppins",
        backgroundImage: "linear-gradient(to bottom right, #4F44E0, #32B67A)",
        textAlign: "center",
      }}
    >
      <div style={{ padding: "20px" }}>
        <input
          type="text"
          placeholder="Search For Videos..."
          value={searchTerm}
          onChange={handleSearchChange}
          style={{
            width: "300px",
            padding: "10px",
            fontSize: "16px",
            border: "1px solid #ccc",
            borderRadius: "5px",
            marginBottom: "10px",
          }}
        />
      </div>
      <div
        style={{
          flex: "1",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "20px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: "20px",
            width: "100%",
            maxWidth: "1200px",
          }}
        >
          {videos.map((video) => (
            <div
              key={video.id.videoId}
              style={{
                width: "calc(50% - 10px)",
                margin: "0 5px 20px",
                cursor: "pointer",
              }}
              onClick={() => handleVideoSelect(video.id.videoId)}
            >
              <img
                src={video.snippet.thumbnails.medium.url}
                alt={video.snippet.title}
                style={{
                  width: "100%",
                  height: "auto",
                  borderRadius: "5px",
                }}
              />
              <div style={{ padding: "10px 0" }}>
                <h3 style={{ margin: "0", fontSize: "18px" }}>
                  {video.snippet.title}
                </h3>
                <p style={{ margin: "5px 0", fontSize: "14px", color: "#fff" }}>
                  {video.snippet.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default YouTubeLearning;
