import React from 'react';

const RATING_ARR = [5, 4, 3, 2, 1];

interface IRatingProps {
  rating: number;
}

const RatingStatic: React.FC<IRatingProps> = ({ rating }) =>
  RATING_ARR.map((el) => (
    <svg key={el} width={17} height={16} aria-hidden="true">
      <use xlinkHref={el >= rating ? '#icon-full-star' : '#icon-star'} />
    </svg>
  ));

export default RatingStatic;
