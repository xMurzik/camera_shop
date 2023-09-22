import React from 'react';
import { IReviewComment } from '../../types/review';
import { UseFormRegister, UseFormWatch } from 'react-hook-form';

interface IRateBarProps {
  register: UseFormRegister<IReviewComment>;
  watch: UseFormWatch<IReviewComment>;
}

const RateBar: React.FC<IRateBarProps> = ({ register, watch }) => (
  <div className="rate__bar">
    <div className="rate__group">
      <input
        className="visually-hidden"
        id="star-5"
        type="radio"
        defaultValue={5}
        {...register('rate', { required: true })}
      />
      <label className="rate__label" htmlFor="star-5" title="Отлично" />
      <input
        className="visually-hidden"
        id="star-4"
        type="radio"
        defaultValue={4}
        {...register('rate', { required: true })}
      />
      <label className="rate__label" htmlFor="star-4" title="Хорошо" />
      <input
        className="visually-hidden"
        id="star-3"
        type="radio"
        defaultValue={3}
        {...register('rate', { required: true })}
      />
      <label className="rate__label" htmlFor="star-3" title="Нормально" />
      <input
        className="visually-hidden"
        id="star-2"
        type="radio"
        defaultValue={2}
        {...register('rate', { required: true })}
      />
      <label className="rate__label" htmlFor="star-2" title="Плохо" />
      <input
        className="visually-hidden"
        id="star-1"
        type="radio"
        defaultValue={1}
        {...register('rate', { required: true })}
      />
      <label className="rate__label" htmlFor="star-1" title="Ужасно" />
    </div>
    <div className="rate__progress">
      <span className="rate__stars">{watch().rate ? watch().rate : 0}</span>{' '}
      <span>/</span> <span className="rate__all-stars">5</span>
    </div>
  </div>
);

export default RateBar;
