'use client';

import { useState, useEffect, useRef } from 'react';
import { useAuth } from '@/context/AuthContext';

interface Message {
  id: string;
  senderId: string;
  senderName: string;
  senderPhoto: string;
  content: string;
  timestamp: string;
}

interface LiveChatProps {
  artisanId: string;
  artisanName: string;
  artisanPhoto: string;
  onClose: () => void;
}

export default function LiveChat({ artisanId, artisanName, artisanPhoto, onClose }: LiveChatProps) {
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !newMessage.trim()) return;

    const message: Omit<Message, 'id' | 'timestamp'> = {
      senderId: user.uid,
      senderName: user.displayName || 'Anonymous',
      senderPhoto: user.photoURL || '',
      content: newMessage.trim(),
    };

    try {
      // TODO: Implement Firebase integration
      console.log('Sending message:', message);
      setNewMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 w-96 bg-white rounded-lg shadow-xl overflow-hidden">
      {/* Chat Header */}
      <div className="bg-blue-600 text-white p-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <img
            src={artisanPhoto}
            alt={artisanName}
            className="h-10 w-10 rounded-full"
          />
          <div>
            <h3 className="font-semibold">{artisanName}</h3>
            <p className="text-sm text-blue-100">Online</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="text-white hover:text-blue-100"
        >
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      {/* Messages */}
      <div className="h-96 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.senderId === user?.uid ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`max-w-[80%] rounded-lg p-3 ${
                message.senderId === user?.uid
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-900'
              }`}
            >
              <div className="flex items-center space-x-2 mb-1">
                <img
                  src={message.senderPhoto}
                  alt={message.senderName}
                  className="h-6 w-6 rounded-full"
                />
                <span className="text-sm font-medium">{message.senderName}</span>
              </div>
              <p className="text-sm">{message.content}</p>
              <span className="text-xs opacity-75 mt-1 block">
                {new Date(message.timestamp).toLocaleTimeString()}
              </span>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Typing Indicator */}
      {isTyping && (
        <div className="px-4 py-2 bg-gray-50">
          <p className="text-sm text-gray-500">Typing...</p>
        </div>
      )}

      {/* Message Input */}
      <form onSubmit={handleSendMessage} className="p-4 border-t">
        <div className="flex space-x-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
          />
          <button
            type="submit"
            disabled={!newMessage.trim()}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
} 