import React, { useState } from "react";

// Star component for individual stars in the rating system
const Star = ({ filled, onClick }: { filled: boolean, onClick: () => void }) => (
  <span
    className={`cursor-pointer text-3xl ${filled ? 'text-yellow-400' : 'text-gray-400'}`}
    onClick={onClick}
  >
    ★
  </span>
);

const StarRating: React.FC<{ rating: number, onRatingChange: (rating: number) => void }> = ({ rating, onRatingChange }) => {
  const handleStarClick = (index: number) => {
    onRatingChange(index + 1); // Update the rating when a star is clicked
  };

  return (
    <div className="flex gap-1">
      {Array.from({ length: 5 }).map((_, index) => (
        <Star
          key={index}
          filled={index < rating}
          onClick={() => handleStarClick(index)}
        />
      ))}
    </div>
  );
};

export default StarRating;
