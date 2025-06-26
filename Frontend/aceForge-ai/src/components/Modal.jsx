// src/components/Modal.jsx
import React, { useEffect, useRef } from 'react';
import Login from '../pages/Auth/Login';
import SignUp from '../pages/Auth/SignUp';

const Modal = ({ isOpen, onClose, children, title, currentPage, setCurrentPage, hideHeader, authMode }) => {
    const modalRef = useRef(null);

    // Disable scrolling when the modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
        <div className="fixed inset-0 z-50 bg-black/40 flex justify-center items-center p-4">
            <div 
                ref={modalRef} 
                className="bg-white rounded-lg w-full max-w-md relative shadow-xl animate-fadeIn"
                style={{ 
                    maxHeight: '90vh',
                    overflowY: 'auto'
                }}
            >
                <button 
                    onClick={onClose} 
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
                    aria-label="Close modal"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>
                <div className="p-6">
                    {!hideHeader && title && <h2 className="text-xl font-semibold mb-4">{title}</h2>}
                    
                    {/* Handle auth modal case */}
                    {authMode ? (
                        currentPage === 'login' ? (
          <Login switchPage={() => setCurrentPage('signup')} />
        ) : (
          <SignUp switchPage={() => setCurrentPage('login')} />
                        )
                    ) : (
                        children
        )}
      </div>
            </div>
    </div>
  );
};

export default Modal;
