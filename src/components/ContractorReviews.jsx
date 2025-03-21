
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Star } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const ContractorReviews = ({ reviews }) => {
  // Calculate average rating
  const averageRating = reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;
  
  // Format the rating to one decimal place
  const formattedRating = averageRating.toFixed(1);
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-yellow-100 rounded-full">
            <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
          </div>
          <div>
            <h3 className="font-medium">Overall Rating</h3>
            <p className="text-sm text-muted-foreground">
              Based on {reviews.length} {reviews.length === 1 ? 'review' : 'reviews'}
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="flex">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`h-5 w-5 ${
                  star <= Math.round(averageRating)
                    ? 'text-yellow-400 fill-yellow-400'
                    : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          <Badge variant="secondary" className="text-lg font-bold bg-yellow-100 text-yellow-700">
            {formattedRating}
          </Badge>
        </div>
      </div>
      
      <div className="space-y-4">
        {reviews.map((review) => (
          <div key={review.id} className="border border-gray-100 rounded-lg p-4">
            <div className="flex justify-between items-start mb-2">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={review.userAvatar} />
                  <AvatarFallback className="bg-primary/10 text-primary">
                    {review.userName.split(' ').map(name => name[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="font-medium">{review.userName}</h4>
                  <p className="text-xs text-muted-foreground">
                    {new Date(review.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
              </div>
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`h-4 w-4 ${
                      star <= review.rating
                        ? 'text-yellow-400 fill-yellow-400'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>
            <p className="text-sm mt-2">{review.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContractorReviews;
