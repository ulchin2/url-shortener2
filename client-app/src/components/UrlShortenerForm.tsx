import React, { useState } from "react";
import "../components/urlShortenerForm.css";

const UrlShortenerForm: React.FC = () => {
  const [fullUrl, setFullUrl] = useState<string>("");
  const [shortUrl, setShortUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await fetch("http://localhost:5001/api/shortUrl", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ fullUrl }),
      });

      if (response.ok) {
        const data = await response.json();
        setShortUrl(data.shortUrl);
      } else {
        const err = await response.json();
        setError(err.message || "Something went wrong!");
      }
    } catch (err) {
      setError("Failed to connect to the server.");
    }
  };

  return (
    <div className="container">
      <h1 className="title">Encurtador de link</h1>
      <form className="form" onSubmit={handleSubmit}>
        <label className="label">
          URL Completa:
          <input
            className="input"
            type="text"
            value={fullUrl}
            onChange={(e) => setFullUrl(e.target.value)}
            placeholder="Coloque aqui o link para ser Encurtado"
            required
          />
        </label>
        <button className="button" type="submit">
          Shorten URL
        </button>
      </form>

      {shortUrl && (
  <div className="shortUrlContainer">
    <h2>Link Encurtado:</h2>
    <a
      href={`http://localhost:5001/api/shortUrl/${shortUrl}`}
      target="_blank"
      rel="noopener noreferrer"
      className="shortUrlLink"
    >
      {`http://localhost:5001/api/shortUrl/${shortUrl}`}
    </a>
  </div>
)}

      {error && (
        <div className={`message error`}>
          <p>{error}</p>
        </div>
      )}
    </div>
  );
};

export default UrlShortenerForm;
