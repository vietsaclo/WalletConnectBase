import { useAccount, useWalletClient } from "wagmi";
import UseContractMintNFTsCatHook from "../../hooks/UseContractMintNFTsCatHook";
import { Funcs, UI } from "../../utils";
import { Tag } from "antd";
import { ENVs } from "../../utils/Consts";
import { useState } from "react";
import { LoadingOutlined } from "@ant-design/icons";
import UseWalletConnectedHook from "../../hooks/UseWalletConnectedHook";

let LOADING_RANDOM = false;
let RANDOM_JSON_ID_FOUND = 0;

const MintNFTs = () => {
  const { data: walletClient } = useWalletClient();
  const { isConnected } = useAccount();
  const { UseRandomJsonId, UseMintNFT, UseGetPRICE_PER_MINT } = UseContractMintNFTsCatHook();
  const [randomIdText, setRandomIdText] = useState<string>('Random NFT');
  const [loading, setLoading] = useState<boolean>(false);
  const [hash, setHash] = useState<string>('');
  const { UseGetUserBalance } = UseWalletConnectedHook();

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
    if (!walletClient) {
      UI.toastError('Please reload website!');
      return;
    }
    // check connected ?
    if (!isConnected) {
      UI.toastError('Connect wallet require!');
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
  }

  return (
    <div className="container">
      <div className="mt-5 pb-5">
        <div className="center-element">
          <div className="box-mint">
            <div className="card" style={{ width: "18rem" }}>
              <div className="w-100 center-element fw-bold" style={{
                height: '200px',
                backgroundColor: '#f1f1f1',
                color: 'ActiveBorder',
                fontSize: '30px',
              }}>
                {randomIdText}
              </div>
              <div className="card-body">
                <h5 className="card-title">Mint NFT</h5>
                <p className="card-text">
                  Mint NFT K-Cats, Touch the button below and enjoy your meal.
                </p>
                <Tag color="cyan">Fee: 0.0001 Ether</Tag>
              </div>
              <div className="card-footer">
                <button disabled={loading} onClick={btnMintCliced} className="btn btn-outline-danger w-100">
                  Mint NFTs&nbsp;
                  {loading && (<span><LoadingOutlined /></span>)}
                </button>
              </div>
            </div>
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
    </div>
  );
}

export default MintNFTs;
