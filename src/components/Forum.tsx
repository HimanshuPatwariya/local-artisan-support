'use client';

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';

interface ForumPost {
  id: string;
  userId: string;
  userName: string;
  userPhoto: string;
  title: string;
  content: string;
  category: string;
  date: string;
  replies: Reply[];
}

interface Reply {
  id: string;
  userId: string;
  userName: string;
  userPhoto: string;
  content: string;
  date: string;
}

interface ForumProps {
  posts: ForumPost[];
  onAddPost?: (post: Omit<ForumPost, 'id' | 'date' | 'replies'>) => Promise<void>;
  onAddReply?: (postId: string, reply: Omit<Reply, 'id' | 'date'>) => Promise<void>;
}

export default function Forum({ posts, onAddPost, onAddReply }: ForumProps) {
  const { user } = useAuth();
  const [isCreating, setIsCreating] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('general');
  const [selectedPost, setSelectedPost] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState('');

  const categories = [
    'general',
    'techniques',
    'materials',
    'marketing',
    'events',
    'other',
  ];

  const handleSubmitPost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !title.trim() || !content.trim()) return;

    try {
      await onAddPost?.({
        userId: user.uid,
        userName: user.displayName || 'Anonymous',
        userPhoto: user.photoURL || '',
        title: title.trim(),
        content: content.trim(),
        category,
      });
      setTitle('');
      setContent('');
      setCategory('general');
      setIsCreating(false);
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  const handleSubmitReply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !selectedPost || !replyContent.trim()) return;

    try {
      await onAddReply?.(selectedPost, {
        userId: user.uid,
        userName: user.displayName || 'Anonymous',
        userPhoto: user.photoURL || '',
        content: replyContent.trim(),
      });
      setReplyContent('');
    } catch (error) {
      console.error('Error adding reply:', error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Discussion Forum</h2>
        {user && (
          <button
            onClick={() => setIsCreating(!isCreating)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            {isCreating ? 'Cancel' : 'New Discussion'}
          </button>
        )}
      </div>

      {/* Create Post Form */}
      {isCreating && (
        <form onSubmit={handleSubmitPost} className="space-y-4 bg-white p-6 rounded-lg shadow">
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
            <label className="block text-sm font-medium text-gray-700">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-black"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </option>
              ))}
            </select>
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
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Create Discussion
          </button>
        </form>
      )}

      {/* Forum Posts */}
      <div className="space-y-6">
        {posts.map((post) => (
          <div key={post.id} className="bg-white rounded-lg shadow overflow-hidden">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <img
                    src={post.userPhoto}
                    alt={post.userName}
                    className="h-10 w-10 rounded-full"
                  />
                  <div>
                    <p className="font-medium text-gray-900">{post.userName}</p>
                    <p className="text-sm text-gray-500">
                      {new Date(post.date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">
                  {post.category}
                </span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{post.title}</h3>
              <p className="text-gray-600 whitespace-pre-wrap">{post.content}</p>

              {/* Replies */}
              <div className="mt-6 space-y-4">
                <h4 className="font-medium text-gray-900">Replies</h4>
                {post.replies.map((reply) => (
                  <div key={reply.id} className="pl-6 border-l-2 border-gray-200">
                    <div className="flex items-center space-x-3 mb-2">
                      <img
                        src={reply.userPhoto}
                        alt={reply.userName}
                        className="h-8 w-8 rounded-full"
                      />
                      <div>
                        <p className="font-medium text-gray-900">{reply.userName}</p>
                        <p className="text-sm text-gray-500">
                          {new Date(reply.date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <p className="text-gray-600">{reply.content}</p>
                  </div>
                ))}

                {/* Reply Form */}
                {user && selectedPost === post.id && (
                  <form onSubmit={handleSubmitReply} className="mt-4">
                    <textarea
                      value={replyContent}
                      onChange={(e) => setReplyContent(e.target.value)}
                      placeholder="Write a reply..."
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                      rows={3}
                    />
                    <div className="mt-2 flex justify-end space-x-2">
                      <button
                        type="button"
                        onClick={() => setSelectedPost(null)}
                        className="px-4 py-2 text-gray-600 hover:text-gray-800"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                      >
                        Reply
                      </button>
                    </div>
                  </form>
                )}
                {user && selectedPost !== post.id && (
                  <button
                    onClick={() => setSelectedPost(post.id)}
                    className="mt-4 text-blue-600 hover:text-blue-700"
                  >
                    Reply to this discussion
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 