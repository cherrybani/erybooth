<<<<<<< HEAD
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Moveable from "react-moveable";
import html2canvas from "html2canvas";
import backgroundImage from "./assets/background.png";
import "./design.css";

const CATEGORIES = [
  { key: "colors", label: "color" },
  { key: "characters", label: "Character" },
  { key: "textures", label: "Tekstur" },
];

const stickerModules = import.meta.glob(
  "./assets/stickers/*.{png,jpg,jpeg,webp}",
  { eager: true }
);

const characterItems = Object.values(stickerModules).map((mod, index) => ({
  id: index + 1,
  image: mod.default,
}));

const SELECTION_ITEMS = {
  colors: [
    "#ffb3ba",
    "#baffc9",
    "#bae1ff",
    "#ffffba",
    "#ffdfba",
    "#e0bbe4",
    "#d4a373",
    "#ffffff",
  ],
  characters: characterItems,
  textures: ["Coming Soon!"],
};

export default function Design() {
  const navigate = useNavigate();
  const location = useLocation();

  const [selectedId, setSelectedId] = useState(null);
  const [activeCategory, setActiveCategory] = useState("characters");
  const [activeFrameColor, setActiveFrameColor] = useState("#ffffff");
  const [stickers, setStickers] = useState([]);

  const layoutCount = location.state?.chosenLayout || 1;
  const photos = location.state?.photos || [];

  const addSticker = (image) => {
    setStickers((prev) => [
      ...prev,
      {
        id: Date.now(),
        emoji: image,
        x: 20,
        y: 20,
        width: 80,
        height: 80,
        rotate: 0,
      },
    ]);
  };

  const handleSave = async () => {
  const target = document.querySelector(".frame-wrapper");

  const canvas = await html2canvas(target, {
    backgroundColor: null,
    useCORS: true
  });

  const link = document.createElement("a");
  link.download = "photobooth.png";
  link.href = canvas.toDataURL("image/png");
  link.click();
};

  return (
    <div
      className="design-container"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="decoration-card">
        <h1 className="title">DECORATIONS TIME</h1>

        <div className="main-layout">
          {/* LEFT */}
          <div className="preview-panel">
            <div
              className={`frame-wrapper layout-${layoutCount}`}
              style={{ backgroundColor: activeFrameColor }}
            >
              {/* PHOTO SLOT */}
              {Array.from({ length: layoutCount }).map((_, index) => (
                <div className="photo-slot" key={index}>
                  {photos[index] && (
                    <img src={photos[index]} alt={`photo-${index}`} />
                  )}
                </div>
              ))}

              {/* STICKERS */}
              {stickers.map((s) => (
                <div
                  key={s.id}
                  id={`sticker-${s.id}`}
                  className="sticker-item"
                  onClick={() => setSelectedId(s.id)}
                  onDoubleClick={() =>
                    setStickers((prev) =>
                      prev.filter((item) => item.id !== s.id)
                    )
                  }
                  style={{
                    left: s.x,
                    top: s.y,
                    width: s.width,
                    height: s.height,
                    transform: `rotate(${s.rotate}deg)`,
                  }}
                >
                  <img src={s.emoji} alt="" className="sticker-img" />
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT */}
          <div className="selection-panel">
            <div className="tab-bar">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.key}
                  className={`tab-btn ${
                    activeCategory === cat.key ? "active" : ""
                  }`}
                  onClick={() => setActiveCategory(cat.key)}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            <div className="grid-content">
              {SELECTION_ITEMS[activeCategory].map((item, index) => (
                <div
                  key={`${activeCategory}-${index}`}
                  className="grid-item"
                  onClick={() => {
                    if (activeCategory === "colors") {
                      setActiveFrameColor(item);
                    }

                    if (activeCategory === "characters") {
                      addSticker(item.image);
                    }
                  }}
                  style={{
                    backgroundColor:
                      activeCategory === "colors" ? item : "#ffffff",
                  }}
                >
                  {activeCategory === "characters" && (
                    <img
                      src={item.image}
                      alt=""
                      className="character-thumb"
                    />
                  )}

                  {activeCategory === "textures" && item}
                </div>
              ))}
            </div>
          </div>
        </div>

        <Moveable
          target={
            selectedId
              ? document.getElementById(`sticker-${selectedId}`)
              : null
          }
          draggable
          resizable
          rotatable
          onDrag={({ left, top }) => {
            setStickers((prev) =>
              prev.map((s) =>
                s.id === selectedId ? { ...s, x: left, y: top } : s
              )
            );
          }}
          onResize={({ width, height }) => {
            setStickers((prev) =>
              prev.map((s) =>
                s.id === selectedId
                  ? { ...s, width, height }
                  : s
              )
            );
          }}
          onRotate={({ beforeRotate }) => {
            setStickers((prev) =>
              prev.map((s) =>
                s.id === selectedId
                  ? { ...s, rotate: beforeRotate }
                  : s
              )
            );
          }}
        />

        <div className="footer-actions">
          <button className="save-btn" onClick={handleSave}>
            save
          </button>
          <button
            className="delete-btn"
            onClick={() => setStickers([])}
          >
            🗑️
          </button>
        </div>
      </div>
    </div>
  );
=======
import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { supabase } from './supabaseClient';
import background from './assets/bg.png'
import Modal from './modal';
import './design.css';

export default function Design() {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    async function fetchProjects() {
            let { data, error } = await supabase
            .from('projects')
            .select('*')
              .eq('category', 'design');

            console.log('DATA:', data)
            console.log('ERROR:', error)

      if (error) console.log(error);
      else setProjects(data);
    }
    fetchProjects();
  }, []);

  return (
    <div
      className="home-bg"
      style={{ backgroundImage: `url(${background})` }}>
      <div className="frame">
        <nav className="header">
          <h2>Cherry</h2>
          <div className="nav-menu">
            <Link to="/">Home</Link>
            <Link to="/project">Project</Link>
            <Link to="/design">Design</Link>
            <span 
            className="nav-item-contact" 
            onClick={() => setIsContactOpen(true)}
            style={{ cursor: 'pointer', color: 'white', fontSize: '16px', fontWeight: '500',marginLeft: '20px' }} 
            >
            Contact
            </span>
          </div>
        </nav>


      <div className="project-grid">
        {projects.map((item) => (
          <div className="project-card" key={item.id}>
           <div className="image-wrapper">
            <img src={item.image_url} alt={item.title} />
           </div>
          <div className="card-info">
            <span className="category">{item.category}</span>
            <h3>{item.title}</h3>
            <a href={item.link} target="_blank" rel="noreferrer" className="btn">
              Lihat Detail
            </a>
           </div>
         </div>
       ))}
      </div>

    <Modal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} title="Contact Me">
  <div className="contact-list">
    <p>
      <a href="mailto:banicherry.wrk@gmail.com" target="_blank" rel="noreferrer" className="contact-link">
        <i className="fa fa-envelope-o" aria-hidden="true"></i>
        <span>Email</span> 
      </a>
    </p>

    <p>
      <a href="https://wa.me/085188661193" target="_blank" rel="noreferrer" className='contact-link'>
      <i className='fa fa-phone' aria-hidden="true"></i>  
      <span>Phone</span>
      </a>
    </p>

    <p>
      <a href="https://instagram.com/rybaniism" target="_blank" rel="noreferrer" className="contact-link">
        <i className="fa fa-instagram" aria-hidden="true"></i>
        <span>Instagram</span>
      </a>
    </p>

    <p>
      <a href="https://linkedin.com/in/cherry-geva-raya-rabbani" target="_blank" rel="noreferrer" className="contact-link">
        <i className="fa fa-linkedin-square" aria-hidden="true"></i>
        <span>Linkdln</span>
      </a>
    </p>
  </div>
  </Modal>
      </div> {/* Tutup div frame */}
    </div> /* Tutup div home-bg */
  );
>>>>>>> 70a71424ea950b6a4167eb967ebe60411b7c2703
}