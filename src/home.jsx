import React, { useState } from 'react';
import fotoProfil from './assets/profil.png'
import background from './assets/bg.png'
import { Link } from "react-router-dom";
import Modal from './modal';
import './home.css'

export default function Home() {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isProjectsOpen, setIsProjectsOpen] = useState(false);
  const [isDownloadOpen, setIsDownloadOpen] = useState(false);

  return (
    <div
      className="home-bg"
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className="frame">
        <nav className="header">
          <h2>Cherry</h2>
          <div className="nav-menu">
            <Link to="/">Home</Link>
            <Link to="/project">Project</Link>
            <Link to="/design">Design</Link>
           {/* Pakai class yang sama dengan Link (biasanya a atau nav-item) */}
            <span 
            className="nav-item-contact" 
            onClick={() => setIsContactOpen(true)}
            style={{ cursor: 'pointer', color: 'white', fontSize: '16px', fontWeight: '500',marginLeft: '20px' }} 
            >
            Contact
            </span>
          </div>
        </nav>

        <section className="hero-container">
          
          <div className="profile-container">
              <img src={fotoProfil} className="profile-img" alt="Cherry" />
          </div>

          <div className="bio-text">
            <h1>
             <span className="first-name">CHERRY</span> <br />
             <span className="last-name">GEVA RAYA RABBANI</span>
            </h1>

            <p className="bio">
              A Frontend Developer with a background in Computer & Network Engineering.
              I build responsive, interactive, and user-friendly web interfaces with clean and efficient code.
            </p>

            <div className="cta-button">
              <div className="first-button" onClick={() => setIsProjectsOpen(true)}
              style={{ cursor: 'pointer' }}
              >
              See Projects
            </div>

            <div className="second-button" onClick={() => setIsDownloadOpen(true)}
             style={{ cursor: 'pointer' }}
             >
             Download CV
            </div>
          </div>
        </div>
       </section>

        <section className="features">
          <div className="card">
            <h3>Frontend Development</h3>
            <p>Building responsive and interactive web interfaces with modern technologies.</p>
          </div>
          <div className="card">
            <h3>UI Implementation</h3>
            <p>Creating intuitive and user-friendly interfaces that enhance the user experience.</p>
          </div>
          <div className="card">
            <h3>Web Performance</h3>
            <p>Optimizing web applications for speed and efficiency.</p>
          </div>
        </section>

        <section className="skills">
            <div className="skill-item">HTML</div>
            <div className="skill-item">CSS</div>
            <div className="skill-item">JavaScript</div>
            <div className="skill-item">React</div>
            <div className="skill-item">UI/UX Design</div>
            <div className="skill-item">Figma</div>
            <div className="skill-item">CorelDraw</div>
            <div className="skill-item">Canva</div>
        </section>

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

      <Modal 
        isOpen={isProjectsOpen} 
        onClose={() => setIsProjectsOpen(false)} 
        title="My Projects"
      >
        <div className="projects-popup-content">
           <p style={{ color: 'white' }}>Pilih kategori project:</p>
           <Link to="/project" className="modal-link">Web Development</Link>
           <Link to="/design" className="modal-link">Graphic Design</Link>
        </div>
      </Modal>

      <Modal 
        isOpen={isDownloadOpen} 
        onClose={() => setIsDownloadOpen(false)} 
        title="Download CV"
      >
        <p style={{ color: 'white' }}> wanna see Indonesian ver or English ver</p>
        <a href="/cv.pdf" target="_blank" className="modal-link">Lihat CV</a>
        <a href="/cv.pdf" download className="modal-link">Download Langsung</a>
      </Modal>
    </div> // Penutup paling luar
  )
}
