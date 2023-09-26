import React from 'react';

const RATING_ARR = [1, 2, 3, 4, 5];

interface IRatingProps {
  rating: number;
}

const RatingStatic: React.FC<IRatingProps> = ({ rating }) =>
  RATING_ARR.map((el) => (
    <svg data-testid="star" key={el} width={17} height={16} aria-hidden="true">
      <use xlinkHref={el <= rating ? '#icon-full-star' : '#icon-star'} />
    </svg>
  ));

export default RatingStatic;
