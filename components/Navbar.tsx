"use client";
import Link from 'next/link';
import React, { useState, useEffect } from 'react';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  const toggleTheme = () => {
    const currentTheme = localStorage.getItem('theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="navbar bg-base-100">
      <Link href="/" className="px-10 normal-case text-xl">Favicon Generator</Link>
      
      <div className="flex-1 hidden md:flex">
        <Link href="/text-to-favicon" className="btn btn-ghost">Text to Favicon</Link>
        <Link href="/png-to-favicon" className="btn btn-ghost">PNG to Favicon</Link>
        <Link href="/emoji-to-favicon" className="btn btn-ghost">Emoji to Favicon</Link>
      </div>

      <div className="flex-none hidden md:flex">
        <button onClick={toggleTheme} className="btn">
          Toggle Theme
        </button>
      </div>

      {/* Mobile Menu Button */}
      <div className="md:hidden flex items-center">
        <button onClick={toggleMobileMenu} className="btn btn-ghost">
          ☰
        </button>
      </div>

      {/* Overlay Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 md:hidden">
          <div className="flex justify-end p-4">
            <button onClick={toggleMobileMenu} className="btn btn-ghost">
              ✕
            </button>
          </div>
          <div className="flex flex-col items-center space-y-6 text-white">
            <Link href="/text-to-favicon" className="text-lg" onClick={toggleMobileMenu}>Text to Favicon</Link>
            <Link href="/png-to-favicon" className="text-lg" onClick={toggleMobileMenu}>PNG to Favicon</Link>
            <Link href="/emoji-to-favicon" className="text-lg" onClick={toggleMobileMenu}>Emoji to Favicon</Link>
            <button onClick={toggleTheme} className="btn btn-ghost text-lg">Toggle Theme</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Navbar;
