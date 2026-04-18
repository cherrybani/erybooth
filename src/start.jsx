import React, { useState, useEffect } from "react";
import backgroundImage from "./assets/background.png";
import { useNavigate } from "react-router-dom";
import "./start.css";

export default function Start() {
  const navigate = useNavigate();
  const [layout, setLayout] = useState(1);

  const handleLanjut = () => {
    navigate("/camera", {
      state: { chosenLayout: layout }
    });
  };

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

      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-xxxx"
        data-ad-slot="1234567890"
        data-ad-format="auto"
      ></ins>

      <div className="content">
        <h1 className="title">Pilih Frame</h1>
        <p>Pick your favorite layout to start the magic.</p>

        <div className="frame-list">
          {[1, 2, 3, 4].map((num) => (
            <div
              key={num}
              className={`frame-option layout-${num} ${
                layout === num ? "selected" : ""
              }`}
              onClick={() => setLayout(num)}
            >
              {Array.from({ length: num }).map((_, i) => (
                <div className="slot" key={i}></div>
              ))}
            </div>
          ))}
        </div>

        <button className="next-btn" onClick={handleLanjut}>
          Lanjut
        </button>
      </div>
    </div>
  );
}