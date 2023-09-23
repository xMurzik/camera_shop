import React from 'react';
import s from './not-found-page.module.scss';
import { Link } from 'react-router-dom';
import { Path } from '../../constants/common';

const NotFoundPage: React.FC = () => (
  <div className={s.mainWrapper}>
    <h1 className={s.titleH1}>Page not found</h1>
    <Link className={s.linkToCatalog} to={Path.catalog}>
      Back to catalog
    </Link>
  </div>
);

export default NotFoundPage;
