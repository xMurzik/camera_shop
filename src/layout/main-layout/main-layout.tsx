import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';

const MainLayout: React.FC = () => (
  <div className="wrapper">
    <Header />
    <Outlet />
    <Footer />
  </div>
);

export default MainLayout;
