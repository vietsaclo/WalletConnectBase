import React from 'react';
import Header from '../components/common/Header';
import MintNFTs from '../components/home-page/MintNFTs';

const HomePage: React.FC = () => {
  return (
    <>
      <main>
        <div className='header'>
          <Header />
        </div>

        <MintNFTs />
      </main>
    </>
  );
};

export default React.memo(HomePage);
