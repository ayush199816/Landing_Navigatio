import React, { useState, useEffect, useRef } from 'react';
import { FaSpinner, FaExclamationTriangle } from 'react-icons/fa';
import './ContactPage.css';

const ContactPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const iframeRef = useRef(null);
  const retryTimeout = useRef(null);

  const handleIframeLoad = () => {
    setIsLoading(false);
    setError(null);
  };

  const handleIframeError = () => {
    setError('Failed to load the contact form. Please try again later.');
    setIsLoading(false);
    
    // Auto-retry after 5 seconds
    retryTimeout.current = setTimeout(() => {
      setError(null);
      setIsLoading(true);
      if (iframeRef.current) {
        // Force reload the iframe by cloning and replacing it
        const iframe = iframeRef.current;
        const src = iframe.src;
        iframe.src = '';
        setTimeout(() => {
          if (iframe) iframe.src = src;
        }, 0);
      }
    }, 5000);
  };

  useEffect(() => {
    return () => {
      // Clean up any pending timeouts
      if (retryTimeout.current) {
        clearTimeout(retryTimeout.current);
      }
    };
  }, []);

  return (
    <div className="contact-page">
      <div className="contact-hero">
        <div className="container">
          <h1>Get In Touch</h1>
          <p>We'd love to hear from you. Reach out to us for any inquiries or to book your next adventure.</p>
        </div>
      </div>

      <div className="contact-content">
        <div className="container">
          <div className="contact-grid">
            <div className="contact-form-container">
              <h2>Send Us a Message</h2>
              <p>Have questions or special requests? We're here to help.</p>
              
              <div className={`form-iframe-wrapper ${isLoading ? 'loading' : ''}`}>
                {isLoading && (
                  <div className="form-loading">
                    <FaSpinner className="spinner" />
                    <p>Loading contact form...</p>
                  </div>
                )}
                {error ? (
                  <div className="form-error">
                    <FaExclamationTriangle className="error-icon" />
                    <p>{error}</p>
                    <button 
                      className="retry-button"
                      onClick={() => {
                        setError(null);
                        setIsLoading(true);
                        if (iframeRef.current) {
                          const iframe = iframeRef.current;
                          const src = iframe.src;
                          iframe.src = '';
                          setTimeout(() => {
                            if (iframe) iframe.src = src;
                          }, 0);
                        }
                      }}
                    >
                      Retry
                    </button>
                  </div>
                ) : (
                  <iframe 
                    ref={iframeRef}
                    src="https://359f261a.sibforms.com/serve/MUIFAGrCm-QRAw1plFO_c8nQweEfFycxZtDsT07jPj21YcmBGQq4cEgaU9z35qfA3DG4enO3wSfzpqxvHFQbyxMp2453bUuGXqpp9WH7V_f1qOsJ-OMMVwtdOPkKHLFJwGIuDz5mTGmCyBr3Oj-BdMQdGtfD0n2BzRFimkiSraQcYXMvQZoDlEX42IcFmvg_cy9tn8THE3ZDPatH"
                    title="Contact Form"
                    onLoad={handleIframeLoad}
                    onError={handleIframeError}
                    style={{ 
                      opacity: isLoading ? 0 : 1,
                      transition: 'opacity 0.3s ease-in-out',
                      width: '100%',
                      minHeight: '500px',
                      border: 'none',
                      borderRadius: '12px',
                      visibility: isLoading ? 'hidden' : 'visible'
                    }}
                    loading="eager"
                    aria-label="Contact form"
                  />
                )}
              </div>
              
              <div className="form-note">
                <p>We typically respond within 24 hours. For urgent inquiries, please call us directly.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;