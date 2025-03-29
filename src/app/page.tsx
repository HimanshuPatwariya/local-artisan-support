'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import Link from 'next/link';
import { dummyArtisans } from '@/data/dummyData';
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

export default function Home() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState(searchParams.get('q') || '');
  const [artisans, setArtisans] = useState<Artisan[]>([]);
  const [filteredArtisans, setFilteredArtisans] = useState<Artisan[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call with dummy data
    const fetchArtisans = async () => {
      try {
        // In a real app, this would be a Firebase call
        // const querySnapshot = await getDocs(collection(db, 'artisans'));
        // const artisansData = querySnapshot.docs.map(doc => ({
        //   id: doc.id,
        //   ...doc.data()
        // })) as Artisan[];
        
        // Using dummy data instead
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
    // Filter artisans based on search query
    if (!search.trim()) {
      setFilteredArtisans(artisans);
      return;
    }

    const query = search.toLowerCase().trim();
    const filtered = artisans.filter(artisan => 
      artisan.name.toLowerCase().includes(query) ||
      artisan.craft.toLowerCase().includes(query) ||
      artisan.description.toLowerCase().includes(query) ||
      artisan.story.toLowerCase().includes(query) ||
      artisan.products.some(product => 
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query)
      )
    );
    setFilteredArtisans(filtered);
  }, [search, artisans]);

  const handleSearch = () => {
    router.push(`/?q=${encodeURIComponent(search)}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Welcome to CraftHub
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Discover and connect with talented artisans, explore unique handmade crafts, and support local craftsmanship.
        </p>
      </div>

      <div className="max-w-2xl mx-auto mb-12">
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Search for artisans or crafts..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          />
          <button
            onClick={handleSearch}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Search
          </button>
        </div>
      </div>

      {loading ? (
        <div className="text-center">Loading artisans...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredArtisans.length === 0 ? (
            <div className="col-span-full text-center text-gray-500">
              No artisans found matching your search. Try different keywords.
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
                  <p className="text-gray-600 mb-4">{artisan.craft}</p>
                  <p className="text-gray-500 line-clamp-2">{artisan.description}</p>
                </div>
              </Link>
            ))
          )}
        </div>
      )}

      <ChatWidget />
    </div>
  );
}
