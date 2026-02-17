import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  FaFacebookF,
  FaTwitter,
  FaTumblr,
  FaTiktok,
  FaWhatsapp,
  FaPhoneAlt,
} from "react-icons/fa";

// Hamburger icon SVG (for simplicity, inline)
function Hamburger({ open, color = "#ff234d", ...props }) {
  return (
    <button
      type="button"
      className="md:hidden flex items-center justify-center"
      aria-label={open ? "Close Navigation Menu" : "Open Navigation Menu"}
      aria-expanded={open}
      {...props}
    >
      <svg
        width="32"
        height="32"
        viewBox="0 0 22 22"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ color }}
      >
        {open ? (
          // X icon
          <g>
            <rect
              x="5"
              y="15.1422"
              width="14"
              height="2"
              rx="1"
              transform="rotate(-45 5 15.1422)"
              fill={color}
            />
            <rect
              x="6.41431"
              y="5"
              width="14"
              height="2"
              rx="1"
              transform="rotate(45 6.41431 5)"
              fill={color}
            />
          </g>
        ) : (
          // Hamburger
          <g>
            <rect y="4" width="22" height="2.5" rx="1.25" fill={color} />
            <rect y="9.5" width="22" height="2.5" rx="1.25" fill={color} />
            <rect y="15" width="22" height="2.5" rx="1.25" fill={color} />
          </g>
        )}
      </svg>
    </button>
  );
}

const customRed = "#ff234d";

const HERO_IMAGES = Array.from({ length: 9 }, (_, i) => `/Banner/${i}.webp`);

// Use a constant for the phone and whatsapp number
const PHONE_NUMBER = "+919179567877";
const PHONE_DISPLAY = "+91 9179567877";

