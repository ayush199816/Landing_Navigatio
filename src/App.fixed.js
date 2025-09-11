import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSearch, FiMapPin, FiStar } from 'react-icons/fi';
import { FaUmbrellaBeach, FaShip, FaCity, FaMountain, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import './App.css';

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
    description: 'Experience the stunning beauty of Phi Phi Islands with crystal clear waters and white sandy beaches.'
  },
  {
    id: 2,
    name: '4 Island Tour',
    location: 'Krabi, Thailand',
    rating: 4.7,
    reviews: 987,
    icon: <FaShip />,
    image: '/images/4island.png',
    description: 'Discover four beautiful islands in one day, perfect for snorkeling and beach lovers.'
  },
  {
    id: 3,
    name: 'Phuket City Tour',
    location: 'Phuket, Thailand',
    rating: 4.5,
    reviews: 876,
    icon: <FaCity />,
    image: '/images/phuketcity.png',
    description: 'Explore the rich culture and history of Phuket city with our guided tour.'
  },
  {
    id: 4,
    name: 'Bangkok Dinner Cruise',
    location: 'Bangkok, Thailand',
    rating: 4.9,
    reviews: 1567,
    icon: <FaShip />,
    image: '/images/BangkokDinnerCruise.png',
    description: 'Enjoy a romantic dinner cruise along the Chao Phraya River with stunning city views.'
  },
  {
    id: 5,
    name: '7 Island Tour',
    location: 'Phang Nga Bay, Thailand',
    rating: 4.9,
    reviews: 1342,
    icon: <FaUmbrellaBeach />,
    image: '/images/7ilsand.png',
    description: 'Explore seven stunning islands in Phang Nga Bay, famous for their limestone cliffs and emerald-green waters.'
  },
  {
    id: 6,
    name: 'Manokahan Tower Tour',
    location: 'Chiang Mai, Thailand',
    rating: 4.8,
    reviews: 2103,
    icon: <FaMountain />,
    image: '/images/Manokahan.png',
    description: 'Visit the famous Manokahan Tower for breathtaking panoramic views of Chiang Mai and its surrounding mountains.'
  }
];

function App() {
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
    <div className="app">
      <nav className="navbar">
        <div className="logo">Navigatio Asia DMC</div>
        <div className="nav-links">
          <a href="#home">Home</a>
          <a href="#destinations">Destinations</a>
          <a href="#about">About Us</a>
          <a href="#contact">Contact</a>
        </div>
      </nav>

      <main>
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
                    <motion.div 
                      key={sightseeing.id}
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
                          style={{ backgroundImage: `url(${sightseeing.image})` }}
                        >
                          <div className="card-content">
                            <h3>{sightseeing.name}</h3>
                            <p><FiMapPin /> {sightseeing.location}</p>
                          </div>
                        </div>
                        <div className="flip-card-back">
                          <div className="card-content">
                            <div className="icon">{sightseeing.icon}</div>
                            <h3>{sightseeing.name}</h3>
                            <p className="description">{sightseeing.description}</p>
                            <div className="rating">
                              <StarRating rating={sightseeing.rating} />
                              <span className="reviews">({sightseeing.reviews} reviews)</span>
                            </div>
                            <button className="view-details">View Tour Details</button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
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
      </main>

      <footer className="footer">
        <div className="container">
          <p>&copy; {new Date().getFullYear()} Navigatio Asia DMC. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
