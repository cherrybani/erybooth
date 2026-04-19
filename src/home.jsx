import React, { useEffect } from "react";
import backgroundImage from "./assets/background.png";
import { Link } from "react-router-dom";
import "./home.css";

export default function Home() {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {}
  }, []);

  return (
    <div
      className="home-container"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="overlay"></div>

      <div className="content">
        <h1>Welcome to EryBooth</h1>

        <p>
          Frame your story. Cherish the moment. Let's make some memories at
          EryBooth.
        </p>

        <h5>
          ⚠️ <strong>Disclaimer:</strong> Some assets are copyrighted by{" "}
          <strong>HYBE/SM Ent.</strong> and <strong>Canva</strong>. For personal
          use only.
        </h5>

        {/* IKLAN */}
        <div style={{ margin: "20px 0" }}>
          <ins
            className="adsbygoogle"
            style={{ display: "block" }}
            data-ad-client="ca-pub-xxxx"
            data-ad-slot="1234567890"
            data-ad-format="auto"
          ></ins>
        </div>

        <div className="container-tombol">
          <Link to="/start" className="pixel-btn">
            Start
          </Link>
        </div>
      </div>
    </div>
  );
}