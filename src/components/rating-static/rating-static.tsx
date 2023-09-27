import React from 'react';

const RATING_ARR = [1, 2, 3, 4, 5];

interface IRatingProps {
  rating: number;
}

function RatingStatic({ rating }: IRatingProps): React.ReactNode {
  return RATING_ARR.map((el) => (
    <svg key={el} data-testid="star" width={17} height={16} aria-hidden="true">
      <use xlinkHref={el <= rating ? '#icon-full-star' : '#icon-star'} />
    </svg>
  ));
}

export default RatingStatic;
