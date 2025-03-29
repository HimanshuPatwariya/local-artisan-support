'use client';

import { useState, useEffect } from 'react';
import { dummyArtisans } from '@/data/dummyData';
import Link from 'next/link';
import ChatWidget from '@/components/ChatWidget';

interface Artisan {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  craft: string;
  story: string;
  products: Array<{
    id: string;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
  }>;
}

export default function ArtisansPage() {
  const [artisans, setArtisans] = useState<Artisan[]>([]);
  const [filteredArtisans, setFilteredArtisans] = useState<Artisan[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCraft, setSelectedCraft] = useState('');
  const [sortBy, setSortBy] = useState('name');

  // Get unique crafts for filter dropdown
  const uniqueCrafts = Array.from(new Set(dummyArtisans.map(artisan => artisan.craft)));

  useEffect(() => {
    // Simulate API call
    const fetchArtisans = async () => {
      try {
        setArtisans(dummyArtisans);
        setFilteredArtisans(dummyArtisans);
      } catch (error) {
        console.error('Error fetching artisans:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchArtisans();
  }, []);

  useEffect(() => {
    let filtered = [...artisans];

    // Apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(artisan =>
        artisan.name.toLowerCase().includes(term) ||
        artisan.craft.toLowerCase().includes(term) ||
        artisan.description.toLowerCase().includes(term)
      );
    }

    // Apply craft filter
    if (selectedCraft) {
      filtered = filtered.filter(artisan => artisan.craft === selectedCraft);
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'craft':
          return a.craft.localeCompare(b.craft);
        case 'products':
          return b.products.length - a.products.length;
        default:
          return 0;
      }
    });

    setFilteredArtisans(filtered);
  }, [artisans, searchTerm, selectedCraft, sortBy]);

  if (loading) {
    return <div className="text-center py-12">Loading artisans...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Artisans</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Discover talented artisans from around the world, each bringing their unique craft and story to life.
        </p>
      </div>

      {/* Filters and Search */}
      <div className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <input
            type="text"
            placeholder="Search artisans..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
          />
        </div>
        <div>
          <select
            value={selectedCraft}
            onChange={(e) => setSelectedCraft(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
          >
            <option value="">All Crafts</option>
            {uniqueCrafts.map(craft => (
              <option key={craft} value={craft}>{craft}</option>
            ))}
          </select>
        </div>
        <div>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
          >
            <option value="name">Sort by Name</option>
            <option value="craft">Sort by Craft</option>
            <option value="products">Sort by Products</option>
          </select>
        </div>
      </div>

      {/* Results Count */}
      <div className="mb-6 text-gray-600">
        Found {filteredArtisans.length} artisan{filteredArtisans.length !== 1 ? 's' : ''}
      </div>

      {/* Artisans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredArtisans.length === 0 ? (
          <div className="col-span-full text-center text-gray-500">
            No artisans found matching your criteria. Try adjusting your filters.
          </div>
        ) : (
          filteredArtisans.map((artisan) => (
            <Link
              key={artisan.id}
              href={`/artisan/${artisan.id}`}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="aspect-w-16 aspect-h-9">
                <img
                  src={artisan.imageUrl}
                  alt={artisan.name}
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  {artisan.name}
                </h2>
                <p className="text-blue-600 mb-4">{artisan.craft}</p>
                <p className="text-gray-500 line-clamp-2 mb-4">{artisan.description}</p>
                <div className="flex justify-between items-center text-sm text-gray-500">
                  <span>{artisan.products.length} products</span>
                  <span>View Profile →</span>
                </div>
              </div>
            </Link>
          ))
        )}
      </div>

      <ChatWidget />
    </div>
  );
} 