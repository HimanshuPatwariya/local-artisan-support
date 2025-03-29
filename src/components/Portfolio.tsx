'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useAuth } from '@/context/AuthContext';

interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  category: string;
  date: string;
}

interface Testimonial {
  id: string;
  clientName: string;
  clientPhoto: string;
  content: string;
  rating: number;
  date: string;
}

interface PortfolioProps {
  items: PortfolioItem[];
  testimonials: Testimonial[];
  onAddItem?: (item: Omit<PortfolioItem, 'id' | 'date'>) => Promise<void>;
  onAddTestimonial?: (testimonial: Omit<Testimonial, 'id' | 'date'>) => Promise<void>;
}

export default function Portfolio({
  items,
  testimonials,
  onAddItem,
  onAddTestimonial,
}: PortfolioProps) {
  const { user } = useAuth();
  const [isAddingItem, setIsAddingItem] = useState(false);
  const [isAddingTestimonial, setIsAddingTestimonial] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = ['all', ...new Set(items.map(item => item.category))];

  const filteredItems = selectedCategory === 'all'
    ? items
    : items.filter(item => item.category === selectedCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Portfolio Section */}
      <div className="mb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Portfolio</h2>
          {user && (
            <button
              onClick={() => setIsAddingItem(!isAddingItem)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              {isAddingItem ? 'Cancel' : 'Add Work'}
            </button>
          )}
        </div>

        {/* Category Filter */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium ${
                selectedCategory === category
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div key={item.id} className="bg-white rounded-lg shadow overflow-hidden">
              <div className="relative h-48">
                <Image
                  src={item.imageUrl}
                  alt={item.title}
                  fill
                  className="object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = 'https://img.icons8.com/?size=100&id=tZuAOUGm9AuS&format=png&color=000000';
                  }}
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm mb-2">{item.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">{item.category}</span>
                  <span className="text-sm text-gray-500">
                    {new Date(item.date).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Testimonials Section */}
      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Testimonials</h2>
          {user && (
            <button
              onClick={() => setIsAddingTestimonial(!isAddingTestimonial)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              {isAddingTestimonial ? 'Cancel' : 'Add Testimonial'}
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center space-x-3 mb-4">
                <img
                  src={testimonial.clientPhoto}
                  alt={testimonial.clientName}
                  className="h-10 w-10 rounded-full"
                />
                <div>
                  <p className="font-medium text-gray-900">{testimonial.clientName}</p>
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`h-4 w-4 ${
                          i < testimonial.rating ? 'text-yellow-400' : 'text-gray-300'
                        }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                    <span className="ml-2 text-sm text-gray-500">
                      {new Date(testimonial.date).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
              <p className="text-gray-600">{testimonial.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 