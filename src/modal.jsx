<<<<<<< HEAD
import './modal.css';

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null; // Jika state isOpen false, jangan tampilkan apa-apa

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>{title}</h3>
          <button className="close-btn" onClick={onClose}>&times;</button>
        </div>
        <div className="modal-body">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
=======
import './modal.css';

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null; // Jika state isOpen false, jangan tampilkan apa-apa

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>{title}</h3>
          <button className="close-btn" onClick={onClose}>&times;</button>
        </div>
        <div className="modal-body">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;

>>>>>>> 70a71424ea950b6a4167eb967ebe60411b7c2703
