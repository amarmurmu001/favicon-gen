"use client"
import Link from 'next/link';
import React, { useEffect } from 'react';

const Navbar = () =>{
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
    
return (
    <div className="navbar bg-base-100">
      <Link href="/" className="px-10 normal-case text-xl">Favicon Generator</Link>
      <div className="flex-1">
        <Link href="/text-to-favicon" className="btn btn-ghost">Text to Favicon</Link>
        <Link href="/png-to-favicon" className="btn btn-ghost">PNG to Favicon</Link>
        <Link href="/emoji-to-favicon" className="btn btn-ghost">Emoji to Favicon</Link>
      </div>
      <div className="flex-none">
        <button onClick={toggleTheme} className="btn">
          Toggle Theme
        </button>
      </div>
    </div>
  );
}  
  export default Navbar;
  