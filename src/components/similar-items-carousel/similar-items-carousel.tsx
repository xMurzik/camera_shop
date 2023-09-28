import React from 'react';
import { useAppSelector } from '../../hooks/redux-hooks';
import { getSimilarItems } from '../../store/item-slice/item-selectorts';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import CarouselItem from '../carousel-item/carousel-item';
import s from './similar-items-carousel.module.scss';

const SimilarItemsCarousel: React.FC = () => {
  const data = useAppSelector(getSimilarItems);

  if (!data.length) {
    return null;
  }

  return (
    <div className="page-content__section">
      <section className="product-similar">
        <div className="container">
          <h2 className="title title--h3">Похожие товары</h2>
          <div className="product-similar__slider">
            <Swiper
              className="product-similar__slider-list"
              spaceBetween={30}
              slidesPerGroup={3}
              watchSlidesProgress
              slidesPerView={3}
              modules={[Navigation]}
              navigation={{ nextEl: '.arrow-right', prevEl: '.arrow-left' }}
            >
              {data.map((el) => (
                <SwiperSlide key={el.id}>
                  <CarouselItem {...el} />
                </SwiperSlide>
              ))}
            </Swiper>
            <button
              className={`${s.buttonPrev} slider-controls--prev arrow-left`}
              type="button"
              aria-label="Предыдущий слайд"
            >
              <svg width="7" height="12" aria-hidden="true">
                <use xlinkHref="#icon-arrow"></use>
              </svg>
            </button>
            <button
              className={`${s.buttonNext} slider-controls--next arrow-right`}
              type="button"
              aria-label="Следующий слайд"
            >
              <svg width="7" height="12" aria-hidden="true">
                <use xlinkHref="#icon-arrow"></use>
              </svg>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
export default SimilarItemsCarousel;
