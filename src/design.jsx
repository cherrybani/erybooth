import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Moveable from "react-moveable";
import html2canvas from "html2canvas";
import backgroundImage from "./assets/background.png";
import "./design.css";

const CATEGORIES = [
  { key: "colors", label: "color" },
  { key: "characters", label: "Character" },
  { key: "background", label: "Background" },
];

const stickerModules = import.meta.glob(
  "./assets/stickers/*.{png,jpg,jpeg,webp}",
  { eager: true }
);

const stripModules = import.meta.glob(
  "./assets/background/**/*.{png,jpg,jpeg,webp}",
  { eager: true }
);

const characterItems = Object.values(stickerModules).map((mod, index) => ({
  id: index + 1,
  image: mod.default,
}));

export default function Design() {
  const navigate = useNavigate();
  const location = useLocation();

  const [selectedId, setSelectedId] = useState(null);
  const [activeCategory, setActiveCategory] = useState("characters");
  const [activeFrameColor, setActiveFrameColor] = useState("#ffffff");
  const [activeStripBg, setActiveStripBg] = useState("");
  const [stickers, setStickers] = useState([]);

  const layoutCount = location.state?.chosenLayout || 1;
  const photos = location.state?.photos || [];

  const stripItems = Object.entries(stripModules)
    .filter(([path]) => path.includes(`${layoutCount}-box/`))
    .map(([path, mod], index) => ({
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
    background: stripItems,
  };

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
      useCORS: true,
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
              style={{
                backgroundColor: activeFrameColor,
              }}
            >
              {activeStripBg && (
                <img src={activeStripBg} alt="" className="strip-bg" />
            )}

            <div className="watermark">Erybooth</div>

              {Array.from({ length: layoutCount }).map((_, index) => (
                <div className="photo-slot" key={index}>
                  {photos[index] && (
                    <img src={photos[index]} alt={`photo-${index}`} />
                  )}
                </div>
              ))}

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
                      setActiveStripBg("");
                    }

                    if (activeCategory === "characters") {
                      addSticker(item.image);
                    }

                    if (activeCategory === "background") {
                      setActiveStripBg(item.image);
                    }
                  }}
                  style={{
                    backgroundColor:
                      activeCategory === "colors" ? item : "#ffffff",
                  }}
                >
                  {(activeCategory === "characters" ||
                    activeCategory === "background") && (
                    <img
                      src={item.image}
                      alt=""
                      className="character-thumb"
                    />
                  )}
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
                s.id === selectedId ? { ...s, width, height } : s
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
}