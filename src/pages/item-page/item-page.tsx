import React from 'react';
import ItemPageInfo from '../../components/item-page-info/item-page-info';
import SimilarItemsCarousel from '../../components/similar-items-carousel/similar-items-carousel';
import ReviewList from '../../components/review-list/review-list';
import { Link } from 'react-router-dom';

const ItemPage: React.FC = () => {
  const onClickArrowNavigateToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <>
      <main>
        <div className="page-content">
          <ItemPageInfo />
          <SimilarItemsCarousel />
          <ReviewList />
        </div>
      </main>
      <Link onClick={onClickArrowNavigateToTop} className="up-btn" to="#header">
        <svg width={12} height={18} aria-hidden="true">
          <use xlinkHref="#icon-arrow2" />
        </svg>
      </Link>
    </>
  );
};

export default ItemPage;
