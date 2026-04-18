import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import backgroundImage from './assets/background.png';
import './camera.css';

export default function Camera() {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const navigate = useNavigate();
    const location = useLocation();

    const layoutCount = location.state?.chosenLayout || 1;
    console.log("STATE:", location.state);
    console.log("LAYOUT:", layoutCount);

    const [photos, setPhotos] = useState(Array(layoutCount).fill(null));
    const [activeSlot, setActiveSlot] = useState(0);
    const [isCameraStarted, setIsCameraStarted] = useState(false);

    const startCamera = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            videoRef.current.srcObject = stream;
            await videoRef.current.play();
            setIsCameraStarted(true);
        } catch (err) {
            console.error(err);
            alert("Izin kamera ditolak atau error.");
        }
    };

    useEffect(() => {
        return () => {
            if (videoRef.current?.srcObject) {
                videoRef.current.srcObject.getTracks().forEach(track => track.stop());
            }
        };
    }, []);

    const capturePhoto = () => {
        if (!isCameraStarted) {
            alert("Nyalain kamera dulu.");
            return;
        }

        const context = canvasRef.current.getContext('2d');
        context.drawImage(videoRef.current, 0, 0, 640, 480);

        const dataUrl = canvasRef.current.toDataURL('image/png');

        const newPhotos = [...photos];
        newPhotos[activeSlot] = dataUrl;
        setPhotos(newPhotos);

        if (activeSlot < layoutCount - 1) {
            setActiveSlot(activeSlot + 1);
        }
    };

    const handleUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
    alert("File harus gambar.");
    return;
    }

    const reader = new FileReader();

    reader.onload = () => {
        const dataUrl = reader.result;

        const newPhotos = [...photos];
        newPhotos[activeSlot] = dataUrl;
        setPhotos(newPhotos);
        e.target.value = "";

        if (activeSlot < layoutCount - 1) {
            setActiveSlot(activeSlot + 1);
        }
    };

    reader.readAsDataURL(file);
    };

    const resetPhotos = () => {
        setPhotos(Array(layoutCount).fill(null));
        setActiveSlot(0);
    };

    const handleFinish = () => {
        const filledPhotos = photos.filter(p => p !== null);

        if (filledPhotos.length === layoutCount) {
            navigate('/design', {
                state: {
                    photos,
                    chosenLayout: layoutCount
                }
            });
        } else {
            alert(`Foto belum lengkap. Butuh ${layoutCount} foto.`);
        }
    };

    return (
        <div className="booth-container" style={{ backgroundImage: `url(${backgroundImage})` }}>
            <div className="glass-card">
                
                {/* 1. AREA PREVIEW VIDEO / KAMERA */}
                <div className="camera-view">
                    <video ref={videoRef} className="video-feed" playsInline></video>
                    {/* Canvas disembunyikan, cuma buat proses capture */}
                    <canvas ref={canvasRef} width="640" height="480" style={{ display: 'none' }}></canvas>
                    
                    {/* Placeholder kalau kamera belum nyala */}
                    {!isCameraStarted && (
                        <div className="video-placeholder" onClick={startCamera}>
                            <span>Click to Start Camera</span>
                        </div>
                    )}
                </div>

                {/* 2. AREA SLOT FOTO (STRIP FOTO) */}
                <div className="photos-strip">
                    <div className="strip-header">
                        <span>YOUR PHOTOS</span>
                        <span>{photos.filter(p => p !== null).length}</span>
                    </div>
                    <div className="slots-container">
                        {photos.map((p, index) => (
                            <div 
                                key={index} 
                                className={`photo-slot ${activeSlot === index ? 'active' : ''}`}
                                onClick={() => setActiveSlot(index)} // Klik manual untuk pilih kotak
                            >
                                {p ? <img src={p} alt={`Hasil ${index + 1}`} /> : <span>{index + 1}</span>}
                            </div>
                        ))}
                    </div>
                </div>

                {/* 3. AREA TOMBOL KONTROL (LAYOUT BERTUMPUK) */}
                <div className="controls-layout">
                    
                    {/* Baris Atas: Tombol Capture Shutter */}
                    <div className="top-row">
                        <button className="shutter-btn" onClick={capturePhoto}>
                            <div className="inner-circle"></div>
                        </button>
                    </div>

                    {/* Baris Bawah: Upload, Finish, Take Ulang */}
                    <div className="bottom-row">
                        <label className="text-btn">
                            <input
                            type="file"
                            accept="image/*"
                            style={{ display: 'none' }}
                            onChange={handleUpload}
                            />
                            Upload
                        </label>
                        <button className="finish-btn" onClick={handleFinish}>
                            Finish
                        </button>

                        <button className="text-btn" onClick={resetPhotos}>
                            Take Ulang
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}