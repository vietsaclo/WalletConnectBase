import React from 'react';
import Header from '../components/common/Header';
import MyInventory from '../components/home-page/MyInventory';

const InventoryPage: React.FC = () => {
  return (
    <>
      <div className='header'>
        <Header />
      </div>

      <MyInventory />
    </>
  );
};

export default React.memo(InventoryPage);
