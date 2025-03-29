'use client';

import { useState } from 'react';
import Reviews from '@/components/Reviews';
import Blog from '@/components/Blog';
import Forum from '@/components/Forum';

// Dummy data for initial rendering
const dummyReviews = [
  {
    id: '1',
    userId: 'user1',
    userName: 'John Doe',
    userPhoto: 'https://img.icons8.com/?size=100&id=tZuAOUGm9AuS&format=png&color=000000',
    rating: 5,
    comment: 'Amazing craftsmanship! The attention to detail is incredible.',
    date: '2024-03-15',
  },
  // Add more dummy reviews as needed
];

const dummyBlogPosts = [
  {
    id: '1',
    artisanId: 'artisan1',
    artisanName: 'Sarah Smith',
    artisanPhoto: 'https://img.icons8.com/?size=100&id=tZuAOUGm9AuS&format=png&color=000000',
    title: 'The Art of Handmade Pottery',
    content: 'In this post, I share my journey with pottery and some tips for beginners...',
    imageUrl: 'https://images.unsplash.com/photo-1578500494198-246f612d3b3d',
    date: '2024-03-15',
    tags: ['pottery', 'crafting', 'tutorial'],
  },
  // Add more dummy blog posts as needed
];

const dummyForumPosts = [
  {
    id: '1',
    userId: 'user1',
    userName: 'John Doe',
    userPhoto: 'https://img.icons8.com/?size=100&id=tZuAOUGm9AuS&format=png&color=000000',
    title: 'Best tools for woodworking beginners',
    content: 'I\'m just starting out with woodworking. Any recommendations for essential tools?',
    category: 'techniques',
    date: '2024-03-15',
    replies: [
      {
        id: '1',
        userId: 'user2',
        userName: 'Jane Smith',
        userPhoto: 'https://img.icons8.com/?size=100&id=tZuAOUGm9AuS&format=png&color=000000',
        content: 'Start with a good quality chisel set and a reliable saw...',
        date: '2024-03-16',
      },
    ],
  },
  // Add more dummy forum posts as needed
];

export default function CommunityPage() {
  const [activeTab, setActiveTab] = useState('reviews');

  const handleAddReview = async (review: any) => {
    // TODO: Implement Firebase integration
    console.log('Adding review:', review);
  };

  const handleAddBlogPost = async (post: any) => {
    // TODO: Implement Firebase integration
    console.log('Adding blog post:', post);
  };

  const handleAddForumPost = async (post: any) => {
    // TODO: Implement Firebase integration
    console.log('Adding forum post:', post);
  };

  const handleAddReply = async (postId: string, reply: any) => {
    // TODO: Implement Firebase integration
    console.log('Adding reply to post:', postId, reply);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Community Hub</h1>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200 mb-8">
        <nav className="-mb-px flex space-x-8">
          {['reviews', 'blog', 'forum'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`${
                activeTab === tab
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm capitalize`}
            >
              {tab}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="mt-8">
        {activeTab === 'reviews' && (
          <Reviews
            artisanId="artisan1"
            reviews={dummyReviews}
            onAddReview={handleAddReview}
          />
        )}
        {activeTab === 'blog' && (
          <Blog
            posts={dummyBlogPosts}
            onAddPost={handleAddBlogPost}
          />
        )}
        {activeTab === 'forum' && (
          <Forum
            posts={dummyForumPosts}
            onAddPost={handleAddForumPost}
            onAddReply={handleAddReply}
          />
        )}
      </div>
    </div>
  );
} 