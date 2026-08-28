import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getBooks, getAuthors, getCategories } from "../services/api";
import bg1 from "./../assets/library-bg1.jpeg";
import bg2 from "./../assets/library-bg2.jpg";
import bg3 from "./../assets/library-bg3.jpg";

export default function LandingPage() {
  const images = [bg1, bg2, bg3];
  const [current, setCurrent] = useState(0);
  const [stats, setStats] = useState({
    books: 0,
    authors: 0,
    categories: 0,
  });

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

  useEffect(() => {
    async function loadStats() {
      try {
        const [booksRes, authorsRes, categoriesRes] = await Promise.all([
          getBooks(),
          getAuthors(),
          getCategories(),
        ]);
        setStats({
          books: booksRes.data.length,
          authors: authorsRes.data.length,
          categories: categoriesRes.data.length,
        });
      } catch {
        // Keep default 0 values if API fails
      }
    }
    loadStats();
  }, []);

  return (
    <div
      className="flex flex-col min-h-screen"
      style={{
        backgroundImage: `linear-gradient(rgba(15,23,42,0.70), rgba(15,23,42,0.75)), url(${images[current]})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        transition: "background-image 0.8s ease-in-out",
        backgroundAttachment: "scroll",
      }}
    >
      {/* Navbar */}
      <nav className="flex items-center justify-between px-4 py-4 md:px-10 bg-slate-900">
        <Link to="/library" className="flex items-center gap-2">
          {/* <img
            src={logo}
            alt="Shelfex"
            className="object-contain h-7 w-7 mix-blend-screen"
          />
          */}
          <span className="text-lg font-bold text-white">Shelfex</span>
        </Link>

        {/* Links — hidden on mobile */}
        <div className="items-center hidden gap-8 text-sm font-medium md:flex text-slate-300">
          <Link to="/library" className="transition hover:text-white">
            Library
          </Link>
          <Link to="/about" className="transition hover:text-white">
            About
          </Link>
          <Link to="/contact" className="transition hover:text-white">
            Contact
          </Link>
          <Link
            to="/signup"
            className="px-5 py-2 text-white transition bg-blue-600 rounded-full hover:bg-blue-500"
          >
            Sign Up
          </Link>
        </div>

        {/* Mobile — just show Library button */}
        <div className="flex items-center gap-3 md:hidden">
          <Link
            to="/signup"
            className="px-4 py-2 text-sm text-white bg-blue-600 rounded-full"
          >
            Register
          </Link>
        </div>
      </nav>
      {/* Hero Content */}
      <div className="flex flex-col items-start justify-center flex-1 px-6 py-8 md:px-16">
        {/* Badge */}
        <div className="flex items-center gap-2 px-3 mb-6 text-xs border rounded-full py-1.5 bg-slate-800 border-slate-700 text-slate-300 w-fit">
          <span>⭐</span>
          <span>Curated Biblical & Theological Books</span>
          <span className="sm:hidden">Reformed Theology</span>
        </div>

        {/* Main Title */}
        <h1 className="mb-4 text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl lg:text-6xl">
          Explore{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-cyan-500">
            The Reformed
          </span>
          <br />
          Theology Library
        </h1>

        {/* Subtitle */}
        <p className="mb-3 text-base font-semibold text-slate-300 md:text-xl">
          Good Christian Books Shelf
        </p>

        {/* Description */}
        <p className="max-w-lg mb-8 text-sm leading-relaxed text-slate-300 md:text-base">
          Browse <span className="font-medium text-white">15 Books</span> and{" "}
          <span className="font-medium text-white">7 Authors</span> from the
          Reformed tradition and theology ─ from John Calvin to R.C Sproul,
          spanning the Reformation to the modern era. Strengthen your faith and
          deepen your understanding of Scripture with trusted theology
          resources.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-wrap gap-3 mb-10">
          <Link
            to="/library"
            className="px-6 py-3 text-sm font-bold text-white transition-all duration-200 bg-blue-600 rounded-full hover:bg-blue-500 hover:scale-105 md:text-lg"
          >
            Browse Library →
          </Link>
          <Link
            to="/about"
            className="px-6 py-3 text-sm font-medium transition-all duration-200 border rounded-full border-slate-400 text-slate-300 hover:border-white hover:text-white md:text-lg hover:scale-105"
          >
            Learn More
          </Link>
        </div>

        <div className="flex gap-8 text-sm text-slate-400">
          <div>
            <p className="text-2xl font-bold text-white md:text-3xl">
              {stats.books}
            </p>
            <p>Books</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-white md:text-3xl">
              {stats.authors}
            </p>
            <p>Authors</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-white md:text-3xl">
              {stats.categories}
            </p>
            <p>Categories</p>
          </div>
        </div>
      </div>

      {/* Carousel Indicators */}
      <div className="flex justify-center gap-2 mt-4 mb-3">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`h-2 rounded-full transition-none duration-300 ${current === index ? "bg-blue-400 w-6" : "bg-slate-500 w-2"}`}
          />
        ))}
      </div>
    </div>
  );
}