function HeroSlideshow() {
  const [current, setCurrent] = useState(0);
  const timeoutRef = useRef();

  useEffect(() => {
    // Setup timer for next transition
    timeoutRef.current = setTimeout(() => {
      setCurrent((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 2000);
    return () => clearTimeout(timeoutRef.current);
  }, [current]);

  return (
    <div className="absolute inset-0 z-0 w-full h-full">
      {HERO_IMAGES.map((src, i) => (
        <motion.img
          key={src}
          src={src}
          alt="" // decorative img
          initial={{ opacity: i === current ? 1 : 0 }}
          animate={{ opacity: i === current ? 1 : 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 w-full h-full object-cover"
          style={{ pointerEvents: "none", userSelect: "none" }}
        />
      ))}
      {/* Black overlay for consistent background shade over images */}
      <div className="absolute inset-0 bg-black/60" />
    </div>
  );
}

// Floating Icons Component
function FloatingIcons() {
  // Call configuration
  const callHref = `tel:${PHONE_NUMBER}`;
  return (
    <>
      {/* Floating WhatsApp Icon Left */}
      {(() => {
        // Custom WhatsApp message for asking about room
        const whatsappMessage = encodeURIComponent(
          "Hello, I am interested in booking a room at Varahaswamy Guest House. Please share room availability and details."
        );
        const whatsappHrefWithMsg = `https://wa.me/${PHONE_NUMBER.replace("+", "")}?text=${whatsappMessage}`;
        return (
          <a
            href={whatsappHrefWithMsg}
            target="_blank"
            rel="noopener noreferrer"
            className="fixed left-4 bottom-10 z-[100] flex items-center justify-center rounded-full shadow-lg"
            style={{
              backgroundColor: "#25D366",
              color: "#fff",
              width: 56,
              height: 56,
              fontSize: 30,
              boxShadow:
                "0 5px 30px rgba(40,200,100,0.20), 0 2px 6px rgba(0,0,0,0.10)",
              transition: "transform 0.12s",
            }}
            aria-label="WhatsApp"
            tabIndex={0}
          >
            <FaWhatsapp />
          </a>
        );
      })()}
      {/* Floating Call Icon Right */}
      <a
        href={callHref}
        className="fixed right-4 bottom-10 z-[100] flex items-center justify-center rounded-full shadow-lg"
        style={{
          backgroundColor: customRed,
          color: "#fff",
          width: 56,
          height: 56,
          fontSize: 26,
          boxShadow:
            "0 5px 30px rgba(255,36,77,0.18), 0 2px 6px rgba(0,0,0,0.09)",
          transition: "transform 0.12s",
        }}
        aria-label={`Call ${PHONE_DISPLAY}`}
        tabIndex={0}
      >
        <FaPhoneAlt />
      </a>
      {/* Optionally, add a small media query for mobile so they don't block other actions */}
      <style>{`
        @media (max-width: 500px) {
          .floating-contact-mobile-hide {
            display: none !important;
          }
          /* Slightly higher on very small screens */
          .fixed.left-4.bottom-10, .fixed.right-4.bottom-10 {
            bottom: 18px !important;
          }
        }
        .fixed.left-4.bottom-10:hover, .fixed.right-4.bottom-10:hover {
          transform: scale(1.10) translateY(-4px);
          filter: brightness(1.1);
        }
      `}</style>
    </>
  );
}

export default function VarahaswamyLanding() {
  // For navbar: mobile menu open/close state
  const [menuOpen, setMenuOpen] = useState(false);

  // Close nav menu on route/hash change or window resize (>=md)
  useEffect(() => {
    function handleResize() {
      if (window.innerWidth >= 768) setMenuOpen(false);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Lock scroll when mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [menuOpen]);

  const navLinks = [
    { label: "HOME", href: "#home" },
    { label: "ABOUT", href: "#about" },
    { label: "ROOMS", href: "#rooms" },
    { label: "CONTACT", href: "#contact" },
    { label: "SERVICES", href: "#services" },
  ];

  return (
    <div className="w-full bg-white font-sans scroll-smooth max-w-[100vw] overflow-x-hidden">
      {/* Floating BOTH SIDE WhatsApp and Call Icons */}
      <FloatingIcons />

      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-gray-300 border-b border-gray-400">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">

          {/* Social */}
          <div
            className="hidden md:flex gap-4 text-lg"
            style={{ color: customRed }}
          >
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <FaFacebookF />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
              <FaTwitter />
            </a>
            <a href="https://tumblr.com" target="_blank" rel="noopener noreferrer" aria-label="Tumblr">
              <FaTumblr />
            </a>
            <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" aria-label="TikTok">
              <FaTiktok />
            </a>
          </div>

          {/* Hamburger */}
          <Hamburger open={menuOpen} color={customRed} onClick={() => setMenuOpen(v => !v)} />

          {/* Desktop nav */}
          <ul
            className="hidden md:flex gap-8 text-sm tracking-widest font-medium"
            style={{ color: customRed }}
          >
            {navLinks.map(({ label, href }) => (
              <li key={href}>
                <a
                  href={href}
                  className="hover:border-b-2 pb-1"
                  style={{
                    borderColor: customRed
                  }}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Mobile menu overlay */}
        <div
          className={`fixed inset-0 top-[56px] z-40 bg-black/50 transition-opacity duration-300 ${menuOpen ? "block opacity-100" : "pointer-events-none opacity-0"}`}
          onClick={() => setMenuOpen(false)}
          style={{}}
          aria-hidden={!menuOpen}
        />
        {/* Mobile nav */}
        <motion.div
          initial={false}
          animate={menuOpen ? "open" : "closed"}
          variants={{
            open: { y: 0, opacity: 1, pointerEvents: "auto" },
            closed: { y: -50, opacity: 0, pointerEvents: "none" }
          }}
          transition={{ type: "spring", stiffness: 240, damping: 32 }}
          className="fixed left-0 right-0 top-[56px] z-50 w-full md:hidden"
          style={{}}
        >
          <div
            className="bg-gray-300 p-6 pb-10 flex flex-col gap-5 items-center shadow transition"
            style={{ borderBottom: `1px solid #cbd5e1` /* border-gray-400 */ }}
            tabIndex={menuOpen ? 0 : -1}
            aria-modal={menuOpen}
            role="dialog"
          >
            {/* Social (mobile) */}
            <div className="flex gap-6 text-xl mb-2" style={{ color: customRed }}>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <FaFacebookF />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                <FaTwitter />
              </a>
              <a href="https://tumblr.com" target="_blank" rel="noopener noreferrer" aria-label="Tumblr">
                <FaTumblr />
              </a>
              <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" aria-label="TikTok">
                <FaTiktok />
              </a>
            </div>

            <ul className="flex flex-col gap-4 text-base tracking-widest font-medium items-center" style={{ color: customRed }}>
              {navLinks.map(({ label, href }) => (
                <li key={href}>
                  <a
                    href={href}
                    className="hover:border-b-2 pb-1 block"
                    style={{
                      borderColor: customRed
                    }}
                    onClick={() => setMenuOpen(false)}
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </nav>

      {/* HERO */}
      <section
        id="home"
        className="relative h-screen w-full max-h-[80vh] flex items-center justify-center overflow-hidden"
      >
        {/* Animated slideshow background */}
        <HeroSlideshow />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10 text-center text-white max-w-4xl px-4"
        >
          <p
            className="tracking-widest text-sm mb-2"
            style={{ color: customRed }}
          >
            SAFE AND HYGIENIC ROOMS IN TIRUPATI
          </p>

          <h1 className="text-4xl md:text-6xl font-extrabold mb-4">
            Varahaswamy Guest House
          </h1>

          <p className="text-gray-200 text-sm mb-6">
            Address: Tirumala, Tirupati Urban, Andhra Pradesh 517504
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a
              href={`tel:${PHONE_NUMBER}`}
              className=" px-6 py-2 flex items-center justify-center gap-2"
              style={{
                backgroundColor: customRed,
                color: "#fff"
              }}
              onMouseOver={e => {
                e.currentTarget.style.backgroundColor = customRed;
                e.currentTarget.style.color = "#fff";
              }}
              onMouseOut={e => {
                e.currentTarget.style.backgroundColor = "";
                e.currentTarget.style.color = customRed;
              }}
            >
              Call {PHONE_DISPLAY}
            </a>

            {(() => {
              // Custom WhatsApp message for asking about room
              const whatsappMessage = encodeURIComponent(
                `Hello, I am interested in booking a room at Varahaswamy Guest House. Please share room availability and details.`
              );
              const whatsappUrl = `https://wa.me/${PHONE_NUMBER.replace('+', '')}?text=${whatsappMessage}`;
              return (
                <a
                  href={whatsappUrl}
                  className="px-6 py-2 flex items-center justify-center gap-2"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    backgroundColor: customRed,
                    color: "#fff"
                  }}
                  onMouseOver={e => {
                    e.currentTarget.style.backgroundColor = "#e00038";
                  }}
                  onMouseOut={e => {
                    e.currentTarget.style.backgroundColor = customRed;
                  }}
                >
                  <FaWhatsapp className="inline-block" />
                  WhatsApp
                </a>
              );
            })()}
          </div>
        </motion.div>
      </section>

      {/* RED BANNER 1 */}
      <section
        className="text-white text-center py-12"
        style={{
          clipPath: "polygon(0 0,100% 0,100% 70%,50% 100%,0 70%)",
          backgroundColor: customRed
        }}
      >
        <h2 className="text-2xl md:text-4xl font-bold max-w-5xl mx-auto">
          Trusted Hotel in Tirupati Near Tirumala Temple Routes
        </h2>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-20">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">

          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p
              className="tracking-widest mb-2"
              style={{ color: customRed }}
            >
              ABOUT US
            </p>
            <h2 className="text-4xl font-bold mb-4">
              Comfortable Hotel in Tirupati Near Tirumala
            </h2>

            <p className="text-gray-600 mb-4">
              Varahaswamy Guest House offers peaceful and affordable stay for
              pilgrims and families visiting Tirupati.
            </p>

            <p className="text-gray-600 mb-6">
              Designed for comfort, convenience and spiritual surroundings.
            </p>

            {/*
              "Book Now" button as a WhatsApp link with a prefilled message.
              See: src/Home.js context line 368 for message.
            */}
            <a
              href={`https://wa.me/${PHONE_NUMBER.replace("+", "")}?text=${encodeURIComponent(
                "Hello, I am interested in booking a room at Varahaswamy Guest House. Please share room availability and details."
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="border px-6 py-2 hover:text-white rounded-full inline-block"
              style={{
                borderColor: customRed,
                color: customRed,
                backgroundColor: "transparent",
                textDecoration: "none",
                transition: "background 0.15s, color 0.15s"
              }}
              onMouseOver={e => {
                e.currentTarget.style.backgroundColor = customRed;
                e.currentTarget.style.color = "#fff";
              }}
              onMouseOut={e => {
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.color = customRed;
              }}
              aria-label="Book Now via WhatsApp"
            >
              Book Now
            </a>
          </motion.div>

          <motion.img
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            src="/Banner/3.webp"
            className="rounded-lg shadow"
            alt="Varahaswamy Guest House Banner"
          />
        </div>
      </section>

      {/* DARK FEATURES */}
      <section
        className="relative py-24 text-white"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1504215680853-026ed2a45def')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/80" />

        <div className="relative max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl mb-6">
            Ideal Tirupati Hotel Booking for Families & Pilgrims
          </h2>

          <div
            className="h-1 w-40 mx-auto mb-10"
            style={{ backgroundColor: customRed }}
          />

          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 text-sm">
            {/* Optionally, you could add icons here with react-icons if desired,
                but since original had just text, we keep the same unless requested */}
            {["Restaurant", "Dining", "Rooms", "Parking", "WiFi"].map(
              (item) => (
                <div key={item}>{item}</div>
              )
            )}
          </div>
        </div>
      </section>

      {/* RED ROOMS */}
      <section
        id="rooms"
        className="text-white text-center py-16"
        style={{
          clipPath: "polygon(0 0,100% 0,100% 70%,50% 100%,0 70%)",
          backgroundColor: customRed
        }}
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Comfortable Accommodation in Tirupati for Tirumala Devotees
        </h2>
      </section>

      <p className="max-w-6xl text-sm text-center mx-auto mt-10">Varahaswamy Guest House offers clean and well-maintained rooms in Tirupati for pilgrims looking for peaceful accommodation in Tirupati. Ideal for tirupati room booking and tirumala room booking, our rooms are a preferred choice for guests searching for a reliable hotel in Tirupati and convenient tirumala hotel booking near temple routes.</p>

      {/* ROOMS GRID */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-6">
          {[
            {
              name: "AC ROOM with 2 BED",
              description: "BREAKFAST LUNCH DINNER GST INCLUDED",
              price: 1650,
              image: "/Rooms/0.webp",
            },
            {
              name: "NON AC Room with 2 BED",
              description: "BREAKFAST LUNCH DINNER GST INCLUDED",
              price: 1250,
              image: "/Rooms/group.jpeg",
            },
            {
              name: "AC ROOM with 3 BED",
              description: "BREAKFAST LUNCH DINNER GST INCLUDED",
              price: 2050,
              image: "/Rooms/2.webp",
            },
            {
              name: "NON AC ROOM with 3 BED",
              description: "BREAKFAST LUNCH DINNER GST INCLUDED",
              price: 1750,
              image: "/Rooms/3.webp",
            },
            {
              name: "AC ROOM with 4 BED",
              description: "BREAKFAST LUNCH DINNER GST INCLUDED",
              price: 2550,
              image: "/Rooms/4bed2.avif",
            },
            {
              name: "NON AC ROOM with 4 BED",
              description: "BREAKFAST LUNCH DINNER GST INCLUDED",
              price: 2250,
              image: "/Rooms/1.webp",
            },
            {
              name: "GROUP STAY",
              description: "BREAKFAST LUNCH DINNER GST INCLUDED",
              price: 3050,
              image: "/Rooms/4bed.jpeg",
            },
            {
              name: "FAMILY STAY",
              description: "BREAKFAST LUNCH DINNER GST INCLUDED",
              price: 2600,
              image: "/Rooms/2.webp",
            },
          ].map((room, i) => {
            // WhatsApp message without price
            const whatsappMessage = encodeURIComponent(
              `Hello, I am interested in booking a ${room.name}. Please let me know the details.`
            );
            const whatsappUrl = `https://wa.me/${PHONE_NUMBER.replace(
              /\D/g,
              ""
            )}?text=${whatsappMessage}`;

            return (
              <motion.div
                key={i}
                whileHover={{ scale: 1.05 }}
                className="rounded overflow-hidden flex flex-col h-full  "
              >
                <img
                  src={room.image}
                  className="h-48 w-full object-cover"
                  alt={room.name}
                />
                <div
                  className="text-white p-5 text-center flex flex-col flex-grow justify-between pb-16"
                  style={{
                    clipPath: "polygon(0 0,100% 0,100% 85%,50% 100%,0 85%)",
                    backgroundColor: customRed,
                  }}
                >
                  <h3 className="font-bold mb-1 uppercase">{room.name}</h3>
                  <div className="mb-2 text-xs tracking-wide">{room.name}</div>
                  <p className="text-xs mb-3">{room.description}</p>

                  <div
                    className="text-white rounded-full px-4 py-1 inline-block text-sm font-semibold mb-4"
                  >
                    Rs.{room.price} <span className="text-xs font-normal">/ day</span>
                  </div>
                  <div className="flex flex-col gap-2">
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-full w-full bg-white text-lg font-bold py-2 flex items-center justify-center gap-2"
                      style={{ color: customRed, textDecoration: "none" }}
                    >
                      <FaWhatsapp className="text-2xl" />
                      Book Now
                    </a>
                    <a
                      href={`tel:${PHONE_NUMBER}`}
                      className="rounded-full w-full bg-white text-lg font-bold py-2 flex items-center justify-center"
                      style={{ color: customRed, textDecoration: 'none' }}
                    >
                      Call Now
                    </a>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="bg-gray-900 text-white py-24">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-10 items-center">

          <div>
            <p
              className="mb-2"
              style={{ color: customRed }}
            >
              OUR SERVICES & FACILITIES
            </p>
            <h2 className="text-4xl font-bold mb-4">
              Your Reliable Stay for Tirupati Darshan
            </h2>
            <p className="text-gray-400">
              Our guest house provides spacious and well-ventilated rooms in Tirupati, suitable for families, couples, and solo travelers. Each room is designed to ensure a restful stay for pilgrims.
            </p>
          </div>


          <img
            src="/Banner/2.webp"
            className="rounded-lg shadow"
            alt="Varahaswamy Guest House Service"
          />

          <div className="space-y-4">
            <div>
              <h4 className="font-semibold" style={{ color: customRed }}>
                Clean & Hygienic Environment
              </h4>
              <p className="text-gray-400 text-sm">
                Regular housekeeping ensuring safe and hygienic stay for families and devotees.
              </p>
            </div>
            <div>
              <h4 className="font-semibold" style={{ color: customRed }}>
                Easy Tirupati Room Booking
              </h4>
              <p className="text-gray-400 text-sm">
                Hassle-free tirupati hotel booking support with quick check-in and assistance.
              </p>
            </div>
            <div>
              <h4 className="font-semibold" style={{ color: customRed }}>
                Prime Location in Tirupati
              </h4>
              <p className="text-gray-400 text-sm">
                Conveniently located hotel in Tirupati with easy access to Tirumala routes and transport.
              </p>
            </div>
            <div>
              <h4 className="font-semibold" style={{ color: customRed }}>
                24/7 Guest Support
              </h4>
              <p className="text-gray-400 text-sm">
                Round-the-clock assistance for room needs, travel queries, and comfort.
              </p>
            </div>
          </div>
        </div>

     

        <div className="text-center mt-10">
          <a
            href={`https://wa.me/${PHONE_NUMBER.replace("+", "")}?text=${encodeURIComponent(
              "Hello, I am interested in booking a room at Varahaswamy Guest House. Please share room availability and details."
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-2 rounded-full inline-block"
            style={{
              backgroundColor: customRed,
              color: "#fff",
              textDecoration: "none",
              transition: "background 0.15s, color 0.15s"
            }}
            onMouseOver={e => {
              e.currentTarget.style.backgroundColor = "#e00038";
            }}
            onMouseOut={e => {
              e.currentTarget.style.backgroundColor = customRed;
            }}
            aria-label="Book Now via WhatsApp"
          >
            Book Now
          </a>
        </div>
      </section>
      <section
        className="text-white text-center py-12"
        style={{
          clipPath: "polygon(0 0,100% 0,100% 70%,50% 100%,0 70%)",
          backgroundColor: customRed
        }}
      >
        <h2 className="text-2xl md:text-4xl font-bold max-w-5xl mx-auto">
        Your Reliable Stay for Tirupati and Tirumala Darshan
        </h2>
      </section>

      {/* GALLERY */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          {/* <h2 className="text-center text-4xl font-bold mb-10">
            Your Reliable Stay for Tirupati and Tirumala Darshan
          </h2> */}

          <div className="grid md:grid-cols-4 gap-6">
            {[4, 5, 6, 7].map((i) => (
              <div
                key={i}
                className="aspect-square w-full h-64 flex justify-center items-center overflow-hidden rounded shadow"
                style={{ minWidth: "0" }}
              >
                <img
                  src={`/Banner/${i}.webp`}
                  className="object-cover w-full h-full"
                  alt={`Gallery ${i}`}
                  style={{ display: "block" }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-10">

          <div>
            <p
              className="mb-2"
              style={{ color: customRed }}
            >
              Contact Us
            </p>
            <h2 className="text-4xl font-bold mb-4">
              Easy Tirupati & Tirumala Room Booking for Devotees
            </h2>

            <p className="text-gray-600 mb-6">
              Plan your spiritual journey with confidence. Choose Varahaswamy Guest House, a reliable hotel in Tirupati, for a comfortable and peaceful stay near Tirumala.
            </p>

            <ul className="text-gray-700 mb-6 list-disc list-inside">
              <li>Perfect for Tirupati &amp; Tirumala visitors</li>
              <li>Comfortable rooms in Tirupati</li>
            </ul>

            <a  className="text-gray-700 mb-6" href={"mailto:support@varaswami.site"} >
                support@varaswami.site
            </a>

            <a
              href={`https://wa.me/${PHONE_NUMBER.replace("+", "")}?text=${encodeURIComponent(
                "Hello, I am interested in booking a room at Varahaswamy Guest House. Please share room availability and details."
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white px-6 py-2 rounded-full w-fit flex items-center gap-2"
              style={{
                backgroundColor: customRed,
                textDecoration: "none",
                transition: "background 0.15s, color 0.15s"
              }}
              onMouseOver={e => {
                e.currentTarget.style.backgroundColor = "#e00038";
              }}
              onMouseOut={e => {
                e.currentTarget.style.backgroundColor = customRed;
              }}
              aria-label="Contact Us via WhatsApp"
            >
              <FaWhatsapp className="inline-block" />
              Contact Us
            </a>
          </div>

     

<iframe 
            className="w-full h-80 rounded"

src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d7753.044016237839!2d79.347729!3d13.686804!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bb2ca9d201aaaab%3A0xfeb439bc17eb84bc!2sVarahaswamy%20Guest%20house!5e0!3m2!1sen!2sin!4v1769427085454!5m2!1sen!2sin" 
title="Tirupati Map"

></iframe>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-black text-gray-400 py-10 text-center text-sm">
        <div
          className="flex justify-center gap-10 mb-6"
          style={{ color: customRed }}
        >
          <a href="/privacy-policy">Privacy Policy</a>
          <a href="/disclaimer">Disclaimer</a>
          <a href="/terms-and-conditions">Terms & Conditions</a>
        </div>

        <p>© 2026 Created with Varahaswamy Guest House</p>
      </footer>
    </div>
  );
}
