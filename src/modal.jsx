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

