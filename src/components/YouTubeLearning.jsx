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
    <div className="flex flex-col min-h-screen font-sans bg-gradient-to-br from-blue-600 to-green-500 text-center">
      <div className="p-5">
        <input
          type="text"
          placeholder="Search For Videos..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="w-72 p-2 text-lg border border-gray-300 rounded-md focus:outline-none"
        />
      </div>
      <div className="flex flex-col justify-center items-center flex-1 p-5">
        <div className="flex flex-wrap justify-center gap-6 w-full max-w-6xl">
          {videos.map((video) => (
            <div
              key={video.id.videoId}
              onClick={() => handleVideoSelect(video.id.videoId)}
              className="w-full sm:w-1/2 cursor-pointer"
            >
              <img
                src={video.snippet.thumbnails.medium.url}
                alt={video.snippet.title}
                className="w-full rounded-lg"
              />
              <div className="mt-2">
                <h3 className="text-lg font-bold text-white">
                  {video.snippet.title}
                </h3>
                <p className="text-sm text-gray-200">
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
