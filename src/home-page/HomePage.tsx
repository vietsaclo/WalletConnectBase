import React from 'react';
import Header from '../components/common/Header';
import MintNFTs from '../components/home-page/MintNFTs';

const HomePage: React.FC = () => {
  return (
    <>
      <div className='header'>
        <Header />
      </div>

      <MintNFTs />
    </>
  );
};

export default React.memo(HomePage);
