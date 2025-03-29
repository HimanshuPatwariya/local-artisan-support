'use client';

import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useState } from 'react';

export default function Header() {
  const { user, signInWithGoogle, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleAuth = async () => {
    if (user) {
      await logout();
    } else {
      await signInWithGoogle();
    }
  };

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-blue-600">
            CraftHub
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link href="/" className="text-gray-700 hover:text-blue-600">
              Home
            </Link>
            <Link href="/artisans" className="text-gray-700 hover:text-blue-600">
              Artisans
            </Link>
            <Link href="/marketplace" className="text-gray-700 hover:text-blue-600">
              Marketplace
            </Link>
            <Link href="/community" className="text-gray-700 hover:text-blue-600">
              Community
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-blue-600">
              About
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-blue-600">
              Contact
            </Link>
          </nav>

          {/* User Profile / Auth Button */}
          <div className="flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                <div className="relative w-10 h-10">
                  <img
                    src={user.photoURL || 'https://img.icons8.com/?size=100&id=tZuAOUGm9AuS&format=png&color=000000'}
                    alt={user.displayName || 'User'}
                    className="rounded-full w-full h-full object-cover"
                  />
                </div>
                <span className="text-gray-700">{user.displayName}</span>
                <button
                  onClick={handleAuth}
                  className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <button
                onClick={handleAuth}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                Sign In
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              href="/"
              className="block px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-100 rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/artisans"
              className="block px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-100 rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              Artisans
            </Link>
            <Link
              href="/marketplace"
              className="block px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-100 rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              Marketplace
            </Link>
            <Link
              href="/community"
              className="block px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-100 rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              Community
            </Link>
            <Link
              href="/about"
              className="block px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-100 rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link
              href="/contact"
              className="block px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-100 rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
          </div>
        </div>
      )}
    </header>
  );
} 