import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import { getPromos } from '../../store/promo-slice/promo-selectors';
import { fetchPromos } from '../../store/promo-slice/async-promo';

const Banner: React.FC = () => {
  const dispatch = useAppDispatch();
  const promos = useAppSelector(getPromos);

  console.log(promos);

  useEffect(() => {
    dispatch(fetchPromos());
  }, [dispatch]);

  return (
    <div className="banner">
      <picture>
        <source
          type="image/webp"
          srcSet="img/content/banner-bg.webp, img/content/banner-bg@2x.webp 2x"
        />
        <img
          src="img/content/banner-bg.jpg"
          srcSet="img/content/banner-bg@2x.jpg 2x"
          width={1280}
          height={280}
          alt="баннер"
        />
      </picture>
      <p className="banner__info">
        <span className="banner__message">Новинка!</span>
        <span className="title title--h1">
          Cannonball&nbsp;Pro&nbsp;MX&nbsp;8i
        </span>
        <span className="banner__text">
          Профессиональная камера от&nbsp;известного производителя
        </span>
        <a className="btn" href="#">
          Подробнее
        </a>
      </p>
    </div>
  );
};

export default Banner;
