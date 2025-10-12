import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { FiSearch, FiMapPin, FiStar } from 'react-icons/fi';
import { FaUmbrellaBeach, FaShip, FaCity, FaMountain, FaChevronLeft, FaChevronRight, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import ContactPage from './pages/ContactPage';
import TourPackages from './components/TourPackages';
import './App.css';
import './components/TourPackages.css';

// Helper component for rendering stars
const StarRating = ({ rating }) => (
  <div className="stars">
    {[...Array(5)].map((_, i) => (
      <FiStar 
        key={i} 
        className={i < Math.floor(rating) ? 'filled' : ''} 
      />
    ))}
    <span>{rating}</span>
  </div>
);

const popularSightseeings = [
  {
    id: 1,
    name: 'Phi Phi Island',
    location: 'Phuket, Thailand',
    rating: 4.8,
    reviews: 1245,
    icon: <FaUmbrellaBeach />,
    image: '/images/phiphi.png',
    description: 'Experience the stunning beauty of Phi Phi Islands with crystal clear waters and white sandy beaches.',
    bookNowUrl: 'https://www.bookmysight.com/sightseeing/68d29024d47029a42963ba6d'
  },
  {
    id: 2,
    name: '4 Island Tour',
    location: 'Krabi, Thailand',
    rating: 4.7,
    reviews: 987,
    icon: <FaShip />,
    image: '/images/4island.png',
    description: 'Discover four beautiful islands in one day, perfect for snorkeling and beach lovers.',
    bookNowUrl: 'https://www.bookmysight.com/sightseeing/68c419cd64a77287f5d1e643'
  },
  {
    id: 3,
    name: 'Phuket City Tour',
    location: 'Phuket, Thailand',
    rating: 4.5,
    reviews: 876,
    icon: <FaCity />,
    image: '/images/phuketcity.png',
    description: 'Explore the rich culture and history of Phuket city with our guided tour.',
    bookNowUrl: 'https://www.bookmysight.com/sightseeing/68d2d990782342826ba41953'
  },
  {
    id: 4,
    name: 'Bangkok Dinner Cruise',
    location: 'Bangkok, Thailand',
    rating: 4.9,
    reviews: 1567,
    icon: <FaShip />,
    image: '/images/BangkokDinnerCruise.png',
    description: 'Enjoy a romantic dinner cruise along the Chao Phraya River with stunning city views.',
    bookNowUrl: 'https://www.bookmysight.com/sightseeing/68c683f391803c4b2b9cb5a9'
  },
  {
    id: 5,
    name: '7 Island Tour',
    location: 'Phang Nga Bay, Thailand',
    rating: 4.9,
    reviews: 1342,
    icon: <FaUmbrellaBeach />,
    image: '/images/7ilsand.png',
    description: 'Explore seven stunning islands in Phang Nga Bay, famous for their limestone cliffs and emerald-green waters.',
    bookNowUrl: 'https://www.bookmysight.com/7-island-tour-phang-nga'
  },
  {
    id: 6,
    name: 'Manokahan Tower Tour',
    location: 'Chiang Mai, Thailand',
    rating: 4.8,
    reviews: 2103,
    icon: <FaMountain />,
    image: '/images/Manokahan.png',
    description: 'Visit the famous Manokahan Tower for breathtaking panoramic views of Chiang Mai and its surrounding mountains.',
    bookNowUrl: 'https://www.bookmysight.com/sightseeing/68a2fddd50c231f3480e2e25'
  }
];

// Reusable Navbar component
const Navbar = ({ logo, links }) => {
  const location = useLocation();
  
  const handleScrollToSection = (id) => (e) => {
    if (location.pathname === '/') {
      e.preventDefault();
      document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="navbar">
      <div className="logo">{logo}</div>
      <div className="nav-links">
        {links.map((link, index) => (
          <Link 
            key={index} 
            to={link.to}
            onClick={link.to.startsWith('/#') ? handleScrollToSection(link.to.substring(2)) : undefined}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </nav>
  );
};

// Reusable Footer component
const Footer = () => (
  <footer className="footer">
    <div className="container">
      <div className="footer-content">
        <div className="footer-logo">
          <h3>Navigatio Asia DMC</h3>
          <p>Creating unforgettable travel experiences across Asia</p>
        </div>
        <div className="footer-links">
          <div className="footer-column">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="#home">Home</a></li>
              <li><a href="#destinations">Destinations</a></li>
              <li><a href="#team">Our Team</a></li>
              <li><a href="#contact">Contact Us</a></li>
            </ul>
          </div>
          <div className="footer-column">
            <h4>Popular Tours</h4>
            <ul>
              <li><a href="#phi-phi">Phi Phi Island</a></li>
              <li><a href="#4island">4 Island Tour</a></li>
              <li><a href="#phuket">Phuket City Tour</a></li>
              <li><a href="#bangkok">Bangkok Dinner Cruise</a></li>
            </ul>
          </div>
          <div className="footer-column">
            <h4>Contact Us</h4>
            <ul className="contact-info">
              <li><FaEnvelope /> info@navigatioasia.com</li>
              <li><FaPhone /> <a href="tel:+919628912345">+91 96289 12345</a></li>
              <li><FaMapMarkerAlt /> Mumbai, India</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Navigatio Asia DMC. All rights reserved.</p>
        <div className="social-links">
          <a href="https://www.instagram.com/navigatio.asia" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
          <a href="https://in.linkedin.com/company/navigatioasiadmc" aria-label="LinkedIn"><i className="fab fa-linkedin"></i></a>
        </div>
      </div>
    </div>
  </footer>
);

// Home Page Component
const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredSightseeings, setFilteredSightseeings] = useState(popularSightseeings);
  const [activeFilter, setActiveFilter] = useState('all');
  const gridRef = useRef(null);
  
  const scrollLeft = () => {
    if (gridRef.current) {
      gridRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (gridRef.current) {
      gridRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const results = popularSightseeings.filter(sightseeing =>
      sightseeing.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sightseeing.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sightseeing.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredSightseeings(results);
  }, [searchQuery]);

  const handleFilter = (filter) => {
    setActiveFilter(filter);
    if (filter === 'all') {
      setFilteredSightseeings(popularSightseeings);
    } else {
      const results = popularSightseeings.filter(
        sightseeing => sightseeing.location.toLowerCase().includes(filter)
      );
      setFilteredSightseeings(results);
    }
  };

  return (
    <>
      <section className="hero-video" id="home">
        <div className="video-background">
          <video autoPlay loop muted playsInline>
            <source src="/video/Final_Logo_Animation_Match.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </section>
      
      <div className="spacer"></div>

      <section className="search-section" id="destinations">
        <div className="search-container">
          <motion.div 
            className="search-header"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2>Popular Sightseeings</h2>
            <p>Explore our most popular tours and activities</p>
          </motion.div>
          
          <motion.div 
            className="search-box"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="search-input">
              <FiSearch className="search-icon" />
              <input 
                type="text" 
                placeholder="Search for sightseeings, destinations..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button className="search-button">Search</button>
          </motion.div>

          <div className="filters">
            <button 
              className={`filter-btn ${activeFilter === 'all' ? 'active' : ''}`}
              onClick={() => handleFilter('all')}
            >
              All
            </button>
            <button 
              className={`filter-btn ${activeFilter === 'phuket' ? 'active' : ''}`}
              onClick={() => handleFilter('phuket')}
            >
              Phuket
            </button>
            <button 
              className={`filter-btn ${activeFilter === 'bangkok' ? 'active' : ''}`}
              onClick={() => handleFilter('bangkok')}
            >
              Bangkok
            </button>
            <button 
              className={`filter-btn ${activeFilter === 'krabi' ? 'active' : ''}`}
              onClick={() => handleFilter('krabi')}
            >
              Krabi
            </button>
          </div>

          <div className="sightseeings-container">
            <button 
              className="scroll-btn left" 
              onClick={scrollLeft}
              aria-label="Scroll left"
            >
              <FaChevronLeft />
            </button>
            
            <div className="sightseeings-grid" ref={gridRef}>
              <AnimatePresence>
                {filteredSightseeings.map((sightseeing) => (
                  <motion.a 
                    key={sightseeing.id}
                    href={sightseeing.bookNowUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flip-card"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flip-card-inner">
                      <div 
                        className="flip-card-front" 
                        style={{ 
                          backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.7)), url(${sightseeing.image})`,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center',
                          backgroundRepeat: 'no-repeat'
                        }}
                      >
                        <div className="card-content">
                          <h3>{sightseeing.name}</h3>
                          <p className="location">
                            <FiMapPin /> {sightseeing.location}
                          </p>
                        </div>
                      </div>
                      <div className="flip-card-back">
                        <div className="card-back-content">
                          <div className="card-icon">
                            {sightseeing.icon}
                          </div>
                          <h3>{sightseeing.name}</h3>
                          <p className="description">{sightseeing.description}</p>
                          <div className="rating">
                            <StarRating rating={sightseeing.rating} />
                            <span className="reviews">({sightseeing.reviews} reviews)</span>
                          </div>
                          <a 
                            href="https://www.bookmysight.com/" 
                            className="view-details"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            View Tour Details
                          </a>
                        </div>
                      </div>
                    </div>
                  </motion.a>
                ))}
              </AnimatePresence>
            </div>
            
            <button 
              className="scroll-btn right" 
              onClick={scrollRight}
              aria-label="Scroll right"
            >
              <FaChevronRight />
            </button>
          </div>
        </div>
      </section>

      {/* Tour Packages Section */}
      <section id="packages" className="packages-section">
        <div className="container">
          <TourPackages />
        </div>
      </section>

      <section className="team-section" id="team">
        <div className="container">
          <h2>Our Team</h2>
          <div className="team-grid">
            <div className="team-member">
              <div className="member-avatar">AD</div>
              <h3>Anitya Dubey</h3>
              <p className="position">Founder</p>
            </div>
            <div className="team-member">
              <div className="member-avatar">AG</div>
              <h3>Ayush Gupta</h3>
              <p className="position">COO</p>
            </div>
            <div className="team-member">
              <div className="member-avatar">P</div>
              <h3>Parul</h3>
              <p className="position">Senior Sales Associate</p>
            </div>
            <div className="team-member">
              <div className="member-avatar">H</div>
              <h3>Harbhjahan</h3>
              <p className="position">Sales Associate</p>
            </div>
            <div className="team-member">
              <div className="member-avatar">T</div>
              <h3>Tapur</h3>
              <p className="position">Sales Associate</p>
            </div>
            <div className="team-member">
              <div className="member-avatar">AK</div>
              <h3>Akshika</h3>
              <p className="position">Operations Associate</p>
            </div>
            <div className="team-member">
              <div className="member-avatar">AS</div>
              <h3>Akshara</h3>
              <p className="position">Operations Associate</p>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="contact-section">
        <div className="container">
          <h2>Contact Us</h2>
          <div className="contact-cta">
            <p>Have questions or ready to book your next adventure?</p>
            <Link to="/contact" className="cta-button">Get In Touch</Link>
          </div>
        </div>
      </section>
    </>
  );
};

function App() {
  const navLinks = [
    { label: 'Home', to: '/#home' },
    { label: 'Destinations', to: '/#destinations' },
    { label: 'Our Team', to: '/#team' },
    { label: 'Contact', to: '/contact' },
  ];

  return (
    <Router>
      <Navbar logo="Navigatio Asia DMC" links={navLinks} />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
