import { useAccount, useWalletClient } from "wagmi";
import UseContractMintNFTsCatHook from "../../hooks/UseContractMintNFTsCatHook";
import { Funcs, UI } from "../../utils";
import { Tag } from "antd";
import { ENVs } from "../../utils/Consts";
import { useEffect, useState } from "react";
import { LoadingOutlined } from "@ant-design/icons";
import UseWalletConnectedHook from "../../hooks/UseWalletConnectedHook";
import Confetti from 'react-confetti';
import UseCommomHook from "../../hooks/UseCommonHook";

let LOADING_RANDOM = false;
let RANDOM_JSON_ID_FOUND = 0;
let CONFETTI_TIME = 5;

const MintNFTs = () => {
  const { data: walletClient } = useWalletClient();
  const { isConnected } = useAccount();
  const { UseRandomJsonId, UseMintNFT, UseGetPRICE_PER_MINT } = UseContractMintNFTsCatHook();
  const [randomIdText, setRandomIdText] = useState<string>('Random NFT');
  const [loading, setLoading] = useState<boolean>(false);
  const [hash, setHash] = useState<string>('');
  const { UseGetUserBalance } = UseWalletConnectedHook();
  const { UseWindowDimensions } = UseCommomHook();
  const windowSize = UseWindowDimensions();
  const [confetti, setConfetti] = useState<number>(0);

  const startRandomUI = async (onFinished: Function) => {
    let count = 0;
    do {
      setRandomIdText(Funcs.fun_randomMinMax(0, ENVs.TOTAL_SUPPLY_NFTs).toString());
      count += 1;
      await Funcs.fun_sleep(1);
    } while (count < 300 || LOADING_RANDOM);
    onFinished();
  }

  const btnMintCliced = async () => {
    if (confetti >= 0.001) return;

    // check connected ?
    if (!isConnected) {
      UI.toastError('Connect wallet require!');
      return;
    }
    if (!walletClient) {
      UI.toastError('Please reload website!');
      return;
    }

    // loading
    setHash('');
    LOADING_RANDOM = true;
    setLoading(true);

    // check balance
    const pricePerMint = await UseGetPRICE_PER_MINT(walletClient);
    const userBalance = UseGetUserBalance();
    if (userBalance < pricePerMint) {
      UI.toastError(`Insufficient balance`);
      LOADING_RANDOM = false;
      setLoading(false);
      return;
    }

    startRandomUI(onRandomFinished);
    RANDOM_JSON_ID_FOUND = await UseRandomJsonId(walletClient);
    LOADING_RANDOM = false;
  }

  const onRandomFinished = async () => {
    if (!walletClient) {
      UI.toastError('Please reload website!');
      return;
    }

    setRandomIdText(RANDOM_JSON_ID_FOUND.toString());
    const minted = await UseMintNFT(walletClient, RANDOM_JSON_ID_FOUND);
    setLoading(false);
    setRandomIdText('Random NFT');
    if (!minted) {
      UI.toastError('Mint NFT Failed!');
      return;
    }
    setHash(minted.hash);
    hanldeConfetti();
  }

  const hanldeConfetti = async () => {
    setConfetti(CONFETTI_TIME);
    let count = CONFETTI_TIME;
    const minus = 0.05;
    const sleep = 50;
    do {
      setConfetti(count - minus);
      count -= minus;
      await Funcs.fun_sleep(sleep);
    } while (count > 0);
  }

  return (
    <main className="mint-page">
      <div className="container">
        {confetti > 0 && (
          <Confetti
            width={windowSize.width}
            height={windowSize.height}
            opacity={confetti / CONFETTI_TIME}
          />
        )}
        {/* <div className="mint-page__ttl">
          <img src="/assets/images/logo-mint.png" alt="logo-mint" />
        </div> */}

        <div className="mint-box d-flex align-items-center justify-content-center">
          <p className="mint-v3_chose text-center">Mint NFT K-Cats<span className="noti">Touch the button below and enjoy your meal.</span></p>
        </div>


        <div className="text-center">
          <div className="d-flex flex-column align-items-center">
            <div className="center-element text-center fw-bold" style={{
              width: '18rem',
              height: '86px',
              backgroundColor: "wheat",
              color: 'ActiveBorder',
              fontSize: '30px',
              borderRadius: '20px'
            }}>
              {randomIdText}
            </div>
            <div className="mt-3">
              <button disabled={loading} onClick={btnMintCliced} className="btn btn-mint">
                Mint NFTs&nbsp;
                {loading && (<span><LoadingOutlined /></span>)}
              </button>
            </div>
          </div>
          <div className="fw-bold mt-3">
            Total estimated cost (fees included) :
            <span className="ms-2"><Tag color="cyan">Fee: 0.0001 Ether</Tag></span>
          </div>
        </div>

        <div className="text-center">
          {hash && (
            <div className="mt-5">
              <span className="fw-bold text-success">Mint Success!&nbsp;</span>
              <a target="_blank" href={`${ENVs.BLOCK_SCAN_EXPLORER.replace(':hash', hash)}`} className="card-link">View On Scan Explore</a>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

export default MintNFTs;
