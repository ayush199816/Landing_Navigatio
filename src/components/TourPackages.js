import React, { useState } from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import { FiX } from 'react-icons/fi';

const packages = [
  {
    id: 1,
    title: "Thailand Exotic Greenland and Island Tour",
    image: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    description: [
      "Covers Phuket and Krabi",
      "Includes Phi Phi Island and Krabi 4 Island Tour",
      "Includes Phuket City Tour",
      "Includes Airport and intercity pickup and Drop"
    ],
    whatsapp: "9628912345"
  },
  {
    id: 2,
    title: "Thailand Wild Ride Package",
    image: "https://images.unsplash.com/photo-1508009603885-50cf7c579365?w=800&auto=format&fit=crop&q=80",
    description: [
      "Covers Pattaya and Bangkok",
      "Includes Safari World and Marine Park",
      "Includes Bangkok City and Temple Tour",
      "Includes Airport and intercity pickup and Drop"
    ],
    whatsapp: "9628912345"
  },
  {
    id: 3,
    title: "Dubai Luxury Tour",
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
    description: [
      "Covers Dubai City Tour",
      "Includes Burj Khalifa",
      "Includes Museum of Future",
      "Includes Airport pickup and Drop"
    ],
    whatsapp: "9628912345"
  }
];

const TourPackages = () => {
  const [selectedPackage, setSelectedPackage] = useState(null);

  const handleWhatsAppClick = (phone, packageName) => {
    const message = `Hi I am looking for ${encodeURIComponent(packageName)}`;
    const digits = String(phone).replace(/\D/g, '');
    const normalized = digits.length === 10 ? `91${digits}` : digits;
    window.open(`https://wa.me/${normalized}?text=${message}`, '_blank');
  };

  return (
    <section id="packages" className="packages-section">
      <div className="container">
        <h2 className="section-title">Our Exclusive Packages</h2>
        <div className="packages-grid">
          {packages.map((pkg) => (
            <div key={pkg.id} className="package-card" onClick={() => setSelectedPackage(pkg)}>
              <div className="package-image" style={{ backgroundImage: `url(${pkg.image})` }}></div>
              <div className="package-content">
                <h3>{pkg.title}</h3>
                <ul>
                  {pkg.description.slice(0, 2).map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
                <button 
                  className="whatsapp-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleWhatsAppClick(pkg.whatsapp, pkg.title);
                  }}
                >
                  <FaWhatsapp /> Get Price on WhatsApp
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedPackage && (
        <div
          className={`package-modal ${selectedPackage ? 'active' : ''}`}
          onClick={() => setSelectedPackage(null)}
        >
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={() => setSelectedPackage(null)}>
              <FiX />
            </button>
            <div className="modal-image" style={{ backgroundImage: `url(${selectedPackage.image})` }}></div>
            <div className="modal-details">
              <h3>{selectedPackage.title}</h3>
              <ul>
                {selectedPackage.description.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
              <button 
                className="whatsapp-btn"
                onClick={() => handleWhatsAppClick(selectedPackage.whatsapp, selectedPackage.title)}
              >
                <FaWhatsapp /> Get Price on WhatsApp
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default TourPackages;
