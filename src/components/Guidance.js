import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Guidance = () => {
  return (
    <div className="guidance-page">
      <div className="container">
        <header className="guidance-header">
          <h1>Travel Guidance</h1>
          <h2>Select a Country</h2>
        </header>

        <section className="countries-section">
          <div className="countries-grid">
            <motion.div 
              className="country-card"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="country-image">
              </div>
              <div className="country-content">
                <h3>Thailand</h3>
                <p>Discover the Land of Smiles with our comprehensive travel guidance. From bustling Bangkok to pristine beaches, get all the essential information you need for your perfect trip.</p>
                <Link to="/guidance/thailand" className="btn btn-primary">View Travel Guidance</Link>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Guidance;
