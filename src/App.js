import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { FiSearch, FiMapPin, FiStar } from 'react-icons/fi';
import { FaUmbrellaBeach, FaShip, FaCity, FaMountain, FaChevronLeft, FaChevronRight, FaEnvelope, FaPhone, FaMapMarkerAlt, FaQuoteLeft } from 'react-icons/fa';
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

const travelerReviews = [
  {
    name: 'Sujeet Kumar',
    city: 'Mumbai',
    date: 'Dec 11, 2025',
    rating: 4,
    highlight: 'Positive Thailand trip with scope for more planning inputs',
    content: [
      'Visited Thailand with Navigatio ASIA and the overall experience was positive.',
      'Would have appreciated if a few of my suggested inputs were incorporated earlier during the planning stage.'
    ],
    meta: 'Rated 4/5 — requests more proactive suggestions.'
  },
  {
    name: 'Vinit Nair',
    city: 'Mumbai',
    date: 'Dec 11, 2025',
    rating: 5,
    highlight: 'Simple verdict: good trip, zero hassles',
    content: [
      'Everything went smoothly and there is nothing more to add—just good service, period.'
    ],
    meta: 'Rated 5/5 — concise but glowing.'
  },
  {
    name: 'Arviynd Raizada',
    city: 'Bangalore',
    date: 'Dec 06, 2025',
    rating: 5,
    highlight: 'Tapur & Ayush customized every detail flawlessly',
    content: [
      'Ms. Tapur and Mr. Ayush patiently customized our itinerary, guided us on visas, and ensured every requirement was covered.',
      'Navigatio’s Phuket team, SIM support, forex card tips, and prompt responses kept the trip seamless while transfers, hotels, and vegetarian meals hit the brief perfectly.',
      'Local operators were courteous and helped us maximize island-hopping time—vacation was a huge success!'
    ],
    meta: 'Rated 5/5 — praises end-to-end planning.'
  },
  {
    name: 'Sameer Chandra',
    city: 'Hyderabad',
    date: 'Dec 04, 2025',
    rating: 4,
    highlight: 'Positive Thailand rating with minor suggestions',
    content: [
      'Booked a Thailand destination trip and came back satisfied overall.',
      'Leaves a 4/5 because there is always room for that extra polish.'
    ],
    meta: 'Rated 4/5 — overall positive.'
  },
  {
    name: 'Madhavi Kadam',
    city: 'Mumbai',
    date: 'Nov 28, 2025',
    rating: 5,
    highlight: 'Parul & Tarun planned Thailand to perfection',
    content: [
      'Itinerary covered the best of Thailand with perfectly timed scheduling so we could explore and still relax.',
      'Hotels, pickups, and drop-offs were consistently on time and safe—hospitality felt thoughtful end to end.'
    ],
    meta: 'Rated 5/5 — grateful for the planning duo.'
  },
  {
    name: 'Ketan Nathani',
    city: 'Kolkata',
    date: 'Nov 28, 2025',
    rating: 5,
    highlight: 'Resort upgrade and constant support impressed the family',
    content: [
      'After a resort hiccup, the team personally upgraded us to a better stay and even absorbed extra costs to keep us comfortable.',
      'They stayed in constant touch for sightseeing and transport so our first international trip stayed stress-free.'
    ],
    meta: 'Rated 5/5 — appreciates professionalism.'
  },
  {
    name: 'Joshika Thapa',
    city: 'Darjeeling',
    date: 'Nov 28, 2025',
    rating: 5,
    highlight: 'Custom Bangkok & Phuket itinerary handled with care',
    content: [
      'Five nights and six days across Bangkok and Phuket were smooth, well-managed, and easy to tailor.',
      'Parul ensured every interest was addressed and handled each aspect with remarkable professionalism.'
    ],
    meta: 'Rated 5/5 — applauds Parul’s attention to detail.'
  },
  {
    name: 'Amritha Rangayya',
    city: 'Coimbatore',
    date: 'Nov 17, 2025',
    rating: 4,
    highlight: 'Great trip; would welcome more planning suggestions',
    content: [
      'Most of the vacation was spot on and enjoyable.',
      'Mentions that the travel agent could suggest even more ideas during the planning phase.'
    ],
    meta: 'Rated 4/5 — asks for richer ideation.'
  },
  {
    name: 'Harish Shetty',
    city: 'Mumbai',
    date: 'Nov 12, 2025',
    rating: 5,
    highlight: 'Team Parul, Ayush & Tarun delivered a stellar November tour',
    content: [
      'Hotels like Golden Sea Pattaya and Mandison Suites were comfortable, though Pattaya services could improve.',
      'Despite that, the overall trip and coordination were excellent and worthy of a perfect score.'
    ],
    meta: 'Rated 5/5 — minor note on one hotel’s service.'
  },
  {
    name: 'Ravi Teja',
    city: 'Hyderabad',
    date: 'Nov 07, 2025',
    rating: 5,
    highlight: 'Kid-friendly Phuket & Krabi planning was on point',
    content: [
      'They curated the itinerary around two kids (one infant) with child-friendly hotels and relaxed pacing.',
      'No issues popped up during the trip and the WhatsApp team stayed responsive throughout.'
    ],
    meta: 'Rated 5/5 — celebrates family-first planning.'
  },
  {
    name: 'Leena Sahni',
    city: 'New Delhi',
    date: 'Nov 07, 2025',
    rating: 5,
    highlight: 'Team coordination stood out versus other travel groups',
    content: [
      'Tarun and Parul ensured both Bangkok and Phuket stays, especially at Journey Hub, felt supported with quick service.',
      'Calls it an overall great experience thanks to the coordinated Navigatio team.'
    ],
    meta: 'Rated 5/5 — praises standout coordination.'
  },
  {
    name: 'Abhishek Anand',
    city: 'Bengaluru',
    date: 'Apr 18, 2025',
    rating: 5,
    highlight: 'Parul patiently iterated until the itinerary was perfect',
    content: [
      'From the first draft to the final itinerary, Parul stayed patient with every change.',
      'Shouts out the entire team for a wonderful, hassle-free trip and recommends Navigatio ASIA wholeheartedly.'
    ],
    meta: 'Rated 5/5 — applauds patience and support.'
  },
  {
    name: 'Priyanka Kapse',
    city: 'New Delhi',
    date: 'Apr 12, 2025',
    rating: 5,
    highlight: 'First international trip planned meticulously',
    content: [
      'Airport pickups, hotels, and every itinerary detail were covered exactly as promised.',
      'Tarun and Parul stayed helpful throughout, making the trip stress-free.'
    ],
    meta: 'Rated 5/5 — highly recommends Navigatio ASIA.'
  },
  {
    name: 'Chandresh Kumar',
    city: 'Delhi',
    date: 'Apr 04, 2025',
    rating: 5,
    highlight: 'Shrinikita & Tarun made a first international trip seamless',
    content: [
      'Everything was smooth—from Shrinikita’s planning to Tarun’s on-trip check-ins while in Thailand.',
      'Island tours in Krabi and Phuket plus timely pickups and drops made for unforgettable memories.'
    ],
    meta: 'Rated 5/5 — grateful for meticulous coordination.'
  },
  {
    name: 'Piyush Sharma',
    city: 'Delhi',
    date: 'Dec 25, 2024',
    rating: 5,
    highlight: 'Nikita curated a balanced adventure and relaxation mix',
    content: [
      'Expresses heartfelt gratitude to Ms. Nikita for organizing an exceptional Thailand trip with thoughtful activity balance.',
      'Her professionalism, valuable recommendations, and patience ensured every detail matched our preferences.'
    ],
    meta: 'Rated 5/5 — applauds Nikita’s meticulous planning.'
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
  const [activeReview, setActiveReview] = useState(0);
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

  useEffect(() => {
    const totalReviews = travelerReviews.length;
    const interval = setInterval(() => {
      setActiveReview((prev) => (prev + 1) % totalReviews);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

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

      <section className="reviews-section" id="reviews">
        <div className="container">
          <motion.div 
            className="reviews-header"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <p className="eyebrow">Traveler Love</p>
            <h2>Reviews from Real Explorers</h2>
            <p>Hear from families and groups who trusted Navigatio ASIA to craft their dream Thailand itineraries.</p>
          </motion.div>

          <div className="reviews-carousel">
            <div
              className="reviews-track"
              style={{ transform: `translateX(-${activeReview * 100}%)` }}
            >
              {travelerReviews.map((review) => (
                <div className="review-slide" key={review.name}>
                  <div className="review-card">
                    <FaQuoteLeft className="quote-icon" aria-hidden="true" />
                    <div className="review-rating" aria-label={`${review.rating} star rating`}>
                      {[...Array(review.rating)].map((_, starIndex) => (
                        <FiStar key={starIndex} className="filled" />
                      ))}
                      <span>{review.rating}.0</span>
                    </div>
                    <h3>{review.name}</h3>
                    <p className="review-highlight">{review.highlight}</p>
                    <div className="review-body">
                      {review.content.map((paragraph, paragraphIndex) => (
                        <p key={paragraphIndex}>{paragraph}</p>
                      ))}
                    </div>
                    <span className="review-meta">{review.meta}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
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
    { label: 'Reviews', to: '/#reviews' },
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
