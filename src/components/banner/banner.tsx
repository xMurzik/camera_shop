import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import { getPromos } from '../../store/promo-slice/promo-selectors';
import { fetchPromos } from '../../store/promo-slice/async-promo';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

const Banner: React.FC = () => {
  const dispatch = useAppDispatch();
  const promos = useAppSelector(getPromos);

  useEffect(() => {
    dispatch(fetchPromos());
  }, [dispatch]);

  if (!promos.length) {
    return null;
  }

  return (
    <Swiper
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
      }}
      pagination={{
        clickable: true,
      }}
      navigation
      modules={[Autoplay, Pagination]}
    >
      {promos.map((el) => (
        <SwiperSlide key={el.id}>
          <div className="banner">
            <picture>
              <source
                type="image/webp"
                srcSet={`${el.previewImgWebp}, ${el.previewImgWebp2x} 2x`}
              />
              <img
                src={el.previewImg}
                srcSet={`${el.previewImg2x} 2x`}
                width={1280}
                height={280}
                alt="баннер"
              />
            </picture>
            <p className="banner__info">
              <span className="banner__message">Новинка!</span>
              <span className="title title--h1">{el.name}</span>
              <span className="banner__text">
                Профессиональная камера от&nbsp;известного производителя
              </span>
              <a className="btn" href="#">
                Подробнее
              </a>
            </p>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Banner;
