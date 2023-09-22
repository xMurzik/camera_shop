import React from 'react';
import ItemPageInfo from '../../components/item-page-info/item-page-info';
import SimilarItemsCarousel from '../../components/similar-items-carousel/similar-items-carousel';
import ReviewList from '../../components/review-list/review-list';

const ItemPage: React.FC = () => (
  <>
    <main>
      <div className="page-content">
        <ItemPageInfo />
        <SimilarItemsCarousel />
        <ReviewList />
      </div>
    </main>
    <a className="up-btn" href="#header">
      <svg width={12} height={18} aria-hidden="true">
        <use xlinkHref="#icon-arrow2" />
      </svg>
    </a>
  </>
);

export default ItemPage;
