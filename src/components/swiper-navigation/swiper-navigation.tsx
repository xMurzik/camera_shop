import React from 'react';
import { useSwiper } from 'swiper/react';
import s from './swiper-navigation.module.scss';

const SwiperNavigation: React.FC = () => {
  const swiper = useSwiper();

  return (
    <>
      <button
        className={s.buttonPrev}
        type="button"
        aria-label="Предыдущий слайд"
        onClick={() => {
          swiper.slidePrev();
          swiper.slidePrev();
          swiper.slidePrev();
        }}
      >
        <svg width={7} height={12} aria-hidden="true">
          <use xlinkHref="#icon-arrow" />
        </svg>
      </button>

      <button
        className={s.buttonNext}
        type="button"
        aria-label="Следующий слайд"
        onClick={() => {
          swiper.slideNext();
          swiper.slideNext();
          swiper.slideNext();
        }}
      >
        <svg width={7} height={12} aria-hidden="true">
          <use xlinkHref="#icon-arrow" />
        </svg>
      </button>
    </>
  );
};

export default SwiperNavigation;
