import React from 'react';
import { FaPlane, FaHotel, FaBus, FaShip, FaCamera, FaCreditCard, FaLanguage, FaSuitcase, FaShieldAlt } from 'react-icons/fa';

const ThailandGuidance = () => {
  return (
    <div className="guidance-page">
      <div className="container">
        <header className="guidance-header">
          <h1>Welcome</h1>
          <h2>to</h2>
          <h1>Thailand</h1>
        </header>

        <section className="guidance-section">
          <h3><FaPlane /> Airport Transfers</h3>
          <h4>POINTS TO REMEMBER</h4>
          <ul>
            <li>Always reach the pickup gate mentioned in the voucher.</li>
            <li>Check for your Name Placard around the pickup point, if you don't find it please inform in group.</li>
          </ul>
        </section>

        <section className="guidance-section">
          <h3><FaHotel /> Hotel Check-in</h3>
          <h4>POINTS TO REMEMBER</h4>
          <ul>
            <li>The hotel can ask you to pay some amount at the hotel directly as security. If they find any damages of their property from your end then they will deduct the amount from your security payment else it will be fully refundable at the time of check-out.</li>
            <li>Early check-in is subject to availability and is chargeable.</li>
            <li>Room Availability / Upgradation / Room Cleanliness is to be reported at Hotel and is based on availability.</li>
          </ul>
        </section>

        <section className="guidance-section">
          <h3><FaBus /> Transfer Timings</h3>
          <h4>POINTS TO REMEMBER</h4>
          <ul>
            <li>SIC Timings are fixed and if missed the guest has to reach the desired destination on their own.</li>
            <li>SIC Pickup will only wait for maximum 10 minutes for guest.</li>
            <li>SIC Pickup doesn't have a fixed pickup time they can get delayed so guests have to be in the lobby, if it is a NO SHOW then it will not be reorganized.</li>
            <li>SIC Pickup may get delayed from 30 minutes to 1 hour subject to season.</li>
          </ul>
        </section>

        <section className="guidance-section">
          <h3><FaBus /> Transfer Timings</h3>
          <h4>POINTS TO REMEMBER</h4>
          <ul>
            <li>Private Transfers will only wait for 10-20 mins, if they wait more then it is directly payable by the guest to the driver, or else it will be marked a NO SHOW.</li>
            <li>Private Transfers mean point-to-point transfers, if a guest asks to change destination it will be chargeable.</li>
            <li>Transfer timings are as per the voucher.</li>
            <li>If it is missed then the guest has to take transfers on their own and their activity is subject to availability.</li>
            <li>Re-scheduling is subject to the availability of the Driver and is chargeable.</li>
          </ul>
        </section>

        <section className="guidance-section">
          <h3><FaShip /> Island Tours</h3>
          <h4>POINTS TO REMEMBER</h4>
          <ul>
            <li>Island Tour Pickup transfer timings are fixed because they are aligned with the departure of the Boat from Pier.</li>
            <li>If Island Tour pickup is missed guests need to reach the Pier on their own.</li>
            <li>If the guests fail to reach the pier before the departure time of the boat it will be marked a no-show.</li>
            <li>National Park Fees is a tourism charge collected by the Govt. of Thailand Directly at the National Park and it is mandatory to be paid during the National Park visits.</li>
          </ul>
        </section>

        <section className="guidance-section">
          <h3><FaCamera /> Temple Tours</h3>
          <h4>POINTS TO REMEMBER</h4>
          <ul>
            <li>At some temples Driver may give you cash to buy tickets based on the day-wise restrictions.</li>
          </ul>
        </section>

        <section className="guidance-section">
          <h3><FaShip /> Phi-Phi Pier to Phi-Phi Hotel</h3>
          <h4>POINTS TO REMEMBER</h4>
          <ul>
            <li>Phi Phi is a small Island run by the local community, so the transfers are always on your own from Phi Phi pier to Phi Phi Hotel and Phi Phi Hotel to Phi Phi Pier.</li>
            <li>You can take boats from Phi Phi Pier to the Hotel and Hotel to Phi Phi Pier from the Phi Phi Pier.</li>
            <li>Phi-Phi Hotel to Phi-Phi Pier.</li>
          </ul>
        </section>

        <section className="guidance-section">
          <h3><FaCreditCard /> Visa</h3>
          <h4>POINTS TO REMEMBER</h4>
          <ul>
            <li>The TDAC form is to be applied directly at the given link 3 days before your trip starts, including the day of arrival.</li>
            <li style={{ listStyleType: 'none' }}><a href="https://tdac.immigration.go.th" className="btn btn-primary" target="_blank" rel="noopener noreferrer">Apply TDAC VISA here</a></li>
            <li>Choose individual or group form.</li>
            <li>Fill in personal info, travel details, accommodation, and health declaration.</li>
            <li>Submit.</li>
            <li>Save or print your confirmation for reference at immigration.</li>
          </ul>
        </section>

        <section className="guidance-section">
          <h3><FaLanguage /> Dictionary</h3>
          <h4>GREETINGS & BASICS</h4>
          <ul>
            <li>Sawadee ka (women) / Sawadee krub (men) – Hello</li>
            <li>Khob khun ka/krub – Thank you</li>
            <li>Chai – Yes</li>
            <li>Mai chai – No</li>
            <li>Khor toht – Sorry / Excuse me</li>
            <li>Sabai dee mai? – How are you?</li>
            <li>Sabai dee – I'm good</li>
          </ul>

          <h4>SHOPPING & EATING</h4>
          <ul>
            <li>Tao rai? – How much?</li>
            <li>Phaeng mak – Too expensive</li>
            <li>Mai sai prik – No chili (for food)</li>
            <li>Nam – Water</li>
            <li>Aroi mak – Very delicious 😋</li>
            <li>Pom/Chan im laew – I'm full (Pom = male, Chan = female)</li>
          </ul>

          <h4>GETTING AROUND</h4>
          <ul>
            <li>Pai ... – Go to ...</li>
            <li>Yut! – Stop</li>
            <li>Khun roo jak ... mai? – Do you know ...?</li>
          </ul>

          <h4>USEFUL WHILE TRAVELING</h4>
          <ul>
            <li>Kho long hong nam dai mai? – Can I use the toilet?</li>
            <li>Hong nam yoo tee nai? – Where is the bathroom?</li>
            <li>Yut kin khao dai mai? – Can we stop for food?</li>
            <li>Kho yut kin khao noy – Please stop for a meal 🙏</li>
            <li>Don't forget to use the Thai "Wai" 🙏 – palms together with a slight bow when greeting or saying thank you. It's a sign of respect!</li>
          </ul>
        </section>

        <section className="guidance-section">
          <h3><FaSuitcase /> Things To Carry</h3>
          <h4>CLOTHINGS</h4>
          <ul>
            <li>Light, breathable clothes</li>
            <li>A pair of comfortable walking shoes</li>
            <li>Swimwear & flip-flops</li>
            <li>A light jacket (for AC or cool evenings)</li>
            <li>Sunscreen & sunglasses</li>
            <li>Power bank & universal travel adapter</li>
            <li>Personal medications</li>
            <li>Mosquito repellent</li>
            <li>Small umbrella or raincoat (in case of showers)</li>
          </ul>

          <h4>OTHER ESSENTIALS:</h4>
          <ul>
            <li>Thai SIM card / international roaming</li>
            <li>Currency/Forex card (Thai Baht)</li>
            <li>Reusable water bottle</li>
          </ul>

          <h4>OPTIONAL BUT HELPFUL:</h4>
          <ul>
            <li>Thai SIM card / international roaming</li>
            <li>Currency/Forex card (Thai Baht)</li>
            <li>Reusable water bottle</li>
          </ul>
        </section>

        <section className="guidance-section">
          <h3><FaCreditCard /> Forex and Sim Card</h3>
          <div className="guidance-button">
            <a href="https://ctr.niyo.me/start?utm_campaign_id=OOj6ntXW&utm_source=NavigatioConnectPrivateLimited&utm_campaign=NavigatioConnectPrivateLimited&utm_adgroup=Mobile_Onboarding&utm_medium=ChannelPartner&utm_utr=" target="_blank" rel="noopener noreferrer" className="btn btn-primary">Apply Free Forex and Sim card</a>
            <p>CODE to USE: <strong>NAVI100</strong></p>
            <p>If this code is not used no Sim will be generated</p>
          </div>
        </section>

        <section className="guidance-section">
          <h3><FaShieldAlt /> Support</h3>
          <h4>POINTS TO REMEMBER</h4>
          <ul>
            <li>If you require any support please reach out to the On Ground team present in the Group.</li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default ThailandGuidance;
