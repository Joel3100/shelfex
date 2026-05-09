import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import logo from "../../assets/shelfex.png";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="relative px-10 py-6 bg-slate-900" ref={menuRef}>
      <div className="flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img src="" alt="" />
          <span className="text-3xl font-bold text-gray-100">
            Shelfex{" "}
            <span className="text-xs text-slate-500">Reformed Library</span>
          </span>
        </Link>

        {/* Hamburger Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex flex-col gap-1 p-2 text-white"
        >
          <span className="block w-6 h-0.5 bg-white"></span>
          <span className="block w-6 h-0.5 bg-white"></span>
          <span className="block w-6 h-0.5 bg-white"></span>
        </button>

        {/* Dropdown Menu */}
        {isOpen && (
          <div className="absolute right-0 z-50 w-48 py-2 bg-white shadow-xl rounded-xl top-full">
            <Link
              to="/library"
              onClick={() => setIsOpen(false)}
              className="block px-4 py-2 text-gray-900 hover:text-gray-400"
            >
              📚 Library
            </Link>
            <Link
              to="/about"
              onClick={() => setIsOpen(false)}
              className="block px-4 py-2 text-gray-900 hover:text-gray-400"
            >
              ℹ️ About
            </Link>
            <Link
              to="/contact"
              onClick={() => setIsOpen(false)}
              className="block px-4 py-2 text-gray-900 hover:text-gray-400"
            >
              ✉️ Contact
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
