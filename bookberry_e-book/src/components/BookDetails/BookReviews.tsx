import React from 'react';
import { Book } from '../../types';
import { Star } from 'lucide-react';
import { az } from '../../constants/translations';

interface Props {
  book: Book;
}

export const BookReviews: React.FC<Props> = ({ book }) => {
  if (!book.reviews?.length) return null;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{az.reviews}</h2>

      <div className="space-y-4">
        {book.reviews.map((review) => (
          <div
            key={review.id}
            className="rounded-2xl bg-gray-50 p-6 dark:bg-gray-800"
          >
            <div className="mb-3 flex items-center justify-between">
              <div className="font-medium text-gray-900 dark:text-white">
                {review.userName}
              </div>
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  {review.rating}
                </span>
              </div>
            </div>
            <p className="text-gray-600 dark:text-gray-300">{review.comment}</p>
            <div className="mt-2 text-sm text-gray-500">
              {new Date(review.date).toLocaleDateString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};