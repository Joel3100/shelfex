import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import logo from "./../assets/shelfex.png";
import bg1 from "./../assets/library-bg1.jpeg";
import bg2 from "./../assets/library-bg2.jpg";
import bg3 from "./../assets/library-bg3.jpg";
import books from "./../data/authors.json";

export default function LandingPage() {
  const images = [bg1, bg2, bg3];
  const [current, setCurrent] = useState(0);

  // Preloading all images once on mount to ensure smooth transitions
  useEffect(() => {
    images.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  // Slidehow interval every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="flex flex-col min-h-screen"
      style={{
        backgroundImage: `linear-gradient(rgba(15,23,42,0.65), rgba(15,23,42,0.75)), url(${images[current]})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        transition: "background-image 0.8s ease-in-out",
      }}
    >
      {/* Navbar */}
      <nav className="flex items-center justify-between px-10 py-5 bg-slate-900">
        <Link to="/" className="flex items-center gap-2">
          {/* 
            <img
            src={logo}
            alt=""
            className="object-contain w-8 h-8 mix-blend-screen"
          />
          */}

          <span className="text-3xl font-bold text-slate-400">Shelfex</span>
        </Link>

        <div className="flex items-center gap-8 text-sm font-medium text-slate-500">
          <Link to="/library" className="transition hover:text-white">
            Library
          </Link>
          <Link to="/about" className="transition hover:text-white">
            About Us
          </Link>
          <Link to="/contact" className="transition hover:text-white">
            Contact Us
          </Link>
          <Link
            to="/signup"
            className="px-5 py-2 text-white transition bg-blue-600 rounded-full hover:bg-blue-500"
          >
            Sign Up
          </Link>
        </div>
      </nav>

      {/* Hero Content */}
      <div className="flex items-center flex-1 gap-16 px-16">
        {/* Left Column ─ Content */}
        <div className="flex flex-col flex-1">
          {/* Badge */}
          <div className="flex items-center gap-2 px-4 py-2 mb-8 text-xs border rounded-full border-slate-700 text-slate-300 bg-slate-800 w-fit">
            <span>⭐</span>
            <span>Curated Biblical & Theological Books</span>
          </div>

          {/* Main Title */}
          <h1 className="mb-6 text-6xl font-bold leading-tight text-white">
            Explore{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-cyan-500">
              The Reformed
            </span>
            <br />
            Theology Library.
          </h1>

          {/* Subtitle */}
          <p className="mb-5 text-2xl font-semibold text-slate-300">
            Good Christian Books Shelf
          </p>

          {/* Description */}
          <p className="max-w-3xl mb-10 leading-relaxed text-slate-300 text-md drop-shadow-lg">
            Browse <span className="font-medium text-white">15 Books</span> and{" "}
            <span className="font-medium text-white">7 Authors</span> from the
            Reformed tradition and theology ─ from John Calvin to R.C Sproul,
            spanning the Reformation to the modern era. Strengthen your faith
            and deepen your understanding of Scripture with trusted theology
            resources.
          </p>

          {/* CTA Buttons */}
          <div className="flex gap-4">
            <Link
              to="/library"
              className="px-8 py-3 text-lg font-bold text-white transition-all duration-200 bg-blue-600 rounded-full hover:bg-blue-500 hover:scale-105"
            >
              Browse Library →
            </Link>
            <Link
              to="/about"
              className="px-8 py-3 text-lg font-medium transition-all duration-200 border rounded-full border-slate-400 text-slate-300 hover:border-slate-300 hover:text-white"
            >
              Learn More
            </Link>
          </div>

          {/* Stats */}
          <div className="flex gap-10 mt-16 text-sm text-slate-400">
            <div>
              <p className="text-3xl font-bold text-white">4</p>
              <p>Books</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-white">7</p>
              <p>Authors</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-white">4</p>
              <p>Categories</p>
            </div>
          </div>
        </div>

        {/*
          
        */}
      </div>

      {/* Carousel Indicators */}
      <div className="flex justify-center gap-2 mt-8 mb-3">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`h-2 rounded-full transition-none duration-300 ${current === index ? "bg-blue-400 w-6" : "bg-slate-500 w-2"}`}
          ></button>
        ))}
      </div>
    </div>
  );
}
