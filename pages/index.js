import React, { useState } from "react";
import axios from "axios";

const Home = () => {
  const [url, setUrl] = useState("");
  const [keywords, setKeywords] = useState([]);
  const [adsCopy, setAdsCopy] = useState("");

  const handleUrlChange = (event) => {
    setUrl(event.target.value);
  };

  const handleScrape = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post("/api/scrape", { url });
      const { keywords, adsCopy } = response.data;

      setKeywords(keywords || []);
      setAdsCopy(adsCopy || "");
    } catch (error) {
      console.error("Error scraping website:", error);
      // Handle errors, e.g., show an error message to the user
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="bg-white p-8 shadow-md rounded-md w-96 text-center mb-8">
        <h1 className="text-3xl font-bold mb-4">Web Scraper</h1>
        <form onSubmit={handleScrape} className="mb-4">
          <label className="flex flex-col items-center">
            <span className="text-lg mb-2">Enter URL:</span>
            <input
              type="text"
              value={url}
              onChange={handleUrlChange}
              className="border border-gray-400 px-4 py-2 rounded focus:outline-none focus:border-blue-500"
            />
          </label>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 focus:outline-none focus:ring focus:border-blue-300 mt-4"
          >
            Scrape
          </button>
        </form>
      </div>

      <div className="flex flex-col items-center">
        <div className="bg-blue-500 text-white p-4 rounded-md shadow-md mb-4">
          <h2 className="text-2xl font-bold mb-2">Keywords:</h2>
          <ul className="list-disc list-inside">
            {keywords.map((keyword, index) => (
              <li key={index} className="mb-1">
                {keyword.trim()}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white p-4 rounded-md shadow-md">
          <h2 className="text-2xl font-bold mb-2">Ads Copy:</h2>
          <p className="text-gray-700">{adsCopy}</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
