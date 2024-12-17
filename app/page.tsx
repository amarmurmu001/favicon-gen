import React from 'react';
import Navbar from '../components/Navbar';

function HomePage() {
  return (
    <div>
      <header className="text-center py-10 bg-gray-100">
        <h1 className="text-4xl font-bold">Favicon Generator</h1>
        <p className="mt-4 text-lg">The only favicon generator you need for your next project.</p>
      </header>
      <section className="py-10">
        <h2 className="text-3xl text-center">Features</h2>
        <div className="flex flex-col items-center mt-6">
          <div className="max-w-md text-center">
            <h3 className="text-2xl font-semibold">Image to Favicon</h3>
            <p>Convert your images or logos into the proper favicon format.</p>
          </div>
          <div className="max-w-md text-center mt-6">
            <h3 className="text-2xl font-semibold">Text to Favicon</h3>
            <p>Generate a favicon from scratch using text.</p>
          </div>
          <div className="max-w-md text-center mt-6">
            <h3 className="text-2xl font-semibold">Emoji Favicon</h3>
            <p>Choose from hundreds of emojis to create your favicon.</p>
          </div>
        </div>
      </section>
      <footer className="text-center py-6 bg-gray-200">
        <p>Designed & Created by Amar Murmu</p>
      </footer>
    </div>
  );
}

export default HomePage;