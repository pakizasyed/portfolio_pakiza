import React, { useState, useEffect } from 'react';
import { Quote } from '../types';
import { getRandomQuote } from '../data/quotes';
import { Sparkles } from 'lucide-react';

const QuoteCard: React.FC = () => {
  const [quote, setQuote] = useState<Quote | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setQuote(getRandomQuote());
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-6 animate-pulse">
        <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
      </div>
    );
  }

  if (!quote) return null;

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-pink-100 transition-all duration-300 hover:shadow-md">
      <div className="flex items-start mb-4">
        <Sparkles className="text-pink-400 mr-2 mt-1" size={20} />
        <h3 className="text-lg font-medium text-gray-700">Daily Inspiration</h3>
      </div>
      <p className="text-gray-600 italic mb-3">"{quote.text}"</p>
      <p className="text-right text-sm text-pink-500">— {quote.author}</p>
    </div>
  );
};

export default QuoteCard;