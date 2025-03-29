// File: /components/Header.tsx
import React from "react";

const Header = () => {
  return (
    <header className="w-full bg-blue-600 text-white p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">Local Artisan Support</h1>
      <nav>
        <ul className="flex gap-4">
          <li><a href="/" className="hover:underline">Home</a></li>
          <li><a href="/about" className="hover:underline">About</a></li>
          <li><a href="/contact" className="hover:underline">Contact</a></li>
        </ul>
      </nav>
    </header>
  );
};