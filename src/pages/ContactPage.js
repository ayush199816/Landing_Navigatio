import React, { useState, useEffect } from 'react';
import { 
  FaSpinner
} from 'react-icons/fa';
import './ContactPage.css';

const ContactPage = () => {
  const [isIframeLoading, setIsIframeLoading] = useState(true);
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);

  useEffect(() => {
    // Load Brevo form script
    const script = document.createElement('script');
    script.src = 'https://sibforms.com/forms/end-form/build/sib-forms.sandbox.js';
    script.async = true;
    
    script.onload = () => {
      setIsScriptLoaded(true);
      // Small delay to ensure the script is fully initialized
      setTimeout(() => setIsIframeLoading(false), 1500);
    };
    
    script.onerror = () => {
      console.error('Failed to load Brevo form script');
      // If the script fails, still stop the loading spinner
      setIsIframeLoading(false);
    };

    document.body.appendChild(script);

    // Cleanup function to remove the script when the component unmounts
    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  const handleIframeLoad = () => {
    setIsIframeLoading(false);
  };

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
              
              {/* Conditionally render the form once the script is loaded */}
              {isScriptLoaded ? (
                <div className={`form-iframe-wrapper ${isIframeLoading ? 'loading' : ''}`}>
                  {isIframeLoading && (
                    <div className="form-loading">
                      <FaSpinner className="spinner" />
                      <p>Loading contact form...</p>
                    </div>
                  )}
                  <iframe 
                    src="https://359f261a.sibforms.com/serve/MUIFACDGUJhDweO7YdGAhlWptc72iJjv1UeOScCDAtE_vSKu7VoWn8ygK-PrbeScnjz-0CveZHVlse3D3GCrtvGQ1KJrwztTzANpw13e7rW93ikoPkjIglsl8bxIVEw76gnytKgTLrhd8iDYcWV27ryJLOn71l9EE0qYDttqXEZA5hHG6lNP1LL3bWDmGQmwGwuLfJZyDcXKl3L4"
                    title="Contact Form"
                    onLoad={handleIframeLoad}
                    style={{ 
                      opacity: isIframeLoading ? 0 : 1,
                      transition: 'opacity 0.3s ease-in-out',
                      width: '100%',
                      minHeight: '500px',
                      border: 'none',
                      borderRadius: '12px'
                    }}
                    loading="lazy"
                    aria-label="Contact form"
                  />
                </div>
              ) : (
                // Show a loading state specifically for the script
                <div className="form-loading">
                  <FaSpinner className="spinner" />
                  <p>Preparing form...</p>
                </div>
              )}
              
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