import React from 'react';
import { IComment } from '../../types/comments';
import RatingStatic from '../rating-static/rating-static';

const ReviewCard: React.FC<IComment> = (props) => {
  const { createAt, disadvantage, rating, review, userName, advantage } = props;

  const editedDate = new Date(createAt).toLocaleDateString('ru', {
    day: 'numeric',
    month: 'long',
  });

  const editedDateToTag = new Date(createAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  });

  return (
    <li className="review-card">
      <div className="review-card__head">
        <p className="title title--h4">{userName}</p>
        <time
          className="review-card__data"
          dateTime={editedDateToTag.replace(/\//gi, '-')}
        >
          {editedDate}
        </time>
      </div>
      <div className="rate review-card__rate">
        <RatingStatic rating={rating} />
        <p className="visually-hidden">Оценка: {rating}</p>
      </div>
      <ul className="review-card__list">
        <li className="item-list">
          <span className="item-list__title">Достоинства:</span>
          <p className="item-list__text">{advantage}</p>
        </li>
        <li className="item-list">
          <span className="item-list__title">Недостатки:</span>
          <p className="item-list__text">{disadvantage}</p>
        </li>
        <li className="item-list">
          <span className="item-list__title">Комментарий:</span>
          <p className="item-list__text">{review}</p>
        </li>
      </ul>
    </li>
  );
};

export default ReviewCard;
