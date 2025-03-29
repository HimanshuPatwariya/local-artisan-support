'use client';

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import Image from 'next/image';

interface BlogPost {
  id: string;
  artisanId: string;
  artisanName: string;
  artisanPhoto: string;
  title: string;
  content: string;
  imageUrl: string;
  date: string;
  tags: string[];
}

interface BlogProps {
  posts: BlogPost[];
  onAddPost?: (post: Omit<BlogPost, 'id' | 'date'>) => Promise<void>;
}

export default function Blog({ posts, onAddPost }: BlogProps) {
  const { user } = useAuth();
  const [isCreating, setIsCreating] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [tags, setTags] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !title.trim() || !content.trim()) return;

    try {
      await onAddPost?.({
        artisanId: user.uid,
        artisanName: user.displayName || 'Anonymous',
        artisanPhoto: user.photoURL || '',
        title: title.trim(),
        content: content.trim(),
        imageUrl: imageUrl.trim(),
        tags: tags.split(',').map(tag => tag.trim()).filter(Boolean),
      });
      setTitle('');
      setContent('');
      setImageUrl('');
      setTags('');
      setIsCreating(false);
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Artisan Stories</h2>
        {user && (
          <button
            onClick={() => setIsCreating(!isCreating)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            {isCreating ? 'Cancel' : 'Share Your Story'}
          </button>
        )}
      </div>

      {/* Create Post Form */}
      {isCreating && (
        <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow">
          <div>
            <label className="block text-sm font-medium text-gray-700">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-black"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Content</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={5}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-black"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Image URL</label>
            <input
              type="url"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-black"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Tags (comma-separated)</label>
            <input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-black"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Publish Story
          </button>
        </form>
      )}

      {/* Blog Posts */}
      <div className="space-y-8">
        {posts.map((post) => (
          <article key={post.id} className="bg-white rounded-lg shadow overflow-hidden">
            {post.imageUrl && (
              <div className="relative h-64">
                <Image
                  src={post.imageUrl}
                  alt={post.title}
                  fill
                  className="object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = 'https://img.icons8.com/?size=100&id=tZuAOUGm9AuS&format=png&color=000000';
                  }}
                />
              </div>
            )}
            <div className="p-6">
              <div className="flex items-center space-x-3 mb-4">
                <img
                  src={post.artisanPhoto}
                  alt={post.artisanName}
                  className="h-10 w-10 rounded-full"
                />
                <div>
                  <p className="font-medium text-gray-900">{post.artisanName}</p>
                  <p className="text-sm text-gray-500">
                    {new Date(post.date).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{post.title}</h3>
              <p className="text-gray-600 whitespace-pre-wrap">{post.content}</p>
              {post.tags.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
} 