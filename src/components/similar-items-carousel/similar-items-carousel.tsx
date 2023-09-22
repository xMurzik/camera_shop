import React, { useState } from 'react';
import { useAppSelector } from '../../hooks/redux-hooks';
import { getSimilarItems } from '../../store/item-slice/item-selectorts';
import ItemCard from '../item-card/item-card';
import { chunkArray } from '../../utils/pagination';
import { IItem } from '../../types/items';
import s from './similar-items-carousel.module.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import SwiperNavigation from '../swiper-navigation/swiper-navigation';
import CarouselItem from '../carousel-item/carousel-item';

const SimilarItemsCarousel: React.FC = () => {
  const data = useAppSelector(getSimilarItems);

  const [currentPageCarousel, setCurrentPageCarousel] = useState(0);

  const onClickNext = () => {
    setCurrentPageCarousel((prev) => prev + 1);
  };
  const onClickPrev = () => {
    setCurrentPageCarousel((prev) => prev - 1);
  };

  if (!data.length) {
    return null;
  }

  const itemsToRender = chunkArray(data, 3) as Array<Array<IItem>>;

  return (
    <div className="page-content__section">
      <section className="product-similar">
        <div className="container">
          <h2 className="title title--h3">Похожие товары</h2>
          {/* <div
            style={{ border: '2px solid red' }}
            className="product-similar__slider"
          >
            <div
              style={{ border: '2px solid red' }}
              className="product-similar__slider-list"
            > */}
          <Swiper
            spaceBetween={30}
            watchSlidesProgress
            slidesPerView={3}
            modules={[Navigation]}
          >
            {data.map((el) => (
              <SwiperSlide
                className={`is-active ${s.containerItemsCarousel}`}
                key={el.id}
              >
                <CarouselItem {...el} />
              </SwiperSlide>
            ))}

            <SwiperNavigation />
          </Swiper>
          {/* </div>
          </div> */}
        </div>
      </section>
    </div>
  );
};
export default SimilarItemsCarousel;
