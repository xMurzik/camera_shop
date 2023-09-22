import React, { useState, useMemo, useEffect } from 'react';
import ReviewCard from '../review-card/review-card';
import ModalReview from '../modal-review/modal-review';
import { useParams } from 'react-router-dom';
import { useAppSelector } from '../../hooks/redux-hooks';
import { getComments } from '../../store/item-slice/item-selectorts';
import { MAX_PAGE_COMMENTS } from '../../constants/comments';
import { chunkArray } from '../../utils/pagination';
import ModalSuccess from '../modal-success/modal-success';

const ReviewList: React.FC = () => {
  const { id } = useParams();
  const data = useAppSelector(getComments);
  const [commentsPage, setCommentsPage] = useState(1);
  const [isShowReviewModal, setIsShowReviewModal] = useState(false);
  const [isShowSuccessModal, setisShowSuccessModal] = useState(false);
  const onClickMoreComments = () => setCommentsPage((prev) => prev + 1);
  const chunkedComments = useMemo(() => chunkArray(data, 3), [data]);

  useEffect(() => {
    setCommentsPage(1);
    const onClickEsc = (evt: KeyboardEvent) => {
      if (evt.code === 'Escape') {
        setIsShowReviewModal(false);
        setisShowSuccessModal(false);
      }
    };
    document.addEventListener('keydown', onClickEsc);

    return () => {
      document.removeEventListener('keydown', onClickEsc);
    };
  }, [id]);

  const onClickNewReview = () => {
    setIsShowReviewModal(true);
  };
  return (
    <>
      <div className="page-content__section">
        <section className="review-block">
          <div className="container">
            <div className="page-content__headed">
              <h2 className="title title--h3">Отзывы</h2>
              <button onClick={onClickNewReview} className="btn" type="button">
                Оставить свой отзыв
              </button>
            </div>
            <ul className="review-block__list">
              {data.slice(0, commentsPage * MAX_PAGE_COMMENTS).map((el) => (
                <ReviewCard key={el.id} {...el} />
              ))}
            </ul>
            <div className="review-block__buttons">
              {chunkedComments.length !== commentsPage && (
                <button
                  onClick={onClickMoreComments}
                  className="btn btn--purple"
                  type="button"
                >
                  Показать больше отзывов
                </button>
              )}
            </div>
          </div>
        </section>
      </div>
      {isShowReviewModal && (
        <ModalReview
          setIsShowModalOverlay={setIsShowReviewModal}
          setIsShowModalSuccess={setisShowSuccessModal}
          isActive={isShowReviewModal}
        />
      )}

      {isShowSuccessModal && (
        <ModalSuccess setIsShowModalSuccess={setisShowSuccessModal} />
      )}
    </>
  );
};

export default ReviewList;
