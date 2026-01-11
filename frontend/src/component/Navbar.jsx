import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";

const Navbar= () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => setIsOpen(!isOpen);

  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <nav className="bg-white shadow-md fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold text-green-600">
              ServeceBooking
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-gray-700 hover:text-green-600">
              Home
            </Link>
            <Link to="/category" className="text-gray-700 hover:text-green-600">
              Category
            </Link>

            {!user ? (
              <>
                <Link
                  to="/"
                  className="px-4 py-2 text-white bg-green-600 rounded hover:bg-green-700 transition"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 text-green-600 border border-green-600 rounded hover:bg-green-50 transition"
                >
                  Register
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/booking-success"
                  className="px-4 py-2 text-white bg-green-600 rounded hover:bg-green-700 transition"
                >
                  My Bookings
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <button onClick={toggleMenu} className="text-gray-700">
              {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-md">
          <Link
            to="/"
            className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
            onClick={toggleMenu}
          >
            Home
          </Link>
          <Link
            to="/category"
            className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
            onClick={toggleMenu}
          >
            Category
          </Link>

          {!user ? (
            <>
              <Link
                to="/"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                onClick={toggleMenu}
              >
                Login
              </Link>
              <Link
                to="/register"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                onClick={toggleMenu}
              >
                Register
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/booking-success"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                onClick={toggleMenu}
              >
                My Bookings
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
