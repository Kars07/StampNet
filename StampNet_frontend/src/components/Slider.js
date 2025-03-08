import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "../styles/Slider.css"; // Import your CSS file

const Slides = [
  {
    src: "/images/developer.jpg",
    label: "Data Integrity",
    content: "StampNet makes use of Arbitrum blockchain timestamping which enforces the authenticity and integrity of your data, safeguarding against tampering and unauthorized access."
  },
  {
    src: "/images/designer.jpg",
    label: "Enhanced Trust",
    content: "Build credibility by providing immutable proof of document existence and integrity."
  },
  {
    src: "/images/marketer.jpg",
    label: "Immutable Records",
    content: "Every timestamped document is permanently recorded, making it impossible to alter historical data."
  },
  {
    src: "/images/editor.jpg",
    label: "Easy Verification",
    content: "Users can instantly verify document authenticity via the blockchain, ensuring transparency."
  },
  {
    src: "/images/gamer.jpg",
    label: "User Authenticity",
    content: "Verify ownership and authorship of documents securely, protecting against forgery."
  },
];

const Slider = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="slide-container">
      <div className="slide-wrapper">
        <h1>Why choose StampNet?</h1>
        <Swiper
          key={windowWidth} // Forces re-render on resize
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={20}
          slidesPerView={3} // Default: 3 slides on large screens
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000 }}
          loop={true}
          breakpoints={{
            1024: { slidesPerView: 3, spaceBetween: 20 }, // Laptops: 3 slides
            768: { slidesPerView: 2, spaceBetween: 15 }, // Tablets: 2 slides
            0: { slidesPerView: 1, spaceBetween: 10 }, // Mobile: 1 slide
          }}
        >
          {Slides.map((slide, index) => (
            <SwiperSlide key={index}>
              <div className="slide-item">
                <a className="slide-link">
                  <img src={slide.src} alt={slide.label} className="slide-image" />
                  <p className={`slide-badge ${slide.label.toLowerCase().replace(/\s/g, "-")}`}>
                    {slide.label}
                  </p>
                  <h2 className="slide-title">{slide.content}</h2>
                </a>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Slider;