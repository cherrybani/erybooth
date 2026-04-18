import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { supabase } from './supabaseClient';
import background from './assets/bg.png'
import Modal from './modal';
import './project.css';

export default function Project() {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [projects, setProjects] = useState([]);


  useEffect(() => {
    async function fetchProjects() {
            let { data, error } = await supabase
            .from('projects')
            .select('*')
            .eq('category', 'web');

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
        {projects?.map((item) => (
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
  </div>
    );
}